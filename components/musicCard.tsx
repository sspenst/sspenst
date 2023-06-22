import Image from 'next/image';
import React from 'react';

interface MusicCardProps {
  feature?: string;
  hrefAppleMusic?: string;
  hrefSoundCloud?: string;
  hrefSpotify?: string;
  info?: string[];
  src: string;
  title: string;
}

export default function MusicCard({
  feature,
  hrefAppleMusic,
  hrefSoundCloud,
  hrefSpotify,
  info,
  src,
  title,
}: MusicCardProps) {
  return (
    <div className='flex flex-wrap justify-center gap-8 rounded-lg p-6 w-min sm:w-fit'>
      <Image
        alt={title}
        className='shadow-lg w-48 h-48 rounded-md'
        height={192}
        src={src.startsWith('http') ? src : `/music/${src}`}
        style={{
          minWidth: '12rem',
        }}
        width={192}
      />
      <div className='flex flex-col gap-2 w-36'>
        <div className='text-2xl font-medium'>
          {title}
        </div>
        {feature && <div className='text-neutral-200 text-md'>
          w/ {feature}
        </div>}
        {info?.map((line, index) => {
          return (
            <div className='text-neutral-400 text-sm' key={`${title}-${index}`}>
              {line}
            </div>
          );
        })}
        <div className='flex gap-2'>
          {hrefSoundCloud && <a target='_blank' rel='noreferrer' href={hrefSoundCloud} className='w-fit h-6 w-6 flex items-center'>
            <Image alt='soundcloud' src='/soundcloud.png' width='32' height='32' className='w-7' style={{
              WebkitFilter: 'invert(100%)',
              filter: 'invert(100%)',
            }} />
          </a>}
          {hrefSpotify && <a target='_blank' rel='noreferrer' href={hrefSpotify} className='w-fit'>
            <Image alt='spotify' src='/spotify.png' width='32' height='32' className='w-7' />
          </a>}
          {hrefAppleMusic && <a target='_blank' rel='noreferrer' href={hrefAppleMusic} className='w-fit'>
            <Image alt='apple music' src='/applemusic.svg' width='32' height='32' className='w-7' />
          </a>}
        </div>
      </div>
    </div>
  );
}
