import Head from 'next/head';
import React from 'react';
import MusicCard, { ReleaseType } from '../components/musicCard';

export default function Music() {
  return (<>
    <Head>
      <title>sspenst - music</title>
    </Head>
    <div className='flex justify-center font-semibold text-7xl m-8'>
      music
    </div>
    <div className='flex justify-center font-medium text-4xl m-8 text-neutral-400'>
      sspenst
    </div>
    <div className='flex flex-wrap justify-center gap-16 my-16 mx-8'>
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
  </>);
}