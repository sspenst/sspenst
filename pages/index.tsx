import { EnvelopeIcon } from '@heroicons/react/24/solid';
import Head from 'next/head';
import React from 'react';
import FaviconLink from '../components/faviconLink';
import { TransitionLink } from '../components/pageTransition';
import RevealText from '../components/revealText';

export default function Index() {
  return (<>
    <Head>
      <title>Spencer Spenst</title>
    </Head>
    <div className='flex justify-center'>
      <div className='flex flex-col w-full gap-6 text-sm px-8 pt-6 pb-12 max-w-2xl'>
        <RevealText className='flex flex-col gap-6'>
          <p>
            I was born and raised in Abbotsford, BC, Canada, and am currently living there with my beautiful wife <FaviconLink faviconHref='https://kevina.ca/favicon.png?v=2' href='https://kevina.ca'>Kevina</FaviconLink> while working as the CTO of <FaviconLink href='https://linelint.com'>LineLint</FaviconLink>, a uniform rental cost reduction platform.
          </p>
          <p>
            Previously, I built <FaviconLink href='https://thinky.gg'>Thinky.gg</FaviconLink> - a platform for pathfinding and optimization puzzles. The community has created thousands of high-quality levels for its 2 games: <FaviconLink href='https://pathology.thinky.gg'>Pathology</FaviconLink> and <FaviconLink href='https://sokopath.thinky.gg'>Sokopath</FaviconLink>.
          </p>
          <p>
            Before this, I worked at <FaviconLink href='https://microsoft.com'>Microsoft</FaviconLink> to help build out the Universal Store, add new pricing systems, and support new product types.
          </p>
          <p>
            I graduated from <FaviconLink href='https://www.ubc.ca/'>UBC</FaviconLink> in Computer Engineering. While I was there I had the chance to work as a research assistant focusing on GPU optimizations for machine learning.
          </p>
          <p>
            I like to build solutions to problems I see in my own life. I made <FaviconLink href='https://chromewebstore.google.com/detail/simplify-youtube/lcakcdjbimeedkincdcpphddbjdmdhaa'>Simplify YouTube</FaviconLink> to remove Shorts and other distracting UX elements. I was also a top contributor to the <FaviconLink href='https://www.npmjs.com/package/@sspenst/spotify-web-api'>Spotify Web API</FaviconLink> so that I could build <FaviconLink href='https://rabbit.sspenst.com'>Rabbit</FaviconLink>, a quick way to discover new music.
          </p>
          <p>
            I&apos;ve also made some music myself which you can check out <TransitionLink className='font-medium hover:text-rose-500 transition' href='/music'>here</TransitionLink>.
          </p>
          <p>
            Feel free to connect through <FaviconLink href='https://github.com/sspenst'>GitHub</FaviconLink>, <FaviconLink href='https://linkedin.com/in/sspenst'>LinkedIn</FaviconLink>, or <a className='whitespace-nowrap font-medium hover:text-rose-500 transition' href='mailto:spencerspenst@gmail.com'><EnvelopeIcon aria-hidden='true' className='inline-block w-4 h-4 mr-1 align-[-0.125em]' />email</a>!
          </p>
          <p className='text-end text-neutral-500'>
            September 22, 2026
          </p>
        </RevealText>
      </div>
    </div>
  </>);
}
