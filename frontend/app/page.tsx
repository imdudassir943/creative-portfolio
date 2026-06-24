'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, ArrowUpRight, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { AnimatedCounter, ParallaxImage, TextLineReveal, WordReveal } from '@/components/scroll-animations';
import { TextRoll } from '@/components/ui/text-roll';

gsap.registerPlugin(ScrollTrigger);

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const floatingAnimation = {
  y: [0, -20, 0],
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: 'easeInOut' as const,
  },
};

export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll();


  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const blob1Y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const blob2Y = useTransform(scrollYProgress, [0, 1], [0, -200]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-word',
        { y: 80, opacity: 0, rotateX: -30 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          stagger: 0.2,
          duration: 1.2,
          ease: 'power3.out',
          delay: 0.5,
        }
      );

      gsap.fromTo(
        '.hero-subtitle',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 1.2, ease: 'power3.out' }
      );

      gsap.fromTo(
        '.hero-cta',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 1.5, ease: 'power3.out' }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const sections = gsap.utils.toArray<HTMLElement>('.reveal-section');
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20" />

        <motion.div
          style={{ y: blob1Y }}
          className="absolute top-20 -left-20 pointer-events-none select-none z-0"
        >
          <motion.div className="blob w-96 h-96 bg-accent" animate={floatingAnimation} />
        </motion.div>

        <motion.div
          style={{ y: blob2Y }}
          className="absolute bottom-20 right-10 pointer-events-none select-none z-0"
        >
          <motion.div
            className="blob w-80 h-80 bg-dark-800"
            animate={{
              ...floatingAnimation,
              transition: { ...floatingAnimation.transition, delay: 2 },
            }}
          />
        </motion.div>

        {/* Developer Portrait Background Layer */}
        <div className="absolute bottom-0 right-0 left-auto translate-x-0 translate-y-[12%] md:left-[66%] md:right-auto md:-translate-x-1/2 md:translate-y-4 w-[85vw] sm:w-[70vw] md:w-[500px] h-[85vh] sm:h-[60vh] md:h-[550px] z-0 pointer-events-none select-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut', delay: 0.8 }}
            className="relative w-full h-full portrait-mask"
          >
            <Image
              src="/developer.jpg"
              alt="Developer"
              fill
              className="object-contain object-right-bottom md:object-cover md:object-top grayscale contrast-125 brightness-[0.55] sepia-[15%] opacity-40 transition-all duration-700 hover:brightness-75"
              priority
            />
            {/* Blends portrait edges into black internally before container mask fades it */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-b from-black via-black/30 to-transparent md:from-black/10 md:via-transparent z-10" />
          </motion.div>
        </div>

        <motion.div
          className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center"
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-dark-700 bg-dark-800/50 backdrop-blur-sm mb-8"
          >
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm text-neutral">Available for projects</span>
          </motion.div>

          <h1
            ref={titleRef}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 perspective-1000 select-none flex flex-col items-center"
          >
            <motion.span
              className="inline-block hero-word cursor-default"
              whileHover="hovered"
              initial="initial"
            >
              <TextRoll duration={0.6}>Creative</TextRoll>
            </motion.span>
            <motion.span
              className="inline-block hero-word text-accent cursor-default mt-[-0.26em]"
              whileHover="hovered"
              initial="initial"
            >
              <TextRoll duration={0.6}>Developer</TextRoll>
            </motion.span>
          </h1>

          <p className="hero-subtitle text-xl md:text-2xl text-neutral max-w-2xl mx-auto mb-12">
            Crafting exceptional digital experiences with cutting-edge technology and stunning design.
          </p>

          <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/works">
              <motion.button
                className="group px-8 py-4 bg-accent text-white font-medium rounded-full relative overflow-hidden"
                variants={{
                  initial: { scale: 1 },
                  hovered: { scale: 1.05 },
                }}
                whileHover="hovered"
                whileTap={{ scale: 0.95 }}
                initial="initial"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <TextRoll>View Projects</TextRoll>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-accent-dark"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </Link>
            <Link href="/contact">
              <motion.button
                className="px-8 py-4 border border-dark-700 text-white font-medium rounded-full hover:border-accent transition-colors"
                variants={{
                  initial: { scale: 1 },
                  hovered: { scale: 1.05 },
                }}
                whileHover="hovered"
                whileTap={{ scale: 0.95 }}
                initial="initial"
              >
                <TextRoll>Get in Touch</TextRoll>
              </motion.button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown className="w-6 h-6 text-neutral" />
        </motion.div>
      </section>

      <section className="reveal-section py-16 md:py-24 bg-dark-800/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8"
          >
            {[
              { number: '50+', label: 'Projects Completed' },
              { number: '5+', label: 'Years Experience' },
              { number: '30+', label: 'Happy Clients' },
              { number: '10+', label: 'Awards Won' },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeInUp}
                className="text-center"
              >
                <div className="font-display text-display-sm md:text-display-md font-bold text-accent">
                  <AnimatedCounter value={stat.number} />
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="reveal-section py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <TextLineReveal className="text-accent font-medium mb-4 block">About Me</TextLineReveal>
              <h2 className="font-display text-3xl sm:text-4xl md:text-display-md font-bold mb-6">
                <WordReveal text="Turning Ideas Into Reality" />
              </h2>
              <p className="text-neutral text-lg mb-6 leading-relaxed">
                I&apos;m a creative developer passionate about building immersive digital experiences.
                With expertise in modern web technologies, I bring designs to life with smooth
                animations and pixel-perfect precision.
              </p>
              <Link href="/about">
                <motion.span
                  className="inline-flex items-center gap-2 text-accent font-medium line-through-hover"
                  variants={{
                    initial: { x: 0 },
                    hovered: { x: 5 },
                  }}
                  whileHover="hovered"
                  initial="initial"
                >
                  <TextRoll>Learn more about me</TextRoll>
                  <ArrowUpRight className="w-4 h-4" />
                </motion.span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-full aspect-square"
            >
              {/* Image Card Container: Handles clipping and parallax */}
              <div className="relative w-full h-full rounded-2xl border border-dark-700 bg-dark-800 overflow-hidden">
                <ParallaxImage
                  src="https://images.pexels.com/photos/4974915/pexels-photo-4974915.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Developer workspace"
                />
              </div>

              {/* Floating Badge: Floats outside the card, free from overflow-hidden */}
              <motion.div
                className="absolute -bottom-4 md:-bottom-6 -left-4 md:-left-6 w-24 h-24 md:w-32 md:h-32 rounded-xl bg-accent/20 backdrop-blur-lg border border-white/10 shadow-[0_20px_50px_rgba(235,94,40,0.3)] flex items-center justify-center z-10"
                animate={{ rotate: [0, 5, 0, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
              >
                <span className="font-display text-3xl md:text-4xl font-bold text-accent">5+</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="reveal-section py-16 md:py-24 bg-dark-800/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <TextLineReveal className="text-accent font-medium mb-4 block">Featured Work</TextLineReveal>
            <h2 className="font-display text-3xl sm:text-4xl md:text-display-md font-bold">
              <WordReveal text="Selected Projects" />
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: 'E-Commerce Platform',
                category: 'Web Development',
                image: 'https://images.pexels.com/photos/2305445/pexels-photo-2305445.jpeg?auto=compress&cs=tinysrgb&w=600',
              },
              {
                title: 'Portfolio Website',
                category: 'UI/UX Design',
                image: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=600',
              },
              {
                title: 'Mobile App',
                category: 'App Development',
                image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=600',
              },
            ].map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative aspect-[4/5] sm:aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer"
              >
                <ParallaxImage
                  src={project.image}
                  alt={project.title}
                  className="transition-transform duration-700 group-hover:scale-125"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/50 to-transparent opacity-60 group-hover:opacity-90 transition-opacity z-10" />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <span className="text-xs text-accent font-medium">{project.category}</span>
                  <h3 className="font-display text-xl font-bold text-white mt-2">
                    {project.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/works">
              <motion.button
                className="group px-8 py-4 border border-dark-700 text-white font-medium rounded-full hover:border-accent transition-colors"
                variants={{
                  initial: { scale: 1 },
                  hovered: { scale: 1.05 },
                }}
                whileHover="hovered"
                whileTap={{ scale: 0.95 }}
                initial="initial"
              >
                <span className="flex items-center gap-2">
                  <TextRoll>View All Projects</TextRoll>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </span>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="reveal-section py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="font-display text-[20vw] font-bold text-dark-800 select-none"
            initial={{ opacity: 0.3 }}
            whileInView={{ opacity: 0.1 }}
          >
            LET&apos;S TALK
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="font-display text-4xl sm:text-5xl md:text-display-md lg:text-display-lg font-bold mb-6">
              <WordReveal text="Ready to Start" />
              <br />
              <span className="text-accent">
                <WordReveal text="Your Project?" delay={0.4} />
              </span>
            </h2>
            <p className="text-neutral text-lg max-w-2xl mx-auto mb-12">
              Let&apos;s collaborate and bring your vision to life with stunning design and flawless execution.
            </p>
            <Link href="/contact">
              <motion.button
                className="group px-12 py-5 bg-accent text-white font-medium rounded-full relative overflow-hidden"
                variants={{
                  initial: { scale: 1 },
                  hovered: { scale: 1.05 },
                }}
                whileHover="hovered"
                whileTap={{ scale: 0.95 }}
                initial="initial"
              >
                <span className="relative z-10 flex items-center gap-2 text-lg">
                  <TextRoll>Start a Conversation</TextRoll>
                  <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-accent-dark"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
