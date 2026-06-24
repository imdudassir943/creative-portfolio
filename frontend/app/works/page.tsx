'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ExternalLink, Github } from 'lucide-react';
import Image from 'next/image';
import { ParallaxImage, WordReveal } from '@/components/scroll-animations';
import { TextRoll } from '@/components/ui/text-roll';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    category: 'Web Development',
    description: 'A modern e-commerce platform with seamless checkout experience and dynamic product filtering.',
    image: 'https://images.pexels.com/photos/2305445/pexels-photo-2305445.jpeg?auto=compress&cs=tinysrgb&w=1200',
    color: 'from-accent/20 to-dark-800',
    tech: ['Next.js', 'TypeScript', 'Stripe', 'Tailwind'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 2,
    title: 'Creative Agency Website',
    category: 'UI/UX Design',
    description: 'Award-winning agency website with immersive animations and storytelling experience.',
    image: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1200',
    color: 'from-dark-800 to-accent/20',
    tech: ['React', 'Framer Motion', 'GSAP', 'Styled Components'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 3,
    title: 'Finance Dashboard',
    category: 'App Development',
    description: 'Real-time financial dashboard with data visualization and analytics.',
    image: 'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=1200',
    color: 'from-accent/20 to-dark-800',
    tech: ['Vue.js', 'D3.js', 'Node.js', 'PostgreSQL'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 4,
    title: 'Social Media App',
    category: 'Mobile Development',
    description: 'Cross-platform social application with real-time messaging and content sharing.',
    image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=1200',
    color: 'from-dark-800 to-accent/20',
    tech: ['React Native', 'Firebase', 'Redux', 'Socket.io'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 5,
    title: 'AI Content Generator',
    category: 'Machine Learning',
    description: 'AI-powered content generation tool with natural language processing.',
    image: 'https://images.pexels.com/photos/8386442/pexels-photo-8386442.jpeg?auto=compress&cs=tinysrgb&w=1200',
    color: 'from-accent/20 to-dark-800',
    tech: ['Python', 'OpenAI', 'FastAPI', 'React'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 6,
    title: 'Portfolio Website',
    category: 'Web Design',
    description: 'Minimalist portfolio website with stunning animations and smooth scrolling.',
    image: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=1200',
    color: 'from-dark-800 to-accent/20',
    tech: ['Next.js', 'GSAP', 'Framer Motion', 'Tailwind'],
    liveUrl: '#',
    githubUrl: '#',
  },
];

const categories = ['All', 'Web Development', 'UI/UX Design', 'App Development', 'Mobile Development', 'Machine Learning', 'Web Design'];

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  color: string;
  tech: string[];
  liveUrl: string;
  githubUrl: string;
}

interface WorksProjectCardProps {
  project: Project;
  index: number;
}

const WorksProjectCard: React.FC<WorksProjectCardProps> = ({ project, index }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200, mass: 0.2 };
  const glowX = useSpring(mouseX, springConfig);
  const glowY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <motion.article
      className="work-card group relative rounded-2xl overflow-hidden cursor-pointer p-[1.5px] bg-dark-800/40 border border-dark-700/30 shadow-lg"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4 }}
      onMouseMove={handleMouseMove}
    >
      {/* Rotating Border Beam: GPU accelerated sharp glowing line orbiting the card edges */}
      <motion.div
        className="absolute inset-[-1000%] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
        style={{
          background: "conic-gradient(from 0deg, transparent 60%, #eb5e28 80%, #f57a4f 90%, transparent 100%)",
        }}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Inner Card Content: Solid background hides the rotating sheet except at the borders */}
      <div className="relative w-full h-full rounded-[15px] overflow-hidden bg-dark-900 z-10">
        <Link href={project.liveUrl} className="block">
          <div className="relative aspect-[4/5] sm:aspect-[4/3] overflow-hidden">
            {/* Spotlight Glow Overlay */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20"
              style={{
                background: useMotionTemplate`
                  radial-gradient(
                    300px circle at ${glowX}px ${glowY}px,
                    rgba(235, 94, 40, 0.15),
                    transparent 80%
                  )
                `,
              }}
            />

            <ParallaxImage
              src={project.image}
              alt={project.title}
              className="transition-transform duration-700 group-hover:scale-125"
            />

            {/* Dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/45 to-transparent opacity-70 group-hover:opacity-90 transition-opacity z-10" />

            <div className="absolute top-4 right-4 flex gap-2 z-35">
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-dark-800/80 backdrop-blur-sm flex items-center justify-center hover:bg-accent transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="w-5 h-5 text-white" />
              </motion.a>
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-dark-800/80 backdrop-blur-sm flex items-center justify-center hover:bg-accent transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-5 h-5 text-white" />
              </motion.a>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 z-25">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-accent/20 text-accent mb-3">
                  {project.category}
                </span>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-neutral text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full text-xs bg-dark-800/80 text-neutral border border-dark-700/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>

            <motion.div
              className="absolute bottom-6 right-6 z-25"
              initial={{ opacity: 0, x: -10 }}
              whileHover={{ opacity: 1, x: 0 }}
            >
              <ArrowUpRight className="w-8 h-8 text-accent" />
            </motion.div>
          </div>
        </Link>
      </div>
    </motion.article>
  );
};

export default function WorksPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.work-card',
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.works-grid',
            start: 'top 70%',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <motion.section
        ref={heroRef}
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative min-h-[60vh] flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-10" />

        <motion.div
          className="blob w-[600px] h-[600px] bg-accent/30 -top-40 -right-40"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-accent font-medium mb-4 block"
          >
            Portfolio
          </motion.span>
          <motion.h1
            initial="initial"
            whileHover="hovered"
            animate={{ opacity: 1, y: 0 }}
            variants={{
              initial: { opacity: 0, y: 30 },
              hovered: {},
            }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 cursor-default select-none flex items-center justify-center gap-x-4"
          >
            <TextRoll>My</TextRoll>
            <span className="text-accent">
              <TextRoll>Works</TextRoll>
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-neutral text-xl max-w-2xl mx-auto"
          >
            Explore a collection of my finest projects, crafted with passion and precision.
          </motion.p>
        </div>
      </motion.section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex overflow-x-auto md:flex-wrap md:justify-center gap-3 mb-12 md:mb-16 pb-4 md:pb-0 scrollbar-none snap-x snap-mandatory px-4 md:px-0"
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                variants={{
                  initial: { scale: 1 },
                  hovered: { scale: 1.05 },
                }}
                whileHover="hovered"
                whileTap={{ scale: 0.95 }}
                initial="initial"
                className={`snap-center shrink-0 px-6 py-2.5 rounded-full text-sm font-medium transition-all ${category === 'All'
                    ? 'bg-accent text-white'
                    : 'border border-dark-700 text-neutral hover:border-accent hover:text-accent'
                  }`}
              >
                <TextRoll>{category}</TextRoll>
              </motion.button>
            ))}
          </motion.div>

          <div className="works-grid grid md:grid-cols-2 gap-6 md:gap-8">
            {projects.map((project, index) => (
              <WorksProjectCard
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-dark-800/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl sm:text-4xl md:text-display-md font-bold mb-6">
              <WordReveal text="Have a Project in Mind?" />
            </h2>
            <p className="text-neutral text-lg max-w-2xl mx-auto mb-8">
              Let&apos;s work together to create something extraordinary.
            </p>
            <Link href="/contact">
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
                  <TextRoll>Start a Project</TextRoll>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </span>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
