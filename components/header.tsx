import Link from 'next/link';
import { useTheme } from 'next-themes';
import React, { useEffect } from 'react';
import SS from './icons/ss';

export default function Header() {
  const { resolvedTheme, setTheme, systemTheme } = useTheme();

  // switch back to system theme if it's the same as the resolved theme
  useEffect(() => {
    if (systemTheme && resolvedTheme && systemTheme === resolvedTheme) {
      setTheme('system');
    }
  }, [resolvedTheme, setTheme, systemTheme]);

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
      <div className='w-full max-w-7xl'>
        <div className='flex justify-between'>
          <Link aria-label='Home' href='/' className='flex items-center gap-4 h-14 px-4 font-medium text-black dark:text-white hover:text-neutral-400 dark:hover:text-neutral-400 transition'>
            <div className='flex gap-2 w-8 h-8'>
              <SS />
            </div>
            <span className='sm:block hidden text-xl'>
              Spencer Spenst
            </span>
          </Link>
          <div className='flex items-center gap-6 h-14 px-4 font-medium'>
            <nav className='flex items-center gap-6'>
              <Link href='/resume' className='hover:text-neutral-400 transition'>
                Resume
              </Link>
              <Link href='/projects' className='hover:text-neutral-400 transition'>
                Projects
              </Link>
            </nav>
          </div>
        </div>
        <div className='w-full h-px gradient-border' />
      </div>
    </header>
  );
}
