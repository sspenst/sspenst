/* eslint-disable sort-keys */
import { Dialog, Transition } from '@headlessui/react';
import classNames from 'classnames';
import Image from 'next/image';
import React, { Fragment, JSX, useState } from 'react';

function formatDurationMs(ms: number) {
  const seconds = Math.round(ms / 1000);
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;

  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

function TrackInfo() {
  return (
    <button className='flex gap-4 w-full items-center cursor-pointer truncate select-none' onClick={() => {
      // pause if the track has no preview or is already playing
    }}>
      <Image
        alt={'Changes. by chromnicci'}
        className='w-12 h-12'
        height={48}
        src={'https://i.scdn.co/image/ab67616d00001e02593be1b8d000e3e8ffcdd1ef'}
        style={{
          minWidth: '3rem',
        }}
        width={48}
      />
      <div className='grow flex flex-col gap-1 truncate text-left'>
        <div className='flex items-center gap-2'>
          <span title={'Changes.'}>
            {'Changes.'}
          </span>
        </div>
        <span className='flex text-neutral-600 dark:text-neutral-400 text-sm items-center gap-2'>
          <span className='truncate' title={'Chromonicci'}>
            {'Chromonicci'}
          </span>
        </span>
      </div>
      <span className='hidden sm:block text-neutral-600 dark:text-neutral-400 ml-4 text-sm'>
        {formatDurationMs(155001)}
      </span>
    </button>
  );
}

interface TrackComponentProps {
  saved: boolean;
  setSaved: (saved: boolean) => void;
}

function TrackComponent({ saved, setSaved }: TrackComponentProps){
  return (
    <div className='flex gap-4 grow items-center truncate'>
      <TrackInfo />
      <button
        aria-label={'add to liked songs'}
        className={classNames('disabled:text-green-600', saved ?
          'text-green-500 hover:text-green-300' :
          'text-neutral-500 hover:text-black dark:hover:text-white'
        )}
        onClick={() => setSaved(!saved)}
      >
        {saved ?
          <svg width='24' height='24' viewBox='0 0 150 150' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='M125.784 35.0369C113.039 22.2916 92.9859 21.3682 79.1227 32.8994C79.1062 32.9135 77.318 34.3807 75 34.3807C72.6234 34.3807 70.9266 32.9416 70.8609 32.8853C57.0141 21.3682 36.9609 22.2916 24.2156 35.0369C17.6695 41.583 14.0625 50.2877 14.0625 59.5478C14.0625 68.808 17.6695 77.5127 24.0914 83.9228L64.3078 131.006C66.9844 134.14 70.882 135.938 75 135.938C79.1203 135.938 83.0156 134.14 85.6922 131.009L125.782 84.0611C139.301 70.5447 139.301 48.5533 125.784 35.0369Z' fill='currentColor' />
          </svg>
          :
          <svg width='24' height='24' viewBox='0 0 150 150' fill='none' strokeWidth='6' stroke='currentColor' xmlns='http://www.w3.org/2000/svg'>
            <path d='M125.784 35.0369C113.039 22.2916 92.9859 21.3682 79.1227 32.8994C79.1062 32.9135 77.318 34.3807 75 34.3807C72.6234 34.3807 70.9266 32.9416 70.8609 32.8853C57.0141 21.3682 36.9609 22.2916 24.2156 35.0369C17.6695 41.583 14.0625 50.2877 14.0625 59.5478C14.0625 68.808 17.6695 77.5127 24.0914 83.9228L64.3078 131.006C66.9844 134.14 70.882 135.938 75 135.938C79.1203 135.938 83.0156 134.14 85.6922 131.009L125.782 84.0611C139.301 70.5447 139.301 48.5533 125.784 35.0369ZM122.346 80.8807L82.1297 127.964C80.3461 130.05 77.7469 131.25 75 131.25C72.2531 131.25 69.6562 130.053 67.8703 127.964L27.532 80.7447C21.8695 75.0822 18.75 67.5541 18.75 59.5478C18.75 51.5392 21.8695 44.0135 27.5297 38.351C33.3961 32.4822 41.0555 29.5127 48.7336 29.5127C55.4742 29.5127 62.2289 31.8025 67.7977 36.4338C68.0977 36.7033 70.8586 39.0682 75 39.0682C79.0266 39.0682 81.8578 36.7314 82.1367 36.49C94.1109 26.5291 111.45 27.3307 122.47 38.351C134.159 50.0393 134.159 69.0564 122.346 80.8807Z' />
          </svg>
        }
      </button>
      <a
        aria-label='listen on Spotify'
        className='font-bold text-lg w-fit hover:underline text-neutral-500 hover:text-black dark:hover:text-white'
        href={'https://open.spotify.com/track/05hEXDGG1iIXYRwH5qvyuz'}
        rel='noreferrer'
        target='_blank'
      >
        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-5 h-5'>
          <path strokeLinecap='round' strokeLinejoin='round' d='M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25' />
        </svg>
      </a>
    </div>
  );
}

enum AudioFeatureState {
  NONE,
  UP,
  DOWN,
}

interface AudioFeature {
  property: string;
  state: AudioFeatureState;
}
interface AudioFeatureComponentProps {
  audioFeature: AudioFeature;
  onClick: () => void;
}
interface AudioFeatures {
  danceability: number;
  energy: number;
  key: number;
  loudness: number;
  mode: number;
  speechiness: number;
  acousticness: number;
  instrumentalness: number;
  liveness: number;
  valence: number;
  tempo: number;
  type: string;
  id: string;
  uri: string;
  track_href: string;
  analysis_url: string;
  duration_ms: number;
  time_signature: number;
}
interface AudioFeatureInfo {
  description: string;
  svg: JSX.Element;
}

const audioFeatureSvgMap: Record<string, AudioFeatureInfo> = {
  'danceability': {
    description: 'How suitable a track is for dancing.',
    svg:
    <svg className='w-6 h-6' viewBox='2 2 22 22' fill='none' xmlns='http://www.w3.org/2000/svg' style={{
      minHeight: 24,
      minWidth: 24,
    }}>
      <path d='M4 12H9L12 5L14 18.5L17.5 12H21.5' stroke='currentColor' strokeWidth={1.6} strokeLinecap='round' strokeLinejoin='round' />
    </svg>,
  },

  'energy': {
    description: 'Perceptual measure of intensity and activity.',
    svg:
    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6' style={{
      minHeight: 24,
      minWidth: 24,
    }}>
      <path strokeLinecap='round' strokeLinejoin='round' d='M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z' />
    </svg>,
  },

  'instrumentalness': {
    description: 'Confidence a track contains no vocals.',
    svg:
    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 32 32' strokeWidth={1.8} stroke='currentColor' className='w-6 h-6' style={{
      minHeight: 24,
      minWidth: 24,
    }}>
      <path d='M20.4,24.8l1.5-3.9c0.4-1.1,1.3-2.1,2.4-2.7l0,0c3.2-1.7,3.7-6.1,1-8.8l-2.3-2.3c-2.7-2.7-7.1-2.2-8.8,1l0,0
    c-0.6,1.1-1.5,1.9-2.7,2.4l-3.9,1.5c-4.6,1.8-5.6,7.8-2,11.4L9,26.8C12.7,30.4,18.6,29.4,20.4,24.8z' />
      <circle cx='18.2' cy='14.3' r='2.9' />
      <line x1='9.7' y1='19.1' x2='13.4' y2='22.8' />
      <polyline points='26.3,3.5 22.9,6.9 25.6,9.6 29,6.2 ' />
    </svg>,
  },

  'loudness': {
    description: 'Overall loudness of a track in decibels.',
    svg:
    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6' style={{
      minHeight: 24,
      minWidth: 24,
    }}>
      <path strokeLinecap='round' strokeLinejoin='round' d='M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z' />
    </svg>,
  },

  'tempo': {
    description: 'Overall estimated tempo of a track in beats per minute.',
    svg:
    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6' style={{
      minHeight: 24,
      minWidth: 24,
    }}>
      <path strokeLinecap='round' strokeLinejoin='round' d='M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z' />
    </svg>,
  },

  'valence': {
    description: 'Musical positiveness conveyed by a track.',
    svg:
    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6' style={{
      minHeight: 24,
      minWidth: 24,
    }}>
      <path strokeLinecap='round' strokeLinejoin='round' d='M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z' />
    </svg>,
  },
};

