import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

export default function Home() {
  return (<>
    <Head>
      <title>sspenst</title>
      <meta name='description' content='sspenst.com' />
    </Head>
    <div className='flex items-center justify-center text-center font-semibold text-7xl text-white h-screen w-screen absolute animateName'>
      Spencer Spenst
    </div>
    <div className='flex flex-col items-center justify-center text-white h-screen w-screen animateMain'>
      <div className='flex flex-row grow w-full'>
        <div className='flex flex-col justify-center text-center items-center grow m-8 p-4 border rounded-md border-zinc-500 gap-4 text-2xl'>
          <div className='font-semibold text-4xl mb-4'>
            Spencer Spenst
          </div>
          <Link href='https://linkedin.com/in/sspenst' className='underline'>
            LinkedIn
          </Link>
          <Link href='https://github.com/sspenst' className='underline'>
            GitHub
          </Link>
          <Link href='https://pathology.gg' className='underline'>
            Pathology
          </Link>
        </div>
      </div>
    </div>
  </>);
}
