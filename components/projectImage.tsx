import Image from 'next/image';
import React from 'react';

interface ProjectProps {
  bgColor: string;
  src: string;
  title: string;
}

export default function ProjectImage({ bgColor, src, title }: ProjectProps) {
  return (
    <div
      className='p-4 max-w-full rounded-xl border border-neutral-700'
      style={{
        backgroundColor: bgColor,
      }}
    >
      <div className='flex items-center max-w-full aspect-video overflow-hidden'>
        <Image alt={`${title} Preview`} src={src} width={512} height={1} priority />
      </div>
    </div>
  );
}