function AudioFeatureStateSvg({ audioFeatureState }: { audioFeatureState: AudioFeatureState }) {
  switch (audioFeatureState) {
  case AudioFeatureState.UP:
    return (
      <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={3} stroke='currentColor' className='w-6 h-6'>
        <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18' />
      </svg>
    );
  case AudioFeatureState.DOWN:
    return (
      <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={3} stroke='currentColor' className='w-6 h-6'>
        <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3' />
      </svg>
    );
  default:
    return (
      <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={3} stroke='currentColor' className='w-6 h-6'>
        <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 12h-15' />
      </svg>
    );
  }
}

function AudioFeatureComponent({
  audioFeature,
  onClick,
}: AudioFeatureComponentProps) {
  const id = `audio-feature-${audioFeature.property}`;
  let valueStr: string | undefined = undefined;

  const audioFeatures = {
    tempo: 92,
    loudness: -10,
    danceability: 0.46,
    energy: 0.37,
    instrumentalness: 0.87,
    valence: 0.19,
  } as AudioFeatures;

  const value = audioFeatures[audioFeature.property as keyof AudioFeatures] as number;

  if (audioFeature.property === 'tempo') {
    valueStr = Math.round(value) + ' bpm';
  } else if (audioFeature.property === 'loudness') {
    valueStr = Math.round(value) + ' dB';
  } else {
    valueStr = Math.round(100 * value) + '%';
  }

  return (<>
    <button
      className={classNames(
        'flex flex-col gap-0.5 items-center p-2 text-xl rounded-md enabled:cursor-pointer transition-[background-color] enabled:hover:bg-neutral-300 dark:enabled:hover:bg-neutral-700',
        { 'text-neutral-600 dark:text-neutral-400': audioFeature.state === AudioFeatureState.NONE },
        { 'text-green-500': audioFeature.state === AudioFeatureState.UP },
        { 'text-red-500': audioFeature.state === AudioFeatureState.DOWN },
      )}
      data-tooltip-content={audioFeature.property[0].toUpperCase() + audioFeature.property.slice(1)}
      data-tooltip-id={id}
      onClick={onClick}
    >
      <div className='flex gap-2'>
        {audioFeatureSvgMap[audioFeature.property].svg}
        <AudioFeatureStateSvg audioFeatureState={audioFeature.state} />
      </div>
      <span className='text-xs'>{valueStr ?? '-'}</span>
    </button>
  </>);
}

