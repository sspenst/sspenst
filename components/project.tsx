import Image from 'next/image';
import React from 'react';

interface ProjectProps {
  bgColor: string;
  description: string | JSX.Element;
  href: string;
  id: string;
  srcIcon: string;
  srcPreview?: string;
  title: string;
}

export default function Project({ bgColor, description, href, id, srcIcon, srcPreview, title }: ProjectProps) {
  return (
    <div className='flex flex-col items-start gap-8 w-fit max-w-full px-8 pt-20' id={id}>
      <div className='flex gap-4 mx-2 items-center'>
        <a
          className='border border-neutral-700 p-2.5 shadow-lg rounded-lg flex items-center justify-center hover:scale-105 transition'
          href={href}
          rel='noreferrer'
          style={{
            backgroundColor: bgColor,
          }}
          target='_blank'
        >
          <Image alt={title} src={srcIcon} width='28' height='28' style={{
            minHeight: 28,
            minWidth: 28,
          }} />
        </a>
        <a
          className='hover:underline text-3xl font-medium w-fit'
          href={href}
          rel='noreferrer'
          target='_blank'
        >
          {title}
        </a>
      </div>
      {srcPreview &&
        <a
          className='hover:opacity-70 transition p-4 max-w-full rounded-xl border border-neutral-700 hover:scale-[1.01]'
          href={href}
          rel='noreferrer'
          style={{
            backgroundColor: bgColor,
          }}
          target='_blank'
        >
          <div className='flex items-center max-w-full aspect-video overflow-hidden'>
            <Image alt={`${title} Preview`} src={srcPreview} width={512} height={1} priority />
          </div>
        </a>
      }
      <div className='mx-2'>
        {description}
      </div>
    </div>
  );
}
