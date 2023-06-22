import Image from 'next/image';
import React from 'react';

export default function Projects() {
  return (
    <div className='flex flex-col gap-12 mx-8 my-12'>
      <div className='flex flex-col lg:grid lg:grid-cols-5 items-center gap-4'>
        <div className='col-span-3 flex justify-center lg:justify-end max-w-full'>
          <a
            className='hover:opacity-70 transition p-4 m-4 max-w-full w-fit rounded-xl border border-neutral-700'
            href='https://pathology.gg'
            rel='noreferrer'
            style={{
              backgroundColor: 'rgb(38 38 38)',
            }}
            target='_blank'
          >
            <div className='flex items-center max-w-full aspect-video overflow-hidden' style={{
              width: 512,
            }}>
              <Image alt='Pathology Preview' src='/pathology-preview.png' width={512} height={1} />
            </div>
          </a>
        </div>
        <div className='col-span-2 flex gap-8'>
          <Image alt='Pathology' src='/pathology.svg' width='32' height='32' className='w-10' />
          <div className='flex flex-col gap-2'>
            <a
              className='hover:underline text-3xl font-medium w-fit'
              href='https://pathology.gg'
              rel='noreferrer'
              target='_blank'
            >
              Pathology
            </a>
            <span>Shortest path puzzle game</span>
          </div>
        </div>
      </div>
      <div className='flex flex-col lg:grid lg:grid-cols-5 items-center gap-4'>
        <div className='col-span-3 flex justify-center lg:justify-end max-w-full'>
          <a
            className='bg-black hover:opacity-70 transition p-4 m-4 max-w-full w-fit rounded-xl border border-neutral-700'
            href='https://rabbit.sspenst.com'
            rel='noreferrer'
            target='_blank'
          >
            <div className='flex items-center max-w-full aspect-video overflow-hidden' style={{
              width: 512,
            }}>
              <Image alt='Rabbit Preview' src='/rabbit-preview.png' width={512} height={1} />
            </div>
          </a>
        </div>
        <div className='col-span-2 flex gap-8'>
          <Image alt='Rabbit' src='/rabbit.svg' width='32' height='32' className='w-10' />
          <div className='flex flex-col gap-2'>
            <a
              className='hover:underline text-3xl font-medium w-fit'
              href='https://rabbit.sspenst.com'
              rel='noreferrer'
              target='_blank'
            >
              Rabbit
            </a>
            <span>Discover new tracks using Spotify&apos;s audio features</span>
          </div>
        </div>
      </div>
    </div>
  );
}
