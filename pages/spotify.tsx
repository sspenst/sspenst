/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames';
import { GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { getAccessToken, redirectToAuthCodeFlow } from '../helpers/authCodeWithPkce';

interface Artist {
  id: string;
  name: string;
}

interface Track {
  artists: Artist[];
  genres: string[];
  href: string;
  id: string;
  image: string;
  name: string;
  preview: HTMLAudioElement;
  seconds: number;
}

interface FormattedTrackProps {
  track: Track;
}

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
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [initialTrackId, setInitialTrackId] = useState('02nhDSWvcXYALyVkth2oXd');
  const [preview, setPreview] = useState<HTMLAudioElement>();
  const [recommendations, setRecommendations] = useState<Track[]>([]);
  const [tracks, setTracks] = useState<Track[]>([]);

  const clientId = 'a16d23f0a5e34c73b8719bd006b90464';

  useEffect(() => {
    if (!code) {
      redirectToAuthCodeFlow(clientId);
    } else {
      getAccessToken(clientId, code as string).then(accessToken => setAccessToken(accessToken));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function FormattedTrack({ track }: FormattedTrackProps) {
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
        >
        </Image>
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

  function parseTrack(t: any) {
    if (!t.preview_url) {
      console.log('no audio', t);
    }

    // TODO: preview_url can be null
    // either visual indication there is no preview, or filter these results
    const preview = new Audio(t.preview_url);

    preview.addEventListener('ended', () => setPreview(undefined));

    return {
      artists: t.artists.map((a: Artist) => {
        return {
          id: a.id,
          name: a.name,
        };
      }),
      genres: t.album.genres ?? [],
      href: t.external_urls.spotify,
      id: t.id,
      image: t.album.images[0].url,
      name: t.name,
      preview: preview,
      preview_url: t.preview_url,
      seconds: Math.round(t.duration_ms / 1000),
    } as Track;
  }

  function getTrack(id: string) {
    fetch(`https://api.spotify.com/v1/tracks/${id}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
      method: 'GET',
    }).then(async res => {
      if (res.status !== 200) {
        throw res.text();
      }

      const t = await res.json();
      const track = parseTrack(t);

      setTracks(prev => {
        const newTracks = [...prev];

        newTracks.push(track);

        return newTracks;
      });

      console.log(t, track);
    }).catch(async err => {
      console.error(JSON.parse(await err)?.error);
    });
  }

  function getRecommendation() {
    const latestTrack = tracks[tracks.length - 1];

    fetch(`https://api.spotify.com/v1/recommendations?${new URLSearchParams({
      limit: '7',
      // TODO: use the market of the user logged in
      market: 'US',
      seed_artists: latestTrack.artists.map(a => a.id).slice(0, 5).join(','),
      seed_genres: latestTrack.genres.slice(0, 5).join(','),
      seed_tracks: latestTrack.id,
    })}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
      method: 'GET',
    }).then(async res => {
      if (res.status !== 200) {
        throw res.text();
      }

      const r = await res.json();
      const tracks = r.tracks.map((t: any) => parseTrack(t));

      setRecommendations(tracks);

      console.log(tracks);
    }).catch(async err => {
      console.error(JSON.parse(await err)?.error);
    });
  }

  function save() {
    // create playlist
    // add all tracks to the playlist
    // TODO: limit playlist to max 100 songs so i can always make one request here
  }

  if (tracks.length === 0) {
    return (
      <div className='flex flex-col items-center text-center gap-4 p-4 h-full w-full justify-center inset-0 fixed'>
        <span className='text-3xl'>Paste a track ID to start off your set</span>
        <input
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
        </button>
      </div>
    );
  }

  return (
    <div className='flex inset-0 fixed p-3'>
      <div className='w-96 bg-neutral-800 rounded-md flex flex-col p-3 gap-3 overflow-y-scroll items-center'>
        {tracks.map((track, trackIndex) => (
          <div className='flex items-center w-full' key={track.id}>
            <FormattedTrack track={track} />
            <div className='transition cursor-pointer hover:scale-125 hover:text-red-500 mx-2' onClick={() => {
              setTracks(prevTracks => {
                const newTracks = [...prevTracks];

                newTracks.splice(trackIndex, 1);

                console.log(prevTracks.map(t => t.name), newTracks.map(t => t.name));

                return newTracks;
              });
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </div>
        ))}
        <button
          className='bg-green-500 disabled:invisible text-black px-4 py-2 text-2xl rounded-2xl'
          onClick={save}
        >
          Save
        </button>
      </div>
      <div className='grow flex flex-col text-center items-center gap-4 truncate'>
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
          className='bg-green-500 disabled:invisible text-black px-4 py-2 text-2xl rounded-2xl'
          onClick={getRecommendation}
        >
          Recommend
        </button>
      </div>
    </div>
  );
}
