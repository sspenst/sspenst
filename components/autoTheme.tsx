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

  return null;
}
