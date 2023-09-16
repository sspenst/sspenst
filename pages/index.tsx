import Head from 'next/head';
import React from 'react';
import SS from '../components/icons/ss';

export default function Index() {
  return (<>
    <Head>
      <title>Spencer Spenst</title>
      <meta name='description' content='Spencer Spenst - sspenst - Software Engineer' />
    </Head>
    <div className='flex items-center justify-center text-center font-semibold text-7xl' style={{
      marginTop: -40,
      minHeight: 500,
    }}>
      <div className='flex w-48 h-48 relative'>
        <div className='absolute w-full h-full animateSSPath text-transparent stroke-black dark:stroke-white' style={{
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          strokeWidth: 0.25,
        }}>
          <SS />
        </div>
      </div>
    </div>
    <div className='flex flex-col items-center mb-20 mx-8 gap-12 text-center'>
      <h1 className='text-7xl font-medium m-12'>Spencer Spenst</h1>
      <h2 className='text-3xl'>Software Engineer</h2>
    </div>
  </>);
}
