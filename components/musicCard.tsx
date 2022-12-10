import Image from 'next/image';
import React from 'react';

interface MusicCardProps {
  hrefAppleMusic: string;
  hrefSoundCloud: string;
  hrefSpotify: string;
  info: string[];
  title: string;
}

export default function MusicCard({ hrefAppleMusic, hrefSoundCloud, hrefSpotify, info, title }: MusicCardProps) {
  return (
    <div className='flex flex-row flex-wrap gap-4'>
      <Image alt={title} src={`/${title}.png`} width={192} height={192} className='rounded-lg shadow-lg w-48 h-48' />
      <div className='flex flex-col max-w-full gap-2'>
        <div className='text-2xl font-medium'>
          {title}
        </div>
        {info.map((line, index) => {
          return (
            <div className='text-neutral-400 text-sm' key={`${title}-${index}`}>
              {line}
            </div>
          );
        })}
        <div className='flex flex-row gap-2'>
          <a target='_blank' rel='noreferrer' href={hrefSoundCloud} className='w-fit'>
            <Image alt='soundcloud' src='/soundcloud.svg' width='32' height='32' className='w-6' />
          </a>
          <a target='_blank' rel='noreferrer' href={hrefSpotify} className='w-fit'>
            <Image alt='spotify' src='/spotify.svg' width='32' height='32' className='w-6' />
          </a>
          <a target='_blank' rel='noreferrer' href={hrefAppleMusic} className='w-fit'>
            <Image alt='music' src='/music.svg' width='32' height='32' className='w-6' />
          </a>
        </div>
      </div>
    </div>
  );
}
