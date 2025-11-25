import Head from 'next/head';
import React from 'react';
import SS from '../components/icons/ss';
import Project from '../components/project';
import ProjectImage from '../components/projectImage';

export default function Index() {
  return (<>
    <Head>
      <title>Spencer Spenst</title>
      <meta name='description' content='Spencer Spenst - sspenst - Software Engineer' />
    </Head>
    <div className='flex justify-center'>
      <div className='flex w-full max-w-6xl'>
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
                <span>Thinky.gg started with Pathology, where the goal is to reach the exit in the least number of moves. Users can create and publish their own levels, review levels, compete against others in multiplayer and on the leaderboards, and much more.
                </span>
                <br /><br />
                <span>
                  Thinky.gg&apos;s second game is called Sokopath. Sokopath is a take on the classic Sokoban block pushing game with the addition of Pathology&apos;s block types. The goal is to push boxes onto every target square. You can also try to optimize your path to compete against other players!
                </span>
              </p>
            </Project>
            <Project
              bgColor='black'
              githubHref='https://github.com/sspenst/spotify-web-api'
              href='https://www.npmjs.com/package/@sspenst/spotify-web-api'
              id='spotify'
              srcIcon='/spotify.png'
              title='@sspenst/spotify-web-api'
            >
              <p>
                {'TypeScript SDK for the Spotify Web API. '}
                <a className='hover:text-rose-500 transition font-medium' href='#rabbit'>Rabbit</a>
                {' uses this npm package.'}
              </p>
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
            </Project>
          </div>
        </article>
      </div>
    </div>
  </>);
}
