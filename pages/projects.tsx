import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import Project from '../components/project';
import ProjectImage from '../components/projectImage';
import Sidebar from '../components/sidebar';

export default function Projects() {
  const [activeProject, setActiveProject] = useState<string | undefined>('thinky');

  useEffect(() => {
    function findActiveProject() {
      const projects = document.querySelectorAll('#projects h2');

      for (let i = projects.length - 1; i >= 0; i--) {
        const project = projects[i];
        const rect = project.getBoundingClientRect();

        // NB: corresponds to pt-20 from Project
        if (rect.top <= 80) {
          setActiveProject(project.parentElement?.id);
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
      <title>Projects</title>
      <meta name='robots' content='nosnippet' />
    </Head>
    <div className='flex justify-center'>
      <div className='w-full max-w-7xl'>
        <aside className='hidden lg:block fixed w-72 px-8 py-4'>
          <Sidebar
            activeId={activeProject}
            links={[
              { id: 'thinky', text: 'Thinky.gg' },
              { id: 'rabbit', text: 'Rabbit' },
              { id: 'simplify-youtube', text: 'Simplify YouTube' },
              { id: 'spotify', text: 'Spotify Web API SDK' },
            ]}
          />
        </aside>
        <div className='flex flex-col lg:pl-72'>
          <h1 className='text-4xl font-medium px-8'>Projects</h1>
          <div className='flex flex-col pb-8' id='projects'>
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
        </div>
      </div>
    </div>
  </>);
}
