import Link from 'next/link';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';
import SS from './icons/ss';

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className='fixed flex justify-center w-full z-20'>
      {/* blur underneath nav */}
      <div className='absolute w-full h-20 backdrop-blur-md' style={{
        WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent)',
        maskImage: 'linear-gradient(to bottom, black 70%, transparent)',
        zIndex: -2,
      }} />
      {/* noise layer above blur */}
      <div className='absolute w-full h-20' style={{
        backgroundImage: 'url(noise.png)',
        backgroundRepeat: 'repeat',
        opacity: '20%',
        zIndex: -1,
      }} />
      <nav>
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
    </header>
  );
}
