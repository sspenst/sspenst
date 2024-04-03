import Head from 'next/head';
import React from 'react';
import ExperienceCard from '../components/experinceCard';
import TimelineDate from '../components/timelineDate';

export default function Resume() {
  return (<>
    <Head>
      <title>Resume</title>
      <meta name='robots' content='nosnippet' />
    </Head>
    <div className='flex flex-col items-center gap-8'>
      <h1 className='text-4xl font-medium'>Resume</h1>
      <a
        className='bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-400 dark:hover:bg-neutral-500 transition border border-neutral-500 font-medium rounded-full px-4 py-1 text-sm flex gap-2 items-center'
        href='https://docs.google.com/document/d/1a5Q5fjh4X7p8USJ1YaxuNtsuflQN3chaUBPWK7YmSQw/edit?usp=sharing'
        rel='noreferrer'
        style={{
          WebkitMaskImage: 'linear-gradient(to bottom , black, rgba(0, 0, 0, 0.8))',
          maskImage: 'linear-gradient(to bottom , black, rgba(0, 0, 0, 0.8))',
        }}
        target='_blank'
      >
        <span>Full resume</span>
        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-4 h-4'>
          <path strokeLinecap='round' strokeLinejoin='round' d='M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25' />
        </svg>
      </a>
      <div className='flex mt-6 mb-12'>
        <div className='w-11 flex justify-center' style={{
          minWidth: '2.75rem',
        }}>
          <div className='w-px rounded-full bg-neutral-700 dark:bg-neutral-400 h-full' />
        </div>
        <div className='grow flex flex-col my-1 gap-6'>
          <ExperienceCard
            company='Spencer Spenst'
            date='Jan 2024 - Present'
            href='https://sspenst.com'
            src='/ss.svg'
            title='Freelance software developer'
          />
          <ExperienceCard
            company='Thinky.gg'
            date='Jan 2022 - Present'
            description='A platform dedicated to high-quality puzzle games'
            href='https://thinky.gg'
            src='/thinky.svg'
            title='Founder'
          />
          <ExperienceCard
            company='Microsoft'
            date='Aug 2018 - Jun 2021'
            description='Universal Store, Pricing and Availability'
            href='https://microsoft.com'
            src='/microsoft.svg'
            title='Software Engineer'
          />
          <TimelineDate date='May 2018 - Graduated UBC - BASc Computer Engineering' />
          <ExperienceCard
            company='Microsoft'
            date='May 2017 - Aug 2017'
            description='Universal Store'
            href='https://microsoft.com'
            src='/microsoft.svg'
            title='Software Developer Intern'
          />
          <ExperienceCard
            company='University of British Columbia'
            date='Sep 2016 - Dec 2016'
            description='Introduction to Microcomputers'
            href='https://ubc.ca'
            src='/ubc.png'
            title='Teacher Assistant'
          />
          <ExperienceCard
            company='University of British Columbia'
            date='May 2016 - Aug 2016'
            description='Computer Engineering Department'
            href='https://ubc.ca'
            src='/ubc.png'
            title='Research Assistant'
          />
          <TimelineDate date='Sep 2014 - Entered UBC' />
        </div>
      </div>
    </div>
  </>);
}
