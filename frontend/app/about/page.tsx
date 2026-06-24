'use client';

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { Download, MapPin, Calendar, Code2, Palette, Server, Database, Globe } from 'lucide-react';
import { ParallaxImage, TextLineReveal, WordReveal } from '@/components/scroll-animations';
import { TextRoll } from '@/components/ui/text-roll';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: 'React / Next.js', level: 95 },
  { name: 'TypeScript', level: 90 },
  { name: 'Node.js', level: 85 },
  { name: 'Python', level: 80 },
  { name: 'GSAP / Framer Motion', level: 92 },
  { name: 'Tailwind CSS', level: 95 },
];

const services = [
  {
    icon: Code2,
    title: 'Web Development',
    description: 'Building modern, performant web applications with cutting-edge technologies.',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Creating intuitive and visually stunning user interfaces and experiences.',
  },
  {
    icon: Server,
    title: 'Backend Development',
    description: 'Designing robust APIs and server architectures for scalable applications.',
  },
  {
    icon: Database,
    title: 'Database Design',
    description: 'Optimizing data structures and queries for maximum performance.',
  },
];

const experience = [
  {
    year: '2024 - Present',
    title: 'Senior Creative Developer',
    company: 'Freelance',
    description: 'Leading creative development projects for international clients, specializing in award-winning web experiences.',
  },
  {
    year: '2022 - 2024',
    title: 'Frontend Developer',
    company: 'Digital Agency',
    description: 'Developed interactive websites and web applications for Fortune 500 companies.',
  },
  {
    year: '2020 - 2022',
    title: 'Junior Developer',
    company: 'Tech Startup',
    description: 'Built and maintained web applications, collaborating closely with designers and product teams.',
  },
  {
    year: '2019 - 2020',
    title: 'Web Developer Intern',
    company: 'Creative Studio',
    description: 'Learned fundamentals of web development and animation while contributing to client projects.',
  },
];

const education = [
  {
    year: '2016 - 2020',
    title: 'Computer Science',
    school: 'University of Technology',
    degree: 'Bachelor of Science',
  },
  {
    year: '2020',
    title: 'Advanced Web Development',
    school: 'Online Bootcamp',
    degree: 'Certification',
  },
];

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.timeline-item').forEach((item, i) => {
        gsap.fromTo(
          item,
          { opacity: 0, x: i % 2 === 0 ? -50 : 50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
            },
          }
        );
      });

      gsap.fromTo(
        '.skill-bar-fill',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.skills-section',
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
          className="blob w-[500px] h-[500px] bg-accent/30 -bottom-40 -left-40"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, -90, 0],
          }}
          transition={{ duration: 25, repeat: Infinity }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-accent font-medium mb-4 block"
          >
            Get to Know Me
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
            <TextRoll>About</TextRoll>
            <span className="text-accent">
              <TextRoll>Me</TextRoll>
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-neutral text-xl max-w-2xl mx-auto"
          >
            Passionate developer dedicated to crafting exceptional digital experiences.
          </motion.p>
        </div>
      </motion.section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-dark-700 bg-dark-800">
                <ParallaxImage
                  src="https://images.pexels.com/photos/4974915/pexels-photo-4974915.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Developer portrait"
                />
              </div>
              <motion.div
                className="absolute -bottom-4 md:-bottom-8 -right-2 md:-right-8 p-4 md:p-6 rounded-xl glass"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm text-white font-medium">Available for work</span>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-display text-display-md font-bold mb-6">
                <WordReveal text="Hello, I'm a Creative Developer" />
              </h2>
              <div className="space-y-4 text-neutral leading-relaxed mb-8">
                <p>
                  With over 5 years of experience in web development, I specialize in creating
                  immersive digital experiences that combine stunning visuals with flawless functionality.
                  My passion lies in pushing the boundaries of what&apos;s possible on the web.
                </p>
                <p>
                  I believe that great design and solid engineering go hand in hand. Every project
                  I work on is an opportunity to create something unique and memorable, whether
                  it&apos;s a sleek portfolio, an interactive application, or a complex web platform.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 text-sm text-neutral">
                  <MapPin className="w-4 h-4 text-accent" />
                  <span>San Francisco, CA</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-neutral">
                  <Calendar className="w-4 h-4 text-accent" />
                  <span>5+ Years Experience</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-neutral">
                  <Globe className="w-4 h-4 text-accent" />
                  <span>Remote Available</span>
                </div>
              </div>

              <motion.button
                className="group px-6 py-3 bg-accent text-white font-medium rounded-full relative overflow-hidden"
                variants={{
                  initial: { scale: 1 },
                  hovered: { scale: 1.05 },
                }}
                whileHover="hovered"
                whileTap={{ scale: 0.95 }}
                initial="initial"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <TextRoll>Download Resume</TextRoll>
                  <Download className="w-4 h-4" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-accent-dark"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-dark-800/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl sm:text-4xl md:text-display-md font-bold mb-4">
              <WordReveal text="What I Do" />
            </h2>
            <p className="text-neutral max-w-2xl mx-auto">
              Comprehensive services to bring your digital vision to life
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="group p-6 rounded-2xl bg-dark-800/50 border border-dark-700 hover:border-accent transition-colors"
              >
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <service.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="font-display text-lg font-bold text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-neutral">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="skills-section py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl sm:text-4xl md:text-display-md font-bold mb-4">
              <WordReveal text="My Skills" />
            </h2>
            <p className="text-neutral max-w-2xl mx-auto">
              Technologies and tools I work with daily
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {skills.map((skill) => (
              <div key={skill.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-white font-medium">{skill.name}</span>
                  <span className="text-accent text-sm">{skill.level}%</span>
                </div>
                <div className="h-2 rounded-full bg-dark-800 overflow-hidden">
                  <motion.div
                    className="skill-bar-fill h-full rounded-full bg-gradient-to-r from-accent to-accent-light origin-left"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-dark-800/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl sm:text-4xl md:text-display-md font-bold mb-4">
              <WordReveal text="My Journey" />
            </h2>
            <p className="text-neutral max-w-2xl mx-auto">
              Professional experience and education timeline
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            <div>
              <h3 className="font-display text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-accent" />
                Experience
              </h3>
              <div className="space-y-8">
                {experience.map((exp, i) => (
                  <motion.div
                    key={exp.title}
                    className="timeline-item relative pl-8 pb-8 border-l border-dark-700 last:pb-0"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="absolute left-0 top-0 w-2 h-2 rounded-full bg-accent -translate-x-1/2" />
                    <span className="text-xs text-accent font-medium">{exp.year}</span>
                    <h4 className="font-display text-lg font-bold text-white mt-1">
                      {exp.title}
                    </h4>
                    <p className="text-sm text-neutral mt-1">{exp.company}</p>
                    <p className="text-sm text-muted-foreground mt-2">{exp.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-display text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-accent" />
                Education
              </h3>
              <div className="space-y-8">
                {education.map((edu, i) => (
                  <motion.div
                    key={edu.title}
                    className="timeline-item relative pl-8 pb-8 border-l border-dark-700 last:pb-0"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="absolute left-0 top-0 w-2 h-2 rounded-full bg-accent -translate-x-1/2" />
                    <span className="text-xs text-accent font-medium">{edu.year}</span>
                    <h4 className="font-display text-lg font-bold text-white mt-1">
                      {edu.title}
                    </h4>
                    <p className="text-sm text-neutral mt-1">{edu.school}</p>
                    <p className="text-sm text-muted-foreground mt-2">{edu.degree}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
