import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

interface PageProps {
  children: JSX.Element | JSX.Element[];
}

export default function Page({ children }: PageProps) {
  const router = useRouter();

  return (
    <div className='flex flex-col items-center justify-center w-full px-8 py-12 gap-12'>
      <Image alt='ss' src='/ss.svg' width={512} height={512} priority={true} className='w-10' />
      <h1 className='font-semibold text-5xl text-center'>
        Spencer Spenst
      </h1>
      <div className='flex flex-row flex-wrap justify-center gap-8 text-xl'>
        <a target='_blank' rel='noreferrer' href='https://linkedin.com/in/sspenst' className='hover:underline flex flex-row gap-3 items-center flex flex-row gap-3 items-center'>
          <Image alt='linkedin' src='/linkedin.svg' width='32' height='32' className='w-8' />
          LinkedIn
        </a>
        <a target='_blank' rel='noreferrer' href='https://github.com/sspenst' className='hover:underline flex flex-row gap-3 items-center'>
          <Image alt='github' src='/github.svg' width='32' height='32' className='w-8' />
          GitHub
        </a>
        <a href='mailto:spencerspenst@gmail.com' className='hover:underline flex flex-row gap-3 items-center'>
          <Image alt='email' src='/email.svg' width='32' height='32' className='w-8' />
          Email
        </a>
      </div>
      <div className='flex flex-col w-full justify-center text-2xl'>
        <div className='flex flex-row flex-wrap justify-center gap-6 z-10 -my-2'>
          <Link href='/' scroll={false} className={classNames(
            'pb-1 px-1 hover:border-b-2 hover:border-neutral-400',
            router.pathname === '/' ? 'border-b-2 border-white pointer-events-none' : 'text-neutral-400',
          )}>Experience</Link>
          <Link href='/music' scroll={false} className={classNames(
            'pb-1 px-1 hover:border-b-2 hover:border-neutral-400',
            router.pathname === '/music' ? 'border-b-2 border-white pointer-events-none' : 'text-neutral-400',
          )}>Music</Link>
        </div>
      </div>
      {children}
    </div>
  );
}
