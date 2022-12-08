import classNames from 'classnames';
import Head from 'next/head';
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
    <div className={classNames('flex items-center justify-center text-center font-semibold text-7xl h-screen w-screen absolute', animating ? 'animateName' : 'hidden')}>
      Spencer Spenst
    </div>
    <div className={classNames('flex flex-col items-center justify-center h-screen w-screen', animating ? 'animateMain' : 'block')}>
      <div className='flex flex-row grow w-full'>
        <div className='flex flex-col justify-center text-center items-center grow m-8 p-4 gap-4 text-2xl'>
          <div className='font-semibold text-5xl mb-8'>
            Spencer Spenst
          </div>
          <Link href='https://pathology.gg' className='underline'>
            Pathology
          </Link>
          <Link href='https://linkedin.com/in/sspenst' className='underline'>
            LinkedIn
          </Link>
          <Link href='https://github.com/sspenst' className='underline'>
            GitHub
          </Link>
          <Link href='/music' className='underline'>
            Music
          </Link>
        </div>
      </div>
    </div>
  </>);
}
