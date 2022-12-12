import '../styles/global.css';
import { Work_Sans } from '@next/font/google';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';

const workSans = Work_Sans({
  fallback: ['system-ui', 'arial'],
  preload: true,
  subsets: ['latin'],
});

export default function App({ Component, pageProps }: AppProps) {
  const ssPathLength = 168.26;
  const [style, setStyle] = useState<React.CSSProperties>({
    strokeDashoffset: ssPathLength,
    transition: 'none',
  });

  useEffect(() => {
    setStyle({
      strokeDashoffset: 0,
      transition: 'stroke-dashoffset 1.25s ease',
    });
  }, []);

  return (
    <main className={workSans.className}>
      <Head>
        <title>Spencer Spenst</title>
      </Head>
      <div className='flex fixed inset-0 items-center justify-center text-center font-semibold text-7xl animateSS'>
        <div className='flex flex-row w-48'>
          <svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="none"
              stroke="white"
              strokeWidth="0.15"
              strokeDasharray={ssPathLength}
              style={style}
              d="M 17.2,28
              q -0.4,1 -1.4,1
              h -12.8
              q -1,0 -0.6,-1
              l 0.8,-2
              q 0.4,-1 1.4,-1
              h 8.8
              q 1,0 1.4,-1
              q 0.4,-1 -0.6,-1
              h -8.8
              q -1,0 -0.6,-1
              l 3.2,-8
              q 0.4,-1 1.4,-1
              h 8.8
              q 1,0 1.4,-1
              q 0.4,-1 -0.6,-1
              h -8.8
              q -1,0 -0.6,-1
              l 3.2,-8
              q 0.4,-1 1.4,-1
              h 12.8
              q 1,0 0.6,1
              l -0.8,2
              q -0.4,1 -1.4,1
              h -8.8
              q -1,0 -1.4,1
              q -0.4,1 0.6,1
              h 8.8
              q 1,0 0.6,1
              l -3.2,8
              q -0.4,1 -1.4,1
              h -8.8
              q -1,0 -1.4,1
              q -0.4,1 0.6,1
              h 8.8
              q 1,0 0.6,1
              Z"
            />
          </svg>
        </div>
      </div>
      <div className='animateMain'>
        <Component {...pageProps} />
      </div>
    </main>
  );
}
