import Image from 'next/image';
import React from 'react';
import TimelineDate from './timelineDate';

interface ExperienceCardProps {
  company: string;
  date: string;
  description?: string;
  href: string;
  img?: React.ReactNode;
  src: string;
  title?: string;
}

export default function ExperienceCard({
  company,
  date,
  description,
  href,
  img,
  src,
  title,
}: ExperienceCardProps) {
  return (<>
    <TimelineDate date={date} />
    <div className='flex items-start gap-3'>
      {img ? img :
        <Image alt={src.split('.')[0]} src={src} width='32' height='32' className='w-8' style={{
          minWidth: '2rem',
        }} />
      }
      <div className='flex flex-col'>
        <a target='_blank' rel='noreferrer' href={href} className='hover:underline text-2xl font-medium w-fit'>
          {company}
        </a>
        {title &&
          <div className='text-xl italic'>
            {title}
          </div>
        }
        {description &&
          <div className='text-lg mt-3'>
            {description}
          </div>
        }
      </div>
    </div>
  </>);
}
