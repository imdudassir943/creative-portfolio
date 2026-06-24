'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

export function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  // Set offscreen initially
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring configuration for liquid-smooth trailing lag
  const springConfig = { stiffness: 250, damping: 22 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Detect touch-based mobile/tablet devices
    const checkDevice = () => {
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsMobile(hasTouch);
    };
    
    checkDevice();

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    // Automatically detect hover on any interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.cursor-pointer') ||
        target.classList.contains('cursor-pointer');

      setIsHovered(!!isInteractive);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (isMobile) return null;

  return (
    <>
      {/* Outer Trail Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-accent/40 pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 mix-blend-screen"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          scale: isHovered ? 1.8 : 1,
          backgroundColor: isHovered ? 'rgba(235, 94, 40, 0.12)' : 'rgba(235, 94, 40, 0)',
          borderColor: isHovered ? 'rgba(245, 122, 79, 0.7)' : 'rgba(235, 94, 40, 0.4)',
          boxShadow: isHovered 
            ? '0 0 15px rgba(235, 94, 40, 0.35)' 
            : '0 0 0px rgba(235, 94, 40, 0)',
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 25,
        }}
      />

      {/* Inner Immediate Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-accent rounded-full pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: isHovered ? 0 : 1,
        }}
        transition={{
          duration: 0.15,
        }}
      />
    </>
  );
}
