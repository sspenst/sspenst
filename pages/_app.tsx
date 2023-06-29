import '../styles/global.css';
import classNames from 'classnames';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import React, { useEffect, useState } from 'react';
import Footer from '../components/footer';
import Header from '../components/header';

const inter = Inter({
  display: 'swap',
  fallback: ['system-ui', 'arial'],
  preload: true,
  subsets: ['latin'],
});

declare const InstallTrigger: unknown;

export default function App({ Component, pageProps }: AppProps) {
  const [isFirefox, setIsFirefox] = useState<boolean>();
  const [size, setSize] = useState([4000, 2000]);

  useEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }

    window.addEventListener('resize', updateSize);
    updateSize();

    // https://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browsers
    setIsFirefox(typeof InstallTrigger !== 'undefined');

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <div className={classNames(inter.className)}>
      <ThemeProvider attribute='class'>
        {/* blurred gradient background - NOTE: hiding this in firefox because the max supported
        blur radius is only 100px (50px on high DPI screens), but i want high values like 360px */}
        {isFirefox === false &&
          <div className='absolute w-full h-full overflow-hidden' style={{
            filter: `blur(${size[0] / 4}px)`,
            opacity: '90%',
            top: 0,
            zIndex: -2,
          }}>
            <div className='absolute spin2' style={{
              backgroundColor: 'rgb(255, 50, 0)',
              height: '40%',
              left: '65%',
              top: '10%',
              width: '30%',
            }} />
            <div className='absolute spin' style={{
              backgroundColor: 'rgb(255, 197, 104)',
              height: '30%',
              left: '20%',
              top: '10%',
              width: '30%',
            }} />
            <div className='absolute spin3' style={{
              backgroundColor: 'rgb(255, 172, 0)',
              height: '30%',
              left: '30%',
              top: '50%',
              width: '40%',
            }} />
            <div className='absolute spin' style={{
              backgroundColor: 'rgb(255, 172, 200)',
              height: '40%',
              left: '0%',
              top: '50%',
              width: '30%',
            }} />
            <div className='absolute spin2' style={{
              backgroundColor: 'rgb(144, 196, 103)',
              height: '20%',
              left: '70%',
              top: '70%',
              width: '20%',
            }} />
            <div className='absolute spin3' style={{
              backgroundColor: 'rgb(146, 215, 225)',
              height: '20%',
              left: '0%',
              top: '10%',
              width: '20%',
            }} />
          </div>
        }
        {/* noise layer above bg gradient */}
        <div className='fixed w-full h-screen' style={{
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
          backgroundImage: 'url(noise.png)',
          backgroundRepeat: 'repeat',
          maskImage: 'linear-gradient(to bottom, transparent, transparent, black 20%, black 80%, transparent)',
          opacity: '20%',
          top: 0,
          zIndex: -1,
        }} />
        <Header />
        <main className='pt-24'>
          <Component {...pageProps} />
        </main>
        <Footer />
      </ThemeProvider>
    </div>
  );
}
