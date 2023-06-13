/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames';
import { GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { loadTokens, redirectToAuthCodeFlow, spotifyFetch } from '../helpers/authCodeWithPkce';
import { parseTrack, parseUser, Track, User } from '../helpers/spotifyParsers';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      code: context.query.code ?? null,
    } as SpotifyProps,
  };
}

interface SpotifyProps {
  code: string | undefined;
}

export default function Spotify({ code }: SpotifyProps) {
  const [genres, setGenres] = useState<string[]>([]);
  const [initialTrackId, setInitialTrackId] = useState('57RJ51keAi2GaYOPtaTjfT');
  const [preview, setPreview] = useState<HTMLAudioElement>();
  const [recommendations, setRecommendations] = useState<Track[]>([]);
  const [saving, setSaving] = useState(false);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [user, setUser] = useState<User>();
  const router = useRouter();

  const genre = useRef<string>();

  useEffect(() => {
    async function loadUser() {
      const userRes = await spotifyFetch('https://api.spotify.com/v1/me', {
        method: 'GET',
      });

      setUser(parseUser(await userRes.json()));

      const genreRes = await spotifyFetch('https://api.spotify.com/v1/recommendations/available-genre-seeds', {
        method: 'GET',
      });

      setGenres((await genreRes.json()).genres);
    }

    // load access token and user given with the auth code
    async function loadAccessTokenAndUser(code: string) {
      await loadTokens(code);
      await loadUser();
    }

    // use existing accessToken if we have it, otherwise normal auth flow
    if (localStorage.getItem('accessToken')) {
      loadUser();
    } else if (!code) {
      redirectToAuthCodeFlow();
    } else {
      loadAccessTokenAndUser(code);
    }

    // remove code from the url query for clean aesthetic
    router.push('/spotify', undefined, { shallow: true });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function FormattedTrack({ track }: { track: Track }) {
    function formatSeconds(seconds: number) {
      const m = Math.floor(seconds / 60);
      const s = seconds % 60;

      return `${m}:${s < 10 ? '0' : ''}${s}`;
    }

    return (
      <div className='flex gap-4 w-full items-center cursor-pointer truncate select-none' onClick={() => {
        // pause any ongoing track
        if (preview) {
          preview.pause();
        }

        // play the current track if it is different than the previous
        if (preview !== track.preview) {
          track.preview.play();
          setPreview(track.preview);
        } else {
          setPreview(undefined);
        }
      }}>
        <Image
          alt={track.name}
          className='shadow-lg w-12 h-12'
          height={48}
          src={track.image}
          style={{
            minWidth: '3rem',
          }}
          width={48}
        />
        <div className='grow flex flex-col gap-1 truncate text-left'>
          <span className={classNames('truncate text-lg', { 'text-green-500': preview === track.preview })}>{track.name}</span>
          <span className='text-neutral-400 text-sm truncate'>{track.artists.map(a => a.name).join(', ')}</span>
        </div>
        <span className='text-neutral-400 m-2'>
          {formatSeconds(track.seconds)}
        </span>
      </div>
    );
  }

  function FormattedUser({ user }: { user: User | undefined }) {
    if (!user) {
      return null;
    }

    return (
      <a className='flex items-center gap-3 truncate mx-1' href={user.href} rel='noreferrer' target='_blank'>
        <Image
          alt={user.name}
          className='shadow-lg w-12 h-12 rounded-full'
          height={48}
          src={user.image}
          style={{
            minWidth: '3rem',
          }}
          width={48}
        />
        <span className='text-lg font-medium truncate'>
          {user.name}
        </span>
      </a>
    );
  }

  function loadTrack(t: any) {
    const track = parseTrack(t);

    track.preview.addEventListener('ended', () => setPreview(undefined));

    return track;
  }

  async function getTrack(id: string) {
    const res = await spotifyFetch(`https://api.spotify.com/v1/tracks/${id}`, {
      method: 'GET',
    });

    const track = loadTrack(await res.json());

    setTracks(prev => {
      const newTracks = [...prev];

      newTracks.push(track);

      return newTracks;
    });
  }

  async function getRecommendations() {
    if (!genre.current) {
      return;
    }

    let params: URLSearchParams;

    if (tracks.length === 0) {
      params = new URLSearchParams({
        limit: '20',
        seed_genres: genre.current,
      });
    } else {
      const latestTrack = tracks[tracks.length - 1];

      params = new URLSearchParams({
        limit: '20',
        seed_artists: latestTrack.artists.map(a => a.id).slice(0, 5).join(','),
        seed_genres: latestTrack.genres.slice(0, 5).join(','),
        seed_tracks: latestTrack.id,
      });
    }

    const res = await spotifyFetch(`https://api.spotify.com/v1/recommendations?${params}`, {
      method: 'GET',
    });

    setRecommendations((await res.json()).tracks
      // preview url can be null, but audio is essential here so need to filter these results
      // https://github.com/spotify/web-api/issues/148#issuecomment-313924088
      .filter((t: any) => !!t.preview_url)
      .map((t: any) => loadTrack(t)));
  }

  async function save() {
    if (!user) {
      return;
    }

    setSaving(true);

    const createPlaylistRes = await spotifyFetch(`https://api.spotify.com/v1/users/${user.id}/playlists`, {
      body: JSON.stringify({
        description: 'Playlist created with Set Builder',
        name: `Set Builder - ${tracks[0].name}`,
        public: false,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    const playlist = await createPlaylistRes.json();

    // add all tracks to the playlist
    // TODO: loop through if above POST limit (100 per call)

    await spotifyFetch(`https://api.spotify.com/v1/playlists/${playlist.id}/tracks`, {
      body: JSON.stringify({
        position: 0,
        uris: tracks.map(t => t.uri),
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    setSaving(false);
  }

  return (
    <div className='flex inset-0 fixed p-3 gap-3'>
      {tracks.length > 0 &&
        <div className='w-96 bg-neutral-800 rounded-md flex flex-col p-3 gap-3 overflow-y-scroll items-center'>
          {tracks.map((track, trackIndex) => {
            const canDelete = tracks.length !== 1;

            return (
              <div className='flex items-center w-full' key={track.id}>
                <FormattedTrack track={track} />
                {canDelete &&
                  <div className={classNames('transition cursor-pointer hover:scale-125 hover:text-red-500 mx-2')} onClick={() => {
                    setTracks(prevTracks => {
                      const newTracks = [...prevTracks];

                      newTracks.splice(trackIndex, 1);

                      return newTracks;
                    });
                  }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                }
              </div>
            );
          })}
          <button
            className='bg-green-500 disabled:bg-neutral-500 text-black px-4 py-2 text-2xl rounded-2xl'
            disabled={saving}
            onClick={save}
          >
            Save
          </button>
        </div>
      }
      <div className='grow flex flex-col text-center items-center gap-4 truncate'>
        <div className='w-full flex justify-end'>
          <FormattedUser user={user} />
        </div>
        {recommendations.length === 0 ?
          <div className='grow flex flex-col items-center text-center gap-6 p-4 w-full overflow-y-scroll'>
            {/* <span className='text-3xl'>Paste a track ID to start off your set</span> */}
            <span className='text-3xl'>Paste a genre to start off your set</span>
            <div className='flex flex-wrap gap-6 justify-center text-lg'>
              {genres.map(g => (
                <button
                  className='hover:text-green-500 transition'
                  key={g}
                  onClick={() => {
                    genre.current = g;
                    getRecommendations();
                  }}
                >
                  {g}
                </button>
              ))}
            </div>
            {/* <input
              className='text-2xl px-3 py-2 rounded-lg w-96 text-center'
              onChange={e => setInitialTrackId(e.target.value)}
              placeholder='Track ID'
              value={initialTrackId}
            />
            <button
              className='bg-green-500 disabled:invisible text-black px-4 py-2 text-3xl rounded-2xl'
              disabled={!initialTrackId}
              onClick={() => getTrack(initialTrackId)}
            >
              Start
            </button> */}
          </div>
          :
          <>
            {/* <span className='text-4xl font-medium'>What do you want next?</span> */}
            <div className='grow flex flex-col items-center text-center gap-4 w-full overflow-y-scroll'>
              {/* <div>
                ⏰ Tempo
              </div>
              <div>
                💃 Danceability
              </div>
              <div>
                🔊 Loudness
              </div>
              <div>
                ⚡️ Energy
              </div> */}
              {recommendations.map(track => {
                // TODO: allow adding identical tracks
                const disabled = tracks.some(t => t.id === track.id);

                return (
                  <div className='flex items-center w-full' key={track.id}>
                    <div className={classNames('mx-4', disabled ? 'text-neutral-500' : 'transition cursor-pointer hover:scale-125 hover:text-green-500')} onClick={() => {
                      if (disabled) {
                        return;
                      }

                      setTracks(prevTracks => {
                        const newTracks = [...prevTracks];

                        newTracks.push({ ...track });

                        return newTracks;
                      });
                    }}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <FormattedTrack track={track} />
                  </div>
                );
              })}
            </div>
            <button
              className='bg-green-500 text-black px-4 py-2 text-2xl rounded-2xl'
              onClick={() => getRecommendations()}
            >
              Recommend
            </button>
          </>
        }
      </div>
    </div>
  );
}
