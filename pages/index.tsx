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
      <meta name='description' content='Spencer Spenst is the CTO of LineLint and creator of Thinky.gg, based in Abbotsford, BC.' />
      <link rel='canonical' href='https://sspenst.com/' />
      <meta property='og:type' content='website' />
      <meta property='og:site_name' content='Spencer Spenst' />
      <meta property='og:title' content='Spencer Spenst' />
      <meta property='og:description' content='Spencer Spenst is the CTO of LineLint and creator of Thinky.gg, based in Abbotsford, BC.' />
      <meta property='og:url' content='https://sspenst.com/' />
      <meta property='og:image' content='https://sspenst.com/social-preview.png' />
      <meta property='og:image:type' content='image/png' />
      <meta property='og:image:width' content='1200' />
      <meta property='og:image:height' content='630' />
      <meta property='og:image:alt' content='Spencer Spenst' />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content='Spencer Spenst' />
      <meta name='twitter:description' content='Spencer Spenst is the CTO of LineLint and creator of Thinky.gg, based in Abbotsford, BC.' />
      <meta name='twitter:image' content='https://sspenst.com/social-preview.png' />
      <meta name='twitter:image:alt' content='Spencer Spenst' />
    </Head>
    <div className='flex justify-center'>
      <div className='flex flex-col w-full gap-6 text-sm px-8 pt-6 pb-12 max-w-2xl'>
        <RevealText className='flex flex-col gap-6'>
          <p>
            I was born and raised in Abbotsford, BC, Canada, and am currently living there with my beautiful wife <FaviconLink faviconClassName='dark:invert' faviconHref='/kevina.svg' href='https://kevina.ca'>Kevina</FaviconLink>.
          </p>
          <p>
            I&apos;m the CTO of <FaviconLink href='https://linelint.com'>LineLint</FaviconLink>, a cost reduction platform for uniform & linen rentals.
          </p>
          <p>
            Previously, I built <FaviconLink href='https://thinky.gg'>Thinky.gg</FaviconLink> - a platform for pathfinding and optimization puzzles. The community has created thousands of levels for its two games: <FaviconLink faviconHref='/pathology.svg' href='https://pathology.thinky.gg'>Pathology</FaviconLink> and <FaviconLink href='https://sokopath.thinky.gg'>Sokopath</FaviconLink>.
          </p>
          <p>
            Before this, I worked on the Universal Store at <FaviconLink href='https://microsoft.com'>Microsoft</FaviconLink>, building regional pricing tools for Store and Xbox publishers, and pricing and availability pages for VMs, SaaS, Azure Apps, and Office Add-ins.
          </p>
          <p>
            I studied Computer Engineering at <FaviconLink href='https://ubc.ca'>UBC</FaviconLink>, where I also worked as a research assistant optimizing machine learning workloads on GPUs using CUDA.
          </p>
          <p>
            I like to build solutions to problems I see in my own life. I made <FaviconLink href='https://chromewebstore.google.com/detail/simplify-youtube/lcakcdjbimeedkincdcpphddbjdmdhaa'>Simplify YouTube</FaviconLink> to remove Shorts and other distracting elements, and I was a top contributor to the <FaviconLink href='https://www.npmjs.com/package/@sspenst/spotify-web-api'>Spotify Web API</FaviconLink> npm package so I could build <FaviconLink darkFaviconHref='/rabbit.svg' faviconHref='/rabbit-light.svg' href='https://rabbit.sspenst.com'>Rabbit</FaviconLink>, a quick way to discover new music.
          </p>
          <p>
            <TransitionLink className='font-medium hover:text-orange-500 dark:hover:text-orange-400 transition' href='/music'>I also release music as sspenst.</TransitionLink>
          </p>
          <p>
            Feel free to connect through <FaviconLink faviconClassName='dark:invert' faviconHref='/github.svg' href='https://github.com/sspenst'>GitHub</FaviconLink>, <FaviconLink href='https://linkedin.com/in/sspenst'>LinkedIn</FaviconLink>, or <a className='whitespace-nowrap font-medium hover:text-orange-500 dark:hover:text-orange-400 transition' href='mailto:spencerspenst@gmail.com'><EnvelopeIcon aria-hidden='true' className='inline-block w-4 h-4 mr-1 align-[-0.125em]' />email</a>!
          </p>
          <p className='text-end text-neutral-500'>
            Updated November 23, 2026
          </p>
        </RevealText>
      </div>
    </div>
  </>);
}
