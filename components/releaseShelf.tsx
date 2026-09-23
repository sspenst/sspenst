import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';
import React, { KeyboardEvent, TouchEvent, useRef, useState } from 'react';

export interface Release {
  feature?: string;
  hrefAppleMusic?: string;
  hrefBandcamp?: string;
  hrefSoundCloud?: string;
  hrefSpotify?: string;
  info?: string[];
  releaseDate?: string;
  src: string;
  title: string;
}

interface ReleaseShelfProps {
  releases: Release[];
}

function formatReleaseDate(date: string): string {
  const parts = date.split('-');

  if (parts.length === 1) {
    return parts[0];
  }

  const year = parseInt(parts[0]);
  const month = parseInt(parts[1]) - 1;
  const d = new Date(year, month, parts.length === 3 ? parseInt(parts[2]) : 1);

  if (parts.length === 2) {
    return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  }

  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function relativePosition(index: number, activeIndex: number, length: number) {
  let position = index - activeIndex;

  if (position > length / 2) position -= length;
  if (position < -length / 2) position += length;

  return position;
}

export default function ReleaseShelf({ releases }: ReleaseShelfProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const activeRelease = releases[activeIndex];
  const releaseDetails = [
    ...(activeRelease.releaseDate ? [formatReleaseDate(activeRelease.releaseDate)] : []),
    ...(activeRelease.info ?? []),
  ];

  function showPrevious() {
    setActiveIndex(index => (index - 1 + releases.length) % releases.length);
  }

  function showNext() {
    setActiveIndex(index => (index + 1) % releases.length);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      showPrevious();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      showNext();
    }
  }

  function handleTouchStart(event: TouchEvent<HTMLElement>) {
    touchStartX.current = event.touches[0].clientX;
  }

  function handleTouchEnd(event: TouchEvent<HTMLElement>) {
    if (touchStartX.current === null) return;

    const distance = event.changedTouches[0].clientX - touchStartX.current;

    touchStartX.current = null;

    if (Math.abs(distance) < 45) return;

    if (distance > 0) showPrevious();
    else showNext();
  }

  return (
    <section
      aria-label='Music releases'
      className='w-full outline-none'
      onKeyDown={handleKeyDown}
      onTouchEnd={handleTouchEnd}
      onTouchStart={handleTouchStart}
      tabIndex={0}
    >
      <div
        className='relative w-full overflow-hidden'
        style={{ height: 'clamp(14rem, 45vw, 18rem)' }}
      >
        {releases.map((release, index) => {
          const position = relativePosition(index, activeIndex, releases.length);
          const isActive = position === 0;
          const isNeighbor = Math.abs(position) === 1;

          return (
            <button
              aria-current={isActive ? 'true' : undefined}
              aria-label={isActive ? `${release.title}, selected` : `Show ${release.title}`}
              className={`absolute left-1/2 top-1/2 overflow-hidden rounded-md shadow-lg transition-[transform,opacity,filter] duration-500 ease-out motion-reduce:transition-none ${isActive ? 'z-20' : 'z-10'} ${isNeighbor ? 'hover:brightness-110' : ''}`}
              disabled={!isActive && !isNeighbor}
              key={release.title}
              onClick={() => setActiveIndex(index)}
              style={{
                height: 'clamp(14rem, 45vw, 18rem)',
                opacity: isActive ? 1 : isNeighbor ? 0.48 : 0,
                pointerEvents: isActive || isNeighbor ? 'auto' : 'none',
                transform: `translateX(calc(-50% + ${position * 74}%)) translateY(-50%) scale(${isActive ? 1 : 0.72})`,
                width: 'clamp(14rem, 45vw, 18rem)',
              }}
              type='button'
            >
              <Image
                alt={release.title}
                className='object-cover'
                fill
                loading={index === 0 ? 'eager' : 'lazy'}
                sizes='(min-width: 640px) 288px, 224px'
                src={release.src.startsWith('http') ? release.src : `/music/${release.src}`}
              />
            </button>
          );
        })}
      </div>

      <div className='mt-2 flex items-center justify-center gap-4'>
        <button
          aria-label='Previous release'
          className='flex h-9 w-9 items-center justify-center rounded-full text-neutral-500 transition hover:bg-neutral-100 hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500 dark:hover:bg-neutral-900 dark:hover:text-white'
          onClick={showPrevious}
          type='button'
        >
          <ChevronLeftIcon aria-hidden='true' className='h-5 w-5' />
        </button>

        <div aria-label={`Release ${activeIndex + 1} of ${releases.length}`} className='flex items-center gap-2'>
          {releases.map((release, index) => (
            <button
              aria-label={`Show ${release.title}`}
              className={`h-1.5 rounded-full transition-all duration-300 motion-reduce:transition-none ${index === activeIndex ? 'w-5 bg-rose-500' : 'w-1.5 bg-neutral-300 hover:bg-neutral-400 dark:bg-neutral-700 dark:hover:bg-neutral-600'}`}
              key={release.title}
              onClick={() => setActiveIndex(index)}
              type='button'
            />
          ))}
        </div>

        <button
          aria-label='Next release'
          className='flex h-9 w-9 items-center justify-center rounded-full text-neutral-500 transition hover:bg-neutral-100 hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500 dark:hover:bg-neutral-900 dark:hover:text-white'
          onClick={showNext}
          type='button'
        >
          <ChevronRightIcon aria-hidden='true' className='h-5 w-5' />
        </button>
      </div>

      <div aria-live='polite' className='mt-5 min-h-36 text-center' key={activeRelease.title}>
        <h2 className='text-xl font-medium'>{activeRelease.title}</h2>
        {activeRelease.feature && (
          <div className='mt-1 text-sm text-neutral-800 dark:text-neutral-200'>
            w/ {activeRelease.feature}
          </div>
        )}
        <div className='mt-2 flex flex-wrap items-center justify-center gap-x-2 text-xs text-neutral-600 dark:text-neutral-400'>
          {releaseDetails.map((detail, index) => (
            <React.Fragment key={`${detail}-${index}`}>
              {index > 0 && <span aria-hidden='true'>·</span>}
              <span>{detail}</span>
            </React.Fragment>
          ))}
        </div>
        <div className='mt-4 flex justify-center gap-4'>
          {activeRelease.hrefBandcamp && (
            <a aria-label={`${activeRelease.title} on Bandcamp`} className='flex h-7 w-7 items-center transition hover:scale-110' href={activeRelease.hrefBandcamp} rel='noreferrer' target='_blank'>
              <Image alt='' className='w-7' height='32' src='/bandcamp.svg' width='32' />
            </a>
          )}
          {activeRelease.hrefSpotify && (
            <a aria-label={`${activeRelease.title} on Spotify`} className='w-fit transition hover:scale-110' href={activeRelease.hrefSpotify} rel='noreferrer' target='_blank'>
              <Image alt='' className='w-7' height='32' src='/spotify.png' width='32' />
            </a>
          )}
          {activeRelease.hrefAppleMusic && (
            <a aria-label={`${activeRelease.title} on Apple Music`} className='w-fit transition hover:scale-110' href={activeRelease.hrefAppleMusic} rel='noreferrer' target='_blank'>
              <Image alt='' className='w-7' height='32' src='/applemusic.svg' width='32' />
            </a>
          )}
          {activeRelease.hrefSoundCloud && (
            <a aria-label={`${activeRelease.title} on SoundCloud`} className='flex h-7 w-7 items-center transition hover:scale-110' href={activeRelease.hrefSoundCloud} rel='noreferrer' target='_blank'>
              <Image alt='' className='w-7 dark:invert' height='35' src='/soundcloud.png' style={{ height: 'auto' }} width='76' />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
