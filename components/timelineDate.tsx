import React from 'react';
import Timeline from './icons/timeline';

interface TimelineDateProps {
  date: string;
}

export default function TimelineDate({ date }: TimelineDateProps) {
  return (
    <div className='flex items-center gap-3 text-base text-neutral-700 dark:text-neutral-300 -ml-8'>
      <div className='w-5 h-5 text-neutral-600 dark:text-neutral-400'>
        <Timeline />
      </div>
      {date}
    </div>
  );
}
