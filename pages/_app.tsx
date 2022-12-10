import '../styles/global.css';
import { Work_Sans } from '@next/font/google';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Image from 'next/image';
import React from 'react';

const workSans = Work_Sans({
  fallback: ['system-ui', 'arial'],
  preload: true,
  subsets: ['latin'],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={workSans.className}>
      <Head>
        <title>Spencer Spenst</title>
      </Head>
      <div className='flex fixed inset-0 items-center justify-center text-center font-semibold text-7xl animateSS'>
        <div className='flex flex-row w-48'>
          <Image alt='ss' src='/ss.png' width={512} height={512} loading='eager' priority={true} />
        </div>
      </div>
      <div className='animateMain'>
        <Component {...pageProps} />
      </div>
    </main>
  );
}
