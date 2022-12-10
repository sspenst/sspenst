import '../styles/global.css';
import { Work_Sans } from '@next/font/google';
import type { AppProps } from 'next/app';
import React from 'react';

const workSans = Work_Sans({
  fallback: ['system-ui', 'arial'],
  preload: true,
  subsets: ['latin'],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={workSans.className}>
      <Component {...pageProps} />
    </main>
  );
}
