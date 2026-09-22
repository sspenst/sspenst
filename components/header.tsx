import { useRouter } from 'next/router';
import React from 'react';
import AutoTheme from './autoTheme';
import { TransitionLink, usePageTransition } from './pageTransition';
import SS from './ss';

export default function Header() {
  const router = useRouter();
  const { phase } = usePageTransition();

  return (
    <header className='flex justify-center'>
      <div className='flex w-full max-w-2xl items-center justify-between px-8 pt-12'>
        <TransitionLink className='flex items-center gap-4' href='/'>
          <div className='relative flex h-16 w-16 shrink-0 fadeIn'>
            <div
              className='animateSSPath absolute h-full w-full text-transparent stroke-black dark:stroke-white'
              style={{
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
                strokeWidth: 0.3,
              }}
            >
              <SS />
            </div>
          </div>
          <h1 className='text-lg font-medium fadeIn'>
            Spencer Spenst
            {router.pathname === '/music' && (
              <span className={`headerMusicSuffix headerMusicSuffix--${phase}`}>&apos;s Music</span>
            )}
          </h1>
        </TransitionLink>
        <AutoTheme />
      </div>
    </header>
  );
}
