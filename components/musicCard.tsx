import Image from 'next/image';
import React from 'react';

export enum ReleaseType {
  Album = 'Album',
  EP = 'EP',
  Single = 'Single',
}

interface MusicCardProps {
  name: string;
  releaseType: ReleaseType;
  size: number;
  src: string;
  year: number;
}

export default function MusicCard({ name, releaseType, size, src, year }: MusicCardProps) {
  return (
    <div className='flex flex-col w-64 p-5 justify-center bg-neutral-800 rounded-xl shadow-lg musicCardZoom cursor-default select-none max-w-full'>
      <Image alt={name} src={src} width={size} height={size} className='rounded-lg shadow-lg mb-4' />
      <div className='text-2xl flex font-medium justify-center mb-2'>
        {name}
      </div>
      <div className='text-neutral-400 text-sm flex justify-center'>
        {year} - {releaseType}
      </div>
    </div>
  );
}
