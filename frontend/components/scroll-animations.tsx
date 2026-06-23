'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView, animate } from 'framer-motion';
import Image from 'next/image';

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
}

export function ParallaxImage({
  src,
  alt,
  className = '',
  containerClassName = '',
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Track scroll position of the image wrapper relative to viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Translate image vertically inside overflow-hidden container to create depth
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden w-full h-full ${containerClassName}`}
    >
      <motion.div
        style={{ y, scale: 1.15 }}
        className="absolute inset-0 w-full h-full"
      >
        <Image 
          src={src} 
          alt={alt} 
          fill 
          className={`object-cover ${className}`} 
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </motion.div>
    </div>
  );
}

interface AnimatedCounterProps {
  value: string; // e.g., "50+", "5+", "30+", "10+"
  className?: string;
}

export function AnimatedCounter({ value, className = '' }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });
  const [displayVal, setDisplayVal] = useState('0');

  useEffect(() => {
    if (!isInView) return;

    // Parse numeric value and any suffix (like '+')
    const match = value.match(/^(\d+)(.*)$/);
    if (!match) {
      setDisplayVal(value);
      return;
    }

    const targetNumber = parseInt(match[1], 10);
    const suffix = match[2] || '';

    const controls = animate(0, targetNumber, {
      duration: 1.8,
      ease: 'easeOut',
      onUpdate: (latest) => {
        setDisplayVal(Math.floor(latest) + suffix);
      },
    });

    return () => controls.stop();
  }, [value, isInView]);

  return (
    <span ref={ref} className={className}>
      {displayVal}
    </span>
  );
}

interface TextLineRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function TextLineReveal({ children, className = '', delay = 0 }: TextLineRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <div ref={ref} className="relative overflow-hidden py-1">
      <motion.div
        initial={{ y: '105%' }}
        animate={isInView ? { y: 0 } : { y: '105%' }}
        transition={{ duration: 0.8, delay, ease: [0.215, 0.61, 0.355, 1] }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
}

interface WordRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export function WordReveal({ text, className = '', delay = 0 }: WordRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });
  const words = text.split(' ');

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em] py-1">
          <motion.span
            className="inline-block origin-bottom"
            initial={{ y: '100%', rotate: 2 }}
            animate={isInView ? { y: 0, rotate: 0 } : { y: '100%', rotate: 2 }}
            transition={{
              duration: 0.8,
              delay: delay + i * 0.05,
              ease: [0.215, 0.61, 0.355, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
