import React, { JSX } from 'react';

interface IconLinkProps {
  ariaLabel: string;
  children: JSX.Element;
  className?: string;
  href: string;
}

export default function IconLink({ ariaLabel, children, className, href }: IconLinkProps) {
  return (
    <a
      aria-label={ariaLabel}
      className={`w-6 h-6 transition ${className}`}
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
