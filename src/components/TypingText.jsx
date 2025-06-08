'use client';

import { useEffect, useRef } from 'react';

export default function TypingText({ thinking, isTyping }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [thinking, isTyping]);

  const displayed = thinking && isTyping;
  const color = displayed ? 'text-gray-400' : '';
  const pulse = displayed ? 'animate-pulse' : '';

  return (
    <p
      ref={ref}
      className={`whitespace-pre-line break-words ${color} ${pulse} text-base transition-all duration-300 leading-relaxed`}
    >
      {thinking ? '...' : ''}
      {!thinking && isTyping && <span className="ml-1 animate-pulse">|</span>}
    </p>
  );
}