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
          <a className='hover:text-rose-500' href='#pathology'>Pathology</a>
          <a className='hover:text-rose-500' href='#rabbit'>Rabbit</a>
          <a className='hover:text-rose-500' href='#spotify'>Spotify Web API SDK</a>
        </div>
        <div className='flex flex-col pb-8 lg:pl-72'>
          <h1 className='text-4xl font-medium px-8'>Projects</h1>
          <div className='flex'>
            <div className='flex flex-col pb-8 items-center'>
              <Project
                bgColor='rgb(38 38 38)'
                description='Shortest path puzzle game'
                href='https://pathology.gg'
                id='pathology'
                title='Pathology'
              />
              <Project
                bgColor='black'
                description='Discover new tracks using Spotify&apos;s audio features'
                href='https://rabbit.sspenst.com'
                id='rabbit'
                title='Rabbit'
              />
              <Project
                description='TypeScript SDK for the Spotify Web API'
                href='https://github.com/spotify/spotify-web-api-ts-sdk'
                id='spotify'
                title='Spotify Web API SDK'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </>);
}
