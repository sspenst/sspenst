import Image from 'next/image';
import React from 'react';

interface ProjectProps {
  bgColor?: string;
  description: string;
  href: string;
  id: string;
  title: string;
}

export default function Project({ bgColor, description, href, id, title }: ProjectProps) {
  const titleLower = title.toLowerCase();

  return (
    <div className='flex flex-col items-start gap-8 w-fit max-w-full px-8 pt-20' id={id}>
      <div className='col-span-2 flex gap-8 mx-4 w-full items-center'>
        {bgColor &&
          <a
            className='border border-neutral-700 p-3 shadow-lg rounded-lg flex items-center justify-center hover:scale-105 transition'
            href={href}
            rel='noreferrer'
            style={{
              backgroundColor: bgColor,
            }}
            target='_blank'
          >
            <Image alt={title} src={`/${titleLower}.svg`} width='32' height='32' style={{
              minHeight: 32,
              minWidth: 32,
            }} />
          </a>
        }
        <div className='flex flex-col gap-2'>
          <a
            className='hover:underline text-3xl font-medium w-fit'
            href={href}
            rel='noreferrer'
            target='_blank'
          >
            {title}
          </a>
          <span>{description}</span>
        </div>
      </div>
      <div className='col-span-3 flex justify-center max-w-full'>
        {bgColor &&
          <a
            className='hover:opacity-70 transition p-4 max-w-full w-full rounded-xl border border-neutral-700 hover:scale-[1.01]'
            href={href}
            rel='noreferrer'
            style={{
              backgroundColor: bgColor,
            }}
            target='_blank'
          >
            <div className='flex items-center max-w-full aspect-video overflow-hidden'>
              <Image alt={`${title} Preview`} src={`/${titleLower}-preview.png`} width={512} height={1} priority />
            </div>
          </a>
        }
      </div>
    </div>
  );
}
