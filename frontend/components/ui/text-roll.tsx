'use client';

import { motion } from 'framer-motion';
import React from 'react';
import { cn } from '@/lib/utils';

const STAGGER = 0.025;

interface TextRollProps {
  children: string;
  className?: string;
  center?: boolean;
  duration?: number;
}

export const TextRoll: React.FC<TextRollProps> = ({
  children,
  className,
  center = false,
  duration = 0.45,
}) => {
  const letters = children.split('');

  return (
    <motion.span
      initial="initial"
      whileHover="hovered"
      className={cn('relative inline-flex flex-col overflow-hidden select-none py-[0.12em] px-[0.02em]', className)}
      style={{ lineHeight: 1.2 }}
    >
      {/* Upper Layer: Slides up out of view */}
      <span className="flex items-center">
        {letters.map((l, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (letters.length - 1) / 2)
            : STAGGER * i;

          return (
            <motion.span
              key={i}
              className="inline-block"
              variants={{
                initial: { y: 0 },
                hovered: { y: '-130%' },
              }}
              transition={{
                ease: [0.215, 0.61, 0.355, 1], // Premium cubic-bezier easeOut
                duration,
                delay,
              }}
            >
              {l === ' ' ? '\u00A0' : l}
            </motion.span>
          );
        })}
      </span>

      {/* Lower Layer: Slides up into view from below */}
      <span className="absolute inset-0 flex items-center">
        {letters.map((l, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (letters.length - 1) / 2)
            : STAGGER * i;

          return (
            <motion.span
              key={i}
              className="inline-block"
              variants={{
                initial: { y: '130%' },
                hovered: { y: 0 },
              }}
              transition={{
                ease: [0.215, 0.61, 0.355, 1],
                duration,
                delay,
              }}
            >
              {l === ' ' ? '\u00A0' : l}
            </motion.span>
          );
        })}
      </span>
    </motion.span>
  );
};
