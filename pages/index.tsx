import Image from 'next/image';
import React from 'react';
import ExperienceCard from '../components/experinceCard';
import Page from '../components/page';

export default function Home() {
  return (
    <Page>
      <div className='flex flex-row'>
        <div className='w-11 flex justify-center' style={{
          minWidth: '2.75rem',
        }}>
          <div className='w-0.5 rounded bg-neutral-700 h-full' />
        </div>
        <div className='grow flex flex-col my-1 gap-6'>
          <div className='flex flex-row items-center gap-3 text-base text-neutral-400 -ml-8'>
            <Image alt='timeline' src='/timeline.svg' width='32' height='32' className='w-5 h-5 bg-neutral-900' />
            Jan 2022 - Present
          </div>
          <ExperienceCard
            company='Pathology'
            description='Shortest path puzzle game'
            href='https://pathology.gg'
            src='/pathology.svg'
            title='Founder'
          />
          <div className='flex flex-row items-center gap-3 text-base text-neutral-400 -ml-8'>
            <Image alt='timeline' src='/timeline.svg' width='32' height='32' className='w-5 h-5 bg-neutral-900' />
            Aug 2018 - Jun 2021
          </div>
          <ExperienceCard
            company='Microsoft'
            description='Universal Store, Pricing and Availability'
            href='https://microsoft.com'
            src='/microsoft.svg'
            title='Software Engineer'
          />
          <div className='flex flex-row items-center gap-3 text-base text-neutral-400 -ml-8'>
            <Image alt='timeline' src='/timeline.svg' width='32' height='32' className='w-5 h-5 bg-neutral-900' />
            May 2018 - Graduated UBC - BASc Computer Engineering
          </div>
          <div className='flex flex-row items-center gap-3 text-base text-neutral-400 -ml-8'>
            <Image alt='timeline' src='/timeline.svg' width='32' height='32' className='w-5 h-5 bg-neutral-900' />
            May 2017 - Aug 2017
          </div>
          <ExperienceCard
            company='Microsoft'
            description='Universal Store'
            href='https://microsoft.com'
            src='/microsoft.svg'
            title='Software Developer Intern'
          />
          <div className='flex flex-row items-center gap-3 text-base text-neutral-400 -ml-8'>
            <Image alt='timeline' src='/timeline.svg' width='32' height='32' className='w-5 h-5 bg-neutral-900' />
            Sep 2016 - Dec 2016
          </div>
          <ExperienceCard
            company='University of British Columbia'
            description='Introduction to Microcomputers'
            href='https://ubc.ca'
            src='/ubc.png'
            title='Teacher Assistant'
          />
          <div className='flex flex-row items-center gap-3 text-base text-neutral-400 -ml-8'>
            <Image alt='timeline' src='/timeline.svg' width='32' height='32' className='w-5 h-5 bg-neutral-900' />
            May 2016 - Aug 2016
          </div>
          <ExperienceCard
            company='University of British Columbia'
            description='Computer Engineering Department'
            href='https://ubc.ca'
            src='/ubc.png'
            title='Research Assistant'
          />
          <div className='flex flex-row items-center gap-3 text-base text-neutral-400 -ml-8'>
            <Image alt='timeline' src='/timeline.svg' width='32' height='32' className='w-5 h-5 bg-neutral-900' />
            Sep 2014 - Entered UBC
          </div>
        </div>
      </div>
    </Page>
  );
}
