'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/works', label: 'Works' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-dark-900/80 backdrop-blur-lg border-b border-dark-800' : ''
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="relative group flex items-center py-2 select-none">
              {/* Rotating Nebula Ambient Glow (Passive) */}
              <motion.div
                className="absolute -inset-x-6 -inset-y-3 bg-gradient-to-tr from-accent/15 via-accent-light/5 to-accent/20 blur-xl rounded-full pointer-events-none -z-10"
                animate={{
                  rotate: [0, 360],
                  scale: [0.95, 1.05, 0.95],
                  opacity: [0.3, 0.55, 0.3],
                }}
                transition={{
                  rotate: {
                    duration: 15,
                    repeat: Infinity,
                    ease: 'linear',
                  },
                  scale: {
                    duration: 6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  },
                  opacity: {
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  },
                }}
              />

              {/* Interactive Hover Glow Flare */}
              <div className="absolute -inset-x-8 -inset-y-4 bg-gradient-to-r from-accent/30 via-accent-light/20 to-accent/10 blur-xl rounded-2xl opacity-0 group-hover:opacity-100 group-hover:scale-115 transition-all duration-500 ease-out pointer-events-none -z-20" />

              {/* Twinkling Magic Sparkle (Passive) */}
              <motion.span
                className="absolute -top-1 -right-2 text-accent-light pointer-events-none"
                animate={{
                  scale: [0, 1, 1.25, 1, 0],
                  rotate: [0, 90, 180, 270, 360],
                  opacity: [0, 0.85, 1, 0.85, 0],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  repeatDelay: 3.5,
                  ease: 'easeInOut',
                }}
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" />
                </svg>
              </motion.span>

              {/* Premium Connected Signature Text with Passive Shimmer */}
              <motion.span
                className="font-signature text-4xl font-semibold bg-clip-text text-transparent bg-[size:200%_100%] flex items-center pr-4 py-1 select-none"
                style={{
                  backgroundImage: 'linear-gradient(to right, #ffffff 0%, #f57a4f 25%, #eb5e28 50%, #f57a4f 75%, #ffffff 100%)',
                }}
                animate={{
                  backgroundPosition: ['0% 0%', '-200% 0%'],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                variants={{
                  initial: {
                    y: 0,
                    scale: 1,
                    filter: 'drop-shadow(0 0 0px rgba(235, 94, 40, 0))',
                  },
                  hover: {
                    y: [0, -6, 2, 0],
                    scale: 1.08,
                    filter: [
                      'drop-shadow(0 0 0px rgba(235, 94, 40, 0))',
                      'drop-shadow(0 0 10px rgba(235, 94, 40, 0.8))',
                      'drop-shadow(0 0 6px rgba(235, 94, 40, 0.5))',
                    ],
                    transition: {
                      y: {
                        duration: 0.6,
                        times: [0, 0.4, 0.7, 1],
                        ease: 'easeInOut',
                      },
                      scale: {
                        type: 'spring',
                        stiffness: 300,
                        damping: 15,
                      },
                      filter: {
                        duration: 0.4,
                      },
                    },
                  },
                }}
                initial="initial"
                whileHover="hover"
              >
                Mudassir
              </motion.span>

              {/* Premium Underline Glow */}
              <span className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent origin-center rounded-full scale-x-0 group-hover:scale-x-100 transition-all duration-300 ease-out shadow-[0_0_8px_#eb5e28] group-hover:shadow-[0_0_15px_#eb5e28,0_0_8px_#f57a4f]" />
            </Link>

            <div className="hidden md:flex items-center gap-6">
              {navLinks.filter(link => link.href !== '/contact').map((link) => (
                <Link key={link.href} href={link.href} className="relative px-4 py-2 rounded-full transition-colors group">
                  {pathname === link.href && (
                    <motion.span
                      layoutId="activeNav"
                      className="absolute inset-0 rounded-full bg-accent/10 border border-accent/20 shadow-[0_0_15px_rgba(235,94,40,0.15)] z-0"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <motion.span
                    className={`relative z-10 text-sm font-medium transition-colors ${
                      pathname === link.href ? 'text-accent' : 'text-neutral group-hover:text-white'
                    }`}
                  >
                    {link.label}
                  </motion.span>
                  <span className="absolute inset-0 rounded-full bg-white/5 border border-white/10 opacity-0 group-hover:opacity-100 shadow-[0_0_20px_rgba(255,255,255,0.05)] transition-all duration-300 z-0" />
                </Link>
              ))}

              <Link href="/contact" className="ml-2">
                <motion.button
                  className="relative px-6 py-2.5 rounded-full text-sm font-medium text-white overflow-hidden bg-accent shadow-[0_0_20px_rgba(235,94,40,0.3)] hover:shadow-[0_0_35px_rgba(235,94,40,0.6)] transition-all duration-300 border border-accent/30 group/btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">Let&apos;s Talk</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-accent to-accent-light opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500 rounded-full" />
                  <span className="absolute -inset-px rounded-full bg-gradient-to-r from-accent via-accent-light to-accent opacity-50 blur-[2px]" />
                </motion.button>
              </Link>
            </div>

            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden relative w-12 h-12 flex items-center justify-center z-50 rounded-full border border-dark-800 bg-dark-900/80 backdrop-blur-sm hover:border-accent/50 hover:shadow-[0_0_20px_rgba(235,94,40,0.3)] transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-5 h-5 text-white" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-5 h-5 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-gradient-to-br from-dark-900/98 via-dark-900/95 to-accent/5 backdrop-blur-2xl md:hidden flex items-center justify-center"
          >
            <nav className="flex flex-col items-center justify-center gap-8 w-full px-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ delay: i * 0.08, ease: 'easeOut' }}
                  className="w-full text-center"
                >
                  <Link href={link.href} className="group inline-block py-2">
                    <span
                      className={`font-display text-4xl font-bold transition-colors ${
                        pathname === link.href ? 'text-accent' : 'text-white group-hover:text-accent'
                      }`}
                    >
                      {link.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
