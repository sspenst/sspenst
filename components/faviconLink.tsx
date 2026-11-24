import React, { ReactNode } from 'react';

interface FaviconLinkProps {
  children: ReactNode;
  darkFaviconHref?: string;
  faviconClassName?: string;
  faviconHref?: string;
  href: string;
}

export default function FaviconLink({ children, darkFaviconHref, faviconClassName = '', faviconHref, href }: FaviconLinkProps) {
  const resolvedFaviconHref = faviconHref ?? `https://www.google.com/s2/favicons?domain_url=${encodeURIComponent(href)}&sz=32&v=1`;
  const favicons = darkFaviconHref
    ? [
      { src: resolvedFaviconHref, className: 'inline-block dark:hidden' },
      { src: darkFaviconHref, className: 'hidden dark:inline-block' },
    ]
    : [{ src: resolvedFaviconHref, className: 'inline-block' }];

  return (
    <a
      className='whitespace-nowrap font-medium hover:text-rose-500 transition'
      href={href}
    >
      {/* These small icons do not need Next.js image optimization. */}
      {favicons.map(favicon => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          alt=''
          aria-hidden='true'
          className={`w-4 h-4 mr-1 align-[-0.125em] ${favicon.className} ${faviconClassName}`}
          height={16}
          key={favicon.src}
          loading='lazy'
          referrerPolicy='no-referrer'
          src={favicon.src}
          width={16}
        />
      ))}
      {children}
    </a>
  );
}
