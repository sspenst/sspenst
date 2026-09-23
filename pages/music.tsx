import Head from 'next/head';
import React from 'react';
import FaviconLink from '../components/faviconLink';
import ReleaseShelf, { Release } from '../components/releaseShelf';

const releases: Release[] = [
  {
    hrefAppleMusic: 'https://music.apple.com/us/album/ephemeral/6792182451',
    hrefBandcamp: 'https://sspenst.bandcamp.com/album/ephemeral',
    hrefSoundCloud: 'https://soundcloud.com/sspenst/sets/ephemeral',
    hrefSpotify: 'https://open.spotify.com/album/6aIrRJPpDc90XbEYyDnoEI',
    info: ['Album', '7 songs', '10:49'],
    releaseDate: '2026-07-17',
    src: 'ephemeral.jpeg?v=1',
    title: 'ephemeral',
  },
  {
    hrefAppleMusic: 'https://music.apple.com/us/album/turbine/1652622865',
    hrefBandcamp: 'https://sspenst.bandcamp.com/track/turbine',
    hrefSoundCloud: 'https://soundcloud.com/sspenst/turbine',
    hrefSpotify: 'https://open.spotify.com/album/4r6LvBdQFye0qBfdm9BuT3',
    info: ['Single', '1:52'],
    releaseDate: '2022-11-02',
    src: 'turbine.png',
    title: 'turbine',
  },
  {
    feature: 'N E T W O R K',
    hrefSoundCloud: 'https://soundcloud.com/n_e_t_w_o_r_k/expanse-w-sspenst',
    info: ['Single', '2:02'],
    releaseDate: '2022-09-06',
    src: 'expanse.jpeg',
    title: 'expanse',
  },
  {
    hrefAppleMusic: 'https://music.apple.com/us/album/re-ep/1592628164',
    hrefBandcamp: 'https://sspenst.bandcamp.com/album/re',
    hrefSoundCloud: 'https://soundcloud.com/sspenst/sets/re_ep',
    hrefSpotify: 'https://open.spotify.com/album/3NQEsxiwMrpQF1pN9w7XbR',
    info: ['EP', '4 songs', '7:11'],
    releaseDate: '2021-10-28',
    src: 're.png',
    title: 're',
  },
  {
    feature: 'N E T W O R K',
    hrefSoundCloud: 'https://soundcloud.com/n_e_t_w_o_r_k/uplift-w-sspenst',
    info: ['Single', '2:04'],
    releaseDate: '2021-10-05',
    src: 'uplift.jpeg',
    title: 'uplift',
  },
  {
    hrefAppleMusic: 'https://music.apple.com/us/album/practice-single/1895442355',
    hrefBandcamp: 'https://sspenst.bandcamp.com/track/practice',
    hrefSoundCloud: 'https://soundcloud.com/sspenst/practice',
    hrefSpotify: 'https://open.spotify.com/album/0AYabae2TkwyL0nrG30MQH',
    info: ['Single', '1:37'],
    releaseDate: '2021-09-05',
    src: '200930.jpeg?v=1',
    title: 'practice',
  },
];

export default function Music() {
  return (<>
    <Head>
      <title>Music - Spencer Spenst</title>
      <meta name='description' content='Music released by Spencer Spenst as sspenst.' />
      <link rel='canonical' href='https://sspenst.com/music' />
      <meta name='robots' content='nosnippet' />
    </Head>
    <div className='flex justify-center'>
      <div className='flex w-full max-w-2xl flex-col items-center gap-4 px-4 pt-4 pb-12 sm:px-8 sm:pt-6'>
        <p className='w-full px-4 pt-2 pb-6 text-sm sm:px-0 sm:pt-0'>
          One of my hobbies over the years has been music. You can check me out on <FaviconLink href='https://sspenst.bandcamp.com'>Bandcamp</FaviconLink>, <FaviconLink href='https://open.spotify.com/artist/7yWCWPWpYoj22kUps71yey'>Spotify</FaviconLink>, <FaviconLink href='https://music.apple.com/us/artist/sspenst/1592620337'>Apple Music</FaviconLink>, <FaviconLink href='https://soundcloud.com/sspenst'>SoundCloud</FaviconLink>, or look through my projects below.
        </p>
        <ReleaseShelf releases={releases} />
      </div>
    </div>
  </>);
}
