import Image from 'next/image';
import React from 'react';

interface ProjectProps {
  bgColor: string;
  children?: React.ReactNode;
  githubHref?: string;
  href: string;
  id: string;
  srcIcon: string;
  title: string;
}

export default function Project({ bgColor, children, githubHref, href, id, srcIcon, title }: ProjectProps) {
  return (
    <div className='flex flex-col items-start gap-8 w-fit max-w-full px-8 pt-20' id={id}>
      <h2 className='flex gap-4 items-center'>
        <div
          className='border border-neutral-700 p-2.5 shadow-lg rounded-lg flex items-center justify-center'
          style={{
            backgroundColor: bgColor,
          }}
        >
          <Image alt={title} src={srcIcon} width='28' height='28' style={{
            minHeight: 28,
            minWidth: 28,
          }} />
        </div>
        <a
          className='hover:underline text-3xl font-medium w-fit'
          href={href}
          rel='noreferrer'
          target='_blank'
        >
          {title}
        </a>
      </h2>
      {children}
      {githubHref &&
        <a
          aria-label={`${id} source code`}
          className='text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition flex items-center gap-2 text-sm'
          href={githubHref}
          rel='noreferrer'
          target='_blank'
        >
          <span>View on GitHub</span>
          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-4 h-4'>
            <path strokeLinecap='round' strokeLinejoin='round' d='M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25' />
          </svg>
        </a>
      }
    </div>
  );
}
