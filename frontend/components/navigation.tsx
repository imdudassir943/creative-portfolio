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
            <Link href="/" className="relative group">
              <motion.span
                className="font-display text-2xl font-bold text-white"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                Mudassir
              </motion.span>
              <motion.span
                className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="relative group">
                  <motion.span
                    className={`text-sm font-medium transition-colors ${
                      pathname === link.href ? 'text-accent' : 'text-neutral hover:text-white'
                    }`}
                    whileHover={{ y: -2 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    {link.label}
                  </motion.span>
                  <motion.span
                    className={`absolute -bottom-2 left-0 h-0.5 bg-accent ${
                      pathname === link.href ? 'w-full' : 'w-0'
                    }`}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              ))}
            </div>

            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden relative w-12 h-12 flex items-center justify-center z-50 rounded-full border border-dark-800 bg-dark-900/80 backdrop-blur-sm"
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
