import { createContext } from 'react';
import { Track } from '../helpers/spotifyParsers';

interface SpotifyRabbitContextInterface {
  previewTrack: Track | undefined;
  setPreviewTrack: React.Dispatch<React.SetStateAction<Track | undefined>>;
}

export const SpotifyRabbitContext = createContext<SpotifyRabbitContextInterface>({
  previewTrack: undefined,
  setPreviewTrack: () => { return; },
});
