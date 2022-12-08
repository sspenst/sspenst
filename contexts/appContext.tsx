import { createContext } from 'react';

interface AppContextInterface {
  animating: boolean;
  setAnimating: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppContext = createContext<AppContextInterface>({
  animating: true,
  setAnimating: () => { return; },
});
