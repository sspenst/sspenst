import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

type TransitionPhase = 'idle' | 'exiting' | 'entering';

interface PendingTransition {
  from: string;
  navigate: () => Promise<boolean>;
}

interface PageTransitionContextValue {
  phase: TransitionPhase;
  finishAnimation: (phase: TransitionPhase) => void;
  hasRevealedText: boolean;
  markTextAsRevealed: () => void;
  startTransition: (href: string, navigate: PendingTransition['navigate']) => boolean;
}

const PageTransitionContext = createContext<PageTransitionContextValue | null>(null);

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [transition, setTransition] = useState<PendingTransition | null>(null);
  const [hasRevealedText, setHasRevealedText] = useState(false);
  const pending = useRef<PendingTransition | null>(null);
  let phase: TransitionPhase = 'idle';

  if (transition) {
    phase = router.pathname === transition.from ? 'exiting' : 'entering';
  }

  const startTransition = useCallback((href: string, navigate: PendingTransition['navigate']) => {
    const destination = href.split(/[?#]/, 1)[0];
    const from = router.pathname;
    const betweenHomeAndMusic = (from === '/' && destination === '/music') ||
      (from === '/music' && destination === '/');

    if (!betweenHomeAndMusic || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    if (pending.current) return true;

    const next = { from, navigate };

    pending.current = next;
    setTransition(next);

    return true;
  }, [router.pathname]);

  const finishAnimation = useCallback((completed: TransitionPhase) => {
    const current = pending.current;

    if (!current) return;

    function reset() {
      if (pending.current === current) {
        pending.current = null;
        setTransition(null);
      }
    }

    if (completed === 'exiting') {
      void current.navigate().then(didNavigate => {
        if (!didNavigate) reset();
      }, reset);
    } else if (completed === 'entering') {
      reset();
    }
  }, []);

  useEffect(() => {
    router.beforePopState(({ as }) => {
      if (pending.current) {
        // Honor a new history action even if the previous slide is still running.
        pending.current = null;
        setTransition(null);

        return true;
      }

      // Back and Forward have already selected the history entry by this point.
      return !startTransition(as, () => router.replace(as));
    });

    return () => router.beforePopState(() => true);
  }, [router, startTransition]);

  const markTextAsRevealed = useCallback(() => {
    setHasRevealedText(true);
  }, []);

  const value = useMemo<PageTransitionContextValue>(
    () => ({ finishAnimation, hasRevealedText, markTextAsRevealed, phase, startTransition }),
    [finishAnimation, hasRevealedText, markTextAsRevealed, phase, startTransition],
  );

  return (
    <PageTransitionContext.Provider value={value}>
      {children}
    </PageTransitionContext.Provider>
  );
}

export function PageTransition({ children }: { children: ReactNode }) {
  const { pathname } = useRouter();
  const { finishAnimation, phase } = usePageTransition();
  const main = useRef<HTMLElement>(null);
  const direction = pathname === '/music' ? 'right' : 'left';

  useEffect(() => {
    if (phase === 'idle') return;

    let active = true;
    const animations = main.current?.getAnimations() ?? [];

    // An empty or canceled animation can occur when the motion preference changes.
    void Promise.allSettled(animations.map(animation => animation.finished)).then(() => {
      if (active) finishAnimation(phase);
    });

    return () => { active = false; };
  }, [finishAnimation, phase]);

  return (
    <main className={`pageTransition pageTransition--${direction} pageTransition--${phase} min-h-screen pt-25 sm:pt-32`} ref={main}>
      {children}
    </main>
  );
}

interface TransitionLinkProps {
  children: ReactNode;
  className?: string;
  href: string;
}

export function TransitionLink({ children, className, href }: TransitionLinkProps) {
  const router = useRouter();
  const { startTransition } = usePageTransition();

  return (
    <Link
      className={className}
      href={href}
      onNavigate={event => {
        if (startTransition(href, () => router.push(href))) event.preventDefault();
      }}
    >
      {children}
    </Link>
  );
}

export function usePageTransition() {
  const context = useContext(PageTransitionContext);

  if (!context) {
    throw new Error('usePageTransition must be used inside PageTransitionProvider');
  }

  return context;
}
