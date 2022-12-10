import Image from 'next/image';
import React from 'react';
import MusicCard from '../components/musicCard';
import Page from '../components/page';

export default function Music() {
  return (
    <Page>
      <div className='flex flex-row flex-wrap justify-center gap-6 text-lg -my-2'>
        <a target='_blank' rel='noreferrer' href='https://soundcloud.com/sspenst' className='hover:underline flex flex-row gap-3 items-center'>
          <Image alt='soundcloud' src='/soundcloud.svg' width='32' height='32' className='w-6' />
          SoundCloud
        </a>
        <a target='_blank' rel='noreferrer' href='https://open.spotify.com/artist/7yWCWPWpYoj22kUps71yey?si=24Yjcju9Qi6J4sri7XkSZw' className='hover:underline flex flex-row gap-3 items-center'>
          <Image alt='spotify' src='/spotify.svg' width='32' height='32' className='w-6' />
          Spotify
        </a>
        <a target='_blank' rel='noreferrer' href='https://music.apple.com/us/artist/sspenst/1592620337' className='hover:underline flex flex-row gap-3 items-center'>
          <Image alt='music' src='/music.svg' width='32' height='32' className='w-6' />
            Apple Music
        </a>
      </div>
      <div className='flex flex-row'>
        <div className='w-11 flex justify-center' style={{
          minWidth: '2.75rem',
        }}>
          <div className='w-0.5 rounded bg-neutral-700 h-full' />
        </div>
        <div className='grow flex flex-col my-1 gap-4'>
          <div className='flex flex-row items-center gap-3 text-base text-neutral-400 -ml-8'>
            <Image alt='timeline' src='/timeline.svg' width='32' height='32' className='w-5 h-5 bg-neutral-900' />
            2022
          </div>
          <MusicCard
            description='Single - 1:52'
            hrefAppleMusic='https://music.apple.com/us/album/turbine/1652622865?i=1652622866'
            hrefSoundCloud='https://soundcloud.com/sspenst/turbine'
            hrefSpotify='https://open.spotify.com/track/36svwtlEoExlHUPJnhk9TG?si=00111c0436c040c2'
            title='turbine'
          />
          <div className='flex flex-row items-center gap-3 text-base text-neutral-400 -ml-8'>
            <Image alt='timeline' src='/timeline.svg' width='32' height='32' className='w-5 h-5 bg-neutral-900' />
            2021
          </div>
          <MusicCard
            description='EP - 7:11'
            hrefAppleMusic='https://music.apple.com/us/album/re-ep/1592628164'
            hrefSoundCloud='https://soundcloud.com/sspenst/sets/re_ep'
            hrefSpotify='https://open.spotify.com/album/3NQEsxiwMrpQF1pN9w7XbR?si=XqMIqu-1SEu6yHxrrNL4DQ'
            title='re'
          />
        </div>
      </div>
    </Page>
  );
}
