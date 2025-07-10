import Head from 'next/head';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import ExperienceCard from '../components/experinceCard';
import SS from '../components/icons/ss';
import Project from '../components/project';
import ProjectImage from '../components/projectImage';
import Sidebar from '../components/sidebar';
import TimelineDate from '../components/timelineDate';

export default function Index() {
  const [activeSection, setActiveSection] = useState<string | undefined>('intro');

  useEffect(() => {
    function findActiveProject() {
      const projects = document.querySelectorAll('article section');

      for (let i = projects.length - 1; i >= 0; i--) {
        const project = projects[i];
        const rect = project.getBoundingClientRect();

        // NB: corresponds to scroll-mt-20
        if (rect.top <= 81) {
          setActiveSection(project.id);
          break;
        }
      }
    }

    window.addEventListener('scroll', findActiveProject);

    findActiveProject();

    return () => window.removeEventListener('scroll', findActiveProject);
  }, []);

  return (<>
    <Head>
      <title>Spencer Spenst</title>
      <meta name='description' content='Spencer Spenst - sspenst - Software Engineer' />
    </Head>
    <div className='flex justify-center'>
      <div className='flex w-full max-w-7xl'>
        <aside className='hidden lg:flex flex-col gap-8 sticky top-24 w-72 font-medium h-fit'>
          <div className='flex flex-col gap-8 px-8'>
            <div className='flex items-center max-w-full overflow-hidden rounded-full w-48 h-48 shadow-lg'>
              <Image alt='Spencer Spenst headshot' src='me.jpeg' width={2360} height={2360} priority />
            </div>
            <Sidebar
              activeId={activeSection}
              links={[
                { id: 'spencer-spenst', text: 'Spencer Spenst' },
                { id: 'resume', text: 'Resume' },
                { id: 'projects', text: 'Projects' },
                { id: 'thinky', text: 'Thinky.gg', className: 'pl-4' },
                { id: 'rabbit', text: 'Rabbit', className: 'pl-4' },
                { id: 'simplify-youtube', text: 'Simplify YouTube', className: 'pl-4' },
                { id: 'spotify', text: 'Spotify Web API SDK', className: 'pl-4' },
              ]}
            />
          </div>
        </aside>
        <article className='flex flex-col px-8'>
          <section id='spencer-spenst' className='flex items-center justify-center text-center font-semibold text-7xl' style={{
            marginTop: -40,
            minHeight: 400,
          }}>
            <div className='flex w-48 h-48 relative fadeIn'>
              <div className='absolute w-full h-full animateSSPath text-transparent stroke-black dark:stroke-white' style={{
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
                strokeWidth: 0.25,
              }}>
                <SS />
              </div>
            </div>
          </section>
          <div className='flex flex-col items-center mb-20 mx-8 gap-12 text-center'>
            <h1 className='text-6xl font-semibold'>Spencer Spenst</h1>
            <h2 className='text-3xl font-medium'>Software Engineer</h2>
            <h2 className='text-xl'>Abbotsford, BC, Canada</h2>
          </div>
          <section id='resume' className='flex flex-col gap-8 pt-20'>
            <h1 className='text-4xl font-medium'>Resume</h1>
            <a
              className='bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-400 dark:hover:bg-neutral-500 transition border border-neutral-500 font-medium rounded-full px-4 py-1 text-sm flex gap-2 items-center w-fit'
              href='https://docs.google.com/document/d/1gL1KXrNUn85_vCBg0HSqksrrzwW395nFRGiNQQJozR0/edit?usp=sharing'
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
                  company='The Laundry Guy'
                  date='Jan 2024 - Present'
                  href='https://sspenst.com'
                  src='/thelaundryguy.jpeg'
                  title='Freelance Software Developer'
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
          </section>
          <section className='pt-20' id='projects'>
            <h1 className='text-4xl font-medium px-8'>Projects</h1>
          </section>
          <div className='flex flex-col pb-8'>
            <Project
              bgColor='#12033C'
              githubHref='https://github.com/sspenst/thinky.gg'
              href='https://thinky.gg'
              id='thinky'
              srcIcon='/thinky.svg'
              title='Thinky.gg'
            >
              <ProjectImage bgColor='rgb(38 38 38)' src='/pathology-preview.png' title='Pathology Preview' />
              <p>
                <span>
                  A platform dedicated to high-quality puzzle games.
                </span>
                <br /><br />
                <span>Thinky.gg started with Pathology, where the goal is to reach the exit in the least number of moves. Users can create and publish their own levels, review levels, compete against others in multiplayer and on the leaderboards, and much more. Together, Pathology&apos;s community of 2000+ users have built over 7000 levels.
                </span>
                <br /><br />
                <span>
                  Thinky.gg&apos;s second game is called Sokopath. Sokopath is a take on the classic Sokoban block pushing game with the addition of Pathology&apos;s block types. The goal is to push boxes onto every target square. You can also try to optimize your path to compete against other players!
                </span>
              </p>
              <span className='text-sm text-neutral-600 dark:text-neutral-400'>
                January 2022 - Present
              </span>
            </Project>
            <Project
              bgColor='black'
              githubHref='https://github.com/sspenst/rabbit'
              href='https://rabbit.sspenst.com'
              id='rabbit'
              srcIcon='/rabbit.svg'
              title='Rabbit'
            >
              <ProjectImage bgColor='black' src='/rabbit-preview.png' title='Rabbit Preview' />
              <span>
                Discover new tracks using Spotify&apos;s audio features. Select a track to listen to a short preview, then click discover to find similar tracks. Refine your search with audio features and save tracks you enjoy! Rabbit has been approved by the Spotify Developer Platform.
              </span>
              <span className='text-sm text-neutral-600 dark:text-neutral-400'>
                June 2023 - August 2023
              </span>
            </Project>
            <Project
              bgColor='black'
              githubHref='https://github.com/sspenst/simplify-youtube'
              href='https://chromewebstore.google.com/detail/simplify-youtube/lcakcdjbimeedkincdcpphddbjdmdhaa'
              id='simplify-youtube'
              srcIcon='/simplify-youtube.svg'
              title='Simplify YouTube'
            >
              <p>
                Chrome extension to hide YouTube features. Hide Shorts, comments, subscriptions, and more.
              </p>
              <span className='text-sm text-neutral-600 dark:text-neutral-400'>
                March 2024
              </span>
            </Project>
            <Project
              bgColor='white'
              githubHref='https://github.com/spotify/spotify-web-api-ts-sdk'
              href='https://www.npmjs.com/package/@spotify/web-api-ts-sdk'
              id='spotify'
              srcIcon='https://raw.githubusercontent.com/npm/logos/master/npm%20square/n-64.png'
              title='Spotify Web API SDK'
            >
              <p>
                {'Top contributor to '}
                <span className='font-mono text-sm bg-neutral-300 dark:bg-neutral-700 px-1 py-0.5 rounded-md'>@spotify/web-api-ts-sdk</span>
                {' - Spotify\'s official TypeScript SDK for the Spotify Web API. '}
                <a className='hover:text-rose-500 transition font-medium' href='#rabbit'>Rabbit</a>
                {' uses this npm package.'}
              </p>
              <span className='text-sm text-neutral-600 dark:text-neutral-400'>
                June 2023 - July 2023
              </span>
            </Project>
          </div>
        </article>
      </div>
    </div>
  </>);
}
