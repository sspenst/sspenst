import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
import MusicCard from '../components/musicCard';

export default function Music() {
  return (<>
    <Head>
      <title>Music - Spencer Spenst</title>
      <meta name='description' content='Music released by Spencer Spenst as sspenst.' />
      <link rel='canonical' href='https://sspenst.com/music' />
      <meta name='robots' content='nosnippet' />
    </Head>
    <div className='flex justify-center'>
      <div className='flex flex-col items-center gap-6 w-full max-w-2xl px-8 pt-6 pb-12'>
        <div className='flex flex-wrap justify-center gap-6 text-lg m-2'>
          <a target='_blank' rel='noreferrer' href='https://sspenst.bandcamp.com' className='flex gap-3 items-center hover:scale-110 transition'>
            <Image alt='sspenst bandcamp' src='/bandcamp.svg' width='32' height='32' className='w-8' />
          </a>
          <a target='_blank' rel='noreferrer' href='https://open.spotify.com/artist/7yWCWPWpYoj22kUps71yey' className='flex gap-3 items-center hover:scale-110 transition'>
            <Image alt='sspenst spotify' src='/spotify.png' width='32' height='32' className='w-8' />
          </a>
          <a target='_blank' rel='noreferrer' href='https://music.apple.com/us/artist/sspenst/1592620337' className='flex gap-3 items-center hover:scale-110 transition'>
            <Image alt='sspenst apple music' src='/applemusic.svg' width='32' height='32' className='w-8' />
          </a>
          <a target='_blank' rel='noreferrer' href='https://soundcloud.com/sspenst' className='flex gap-3 items-center hover:scale-110 transition'>
            <Image alt='sspenst soundcloud' src='/soundcloud.png' width='76' height='35' className='w-8 dark:invert' style={{ height: 'auto' }} />
          </a>
        </div>
        <MusicCard
          hrefAppleMusic='https://music.apple.com/us/album/ephemeral/6792182451'
          hrefBandcamp='https://sspenst.bandcamp.com/album/ephemeral'
          hrefSoundCloud='https://soundcloud.com/sspenst/sets/ephemeral'
          hrefSpotify='https://open.spotify.com/album/6aIrRJPpDc90XbEYyDnoEI'
          info={['Album', '7 songs', '10:49']}
          loading='eager'
          releaseDate='2026-07-17'
          src='ephemeral.jpeg?v=1'
          title='ephemeral'
        />
        <MusicCard
          hrefAppleMusic='https://music.apple.com/us/album/turbine/1652622865'
          hrefBandcamp='https://sspenst.bandcamp.com/track/turbine'
          hrefSoundCloud='https://soundcloud.com/sspenst/turbine'
          hrefSpotify='https://open.spotify.com/album/4r6LvBdQFye0qBfdm9BuT3'
          info={['Single', '1:52']}
          releaseDate='2022-11-02'
          src='turbine.png'
          title='turbine'
        />
        <MusicCard
          feature='N E T W O R K'
          hrefSoundCloud='https://soundcloud.com/n_e_t_w_o_r_k/expanse-w-sspenst'
          info={['Single', '2:02']}
          releaseDate='2022-09-06'
          src='expanse.jpeg'
          title='expanse'
        />
        <MusicCard
          hrefAppleMusic='https://music.apple.com/us/album/re-ep/1592628164'
          hrefBandcamp='https://sspenst.bandcamp.com/album/re'
          hrefSoundCloud='https://soundcloud.com/sspenst/sets/re_ep'
          hrefSpotify='https://open.spotify.com/album/3NQEsxiwMrpQF1pN9w7XbR'
          info={['EP - 4 songs', '7:11']}
          releaseDate='2021-10-28'
          src='re.png'
          title='re'
        />
        <MusicCard
          feature='N E T W O R K'
          hrefSoundCloud='https://soundcloud.com/n_e_t_w_o_r_k/uplift-w-sspenst'
          info={['Single', '2:04']}
          releaseDate='2021-10-05'
          src='uplift.jpeg'
          title='uplift'
        />
        <MusicCard
          hrefAppleMusic='https://music.apple.com/us/album/practice-single/1895442355'
          hrefBandcamp='https://sspenst.bandcamp.com/track/practice'
          hrefSoundCloud='https://soundcloud.com/sspenst/practice'
          hrefSpotify='https://open.spotify.com/album/0AYabae2TkwyL0nrG30MQH'
          info={['Single', '1:37']}
          releaseDate='2021-09-05'
          src='200930.jpeg?v=1'
          title='practice'
        />
      </div>
    </div>
  </>);
}
