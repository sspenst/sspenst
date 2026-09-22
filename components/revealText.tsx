import React, { CSSProperties, isValidElement, ReactElement, ReactNode } from 'react';

interface RevealTextProps {
  children: ReactNode;
  className?: string;
}

type RevealWordStyle = CSSProperties & {
  '--word-index': number;
};

function revealNode(node: ReactNode, wordIndex: { current: number }): ReactNode {
  if (typeof node === 'string') {
    return node.split(/(\s+)/).map((part) => {
      if (!part || /^\s+$/.test(part)) {
        return part;
      }

      const style: RevealWordStyle = {
        '--word-index': wordIndex.current++,
      };

      return <span className='revealTextWord' key={`${part}-${style['--word-index']}`} style={style}>{part}</span>;
    });
  }

  if (!isValidElement<{ children?: ReactNode; href?: unknown }>(node)) {
    return node;
  }

  // Keep linked text and its icon together as one unit in the reveal.
  if (node.props.href) {
    const style: RevealWordStyle = {
      '--word-index': wordIndex.current++,
    };

    return <span className='revealTextWord' style={style}>{node}</span>;
  }

  if (node.props.children === undefined) {
    return node;
  }

  return React.cloneElement(
    node as ReactElement<{ children?: ReactNode }>,
    undefined,
    React.Children.map(node.props.children, child => revealNode(child, wordIndex)),
  );
}

export default function RevealText({ children, className }: RevealTextProps) {
  const wordIndex = { current: 0 };

  return (
    <div className={className}>
      {React.Children.map(children, child => revealNode(child, wordIndex))}
    </div>
  );
}
