import '../styles/global.css';
import { Work_Sans } from '@next/font/google';
import type { AppProps } from 'next/app';
import React, { useState } from 'react';
import { AppContext } from '../contexts/appContext';

const workSans = Work_Sans({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  const [animating, setAnimating] = useState(true);

  return (
    <AppContext.Provider value={{
      animating: animating,
      setAnimating: setAnimating,
    }}>
      <main className={workSans.className}>
        <Component {...pageProps} />
      </main>
    </AppContext.Provider>
  );
}
