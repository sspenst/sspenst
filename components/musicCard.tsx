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
  src: string;
  year: number;
}

export default function MusicCard({ name, releaseType, src, year }: MusicCardProps) {
  return (
    <div className='flex justify-center bg-neutral-800 rounded-2xl shadow-lg musicCardZoom cursor-default select-none max-w-full'>
      <div className='flex flex-col w-64 m-6'>
        <Image alt={name} src={src} width={3000} height={3000} className='rounded-lg shadow-lg mb-4' />
        <div className='text-2xl flex font-medium justify-center mb-2'>
          {name}
        </div>
        <div className='text-neutral-400 text-sm flex justify-center'>
          {year} - {releaseType}
        </div>
      </div>
    </div>
  );
}
