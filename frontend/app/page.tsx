'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, ArrowUpRight, Sparkles } from 'lucide-react';
import Image from 'next/image';

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

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-letter',
        { y: 100, opacity: 0, rotateX: -90 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          stagger: 0.05,
          duration: 1,
          ease: 'power4.out',
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
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-accent origin-left z-50"
        style={{ scaleX }}
      />

      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20" />

        <motion.div
          className="blob w-96 h-96 bg-accent top-20 -left-20"
          animate={floatingAnimation}
        />
        <motion.div
          className="blob w-80 h-80 bg-dark-800 bottom-20 right-10"
          animate={{
            ...floatingAnimation,
            transition: { ...floatingAnimation.transition, delay: 2 },
          }}
        />

        {/* Developer Portrait Background Layer */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.8 }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[320px] sm:w-[420px] md:w-[500px] h-[350px] sm:h-[450px] md:h-[550px] z-0 pointer-events-none select-none"
        >
          <div className="relative w-full h-full">
            <Image
              src="/developer.jpg"
              alt="Developer"
              fill
              className="object-cover object-top grayscale contrast-125 brightness-[0.35] sepia-[15%] opacity-40 transition-all duration-700 hover:brightness-50"
              priority
            />
            {/* Smooth edge fade overlays to blend into black background */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black" />
          </div>
        </motion.div>

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
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 perspective-1000"
          >
            <span className="inline-block hero-letter">C</span>
            <span className="inline-block hero-letter">r</span>
            <span className="inline-block hero-letter">e</span>
            <span className="inline-block hero-letter">a</span>
            <span className="inline-block hero-letter">t</span>
            <span className="inline-block hero-letter">i</span>
            <span className="inline-block hero-letter">v</span>
            <span className="inline-block hero-letter">e</span>
            <br />
            <span className="text-accent">
              <span className="inline-block hero-letter">D</span>
              <span className="inline-block hero-letter">e</span>
              <span className="inline-block hero-letter">v</span>
              <span className="inline-block hero-letter">e</span>
              <span className="inline-block hero-letter">l</span>
              <span className="inline-block hero-letter">o</span>
              <span className="inline-block hero-letter">p</span>
              <span className="inline-block hero-letter">e</span>
              <span className="inline-block hero-letter">r</span>
            </span>
          </h1>

          <p className="hero-subtitle text-xl md:text-2xl text-neutral max-w-2xl mx-auto mb-12">
            Crafting exceptional digital experiences with cutting-edge technology and stunning design.
          </p>

          <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/works">
              <motion.button
                className="group px-8 py-4 bg-accent text-white font-medium rounded-full relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  View Projects
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
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get in Touch
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
                  {stat.number}
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
              <span className="text-accent font-medium mb-4 block">About Me</span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-display-md font-bold mb-6">
                Turning Ideas Into Reality
              </h2>
              <p className="text-neutral text-lg mb-6 leading-relaxed">
                I&apos;m a creative developer passionate about building immersive digital experiences.
                With expertise in modern web technologies, I bring designs to life with smooth
                animations and pixel-perfect precision.
              </p>
              <Link href="/about">
                <motion.span
                  className="inline-flex items-center gap-2 text-accent font-medium line-through-hover"
                  whileHover={{ x: 5 }}
                >
                  Learn more about me
                  <ArrowUpRight className="w-4 h-4" />
                </motion.span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl overflow-hidden border border-dark-700 bg-dark-800">
                <Image
                  src="https://images.pexels.com/photos/4974915/pexels-photo-4974915.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Developer workspace"
                  fill
                  className="object-cover"
                />
              </div>
              <motion.div
                className="absolute -bottom-6 -left-6 w-32 h-32 rounded-xl bg-accent/20 backdrop-blur-lg flex items-center justify-center"
                animate={{ rotate: [0, 5, 0, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
              >
                <span className="font-display text-4xl font-bold text-accent">5+</span>
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
            <span className="text-accent font-medium mb-4 block">Featured Work</span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-display-md font-bold">
              Selected Projects
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
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/50 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
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
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center gap-2">
                  View All Projects
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
              Ready to Start
              <br />
              <span className="text-accent">Your Project?</span>
            </h2>
            <p className="text-neutral text-lg max-w-2xl mx-auto mb-12">
              Let&apos;s collaborate and bring your vision to life with stunning design and flawless execution.
            </p>
            <Link href="/contact">
              <motion.button
                className="group px-12 py-5 bg-accent text-white font-medium rounded-full relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center gap-2 text-lg">
                  Start a Conversation
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
