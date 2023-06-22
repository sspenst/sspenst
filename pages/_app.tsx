import '../styles/global.css';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
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
  return (
    <main className={inter.className}>
      <Head>
        <title>Spencer Spenst</title>
      </Head>
      <header className='sticky flex justify-center top-0 left-0 right-0 mb-8 z-20'>
        <nav className='z-20'>
          <div className='flex items-center gap-6 h-14 px-4 font-medium'>
            <Link aria-label='Home' href='/' className='flex gap-2 text-white w-8 h-8 hover:text-neutral-400 transition'>
              <SS />
            </Link>
            <Link href='/projects' className='hover:text-neutral-400 transition'>
              Projects
            </Link>
            <Link href='/resume' className='hover:text-neutral-400 transition'>
              Resume
            </Link>
            <Link href='/music' className='hover:text-neutral-400 transition'>
              Music
            </Link>
          </div>
          <div className='w-full h-px' style={{
            backgroundImage: 'linear-gradient(to right, transparent, rgb(100, 100, 100) 20%, rgb(100, 100, 100) 80%, transparent)',
          }} />
        </nav>
        <div className='absolute w-full h-20 backdrop-blur-md' style={{
          WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent)',
          maskImage: 'linear-gradient(to bottom, black 70%, transparent)',
        }} />
      </header>
      <Component {...pageProps} />
      <footer className='flex flex-col gap-8 items-center m-8 text-neutral-400 text-sm text-center'>
        <div className='w-full h-px' style={{
          backgroundImage: 'linear-gradient(to right, transparent, rgb(70, 70, 70) 20%, rgb(70, 70, 70) 80%, transparent)',
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
