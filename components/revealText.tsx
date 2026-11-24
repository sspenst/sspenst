import React, { AnimationEvent, CSSProperties, isValidElement, ReactElement, ReactNode, useEffect, useState } from 'react';
import { usePageTransition } from './pageTransition';

interface RevealTextProps {
  children: ReactNode;
  className?: string;
}

type RevealWordStyle = CSSProperties & {
  '--word-index': number;
};

interface RevealElementProps {
  children?: ReactNode;
  className?: string;
  href?: unknown;
  style?: CSSProperties;
  'data-reveal-decoration'?: boolean;
}

function finishReveal(event: AnimationEvent<HTMLSpanElement>) {
  if (event.animationName === 'revealTextWord') {
    event.currentTarget.classList.add('revealTextWord--revealed');
  }
}

function revealNode(node: ReactNode, wordIndex: { current: number }, shouldAnimate: boolean): ReactNode {
  if (typeof node === 'string') {
    return node.split(/(\s+)/).map((part) => {
      if (!part || /^\s+$/.test(part)) {
        return part;
      }

      const style: RevealWordStyle = {
        '--word-index': wordIndex.current++,
      };

      return (
        <span
          className={`revealTextWord${shouldAnimate ? '' : ' revealTextWord--revealed'}`}
          key={`${part}-${style['--word-index']}`}
          onAnimationEnd={finishReveal}
          style={style}
        >
          {part}
        </span>
      );
    });
  }

  if (!isValidElement<RevealElementProps>(node)) {
    return node;
  }

  // Keep linked text and its icon together as one unit in the reveal.
  if (node.props.href) {
    const style: RevealWordStyle = {
      '--word-index': wordIndex.current++,
    };

    return (
      <span
        className={`revealTextWord${shouldAnimate ? '' : ' revealTextWord--revealed'}`}
        onAnimationEnd={finishReveal}
        style={style}
      >
        {node}
      </span>
    );
  }

  if (node.props.children === undefined) {
    return node;
  }

  // Fade decorative pseudo-elements when this element's first word appears.
  const decorationProps = node.props['data-reveal-decoration'] ? {
    className: `${node.props.className ?? ''} revealTextDecoration${shouldAnimate ? '' : ' revealTextDecoration--revealed'}`,
    style: { ...node.props.style, '--word-index': wordIndex.current } as RevealWordStyle,
  } : undefined;

  return React.cloneElement(
    node as ReactElement<RevealElementProps>,
    decorationProps,
    React.Children.map(node.props.children, child => revealNode(child, wordIndex, shouldAnimate)),
  );
}

export default function RevealText({ children, className }: RevealTextProps) {
  const { hasRevealedText, markTextAsRevealed } = usePageTransition();
  const [shouldAnimate] = useState(() => !hasRevealedText);
  const wordIndex = { current: 0 };

  useEffect(() => {
    if (shouldAnimate) {
      markTextAsRevealed();
    }
  }, [markTextAsRevealed, shouldAnimate]);

  return (
    <div className={className}>
      {React.Children.map(children, child => revealNode(child, wordIndex, shouldAnimate))}
    </div>
  );
}
