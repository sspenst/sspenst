import Image from 'next/image';
import React from 'react';
import Github from './icons/github';

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
    <section className='flex flex-col items-start gap-8 w-fit max-w-full pt-20' id={id}>
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
          <div className='w-6 h-6'>
            <Github />
          </div>
          <span>View on GitHub</span>
        </a>
      }
    </section>
  );
}
