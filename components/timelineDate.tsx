import Image from 'next/image';
import React from 'react';

interface TimelineDateProps {
  date: string;
}

export default function TimelineDate({ date }: TimelineDateProps) {
  return (
    <div className='flex flex-row items-center gap-3 text-base text-neutral-400 -ml-8'>
      <Image alt='timeline' src='/timeline.svg' width='32' height='32' className='w-5 h-5 bg-neutral-900' />
      {date}
    </div>
  );
}
