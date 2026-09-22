import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';

export default function AutoTheme() {
  const { resolvedTheme, setTheme, systemTheme } = useTheme();

  // switch back to system theme if it's the same as the resolved theme
  useEffect(() => {
    if (systemTheme && resolvedTheme && systemTheme === resolvedTheme) {
      setTheme('system');
    }
  }, [resolvedTheme, setTheme, systemTheme]);

  return (
    <button
      aria-label='Toggle color theme'
      className='shrink-0 rounded-full p-2 text-neutral-600 transition hover:text-black dark:text-neutral-400 dark:hover:text-white fadeIn'
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      type='button'
    >
      <MoonIcon aria-hidden='true' className='h-5 w-5 dark:hidden' />
      <SunIcon aria-hidden='true' className='hidden h-5 w-5 dark:block' />
    </button>
  );
}
