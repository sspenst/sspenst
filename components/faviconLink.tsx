import React, { ReactNode } from 'react';

interface FaviconLinkProps {
  children: ReactNode;
  faviconHref?: string;
  href: string;
}

export default function FaviconLink({ children, faviconHref, href }: FaviconLinkProps) {
  const resolvedFaviconHref = faviconHref ?? `https://www.google.com/s2/favicons?domain_url=${encodeURIComponent(href)}&sz=32&v=1`;

  return (
    <a
      className='whitespace-nowrap font-medium hover:text-rose-500 transition'
      href={href}
      rel='noreferrer'
      target='_blank'
    >
      {/* Favicons are already-sized external images, so Next.js optimization adds no value here. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt=''
        aria-hidden='true'
        className='inline-block w-4 h-4 mr-1 align-[-0.125em]'
        height={16}
        loading='lazy'
        referrerPolicy='no-referrer'
        src={resolvedFaviconHref}
        width={16}
      />
      {children}
    </a>
  );
}
