import Head from 'next/head';
import React from 'react';
import SS from '../components/icons/ss';

export default function Index() {
  return (<>
    <Head>
      <title>Spencer Spenst</title>
      <meta name='description' content='Software Engineer' />
    </Head>
    <div className='flex items-center justify-center text-center font-semibold text-7xl' style={{
      height: 'calc(100svh - 56px)',
      marginTop: -40,
      minHeight: 400,
    }}>
      <div className='flex w-48 h-48 relative'>
        <div className='absolute w-full h-full text-black dark:text-white ssoverlay'>
          <SS />
        </div>
        <div className='absolute w-full h-full text-neutral-500 dark:text-neutral-800 ssstamp'>
          <SS />
        </div>
        <div className='absolute w-full h-full animateSSPath text-transparent stroke-black dark:stroke-white' style={{
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          strokeWidth: 0.25,
        }}>
          <SS />
        </div>
      </div>
    </div>
    <div className='flex flex-col items-center mb-16 mx-8 gap-8 text-center'>
      <span className='text-6xl font-light'>Spencer Spenst</span>
      <span className='text-2xl font-light'>Software Engineer</span>
    </div>
  </>);
}
