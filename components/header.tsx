import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { useRouter } from 'next/router';
import React from 'react';
import AutoTheme from './autoTheme';
import { TransitionLink, usePageTransition } from './pageTransition';
import SS from './ss';

export default function Header() {
  const router = useRouter();
  const { phase } = usePageTransition();

  return (
    <header className='headerScrim fixed inset-x-0 top-0 z-50 flex justify-center'>
      <div className='relative flex w-full max-w-2xl items-center justify-between px-4 pt-6 pb-3 sm:px-8 sm:pt-12 sm:pb-4'>
        <TransitionLink className='flex min-w-0 items-center gap-2 sm:gap-4' href='/'>
          <div className='relative flex h-16 w-16 shrink-0 fadeIn'>
            <div
              className='animateSSPath absolute h-full w-full text-transparent stroke-black dark:stroke-white'
              style={{
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
                strokeWidth: 0.4,
              }}
            >
              <SS />
            </div>
          </div>
          <h1 className='flex min-w-0 flex-wrap items-center text-base font-medium sm:text-lg fadeIn gap-x-1'>
            <span className='whitespace-nowrap'>Spencer Spenst</span>
            <span className='inline-flex h-6 flex-none items-center'>
              {router.pathname === '/music' && (
                <span className={`headerMusicSuffix headerMusicSuffix--${phase} flex items-center gap-1 whitespace-nowrap text-xs font-normal leading-6 text-neutral-500 sm:text-sm`}>
                  <ChevronRightIcon aria-hidden='true' className='h-4 w-4 shrink-0' />
                  Music
                </span>
              )}
            </span>
          </h1>
        </TransitionLink>
        <AutoTheme />
      </div>
    </header>
  );
}
