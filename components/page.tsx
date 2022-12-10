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
    <div className='flex flex-col items-center justify-center w-full px-8 pt-12 pb-8 gap-12 text-xl'>
      <Image alt='ss' src='/ss.png' width={512} height={512} priority={true} className='w-10' />
      <h1 className='font-semibold text-5xl text-center'>
        Spencer Spenst
      </h1>
      <div className='flex flex-row flex-wrap justify-center gap-8'>
        <Link href='https://linkedin.com/in/sspenst' className='hover:underline flex flex-row gap-3 items-center flex flex-row gap-3 items-center'>
          <Image alt='linkedin' src='/linkedin.svg' width='32' height='32' className='w-8' />
          LinkedIn
        </Link>
        <Link href='https://github.com/sspenst' className='hover:underline flex flex-row gap-3 items-center'>
          <Image alt='github' src='/github.svg' width='32' height='32' className='w-8' />
          GitHub
        </Link>
        <a href='mailto:spencerspenst@gmail.com' className='hover:underline flex flex-row gap-3 items-center'>
          <Image alt='github' src='/mail.svg' width='32' height='32' className='w-8' />
          Email
        </a>
      </div>
      <div className='flex flex-col w-full justify-center text-2xl'>
        <div className='flex flex-row flex-wrap justify-center gap-6 z-10 -my-2'>
          <Link href='/' className={classNames('pb-1 px-1 hover:underline', { 'border-b-2 border-neutral-500 pointer-events-none': router.pathname === '/' })}>Experience</Link>
          <Link href='/music' className={classNames('pb-1 px-1 hover:underline', { 'border-b-2 border-neutral-500 pointer-events-none': router.pathname === '/music' })}>Music</Link>
        </div>
      </div>
      {children}
    </div>
  );
}
