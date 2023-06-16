import { GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import FeatureControlComponent, { FeatureControl, FeatureControlValue } from '../components/rabbit/featureControl';
import FormattedTrack from '../components/rabbit/formattedTrack';
import FormattedUser from '../components/rabbit/formattedUser';
import { RabbitContext } from '../contexts/rabbitContext';
import { loadTokens, redirectToAuthCodeFlow, removeTokens, spotifyFetch } from '../helpers/authCodeWithPkce';
import { parseTracks, parseUser, Track, User } from '../helpers/spotifyParsers';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      code: context.query.code ?? null,
    } as RabbitProps,
  };
}

interface RabbitProps {
  code: string | undefined;
}

export default function Rabbit({ code }: RabbitProps) {
  const [disableGetTracks, setDisableGetTracks] = useState(false);
  const [featureControls, setFeatureControls] = useState<FeatureControl[]>([
    { key: 'danceability', value: FeatureControlValue.NONE },
    { key: 'energy', value: FeatureControlValue.NONE },
    { key: 'loudness', value: FeatureControlValue.NONE },
    { key: 'tempo', value: FeatureControlValue.NONE },
    { key: 'valence', value: FeatureControlValue.NONE },
  ]);
  const limit = 20;
  const [savingTrackId, setSavingTrackId] = useState<string>();
  const [myTracksPage, setMyTracksPage] = useState(0);
  const [previewTrack, setPreviewTrack] = useState<Track>();
  const [recommendations, setRecommendations] = useState<Track[]>([]);
  const router = useRouter();
  const [showMyTracks, setShowMyTracks] = useState(true);
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
    const myTracks = await parseTracks(tracks.items.map((i: any) => i.track));

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
    router.push('/rabbit', undefined, { shallow: true });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function logOut() {
    removeTokens();
    router.push('/');
  }

  async function getRecommendations() {
    if (!previewTrack) {
      return;
    }

    setDisableGetTracks(true);

    const features: Record<string, string> = {};

    featureControls.forEach(f => {
      if (f.value === FeatureControlValue.UP) {
        features[`min_${f.key}`] = previewTrack.features[f.key];
      } else if (f.value === FeatureControlValue.DOWN) {
        features[`max_${f.key}`] = previewTrack.features[f.key];
      }
    });

    const recommendations = await spotifyFetch(`https://api.spotify.com/v1/recommendations?${new URLSearchParams({
      limit: String(limit),
      seed_artists: previewTrack.artists.map(a => a.id).slice(0, 5).join(','),
      seed_genres: previewTrack.genres.slice(0, 5).join(','),
      seed_tracks: previewTrack.id,
      ...features,
    })}`, {
      method: 'GET',
    });

    const newRecommnedations = await parseTracks(recommendations?.tracks);

    newRecommnedations.unshift({ ...previewTrack });

    setRecommendations(newRecommnedations);
    setDisableGetTracks(false);
    setShowMyTracks(false);
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
        <Image alt='loading' src='/rabbit/puff.svg' width='48' height='48' />
      </div>
    );
  }

  async function saveTrack(track: Track) {
    setSavingTrackId(track.id);

    await spotifyFetch(`https://api.spotify.com/v1/me/tracks?${new URLSearchParams({
      ids: track.id,
    })}`, {
      method: track.saved ? 'DELETE' : 'PUT',
    });

    if (track.id === previewTrack?.id) {
      setPreviewTrack(prevTrack => {
        const newTrack = { ...prevTrack } as Track;

        newTrack.saved = !newTrack.saved;

        return newTrack;
      });
    }

    const index = recommendations.findIndex(t => t.id === track.id);

    if (index !== -1) {
      setRecommendations(prevTracks => {
        const newTracks = [...prevTracks];

        newTracks[index].saved = !newTracks[index].saved;

        return newTracks;
      });
    }

    setSavingTrackId(undefined);
  }

  return (
    <RabbitContext.Provider value={{
      previewTrack: previewTrack,
      saveTrack: saveTrack,
      savingTrackId: savingTrackId,
      setPreviewTrack: setPreviewTrack,
    }}>
      <div className='flex inset-0 fixed select-none'>
        <div className='grow flex flex-col text-center items-center truncate'>
          <div className='w-full flex p-3 gap-3'>
            <div className='flex flex-col gap-2 grow'>
              <div className='flex gap-3 items-center' key='recommendations-controls'>
                <button
                  className='bg-green-500 disabled:bg-neutral-500 text-black p-3 text-2xl rounded-full enabled:hover:bg-green-300 transition'
                  disabled={disableGetTracks || !previewTrack}
                  onClick={async () => await getRecommendations()}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                </button>
                {featureControls.map(featureControl => (
                  <FeatureControlComponent
                    featureControl={featureControl}
                    key={featureControl.key}
                    rotateValue={() => setFeatureControls(prevFeatureControls => {
                      const newFeatureControls = [...prevFeatureControls];

                      const featureControlToRotate = newFeatureControls.find(f => f.key === featureControl.key);

                      if (featureControlToRotate) {
                        featureControlToRotate.value = (featureControlToRotate.value + 1) % 3;
                      }

                      return newFeatureControls;
                    })}
                    track={previewTrack}
                  />
                ))}
              </div>
              {/* } */}
            </div>
            <div className='flex truncate h-min'>
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
          <div className='flex justify-center w-full px-2 pb-2'>
            {!previewTrack ?
              <span className='flex items-center justify-center w-full border border-neutral-700 rounded-md text-lg h-16'>
                Select a track to begin
              </span>
              :
              <div className='flex items-center w-full border border-neutral-700 hover:bg-neutral-700 transition py-1 pr-4 pl-2 gap-4 rounded-md h-16'>
                <FormattedTrack track={previewTrack} />
              </div>
            }
          </div>
          <div className='grow flex flex-col items-center text-center w-full overflow-y-scroll px-2 pb-2'>
            {recommendations.map(track => (
              <div className='w-full hover:bg-neutral-700 transition py-1 pr-4 pl-2 rounded-md' key={`recommended-track-${track.id}`}>
                <FormattedTrack track={track} />
              </div>
            ))}
            {showMyTracks &&
              <div className='flex gap-3 mt-2' key='my-tracks-controls'>
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
            }
          </div>
        </div>
      </div>
    </RabbitContext.Provider>
  );
}
