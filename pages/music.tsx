import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Page from '../components/page';

export default function Music() {
  return (<>
    <Head>
      <title>Spencer Spenst - Music</title>
    </Head>
    <Page>
      <div className='flex flex-row flex-wrap justify-center gap-6 text-lg -my-2'>
        <Link href='https://soundcloud.com/sspenst' className='hover:underline flex flex-row gap-3 items-center'>
          <Image alt='soundcloud' src='/soundcloud.svg' width='32' height='32' className='w-6' />
          SoundCloud
        </Link>
        <Link href='https://open.spotify.com/artist/7yWCWPWpYoj22kUps71yey?si=24Yjcju9Qi6J4sri7XkSZw' className='hover:underline flex flex-row gap-3 items-center'>
          <Image alt='spotify' src='/spotify.svg' width='32' height='32' className='w-6' />
          Spotify
        </Link>
        <Link href='https://music.apple.com/us/artist/sspenst/1592620337' className='hover:underline flex flex-row gap-3 items-center'>
          <Image alt='music' src='/music.svg' width='32' height='32' className='w-6' />
            Apple Music
        </Link>
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
          <div className='flex flex-row flex-wrap gap-4'>
            <Image alt='turbine' src='/turbine.png' width={1080} height={1080} className='rounded-lg shadow-lg w-48 h-48' style={{
              minWidth: '12rem',
            }} />
            <div className='flex flex-col max-w-full gap-2'>
              <div className='text-3xl font-medium'>
                turbine
              </div>
              <div className='text-neutral-400 text-sm'>
                Single - 1:52
              </div>
              <div className='flex flex-row gap-2'>
                <a target='_blank' rel='noreferrer' href='https://soundcloud.com/sspenst/turbine' className='w-fit'>
                  <Image alt='soundcloud' src='/soundcloud.svg' width='32' height='32' className='w-6' />
                </a>
                <a target='_blank' rel='noreferrer' href='https://open.spotify.com/track/36svwtlEoExlHUPJnhk9TG?si=00111c0436c040c2' className='w-fit'>
                  <Image alt='spotify' src='/spotify.svg' width='32' height='32' className='w-6' />
                </a>
                <a target='_blank' rel='noreferrer' href='https://music.apple.com/us/album/turbine/1652622865?i=1652622866' className='w-fit'>
                  <Image alt='music' src='/music.svg' width='32' height='32' className='w-6' />
                </a>
              </div>
            </div>
          </div>
          <div className='flex flex-row items-center gap-3 text-base text-neutral-400 -ml-8'>
            <Image alt='timeline' src='/timeline.svg' width='32' height='32' className='w-5 h-5 bg-neutral-900' />
            2021
          </div>
          <div className='flex flex-row flex-wrap gap-4'>
            <Image alt='re' src='/re.png' width={3000} height={3000} className='rounded-lg shadow-lg w-48 h-48' />
            <div className='flex flex-col max-w-full gap-2'>
              <div className='text-3xl font-medium'>
                re
              </div>
              <div className='text-neutral-400 text-sm'>
                EP - 7:11
              </div>
              <div className='flex flex-row gap-2'>
                <a target='_blank' rel='noreferrer' href='https://soundcloud.com/sspenst/sets/re_ep' className='w-fit'>
                  <Image alt='soundcloud' src='/soundcloud.svg' width='32' height='32' className='w-6' />
                </a>
                <a target='_blank' rel='noreferrer' href='https://open.spotify.com/album/3NQEsxiwMrpQF1pN9w7XbR?si=XqMIqu-1SEu6yHxrrNL4DQ' className='w-fit'>
                  <Image alt='spotify' src='/spotify.svg' width='32' height='32' className='w-6' />
                </a>
                <a target='_blank' rel='noreferrer' href='https://music.apple.com/us/album/re-ep/1592628164' className='w-fit'>
                  <Image alt='music' src='/music.svg' width='32' height='32' className='w-6' />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  </>);
}
