import React from 'react';
import Email from './icons/email';
import Github from './icons/github';
import LinkedIn from './icons/linkedin';
import X from './icons/x';

interface FooterIconProps {
  ariaLabel: string;
  children: JSX.Element;
  href: string;
}

function FooterIcon({ ariaLabel, children, href }: FooterIconProps) {
  return (
    <a
      aria-label={ariaLabel}
      className='w-8 h-8 hover:text-black dark:hover:text-white transition'
      href={href}
      rel='noreferrer'
      style={{
        minHeight: 32,
        minWidth: 32,
      }}
      target='_blank'
    >
      {children}
    </a>
  );
}

export default function Footer() {
  return (
    <footer className='flex flex-col gap-8 items-center m-8 text-neutral-600 dark:text-neutral-400 text-sm text-center'>
      <div className='w-full h-px footer-border' />
      <div className='flex flex-wrap gap-6 items-center justify-center'>
        <FooterIcon ariaLabel='sspenst github' href={'https://github.com/sspenst'}>
          <Github />
        </FooterIcon>
        <FooterIcon ariaLabel='sspenst x' href={'https://x.com/spencerspenst'}>
          <X />
        </FooterIcon>
        <FooterIcon ariaLabel='sspenst linkedin' href={'https://linkedin.com/in/sspenst'}>
          <LinkedIn />
        </FooterIcon>
        <FooterIcon ariaLabel='sspenst email' href={'mailto:spencerspenst@gmail.com'}>
          <Email />
        </FooterIcon>
        <span>
          © 2023 Spencer Spenst
        </span>
      </div>
    </footer>
  );
}
