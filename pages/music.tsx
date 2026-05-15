import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
import MusicCard from '../components/musicCard';

export default function Music() {
  return (<>
    <Head>
      <title>Music</title>
      <meta name='robots' content='nosnippet' />
    </Head>
    <div className='flex flex-col items-center gap-6'>
      <h1 className='text-4xl font-medium'>Music</h1>
      <div className='flex flex-wrap justify-center gap-6 text-lg m-2'>
        <a target='_blank' rel='noreferrer' href='https://sspenst.bandcamp.com' className='flex gap-3 items-center hover:scale-110 transition'>
          <Image alt='sspenst bandcamp' src='/bandcamp.svg' width='32' height='32' className='w-10' />
        </a>
        <a target='_blank' rel='noreferrer' href='https://soundcloud.com/sspenst' className='flex gap-3 items-center hover:scale-110 transition'>
          <Image alt='sspenst soundcloud' src='/soundcloud.png' width='32' height='32' className='w-10 dark:invert ' />
        </a>
        <a target='_blank' rel='noreferrer' href='https://open.spotify.com/artist/7yWCWPWpYoj22kUps71yey?si=24Yjcju9Qi6J4sri7XkSZw' className='flex gap-3 items-center hover:scale-110 transition'>
          <Image alt='sspenst spotify' src='/spotify.png' width='32' height='32' className='w-10' />
        </a>
        <a target='_blank' rel='noreferrer' href='https://music.apple.com/us/artist/sspenst/1592620337' className='flex gap-3 items-center hover:scale-110 transition'>
          <Image alt='sspenst apple music' src='/applemusic.svg' width='32' height='32' className='w-10' />
        </a>
      </div>
      {/* <MusicCard
        hrefAppleMusic='https://music.apple.com/us/album/re-ep/1592628164'
        hrefBandcamp='https://sspenst.bandcamp.com/album/ephemeral'
        hrefSoundCloud='https://soundcloud.com/sspenst/sets/ephemeral'
        hrefSpotify='https://open.spotify.com/album/3NQEsxiwMrpQF1pN9w7XbR'
        info={['Album - 2026', '7 songs', '9:32']}
        src='IMG_9332.jpeg'
        title='ephemeral'
      /> */}
      <MusicCard
        hrefAppleMusic='https://music.apple.com/us/album/turbine/1652622865'
        hrefBandcamp='https://sspenst.bandcamp.com/track/turbine'
        hrefSoundCloud='https://soundcloud.com/sspenst/turbine'
        hrefSpotify='https://open.spotify.com/album/4r6LvBdQFye0qBfdm9BuT3'
        info={['Single - 2022', '1:52']}
        src='turbine.png'
        title='turbine'
      />
      <MusicCard
        feature='N E T W O R K'
        hrefSoundCloud='https://soundcloud.com/n_e_t_w_o_r_k/expanse-w-sspenst'
        info={['Single - 2022', '2:02']}
        src='expanse.jpeg'
        title='expanse'
      />
      <MusicCard
        hrefAppleMusic='https://music.apple.com/us/album/re-ep/1592628164'
        hrefBandcamp='https://sspenst.bandcamp.com/album/re'
        hrefSoundCloud='https://soundcloud.com/sspenst/sets/re_ep'
        hrefSpotify='https://open.spotify.com/album/3NQEsxiwMrpQF1pN9w7XbR'
        info={['EP - 2021', '4 songs', '7:11']}
        src='re.png'
        title='re'
      />
      <MusicCard
        feature='N E T W O R K'
        hrefSoundCloud='https://soundcloud.com/n_e_t_w_o_r_k/uplift-w-sspenst'
        info={['Single - 2021', '2:04']}
        src='uplift.jpeg'
        title='uplift'
      />
      <MusicCard
        hrefAppleMusic='https://music.apple.com/us/album/practice-single/1895442355'
        hrefBandcamp='https://sspenst.bandcamp.com/track/practice'
        hrefSoundCloud='https://soundcloud.com/sspenst/practice'
        hrefSpotify='https://open.spotify.com/album/0AYabae2TkwyL0nrG30MQH'
        info={['Single - 2021', '1:37']}
        src='200930.jpeg'
        title='practice'
      />
    </div>
  </>);
}
