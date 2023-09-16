import Head from 'next/head';
import React from 'react';
import Project from '../components/project';

export default function Projects() {
  return (<>
    <Head>
      <title>Projects</title>
      <meta name='robots' content='nosnippet' />
    </Head>
    <div className='flex justify-center'>
      <div className='w-full max-w-7xl'>
        <div className='hidden lg:flex flex-col gap-2 fixed w-72 px-8 py-4 font-medium'>
          <a className='hover:text-rose-500 transition w-fit' href='#pathology'>Pathology</a>
          <a className='hover:text-rose-500 transition w-fit' href='#rabbit'>Rabbit</a>
          <a className='hover:text-rose-500 transition w-fit' href='#spotify'>Spotify Web API SDK</a>
        </div>
        <div className='flex flex-col pb-8 lg:pl-72'>
          <h1 className='text-4xl font-medium px-8'>Projects</h1>
          <div className='flex'>
            <div className='flex flex-col pb-8'>
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
    </div>
  </>);
}
