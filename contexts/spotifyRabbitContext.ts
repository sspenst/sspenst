import { createContext } from 'react';

interface SpotifyRabbitContextInterface {
  preview: HTMLAudioElement | undefined;
  setPreview: React.Dispatch<React.SetStateAction<HTMLAudioElement | undefined>>;
}

export const SpotifyRabbitContext = createContext<SpotifyRabbitContextInterface>({
  preview: undefined,
  setPreview: () => { return; },
});
