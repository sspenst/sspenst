import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import MusicCard, { ReleaseType } from '../components/musicCard';
import Page from '../components/page';

export default function Music() {
  return (<>
    <Head>
      <title>Spencer Spenst - Music</title>
    </Head>
    <Page>
      <div className='flex flex-row flex-wrap justify-center gap-8 text-xl'>
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
    </Page>
  </>);
}
