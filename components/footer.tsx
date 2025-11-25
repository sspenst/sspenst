import { EnvelopeIcon, MusicalNoteIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import React from 'react';
import IconLink from './iconLink';
import Github from './icons/github';
import LinkedIn from './icons/linkedin';

export default function Footer() {
  return (
    <footer className='flex justify-center'>
      <div className='flex flex-col gap-8 items-center my-8 text-neutral-600 dark:text-neutral-400 text-sm text-center w-full max-w-6xl'>
        <div className='w-full h-px gradient-border' />
        <div className='flex flex-wrap justify-center w-full max-w-xl gap-x-12 gap-y-8 items-center px-8'>
          <span>
            © 2025 Spencer Spenst
          </span>
          <div className='flex flex-wrap gap-10 items-center justify-center'>
            <IconLink ariaLabel='sspenst github' className='hover:text-black dark:hover:text-white' href={'https://github.com/sspenst'}>
              <Github />
            </IconLink>
            <IconLink ariaLabel='sspenst linkedin' className='hover:text-black dark:hover:text-white' href={'https://linkedin.com/in/sspenst'}>
              <LinkedIn />
            </IconLink>
            <IconLink ariaLabel='sspenst email' className='hover:text-black dark:hover:text-white' href={'mailto:spencerspenst@gmail.com'}>
              <EnvelopeIcon />
            </IconLink>
            <Link href={'/music'}>
              <MusicalNoteIcon
                className='w-6 h-6 hover:text-black dark:hover:text-white transition'
                style={{
                  minHeight: 24,
                  minWidth: 24,
                }}
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
