import classNames from 'classnames';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useEffect } from 'react';
import { AppContext } from '../contexts/appContext';

export default function Home() {
  const { animating, setAnimating } = useContext(AppContext);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
    }, 3000);
  }, [setAnimating]);

  return (<>
    <Head>
      <title>sspenst</title>
    </Head>
    <div className={classNames('flex fixed inset-0 items-center justify-center text-center font-semibold text-7xl', animating ? 'animateName' : 'hidden')}>
      <div className='flex flex-row w-48'>
        <Image alt='ss' src='/ss.png' width={512} height={512} />
      </div>
    </div>
    <div className={classNames('flex flex-col items-center justify-center w-screen', animating ? 'animateMain' : 'block')}>
      <div className='flex flex-row grow w-full'>
        <div className='flex flex-col justify-center text-center items-center grow m-8 p-4 gap-4 text-2xl'>
          <div className='font-semibold text-5xl mb-8'>
            Spencer Spenst
          </div>
          <div className='flex flex-row flex-wrap justify-center gap-8'>
            <div className='flex flex-row gap-3 items-center'>
              <Image alt='linkedin' src='/linkedin.svg' width='32' height='32' className='w-8' />
              <Link href='https://linkedin.com/in/sspenst' className='hover:underline'>
                LinkedIn
              </Link>
            </div>
            <div className='flex flex-row gap-3 items-center'>
              <Image alt='github' src='/github.svg' width='32' height='32' className='w-8' />
              <Link href='https://github.com/sspenst' className='hover:underline'>
                GitHub
              </Link>
            </div>
            <div className='flex flex-row gap-3 items-center'>
              <Image alt='github' src='/mail.svg' width='32' height='32' className='w-8' />
              <a href='mailto:spencerspenst@gmail.com' className='hover:underline'>Email</a>
            </div>
          </div>
          <div className='flex flex-col gap-4 m-8'>
            <div className='flex flex-row gap-3 items-center'>
              <Image alt='pathology' src='/pathology.svg' width='32' height='32' className='w-8' />
              <Link href='https://pathology.gg' className='hover:underline'>
                Pathology
              </Link>
            </div>
            <div className='flex flex-row gap-3 items-center'>
              <Image alt='github' src='/music.svg' width='32' height='32' className='w-8' />
              <Link href='/music' className='hover:underline'>
                Music
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>);
}
