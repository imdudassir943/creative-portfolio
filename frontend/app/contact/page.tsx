'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, MessageSquare } from 'lucide-react';
import { WordReveal } from '@/components/scroll-animations';
import { TextRoll } from '@/components/ui/text-roll';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@example.com',
    href: 'mailto:hello@example.com',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+1 (555) 123-4567',
    href: 'tel:+15551234567',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'San Francisco, CA',
    href: '#',
  },
];

const socialLinks = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
];

const formFields = [
  { name: 'name', label: 'Your Name', type: 'text', placeholder: 'John Doe', required: true },
  { name: 'email', label: 'Your Email', type: 'email', placeholder: 'john@example.com', required: true },
  { name: 'subject', label: 'Subject', type: 'text', placeholder: 'Project Inquiry', required: true },
];

export default function ContactPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitted(true);
    setFormState({ name: '', email: '', subject: '', message: '' });

    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <motion.section
        ref={heroRef}
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative min-h-[60vh] flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-10" />

        <motion.div
          className="blob w-[600px] h-[600px] bg-accent/30 top-40 -right-40"
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
            Get in Touch
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
            <TextRoll>Let&apos;s</TextRoll>
            <span className="text-accent">
              <TextRoll>Connect</TextRoll>
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-neutral text-xl max-w-2xl mx-auto"
          >
            Have a project in mind? Let&apos;s create something extraordinary together.
          </motion.p>
        </div>
      </motion.section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-12">
                <h2 className="font-display text-2xl sm:text-3xl lg:text-display-sm font-bold mb-4">
                  <WordReveal text="Contact Information" />
                </h2>
                <p className="text-neutral">
                  Feel free to reach out through any of these channels. I typically respond within 24 hours.
                </p>
              </div>

              <div className="space-y-6 mb-12">
                {contactInfo.map((info, i) => (
                  <motion.a
                    key={info.label}
                    href={info.href}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group flex items-center gap-4 p-4 rounded-xl bg-dark-800/50 border border-dark-700 hover:border-accent transition-colors"
                  >
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                      <info.icon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{info.label}</p>
                      <p className="text-white font-medium">{info.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>

              <div>
                <h3 className="font-display text-lg font-bold text-white mb-4">
                  <WordReveal text="Follow Me" />
                </h3>
                <div className="flex gap-3">
                  {socialLinks.map((link) => (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full border border-dark-700 flex items-center justify-center hover:border-accent hover:bg-accent/10 transition-colors"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <link.icon className="w-5 h-5 text-neutral hover:text-accent transition-colors" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="p-8 md:p-10 rounded-2xl bg-dark-800/50 border border-dark-700">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-accent" />
                  </div>
                  <h2 className="font-display text-2xl font-bold text-white">
                    <WordReveal text="Send a Message" />
                  </h2>
                </div>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                      <Send className="w-8 h-8 text-green-500" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-white mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-neutral">
                      Thank you for reaching out. I&apos;ll get back to you soon.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {formFields.map((field) => (
                      <div key={field.name}>
                        <label
                          htmlFor={field.name}
                          className="block text-sm font-medium text-white mb-2"
                        >
                          {field.label}
                        </label>
                        <input
                          type={field.type}
                          id={field.name}
                          name={field.name}
                          value={formState[field.name as keyof typeof formState]}
                          onChange={handleChange}
                          placeholder={field.placeholder}
                          required={field.required}
                          className="w-full px-4 py-3 rounded-lg bg-dark-900 border border-dark-700 text-white placeholder:text-muted-foreground focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none transition-all duration-300 shadow-sm focus:shadow-accent/5"
                        />
                      </div>
                    ))}

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-white mb-2"
                      >
                        Your Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formState.message}
                        onChange={handleChange}
                        placeholder="Tell me about your project..."
                        required
                        rows={5}
                        className="w-full px-4 py-3 rounded-lg bg-dark-900 border border-dark-700 text-white placeholder:text-muted-foreground focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none transition-all duration-300 shadow-sm focus:shadow-accent/5 resize-none"
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="group w-full px-8 py-4 bg-accent text-white font-medium rounded-lg relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
                      variants={{
                        initial: { scale: 1 },
                        hovered: { scale: 1.02 },
                      }}
                      whileHover="hovered"
                      whileTap={{ scale: 0.98 }}
                      initial="initial"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {isSubmitting ? (
                          <>
                            <motion.div
                              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'linear' as const }}
                            />
                            Sending...
                          </>
                        ) : (
                          <>
                            <TextRoll>Send Message</TextRoll>
                            <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          </>
                        )}
                      </span>
                      <motion.div
                        className="absolute inset-0 bg-accent-dark"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.button>
                  </form>
                )}
              </div>
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
            className="text-center"
          >
            <div className="flex flex-col items-center">
              <WordReveal text="LET'S BUILD" className="font-display text-[15vw] font-bold text-dark-800 select-none leading-none" />
              <WordReveal text="SOMETHING" className="font-display text-[15vw] font-bold text-dark-800 select-none leading-none -mt-8" delay={0.2} />
              <WordReveal text="AMAZING" className="font-display text-[15vw] font-bold text-accent select-none leading-none -mt-8" delay={0.4} />
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
