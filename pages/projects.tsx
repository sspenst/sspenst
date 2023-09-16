import classNames from 'classnames';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import Project from '../components/project';

interface SidebarLink {
  id: string;
  text: string;
}

interface SidebarProps {
  activeId?: string;
  links: SidebarLink[];
}

function Sidebar({ activeId, links }: SidebarProps) {
  return (
    <div className='hidden lg:flex flex-col gap-2 fixed w-72 px-8 py-4 font-medium' id='sidebar'>
      {links.map(link => {
        return (
          <a
            className={classNames('hover:text-rose-500 transition w-fit', { 'text-rose-500': activeId === link.id })}
            href={`#${link.id}`}
            key={`sidebar-link-${link.id}`}
          >
            {link.text}
          </a>
        );
      })}
    </div>
  );
}

export default function Projects() {
  const [activeProject, setActiveProject] = useState<string | undefined>('pathology');

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
        <Sidebar
          activeId={activeProject}
          links={[
            { id: 'pathology', text: 'Pathology' },
            { id: 'rabbit', text: 'Rabbit' },
            { id: 'spotify', text: 'Spotify Web API SDK' },
          ]}
        />
        <div className='flex flex-col lg:pl-72'>
          <h1 className='text-4xl font-medium px-8'>Projects</h1>
          <div className='flex flex-col pb-8' id='projects'>
            <Project
              bgColor='rgb(38 38 38)'
              description={<>
                <span>The goal of Pathology is simple: Get to the exit in the least number of moves. Sounds easy right? Yet, this game is one of the most mind-bending puzzle games you will find. Different blocks stand in your way to the exit, and your job is to figure out the optimal route.</span>
                <br /><br />
                <span>An active community of over one thousand users has helped build over 5000 levels. A level and collection editor allows you to build your own challenging levels for the Pathology community. Pathology also has an official campaign, multiplayer, review system, leaderboards, and much more!</span>

              </>}
              href='https://pathology.gg'
              id='pathology'
              srcIcon='/pathology.svg'
              srcPreview='/pathology-preview.png'
              title='Pathology'
            />
            <Project
              bgColor='black'
              description='Discover new tracks using Spotify&apos;s audio features. Select a track to listen to a short preview, then click discover to find similar tracks. Refine your search with audio features and save tracks you enjoy! Rabbit has been approved by the Spotify Developer Platform.'
              href='https://rabbit.sspenst.com'
              id='rabbit'
              srcIcon='/rabbit.svg'
              srcPreview='/rabbit-preview.png'
              title='Rabbit'
            />
            <Project
              bgColor='white'
              description={
                <span>
                  {'Top contributor to '}
                  <span className='font-mono text-sm bg-neutral-300 dark:bg-neutral-700 px-1 py-0.5 rounded-md'>@spotify/web-api-ts-sdk</span>
                  {' - Spotify\'s official TypeScript SDK for the Spotify Web API. '}
                  <a className='hover:text-rose-500 transition font-medium' href='#rabbit'>Rabbit</a>
                  {' uses this npm package.'}
                </span>
              }
              href='https://github.com/spotify/spotify-web-api-ts-sdk'
              id='spotify'
              srcIcon='https://raw.githubusercontent.com/npm/logos/master/npm%20square/n-64.png'
              title='Spotify Web API SDK'
            />
          </div>
        </div>
      </div>
    </div>
  </>);
}
