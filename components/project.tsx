import Image from 'next/image';
import React from 'react';

interface ProjectProps {
  bgColor: string;
  description: string;
  href: string;
  title: string;
}

export default function Project({ bgColor, description, href, title }: ProjectProps) {
  const titleLower = title.toLowerCase();

  return (
    <div className='flex flex-col lg:grid lg:grid-cols-5 items-start lg:items-center gap-8 lg:max-w-screen-lg lg:w-full w-fit max-w-full'>
      <div className='col-span-3 flex justify-center max-w-full'>
        <a
          className='hover:opacity-70 transition p-4 max-w-full w-fit rounded-xl border border-neutral-700 hover:scale-[1.01]'
          href={href}
          rel='noreferrer'
          style={{
            backgroundColor: bgColor,
          }}
          target='_blank'
        >
          <div className='flex items-center max-w-full aspect-video overflow-hidden'>
            <Image alt={`${title} Preview`} src={`/${titleLower}-preview.png`} width={512} height={1} className='lg:w-full' />
          </div>
        </a>
      </div>
      <div className='col-span-2 flex gap-8 mx-4 w-full'>
        <Image alt={title} src={`/${titleLower}.svg`} width='32' height='32' className='w-10' style={{
          minWidth: 40,
        }} />
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
    </div>
  );
}