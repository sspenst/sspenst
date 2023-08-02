import Head from 'next/head';
import React from 'react';
import Project from '../components/project';

export default function Projects() {
  return (<>
    <Head>
      <title>Projects</title>
      <meta name='robots' content='nosnippet' />
    </Head>
    <div className='flex flex-col gap-16 pb-8 items-center'>
      <h1 className='text-4xl font-medium'>Projects</h1>
      <Project
        bgColor='rgb(38 38 38)'
        description='Shortest path puzzle game'
        href='https://pathology.gg'
        title='Pathology'
      />
      <Project
        bgColor='black'
        description='Discover new tracks using Spotify&apos;s audio features'
        href='https://rabbit.sspenst.com'
        title='Rabbit'
      />
    </div>
  </>);
}
