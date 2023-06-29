import React from 'react';
import Email from './icons/email';
import Github from './icons/github';
import LinkedIn from './icons/linkedin';

export default function Footer() {
  return (
    <footer className='flex flex-col gap-8 items-center m-8 text-neutral-600 dark:text-neutral-400 text-sm text-center'>
      <div className='w-full h-px footer-border' />
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
  );
}
