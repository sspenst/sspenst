import Image from 'next/image';
import React from 'react';

interface TimelineDateProps {
  date: string;
}

export default function TimelineDate({ date }: TimelineDateProps) {
  return (
    <div className='flex items-center gap-3 text-base text-neutral-300 -ml-8'>
      <Image alt='timeline' src='/timeline.svg' width='32' height='32' className='w-5 h-5' />
      {date}
    </div>
  );
}
