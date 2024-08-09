import React from 'react';
import Email from './icons/email';
import Github from './icons/github';
import LinkedIn from './icons/linkedin';

interface FooterIconProps {
  ariaLabel: string;
  children: JSX.Element;
  href: string;
}

function FooterIcon({ ariaLabel, children, href }: FooterIconProps) {
  return (
    <a
      aria-label={ariaLabel}
      className='w-6 h-6 hover:text-black dark:hover:text-white transition'
      href={href}
      rel='noreferrer'
      style={{
        minHeight: 24,
        minWidth: 24,
      }}
      target='_blank'
    >
      {children}
    </a>
  );
}

export default function Footer() {
  return (
    <footer className='flex justify-center'>
      <div className='flex flex-col gap-8 items-center my-8 text-neutral-600 dark:text-neutral-400 text-sm text-center w-full max-w-7xl'>
        <div className='w-full h-px gradient-border' />
        <div className='flex flex-wrap justify-center w-full max-w-xl gap-x-12 gap-y-8 items-center px-8'>
          <span>
            © 2024 Spencer Spenst
          </span>
          <div className='flex flex-wrap gap-6 items-center justify-center'>
            <FooterIcon ariaLabel='sspenst github' href={'https://github.com/sspenst'}>
              <Github />
            </FooterIcon>
            <FooterIcon ariaLabel='sspenst linkedin' href={'https://linkedin.com/in/sspenst'}>
              <LinkedIn />
            </FooterIcon>
            <FooterIcon ariaLabel='sspenst email' href={'mailto:spencerspenst@gmail.com'}>
              <Email />
            </FooterIcon>
          </div>
        </div>
      </div>
    </footer>
  );
}
