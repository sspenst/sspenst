import '../styles/global.css';
import classNames from 'classnames';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import Link from 'next/link';
import { ThemeProvider, useTheme } from 'next-themes';
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

function Header() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className='fixed flex justify-center top-0 left-0 right-0 mb-8 z-20'>
      <nav className='z-20'>
        <div className='flex items-center gap-6 h-14 px-4 font-medium'>
          <Link aria-label='Home' href='/' className='flex gap-2 text-black dark:text-white w-8 h-8 hover:text-neutral-400 dark:hover:text-neutral-400 transition'>
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
          {!mounted ? <div className='w-6' /> : resolvedTheme === 'dark' ?
            <button aria-label='Light Mode' className='hover:text-neutral-400 transition' onClick={() => setTheme('light')}>
              <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
                <path strokeLinecap='round' strokeLinejoin='round' d='M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z' />
              </svg>
            </button>
            :
            <button aria-label='Dark Mode' className='hover:text-neutral-400 transition' onClick={() => setTheme('dark')}>
              <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
                <path strokeLinecap='round' strokeLinejoin='round' d='M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z' />
              </svg>
            </button>
          }
        </div>
        <div className='w-full h-px nav-border' />
      </nav>
      {/* blur underneath nav */}
      <div className='absolute w-full h-20 backdrop-blur-md' style={{
        WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent)',
        maskImage: 'linear-gradient(to bottom, black 70%, transparent)',
      }} />
    </header>
  );
}

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
      <ThemeProvider attribute='class'>
        <Header />
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
        <div className='mt-24'>
          <Component {...pageProps} />
        </div>
        <footer className='flex flex-col gap-8 items-center m-8 text-neutral-600 dark:text-neutral-400 text-sm text-center'>
          <div className='w-full h-px' style={{
            backgroundImage: 'linear-gradient(to right, transparent, rgb(100 100 100) 20%, rgb(100 100 100) 80%, transparent)',
          }} />
          <div className='flex flex-wrap gap-6 items-center justify-center'>
            <a
              aria-label='sspenst github'
              className='w-8 h-8 hover:text-black dark:hover:text-white transition'
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
              className='w-8 h-8 hover:text-black dark:hover:text-white transition'
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
              className='w-8 h-8 hover:text-black dark:hover:text-white transition'
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
      </ThemeProvider>
    </main>
  );
}
