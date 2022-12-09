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
    <div className='flex flex-col items-center justify-center w-full p-12 gap-12 text-xl animateMain'>
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
      <h2 className='font-medium text-4xl'>
        Experience
      </h2>
      <div className='flex flex-col gap-4'>
        <Link href='https://pathology.gg' className='hover:underline flex flex-row gap-3 items-center text-2xl font-medium'>
          <Image alt='pathology' src='/pathology.svg' width='32' height='32' className='w-8' />
          Pathology
        </Link>
        <Link href='https://microsoft.com' className='hover:underline flex flex-row gap-3 items-center text-2xl font-medium'>
          <Image alt='microsoft' src='/microsoft.svg' width='32' height='32' className='w-8' />
          Microsoft
        </Link>
        <Link href='https://ubc.ca' className='hover:underline flex flex-row gap-3 items-center text-2xl font-medium'>
          <Image alt='ubc' src='/ubc.png' width='2400' height='2400' className='w-8 bg-white rounded-sm' />
          UBC
        </Link>
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
