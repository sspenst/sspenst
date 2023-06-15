import classNames from 'classnames';
import Image from 'next/image';
import React, { useContext } from 'react';
import { SpotifyRabbitContext } from '../../contexts/spotifyRabbitContext';
import { Track } from '../../helpers/spotifyParsers';

function formatSeconds(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;

  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

interface FormattedTrackProps {
  track: Track;
}

export default function FormattedTrack({ track }: FormattedTrackProps) {
  const { previewTrack, setPreviewTrack } = useContext(SpotifyRabbitContext);

  return (
    <div className='flex gap-4 w-full items-center cursor-pointer truncate select-none' onClick={() => {
      // pause any ongoing track
      if (previewTrack?.preview) {
        previewTrack.preview.pause();
      }

      // play the current track if it is different than the previous
      if (previewTrack?.preview !== track.preview) {
        track.preview.play();
        setPreviewTrack(track);
      } else {
        setPreviewTrack(undefined);
      }
    }}>
      <Image
        alt={track.name}
        className='shadow-lg w-12 h-12'
        height={48}
        src={track.image}
        style={{
          minWidth: '3rem',
        }}
        width={48}
      />
      <div className='grow flex flex-col gap-1 truncate text-left'>
        <span className={classNames('truncate text-lg', { 'text-green-500': previewTrack?.preview === track.preview })}>{track.name}</span>
        <span className='text-neutral-400 text-sm truncate'>{track.artists.map(a => a.name).join(', ')}</span>
      </div>
      <span className='text-neutral-400 ml-4'>
        {formatSeconds(track.seconds)}
      </span>
    </div>
  );
}
