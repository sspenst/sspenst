import { createContext } from 'react';
import { Track } from '../helpers/spotifyParsers';

interface RabbitContextInterface {
  previewTrack: Track | undefined;
  setPreviewTrack: React.Dispatch<React.SetStateAction<Track | undefined>>;
}

export const RabbitContext = createContext<RabbitContextInterface>({
  previewTrack: undefined,
  setPreviewTrack: () => { return; },
});
