import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ComponentProps, createContext, MouseEvent, ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

type TransitionPhase = 'idle' | 'exiting' | 'hidden' | 'entering';

interface PageTransitionContextValue {
  phase: TransitionPhase;
  hasRevealedText: boolean;
  markTextAsRevealed: () => void;
  transitionTo: (href: string) => Promise<void>;
}

const PageTransitionContext = createContext<PageTransitionContextValue | null>(null);

const TRANSITION_DURATION = 250;
const TRANSITION_SETTLE_BUFFER = 50;

function wait(duration: number) {
  return new Promise(resolve => window.setTimeout(resolve, duration));
}

function waitForPaint() {
  return new Promise(resolve => window.requestAnimationFrame(() => resolve(undefined)));
}

function routeName(pathname: string) {
  return pathname === '/music' ? 'music' : 'index';
}

function pathnameFromHref(href: string) {
  return href.split(/[?#]/, 1)[0];
}

function isAnimatedPageTransition(from: string, to: string) {
  const toPathname = pathnameFromHref(to);

  return (from === '/' && toPathname === '/music') ||
    (from === '/music' && toPathname === '/');
}

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [phase, setPhase] = useState<TransitionPhase>('idle');
  const [hasRevealedText, setHasRevealedText] = useState(false);
  const transitioning = useRef(false);

  const markTextAsRevealed = useCallback(() => {
    setHasRevealedText(true);
  }, []);

  const performTransition = useCallback(async (href: string, replace = false) => {
    if (transitioning.current || href === router.asPath) {
      return;
    }

    const isPageTransition = isAnimatedPageTransition(router.pathname, href);
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const navigate = replace ? router.replace : router.push;

    if (!isPageTransition || reduceMotion) {
      await navigate(href);

      return;
    }

    transitioning.current = true;
    setPhase('exiting');

    try {
      await wait(TRANSITION_DURATION);
      setPhase('hidden');
      await waitForPaint();

      const didNavigate = await navigate(href);

      if (!didNavigate) {
        setPhase('idle');

        return;
      }

      setPhase('entering');
      // Keep the completed CSS animation in place long enough for its final
      // frame to be painted before removing the animation class.
      await wait(TRANSITION_DURATION + TRANSITION_SETTLE_BUFFER);
      setPhase('idle');
    } finally {
      transitioning.current = false;
    }
  }, [router]);

  const transitionTo = useCallback(
    (href: string) => performTransition(href),
    [performTransition],
  );

  useEffect(() => {
    router.beforePopState(({ as }) => {
      if (
        !isAnimatedPageTransition(router.pathname, as) ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ) {
        return true;
      }

      // The browser has already moved to the destination history entry. A
      // replace renders that entry after the exit animation without adding a
      // duplicate entry, so both Back and Forward keep their native behavior.
      void performTransition(as, true);

      return false;
    });

    return () => router.beforePopState(() => true);
  }, [performTransition, router]);

  const value = useMemo(
    () => ({ phase, hasRevealedText, markTextAsRevealed, transitionTo }),
    [phase, hasRevealedText, markTextAsRevealed, transitionTo],
  );

  return (
    <PageTransitionContext.Provider value={value}>
      {children}
    </PageTransitionContext.Provider>
  );
}

export function PageTransition({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { phase } = usePageTransition();

  return (
    <main className={`pageTransition pageTransition--${routeName(router.pathname)} pageTransition--${phase} min-h-screen pt-25 will-change-[opacity,filter,transform] sm:pt-32`}>
      {children}
    </main>
  );
}

export function TransitionLink({ href, onClick, ...props }: ComponentProps<typeof Link>) {
  const { transitionTo } = usePageTransition();

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);

    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      props.target === '_blank' ||
      typeof href !== 'string'
    ) {
      return;
    }

    event.preventDefault();
    void transitionTo(href);
  }

  return <Link href={href} onClick={handleClick} {...props} />;
}

export function usePageTransition() {
  const context = useContext(PageTransitionContext);

  if (!context) {
    throw new Error('usePageTransition must be used inside PageTransitionProvider');
  }

  return context;
}
