import '../styles/global.css';
import classNames from 'classnames';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Email from '../components/icons/email';
import Github from '../components/icons/github';
import LinkedIn from '../components/icons/linkedin';
import SS from '../components/icons/ss';

const inter = Inter({
  display: 'swap',
  fallback: ['system-ui', 'arial'],
  preload: true,
  subsets: ['latin'],
});

export default function App({ Component, pageProps }: AppProps) {
  const [size, setSize] = useState([4000, 2000]);

  useEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }

    window.addEventListener('resize', updateSize);
    updateSize();

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <main className={classNames(inter.className, 'overflow-hidden')}>
      <Head>
        <title>Spencer Spenst</title>
      </Head>
      <header className='sticky flex justify-center top-0 left-0 right-0 mb-8 z-20'>
        <nav className='z-20'>
          <div className='flex items-center gap-6 h-14 px-4 font-medium'>
            <Link aria-label='Home' href='/' className='flex gap-2 text-white w-8 h-8 hover:text-neutral-400 transition'>
              <SS />
            </Link>
            <Link href='/resume' className='hover:text-neutral-400 transition'>
              Resume
            </Link>
            <Link href='/projects' className='hover:text-neutral-400 transition'>
              Projects
            </Link>
            <Link href='/music' className='hover:text-neutral-400 transition'>
              Music
            </Link>
          </div>
          <div className='w-full h-px' style={{
            backgroundImage: 'linear-gradient(to right, transparent, rgb(180 180 180) 20%, rgb(180 180 180) 80%, transparent)',
          }} />
        </nav>
        {/* blur underneath nav */}
        <div className='absolute w-full h-20 backdrop-blur-md' style={{
          WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent)',
          maskImage: 'linear-gradient(to bottom, black 70%, transparent)',
        }} />
      </header>
      {/* noise layer above bg gradient */}
      <div className='fixed w-full h-screen' style={{
        WebkitMaskImage: 'linear-gradient(to bottom, transparent, transparent 56px, black 20%, black 80%, transparent)',
        backgroundImage: 'url(noise.png)',
        backgroundRepeat: 'repeat',
        maskImage: 'linear-gradient(to bottom, transparent, transparent 56px, black 20%, black 80%, transparent)',
        opacity: '20%',
        top: 0,
        zIndex: -1,
      }} />
      {/* blurred gradient background */}
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
        <div className='absolute spin2' style={{
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
        <div className='absolute spin' style={{
          backgroundColor: 'rgb(146, 215, 225)',
          height: '20%',
          left: '0%',
          top: '10%',
          width: '20%',
        }} />
      </div>
      <Component {...pageProps} />
      <footer className='flex flex-col gap-8 items-center m-8 text-neutral-400 text-sm text-center'>
        <div className='w-full h-px' style={{
          backgroundImage: 'linear-gradient(to right, transparent, rgb(100 100 100) 20%, rgb(100 100 100) 80%, transparent)',
        }} />
        <div className='flex flex-wrap gap-6 items-center justify-center'>
          <a
            aria-label='sspenst github'
            className='w-8 h-8 hover:text-white transition'
            href='https://github.com/sspenst'
            rel='noreferrer'
            style={{
              minHeight: 32,
              minWidth: 32,
            }}
            target='_blank'
          >
            <Github />
          </a>
          <a
            aria-label='sspenst linkedin'
            className='w-8 h-8 hover:text-white transition'
            href='https://linkedin.com/in/sspenst'
            rel='noreferrer'
            style={{
              minHeight: 32,
              minWidth: 32,
            }}
            target='_blank'
          >
            <LinkedIn />
          </a>
          <a
            aria-label='sspenst linkedin'
            className='w-8 h-8 hover:text-white transition'
            href='mailto:spencerspenst@gmail.com'
            rel='noreferrer'
            style={{
              minHeight: 32,
              minWidth: 32,
            }}
            target='_blank'
          >
            <Email />
          </a>
        </div>
        <span>
          © {(new Date()).getFullYear()} Spencer Spenst
        </span>
      </footer>
    </main>
  );
}
