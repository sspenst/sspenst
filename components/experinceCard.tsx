import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface ExperienceCardProps {
  company: string;
  description: string;
  href: string;
  imageClassName?: string;
  src: string;
  title: string;
}

export default function ExperienceCard({ company, description, href, imageClassName, src, title }: ExperienceCardProps) {
  return (
    <div className='flex flex-row items-start gap-3'>
      <Image alt={src.split('.')[0]} src={src} width='32' height='32' className={classNames('w-8', imageClassName)} style={{
        minWidth: '2rem',
      }} />
      <div className='flex flex-col'>
        <Link href={href} className='hover:underline text-2xl font-medium w-fit'>
          {company}
        </Link>
        <div className='text-xl italic'>
          {title}
        </div>
        <div className='text-lg mt-3'>
          {description}
        </div>
      </div>
    </div>
  );
}
