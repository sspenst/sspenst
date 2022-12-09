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
        <div className='flex flex-row gap-3 items-center'>
          <Image alt='linkedin' src='/linkedin.svg' width='32' height='32' className='w-8' />
          <Link href='https://linkedin.com/in/sspenst' className='hover:underline'>
            LinkedIn
          </Link>
        </div>
        <div className='flex flex-row gap-3 items-center'>
          <Image alt='github' src='/github.svg' width='32' height='32' className='w-8' />
          <Link href='https://github.com/sspenst' className='hover:underline'>
            GitHub
          </Link>
        </div>
        <div className='flex flex-row gap-3 items-center'>
          <Image alt='github' src='/mail.svg' width='32' height='32' className='w-8' />
          <a href='mailto:spencerspenst@gmail.com' className='hover:underline'>Email</a>
        </div>
      </div>
      <h2 className='font-medium text-4xl'>
        Experience
      </h2>
      <div className='flex flex-col gap-4'>
        <div className='flex flex-row gap-3 items-center'>
          <Image alt='pathology' src='/pathology.svg' width='32' height='32' className='w-8' />
          <Link href='https://pathology.gg' className='hover:underline'>
            Pathology
          </Link>
        </div>
        {/* <div className='flex flex-row gap-3 items-center'>
          <Image alt='github' src='/music.svg' width='32' height='32' className='w-8' />
          <Link href='/music' className='hover:underline'>
            Music
          </Link>
        </div> */}
      </div>
      <h2 className='font-medium text-4xl'>
        Music
      </h2>
      <div className='flex flex-wrap justify-center gap-16 mx-8'>
        <MusicCard
          name='turbine'
          releaseType={ReleaseType.Single}
          src='/turbine.png'
          year={2022}
        />
        <MusicCard
          name='re'
          releaseType={ReleaseType.EP}
          src='/re.png'
          year={2021}
        />
      </div>
    </div>
  </>);
}
