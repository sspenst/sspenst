import React from 'react';
import Project from '../components/project';

export default function Projects() {
  return (
    <div className='flex flex-col gap-16 p-8 items-center'>
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
  );
}
