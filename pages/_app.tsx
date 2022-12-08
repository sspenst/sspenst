import '../styles/global.css';
import { Work_Sans } from '@next/font/google';
import classNames from 'classnames';
import type { AppProps } from 'next/app';
import React from 'react';

const workSans = Work_Sans({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={classNames(workSans.className, 'bg-zinc-900')}>
      <Component {...pageProps} />
    </main>
  );
}
