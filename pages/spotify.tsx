import classNames from 'classnames';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
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
  const myTracksOffset = useRef(0);
  const [playlist, setPlaylist] = useState<Track[]>([]);
  const [preview, setPreview] = useState<HTMLAudioElement>();
  const [recommendations, setRecommendations] = useState<Track[]>([]);
  const router = useRouter();
  const [user, setUser] = useState<User>();

  async function loadMyTracks() {
    const tracksRes = await spotifyFetch(`https://api.spotify.com/v1/me/tracks?${new URLSearchParams({
      limit: String(limit),
      offset: String(myTracksOffset.current),
    })}`, {
      method: 'GET',
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const myTracks = parseTracks((await tracksRes.json()).items.map((i: any) => i.track));

    if (!myTracks.length) {
      // if there are no tracks, we have probably reached the end of the user's saved tracks
      // load again from the beginning
      myTracksOffset.current = 0;
      loadMyTracks();
    } else {
      myTracksOffset.current += limit;
      setRecommendations(myTracks);
    }
  }

  useEffect(() => {
    async function initializePageData() {
      const userRes = await spotifyFetch('https://api.spotify.com/v1/me', {
        method: 'GET',
      });

      setUser(parseUser(await userRes.json()));

      await loadMyTracks();
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

  async function getTracks() {
    setDisableGetTracks(true);

    if (playlist.length === 0) {
      await loadMyTracks();
    } else {
      // TODO: use as many latest tracks + genres as possible?
      const latestTrack = playlist[playlist.length - 1];
      const res = await spotifyFetch(`https://api.spotify.com/v1/recommendations?${new URLSearchParams({
        limit: String(limit),
        seed_artists: latestTrack.artists.map(a => a.id).slice(0, 5).join(','),
        seed_genres: latestTrack.genres.slice(0, 5).join(','),
        seed_tracks: latestTrack.id,
      })}`, {
        method: 'GET',
      });

      setRecommendations(parseTracks((await res.json()).tracks));
    }

    setDisableGetTracks(false);
  }

  async function save() {
    if (!user || !playlist.length) {
      return;
    }

    setDisableSave(true);

    const createPlaylistRes = await spotifyFetch(`https://api.spotify.com/v1/users/${user.id}/playlists`, {
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

    const spotifyPlaylist = await createPlaylistRes.json();

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

  if (!user) {
    // TODO: skeleton page before user has loaded
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
            <button
              className='bg-green-500 disabled:bg-neutral-500 text-black p-3 text-2xl rounded-full enabled:hover:bg-green-300 transition'
              disabled={disableGetTracks}
              onClick={() => getTracks()}
            >
              {/* TODO:
              if playlist is empty:
              - left/right arrow for getting my tracks using offset
              - future: search bar to find any song
              otherwise:
              - search icon
              - add parameters for recommendations
              */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
            </button>
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
          {/* <span className='text-4xl font-medium'>What do you want next?</span> */}
          <div className='grow flex flex-col items-center text-center w-full overflow-y-scroll p-2'>
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
