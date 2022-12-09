import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import MusicCard, { ReleaseType } from '../components/musicCard';

export default function Home() {
  return (<>
    <Head>
      <title>sspenst</title>
    </Head>
    <div className='flex fixed inset-0 items-center justify-center text-center font-semibold text-7xl animateName'>
      <div className='flex flex-row w-48'>
        <Image alt='ss' src='/ss.png' width={512} height={512} />
      </div>
    </div>
    <div className='flex flex-col items-center justify-center w-full px-8 py-12 gap-12 text-xl animateMain'>
      <h1 className='font-semibold text-5xl text-center'>
        Spencer Spenst
      </h1>
      <div className='flex flex-row flex-wrap justify-center gap-8'>
        <Link href='https://linkedin.com/in/sspenst' className='hover:underline flex flex-row gap-3 items-center flex flex-row gap-3 items-center'>
          <Image alt='linkedin' src='/linkedin.svg' width='32' height='32' className='w-8' />
          LinkedIn
        </Link>
        <Link href='https://github.com/sspenst' className='hover:underline flex flex-row gap-3 items-center'>
          <Image alt='github' src='/github.svg' width='32' height='32' className='w-8' />
          GitHub
        </Link>
        <a href='mailto:spencerspenst@gmail.com' className='hover:underline flex flex-row gap-3 items-center'>
          <Image alt='github' src='/mail.svg' width='32' height='32' className='w-8' />
          Email
        </a>
      </div>
      <div className='flex flex-row w-full max-w-screen-sm'>
        <div className='w-11 flex justify-center' style={{
          minWidth: '2.75rem',
        }}>
          <div className='w-0.5 rounded bg-neutral-700 h-full' />
        </div>
        <div className='grow flex flex-col my-1 gap-6'>
          <div className='flex flex-row items-center gap-3 text-base text-neutral-400 -ml-8'>
            <Image alt='timeline' src='/timeline.svg' width='32' height='32' className='w-5 h-5 bg-neutral-900' />
            Jan 2022 - Present
          </div>
          <Link href='https://pathology.gg' className='hover:underline flex flex-row gap-3 items-center text-2xl font-medium w-fit'>
            <Image alt='pathology' src='/pathology.svg' width='32' height='32' className='w-8' style={{
              minWidth: '2rem',
            }} />
            Pathology
          </Link>
          <div className='flex flex-row items-center gap-3 text-base text-neutral-400 -ml-8'>
            <Image alt='timeline' src='/timeline.svg' width='32' height='32' className='w-5 h-5 bg-neutral-900' />
            Aug 2018 - Jun 2021
          </div>
          <Link href='https://microsoft.com' className='hover:underline flex flex-row gap-3 items-center text-2xl font-medium w-fit'>
            <Image alt='microsoft' src='/microsoft.svg' width='32' height='32' className='w-8' />
            Microsoft
          </Link>
          <div className='flex flex-row items-center gap-3 text-base text-neutral-400 -ml-8'>
            <Image alt='timeline' src='/timeline.svg' width='32' height='32' className='w-5 h-5 bg-neutral-900' />
            May 2018 - Graduated UBC - BASc in Computer Engineering
          </div>
          <div className='flex flex-row items-center gap-3 text-base text-neutral-400 -ml-8'>
            <Image alt='timeline' src='/timeline.svg' width='32' height='32' className='w-5 h-5 bg-neutral-900' />
            May 2017 - Aug 2017
          </div>
          <Link href='https://microsoft.com' className='hover:underline flex flex-row gap-3 items-center text-2xl font-medium w-fit'>
            <Image alt='microsoft' src='/microsoft.svg' width='32' height='32' className='w-8' />
            Microsoft
          </Link>
          <div className='flex flex-row items-center gap-3 text-base text-neutral-400 -ml-8'>
            <Image alt='timeline' src='/timeline.svg' width='32' height='32' className='w-5 h-5 bg-neutral-900' />
            Sep 2016 - Dec 2016
          </div>
          <Link href='https://ubc.ca' className='hover:underline flex flex-row gap-3 items-center text-2xl font-medium w-fit'>
            <Image alt='ubc' src='/ubc.png' width='2400' height='2400' className='w-8 bg-white' />
            UBC
          </Link>
          <div className='flex flex-row items-center gap-3 text-base text-neutral-400 -ml-8'>
            <Image alt='timeline' src='/timeline.svg' width='32' height='32' className='w-5 h-5 bg-neutral-900' />
            May 2016 - Aug 2016
          </div>
          <Link href='https://ubc.ca' className='hover:underline flex flex-row gap-3 items-center text-2xl font-medium w-fit'>
            <Image alt='ubc' src='/ubc.png' width='2400' height='2400' className='w-8 bg-white' />
            UBC
          </Link>
          <div className='flex flex-row items-center gap-3 text-base text-neutral-400 -ml-8'>
            <Image alt='timeline' src='/timeline.svg' width='32' height='32' className='w-5 h-5 bg-neutral-900' />
            Sep 2014 - Entered UBC
          </div>
        </div>
      </div>
      <h2 className='font-medium text-4xl'>
        Music
      </h2>
      <div className='flex flex-row flex-wrap justify-center gap-8'>
        <Link href='https://soundcloud.com/sspenst' className='hover:underline flex flex-row gap-3 items-center'>
          <Image alt='soundcloud' src='/soundcloud.svg' width='32' height='32' className='w-8' />
          SoundCloud
        </Link>
        <Link href='https://open.spotify.com/artist/7yWCWPWpYoj22kUps71yey?si=24Yjcju9Qi6J4sri7XkSZw' className='hover:underline flex flex-row gap-3 items-center'>
          <Image alt='spotify' src='/spotify.svg' width='32' height='32' className='w-8' />
          Spotify
        </Link>
        <Link href='https://music.apple.com/us/artist/sspenst/1592620337' className='hover:underline flex flex-row gap-3 items-center'>
          <Image alt='music' src='/music.svg' width='32' height='32' className='w-8' />
            Apple Music
        </Link>
      </div>
      <div className='flex flex-wrap justify-center gap-16 mx-8'>
        <MusicCard
          name='turbine'
          releaseType={ReleaseType.Single}
          size={1080}
          src='/turbine.png'
          year={2022}
        />
        <MusicCard
          name='re'
          releaseType={ReleaseType.EP}
          size={3000}
          src='/re.png'
          year={2021}
        />
      </div>
    </div>
  </>);
}
