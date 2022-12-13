import React from 'react';
import ExperienceCard from '../components/experinceCard';
import Page from '../components/page';
import TimelineDate from '../components/timelineDate';

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
          <ExperienceCard
            company='Pathology'
            date='Jan 2022 - Present'
            description='Shortest path puzzle game'
            href='https://pathology.gg'
            src='/pathology.svg'
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
    </Page>
  );
}
