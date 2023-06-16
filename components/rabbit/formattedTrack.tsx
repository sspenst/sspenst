import classNames from 'classnames';
import Image from 'next/image';
import React, { useContext } from 'react';
import { RabbitContext } from '../../contexts/rabbitContext';
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
  const { previewTrack, setPreviewTrack } = useContext(RabbitContext);

  return (
    <div className='flex gap-4 w-full items-center cursor-pointer truncate select-none' onClick={() => {
      if (previewTrack?.preview !== track.preview) {
        // if we are changing tracks
        if (previewTrack) {
          previewTrack.preview.pause();
        }

        track.preview.play();
        setPreviewTrack(track);
      } else {
        if (track.preview.paused) {
          track.preview.play();
        } else {
          track.preview.pause();
        }

        // need to set the preview track again to force a rerender
        setPreviewTrack({ ...track });
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
        <span className={classNames('truncate text-lg', { 'text-green-500': previewTrack?.preview === track.preview && !track.preview.paused })}>{track.name}</span>
        <span className='text-neutral-400 text-sm truncate'>{track.artists.map(a => a.name).join(', ')}</span>
      </div>
      <span className='text-neutral-400 ml-4'>
        {formatSeconds(track.seconds)}
      </span>
    </div>
  );
}