interface ModalProps {
  audioFeatures: AudioFeature[];
  isOpen: boolean;
  onClose: () => void;
}

function HelpModal({ audioFeatures, isOpen, onClose }: ModalProps) {
  const [audioFeatureProperty, setAudioFeatureProperty] = useState('tempo');

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as='div'
        className='fixed inset-0 z-20 overflow-y-auto backdrop-blur-xs'
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-200'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0' />
        </Transition.Child>
        <div className='flex min-h-full px-4 text-center items-center justify-center'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-200'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            <Dialog.Panel className='w-full max-w-fit px-6 py-4 my-8 overflow-hidden text-left align-middle transition-all transform shadow-xl rounded-xl border border-neutral-300 dark:border-neutral-700 flex flex-col gap-4 bg-white dark:bg-black'>
              <Dialog.Title as='h3' className='text-xl font-bold text-center'>
                Help
              </Dialog.Title>
              <div className='flex flex-col gap-4'>
                <span>1. Select a track to begin</span>
                <div className='flex gap-4 w-full items-center truncate bg-neutral-100 dark:bg-neutral-900 rounded-md pl-2 pr-4 py-1 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition'>
                  <TrackInfo />
                </div>
                <span>2. Discover related tracks</span>
                <div className='bg-green-500 text-black p-3 rounded-full w-fit flex gap-2 font-medium'>
                  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='currentColor' className='w-6 h-6'>
                    <path strokeLinecap='round' strokeLinejoin='round' d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z' />
                  </svg>
                  <span className='hidden md:block pr-1'>Discover</span>
                </div>
                <span>
                  {'3. Refine your search with '}
                  <a
                    className='w-fit hover:underline mt-3'
                    href='https://developer.spotify.com/documentation/web-api/reference/get-audio-features'
                    rel='noreferrer'
                    target='_blank'
                  >
                    audio features
                  </a>
                </span>
                <div className='flex gap-1 flex-wrap'>
                  {audioFeatures.map(audioFeature => (
                    <div
                      className={classNames(
                        'bg-neutral-100 dark:bg-neutral-900 rounded-lg border-2 cursor-pointer',
                        audioFeature.property === audioFeatureProperty ? 'border-neutral-600 dark:border-neutral-400' : 'border-white dark:border-black',
                      )}
                      key={audioFeature.property}
                    >
                      <AudioFeatureComponent
                        audioFeature={audioFeature}
                        onClick={() => setAudioFeatureProperty(audioFeature.property)}
                      />
                    </div>
                  ))}
                </div>
                <div className='flex gap-2 items-center'>
                  {audioFeatureSvgMap[audioFeatureProperty].svg}
                  <div className='flex flex-col'>
                    <span className='italic font-medium'>
                      {audioFeatureProperty[0].toUpperCase() + audioFeatureProperty.slice(1)}
                    </span>
                    <span className='text-sm'>{audioFeatureSvgMap[audioFeatureProperty].description}</span>
                  </div>
                </div>
                <span>4. Save tracks you enjoy!</span>
                <div className='text-green-500'>
                  <svg width='32' height='32' viewBox='0 0 150 150' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path d='M125.784 35.0369C113.039 22.2916 92.9859 21.3682 79.1227 32.8994C79.1062 32.9135 77.318 34.3807 75 34.3807C72.6234 34.3807 70.9266 32.9416 70.8609 32.8853C57.0141 21.3682 36.9609 22.2916 24.2156 35.0369C17.6695 41.583 14.0625 50.2877 14.0625 59.5478C14.0625 68.808 17.6695 77.5127 24.0914 83.9228L64.3078 131.006C66.9844 134.14 70.882 135.938 75 135.938C79.1203 135.938 83.0156 134.14 85.6922 131.009L125.782 84.0611C139.301 70.5447 139.301 48.5533 125.784 35.0369Z' fill='currentColor' />
                  </svg>
                </div>
              </div>
              <button
                className='inline-flex justify-center px-4 py-2 mt-2 text-sm font-medium border border-transparent rounded-md bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-400 dark:hover:bg-neutral-600 transition'
                onClick={onClose}
                type='button'
              >
                Close
              </button>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

export default function Rabbit() {
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const [search, setSearch] = useState('');
  const [useInput, setUseInput] = useState(false);

  const [audioFeatures, setAudioFeatures] = useState<AudioFeature[]>([
    { property: 'tempo', state: AudioFeatureState.NONE },
    { property: 'loudness', state: AudioFeatureState.NONE },
    { property: 'danceability', state: AudioFeatureState.NONE },
    { property: 'energy', state: AudioFeatureState.NONE },
    { property: 'instrumentalness', state: AudioFeatureState.NONE },
    { property: 'valence', state: AudioFeatureState.NONE },
  ]);

  function isResetVisible() {
    return useInput || audioFeatures.some(f => f.state !== AudioFeatureState.NONE) || saved;
  }

  return (
    <div className='flex flex-col items-center gap-4 max-w-full'>
      <div className='bg-neutral-100 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 border rounded-xl p-2 flex flex-col gap-1 max-w-full' style={{
        width: 770,
      }}>
        <div className='flex justify-center w-full'>
          {useInput ?
            <input
              autoFocus
              className='w-full rounded-md h-14 bg-neutral-100 dark:bg-neutral-900 text-4xl px-3'
              onChange={e => {
                setSearch(e.target.value);
              }}
              placeholder='Search'
              type='search'
              value={search}
            />
            :
            <>
              <div className='flex items-center w-full hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-[background-color] py-1 pr-4 pl-2 gap-4 rounded-md h-14'>
                <TrackComponent saved={saved} setSaved={setSaved} />
                <button
                  aria-label='clear'
                  onClick={() => {
                    setUseInput(true);
                  }}
                >
                  <svg className='text-neutral-500 hover:text-black dark:hover:text-white w-6 h-6 -mx-1 cursor-pointer' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor'>
                    <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
                  </svg>
                </button>
              </div>
            </>
          }
        </div>
        <div className='flex w-full gap-3 px-1 items-center'>
          <div className='flex gap-1 flex-wrap grow'>
            {audioFeatures.map(audioFeature => (
              <AudioFeatureComponent
                audioFeature={audioFeature}
                key={audioFeature.property}
                onClick={() => setAudioFeatures(prevAudioFeatures => {
                  const newAudioFeatures = [...prevAudioFeatures];
                  const audioFeatureToRotate = newAudioFeatures.find(f => f.property === audioFeature.property);

                  if (audioFeatureToRotate) {
                    audioFeatureToRotate.state = (audioFeatureToRotate.state + 1) % 3;
                  }

                  return newAudioFeatures;
                })}
              />
            ))}
          </div>
          <button
            aria-label='discover'
            className='bg-green-500 disabled:bg-neutral-500 disabled:opacity-40 text-black p-3 rounded-full enabled:hover:bg-green-300 transition flex gap-2 font-medium'
            onClick={() => {
              const audioFeatureParams: Record<string, string> = {};

              audioFeatures.forEach(f => {
                if (f.state === AudioFeatureState.UP) {
                  audioFeatureParams[f.property] = 'up';
                } else if (f.state === AudioFeatureState.DOWN) {
                  audioFeatureParams[f.property] = 'down';
                }
              });
            }}
          >
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='currentColor' className='w-6 h-6'>
              <path strokeLinecap='round' strokeLinejoin='round' d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z' />
            </svg>
            <span className='hidden md:block mr-1'>Discover</span>
          </button>
          <div className='flex justify-center items-center'>
            <button
              className='text-neutral-600 dark:text-neutral-400 hover:underline text-sm'
              onClick={() => setIsHelpModalOpen(true)}
            >
              Help
            </button>
          </div>
        </div>
      </div>
      {isResetVisible() && <button className='py-1 px-3 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 transition w-fit text-neutral-700 dark:text-neutral-200' onClick={() => {
        setUseInput(false);
        setSearch('');
        setSaved(false);
        setAudioFeatures(
          [
            { property: 'tempo', state: AudioFeatureState.NONE },
            { property: 'loudness', state: AudioFeatureState.NONE },
            { property: 'danceability', state: AudioFeatureState.NONE },
            { property: 'energy', state: AudioFeatureState.NONE },
            { property: 'instrumentalness', state: AudioFeatureState.NONE },
            { property: 'valence', state: AudioFeatureState.NONE },
          ]
        );
      }}>Reset</button>}
      <HelpModal
        audioFeatures={audioFeatures}
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
      />
    </div>
  );
}
