import classNames from 'classnames';
import { GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import FormattedTrack from '../components/spotifyRabbit/formattedTrack';
import FormattedUser from '../components/spotifyRabbit/formattedUser';
import { SpotifyRabbitContext } from '../contexts/spotifyRabbitContext';
import { loadTokens, redirectToAuthCodeFlow, removeTokens, spotifyFetch } from '../helpers/authCodeWithPkce';
import { parseTracks, parseUser, Track, User } from '../helpers/spotifyParsers';

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
  const [disableGetTracks, setDisableGetTracks] = useState(false);
  const [disableSave, setDisableSave] = useState(false);
  const limit = 20;
  const [myTracksPage, setMyTracksPage] = useState(0);
  const [playlist, setPlaylist] = useState<Track[]>([]);
  const [preview, setPreview] = useState<HTMLAudioElement>();
  const [recommendations, setRecommendations] = useState<Track[]>([]);
  const router = useRouter();
  const [user, setUser] = useState<User | null>();

  async function loadMyTracks(page: number) {
    setDisableGetTracks(true);

    const tracks = await spotifyFetch(`https://api.spotify.com/v1/me/tracks?${new URLSearchParams({
      limit: String(limit),
      offset: String(page * limit),
    })}`, {
      method: 'GET',
    });

    if (!tracks) {
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const myTracks = parseTracks(tracks.items.map((i: any) => i.track));

    if (!myTracks.length) {
      // if there are no tracks, we have probably reached the end of the user's saved tracks
      // load again from the beginning
      loadMyTracks(0);
    } else {
      setMyTracksPage(page);
      setRecommendations(myTracks);
      setDisableGetTracks(false);
    }
  }

  useEffect(() => {
    async function initializePageData() {
      const user = await spotifyFetch('https://api.spotify.com/v1/me', {
        method: 'GET',
      });

      setUser(parseUser(user));

      await loadMyTracks(0);
    }

    // use existing accessToken if we have it, otherwise normal auth flow
    if (localStorage.getItem('accessToken')) {
      initializePageData();
    } else if (!code) {
      redirectToAuthCodeFlow();
    } else {
      loadTokens(code).then(async () => await initializePageData());
    }

    // remove code from the url query for clean aesthetic
    router.push('/spotify', undefined, { shallow: true });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function logOut() {
    removeTokens();
    router.push('/');
  }

  async function getRecommendations() {
    setDisableGetTracks(true);

    // TODO: use as many latest tracks + genres as possible?
    const latestTrack = playlist[playlist.length - 1];
    const recommendations = await spotifyFetch(`https://api.spotify.com/v1/recommendations?${new URLSearchParams({
      limit: String(limit),
      seed_artists: latestTrack.artists.map(a => a.id).slice(0, 5).join(','),
      seed_genres: latestTrack.genres.slice(0, 5).join(','),
      seed_tracks: latestTrack.id,
    })}`, {
      method: 'GET',
    });

    setRecommendations(parseTracks(recommendations?.tracks));
    setDisableGetTracks(false);
  }

  async function save() {
    if (!user || !playlist.length) {
      return;
    }

    setDisableSave(true);

    const spotifyPlaylist = await spotifyFetch(`https://api.spotify.com/v1/users/${user.id}/playlists`, {
      body: JSON.stringify({
        description: 'Playlist created with Set Builder',
        name: `Set Builder - ${playlist[0].name}`,
        public: false,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    if (!spotifyPlaylist) {
      setDisableSave(false);

      return;
    }

    // add all tracks to the playlist
    // TODO: loop through if above POST limit (100 per call)

    await spotifyFetch(`https://api.spotify.com/v1/playlists/${spotifyPlaylist.id}/tracks`, {
      body: JSON.stringify({
        position: 0,
        uris: playlist.map(t => t.uri),
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    setDisableSave(false);
  }

  if (user === null) {
    return (
      <div className='flex inset-0 fixed text-center text-lg items-center p-4'>
        <p className='w-full'>
          {'An unexpected error occurred! Try '}
          <button
            className='text-blue-300'
            onClick={logOut}
          >
            logging out
          </button>
          {' or '}
          <a
            className='text-blue-300'
            href='mailto:spencerspenst@gmail.com'
            rel='noreferrer'
            target='_blank'
          >
            contact me
          </a>
          {' if you are still having issues.'}
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className='flex inset-0 fixed justify-center items-center'>
        <Image alt='loading' src='/setBuilder/puff.svg' width='48' height='48' />
      </div>
    );
  }

  return (
    <SpotifyRabbitContext.Provider value={{
      preview: preview,
      setPreview: setPreview,
    }}>
      <div className='flex inset-0 fixed select-none'>
        {playlist.length > 0 &&
          <div className='flex flex-col my-3 ml-3 gap-3'>
            <div className='grow w-96 bg-neutral-800 rounded-md flex flex-col p-2 overflow-y-scroll items-center'>
              {playlist.map((track, trackIndex) => (
                <div className='flex items-center w-full hover:bg-neutral-700 transition py-1 pr-4 pl-2 gap-4 rounded-md' key={`track-${trackIndex}`}>
                  <FormattedTrack track={track} />
                  <div className={classNames('transition cursor-pointer hover:scale-125 hover:text-red-500')} onClick={() => {
                    setPlaylist(prevTracks => {
                      const newTracks = [...prevTracks];

                      newTracks.splice(trackIndex, 1);

                      return newTracks;
                    });
                  }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
            <button
              className='bg-green-500 disabled:bg-neutral-500 text-black px-4 py-2 text-2xl rounded-full hover:bg-green-300 transition'
              disabled={disableSave}
              onClick={save}
            >
              Save
            </button>
          </div>
        }
        <div className='grow flex flex-col text-center items-center truncate'>
          <div className='w-full flex justify-between p-3 gap-3'>
            {!playlist.length ?
              <div className='flex gap-3' key='my-tracks-controls'>
                <button
                  className='bg-green-500 disabled:bg-neutral-500 text-black p-3 text-2xl rounded-full enabled:hover:bg-green-300 transition'
                  disabled={disableGetTracks || !myTracksPage}
                  onClick={async () => {
                    await loadMyTracks(myTracksPage - 1);
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                  </svg>
                </button>
                <button
                  className='bg-green-500 disabled:bg-neutral-500 text-black p-3 text-2xl rounded-full enabled:hover:bg-green-300 transition'
                  disabled={disableGetTracks}
                  onClick={async () => {
                    await loadMyTracks(myTracksPage + 1);
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </button>
              </div>
              :
              <div className='flex gap-3' key='recommendations-controls'>
                <button
                  className='bg-green-500 disabled:bg-neutral-500 text-black p-3 text-2xl rounded-full enabled:hover:bg-green-300 transition'
                  disabled={disableGetTracks}
                  onClick={async () => await getRecommendations()}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                </button>
                {/* TODO: add parameters for recommendations */}
              </div>
            }
            <div className='flex truncate'>
              <FormattedUser user={user} />
              <button
                className='text-neutral-400 p-3 text-2xl rounded-full hover:bg-neutral-700 transition'
                onClick={() => logOut()}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                </svg>
              </button>
            </div>
          </div>
          <div className='grow flex flex-col items-center text-center w-full overflow-y-scroll px-2 pb-2'>
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
            {recommendations.map(track => (
              <div className='flex items-center w-full hover:bg-neutral-700 transition py-1 px-4 gap-4 rounded-md' key={`recommended-track-${track.id}`}>
                <div className='transition cursor-pointer hover:scale-125 hover:text-green-500' onClick={() => {
                  setPlaylist(prevTracks => {
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
            ))}
          </div>
        </div>
      </div>
    </SpotifyRabbitContext.Provider>
  );
}
