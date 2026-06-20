'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Import desktop slides
import slide1 from '@/app/assets/slider/slide1.png';
import slide2 from '@/app/assets/slider/slide2.png';
import slide3 from '@/app/assets/slider/slide3.png';

// Import mobile slides
import slide1Mobile from '@/app/assets/slider/slide1-mobile.png';
import slide2Mobile from '@/app/assets/slider/slide2-mobile.png';
import slide3Mobile from '@/app/assets/slider/slide3-mobile.png';

const slides = [
  {
    id: 1,
    title: 'Ethereal\nElegance',
    subtitle: 'Spring Collection',
    description:
      'Graceful silhouettes and timeless fashion for the modern muse. Discover refined elegance in every stitch.',
    image: slide1,
    mobileImage: slide1Mobile,
    link: '/products?category=women',
    colors: {
      primary: '#D8A7B1', // light rose
      secondary: '#FDF2F4',
      overlay: 'rgba(255,245,247,0.78)',
      text: '#33292B',
      button: '#f853b9',
      buttonHover: '#C88E9B',
    },
  },
  {
    id: 2,
    title: 'Natural\nSerenity',
    subtitle: 'Fresh Fashion',
    description:
      'Elegant pieces inspired by nature and effortless beauty, designed for confidence and comfort.',
    image: slide2,
    mobileImage: slide2Mobile,
    link: '/products?category=women',
    colors: {
      primary: '#B8D8B1', // light green
      secondary: '#F4FAF2',
      overlay: 'rgba(244,250,242,0.78)',
      text: '#304030',
      button: '#59fa35',
      buttonHover: '#9FBE98',
    },
  },
  {
    id: 3,
    title: 'Ocean\nMinimal',
    subtitle: 'Modern Essentials',
    description:
      'Minimal luxury meets effortless styling with elevated wardrobe essentials for everyday elegance.',
    image: slide3,
    mobileImage: slide3Mobile,
    link: '/products?category=women',
    colors: {
      primary: '#8ec7fd', // light blue
      secondary: '#F5FAFE',
      overlay: 'rgba(245,250,254,0.78)',
      text: '#26384A',
      button: '#3b9cf7',
      buttonHover: '#95C2EA',
    },
  },
];

const SPLASH_DURATION = 4000; // must match SplashScreen timeout

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isReady, setIsReady] = useState(false); // false until splash finishes

  const duration = 4000;

  // Wait for splash screen to finish before starting auto-advance
  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), SPLASH_DURATION);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-advance: always goes 1 → 2 → 3 → 1 in order
  // Only starts after the splash screen has finished
  useEffect(() => {
    if (!isReady || isHovered) return;

    setProgress(0);
    let prog = 0;
    const step = 100 / (duration / 50); // progress increment per tick

    const interval = setInterval(() => {
      prog += step;
      if (prog >= 100) {
        prog = 0;
        // advance to next slide in order, wrapping back to 0 after last
        setCurrent(prev => (prev + 1) % slides.length);
      }
      setProgress(prog);
    }, 50);

    return () => clearInterval(interval);
  }, [current, isHovered, isReady]);

  const nextSlide = () => {
    setProgress(0);
    setCurrent(prev => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setProgress(0);
    setCurrent(prev => (prev - 1 + slides.length) % slides.length);
  };

  const slide = slides[current];
  const colors = slide.colors;

  return (
    <section
      className="relative h-screen overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Background Image */}
          <motion.div
            initial={{ scale: 1.12 }}
            animate={{ scale: 1 }}
            transition={{ duration: 8, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            <Image
              src={isMobile ? slide.mobileImage : slide.image}
              alt={slide.title}
              fill
              priority
              className="object-cover"
            />
          </motion.div>

          {/* Gradient Overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(
                90deg,
                {colors.overlay} 0%,
                rgba(255,255,255,0.45) 35%,
                rgba(255,255,255,0.08) 70%
              )`,
            }}
          />

          {/* Decorative Blur */}
          <div
            className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full blur-[140px] opacity-30"
            style={{ backgroundColor: colors.primary }}
          />

          {/* Main Content */}
          <div className="relative z-20 flex items-center h-full px-6 md:px-12 lg:px-24">
            <div className="max-w-xl">
              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="uppercase tracking-[0.3em] text-xs md:text-sm font-semibold mb-5"
                style={{ color: colors.primary }}
              >
                {slide.subtitle}
              </motion.p>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl md:text-6xl lg:text-8xl font-serif leading-[1.05] whitespace-pre-line mb-6"
                style={{ color: colors.text }}
              >
                {slide.title}
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 0.85, y: 0 }}
                transition={{ delay: 0.45 }}
                className="text-sm md:text-lg leading-relaxed max-w-md mb-8"
                style={{ color: colors.text }}
              >
                {slide.description}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex gap-4 flex-wrap"
              >
                <Link
                  href={slide.link}
                  className="group inline-flex items-center gap-3 px-8 py-4 rounded-full text-xs uppercase tracking-[0.2em] font-semibold shadow-xl transition-all duration-300"
                  style={{
                    backgroundColor: colors.button,
                    color: '#fff',
                  }}
                >
                  Shop Collection
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>

                <button className="px-8 py-4 rounded-full border border-white/1000 bg-white/20 backdrop-blur-md text-xs uppercase tracking-[0.2em] font-semibold hover:bg-white/30 transition-all">
                  Explore
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-4">
        <motion.button
          whileHover={{ scale: 1.08, x: -3 }}
          whileTap={{ scale: 0.95 }}
          onClick={prevSlide}
          className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-white/900 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-lg"
        >
          <ChevronLeft className="w-5 h-5" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.08, x: 3 }}
          whileTap={{ scale: 0.95 }}
          onClick={nextSlide}
          className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-lg"
        >
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {slides.map((s, index) => (
          <button
            key={s.id}
            onClick={() => {
              setCurrent(index);
              setProgress(0);
            }}
            className={`rounded-full transition-all duration-300 {
              current === index ? 'w-12 h-2' : 'w-2 h-2'
            }`}
            style={{
              backgroundColor:
                current === index
                  ? s.colors.primary
                  : 'rgba(255,255,255,0.5)',
            }}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/20 z-30">
        <motion.div
          animate={{ width: `{progress}%` }}
          transition={{ ease: 'linear' }}
          className="h-full"
          style={{ backgroundColor: colors.primary }}
        />
      </div>

      {/* Slide Number */}
      <motion.div
        key={current}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.18, y: 0 }}
        className="absolute bottom-8 right-6 lg:right-12 text-[90px] lg:text-[180px] font-serif z-10 pointer-events-none select-none"
        style={{ color: colors.primary }}
      >
        0{current + 1}
      </motion.div>
    </section>
  );
}