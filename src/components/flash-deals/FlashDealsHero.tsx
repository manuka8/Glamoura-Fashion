'use client';

import { useState, useEffect, useRef, type MouseEvent } from 'react';
import {
  motion, AnimatePresence, useMotionValue, useTransform, useSpring,
  type MotionValue,
} from 'framer-motion';
import {
  Zap, ArrowRight, Star, Clock, RefreshCw, Flame,
  Percent, Award, Truck, Sparkles, Diamond,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import heroWatch from '@/app/assets/product iamges/minimalist_slate_watch.png';

/* ─── Subtle film-grain noise (inline SVG, no network request) ───────── */
const NOISE_SVG = `<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='auroraGrain'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(#auroraGrain)'/></svg>`;
const NOISE_BG = `url("data:image/svg+xml,${encodeURIComponent(NOISE_SVG)}")`;

/* ─── Countdown ───────────────────────────────────────────────────────── */
function useCountdown(initialHours = 23, initialMinutes = 59, initialSeconds = 59) {
  const [time, setTime] = useState({ h: initialHours, m: initialMinutes, s: initialSeconds });
  useEffect(() => {
    const id = setInterval(() => {
      setTime(prev => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 };
        if (prev.m > 0) return { ...prev, m: prev.m - 1, s: 59 };
        if (prev.h > 0) return { ...prev, h: prev.h - 1, m: 59, s: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

/* ─── Flip-style time block ───────────────────────────────────────────── */
function TimeBlock({ value, label, colorClass }: { value: number; label: string; colorClass: string }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={cn(
          'relative w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center overflow-hidden rounded-xl sm:rounded-2xl shadow-xl',
          colorClass
        )}
        style={{ perspective: 300 }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={value}
            initial={{ rotateX: -90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={{ rotateX: 90, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.34, 1.4, 0.64, 1] }}
            style={{ transformStyle: 'preserve-3d' }}
            className="text-xl sm:text-3xl md:text-4xl font-bold font-mono text-white tabular-nums"
          >
            {String(value).padStart(2, '0')}
          </motion.span>
        </AnimatePresence>
        <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-black/10" />
      </div>
      <span className="mt-1.5 text-[9px] sm:text-[10px] uppercase tracking-widest text-gray-500 font-semibold">
        {label}
      </span>
    </div>
  );
}

/* ─── CTA button: shine sweep + hover glow + click ripple ────────────── */
function ShineButton() {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = Date.now();
    setRipples(prev => [...prev, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    window.setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 650);
  }

  return (
    <motion.div whileHover={{ scale: 1.045 }} whileTap={{ scale: 0.97 }} className="inline-block">
      <Link
        href="#deals"
        onClick={handleClick}
        className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-rose-500 to-sky-500 px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-xl shadow-rose-200/60 transition-shadow duration-300 hover:shadow-2xl hover:shadow-sky-200/70"
      >
        <motion.span
          aria-hidden
          animate={{ x: ['-150%', '250%'] }}
          transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 2.2, ease: 'easeInOut' }}
          className="pointer-events-none absolute inset-y-0 w-1/4 -skew-x-[20deg] bg-gradient-to-r from-transparent via-white/50 to-transparent"
        />
        <span className="relative">Shop Now</span>
        <ArrowRight className="relative w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />

        {ripples.map(r => (
          <motion.span
            key={r.id}
            initial={{ width: 0, height: 0, opacity: 0.45 }}
            animate={{ width: 260, height: 260, opacity: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            style={{ left: r.x, top: r.y }}
            className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/70"
          />
        ))}
      </Link>
    </motion.div>
  );
}

/* ─── Floating glass badges scattered around the hero ─────────────────── */
// Positioned in the top/bottom strips only (outside both text and card columns)
// so they never collide with content once the container hits max-w-7xl.
const FLOATING_BADGES = [
  { label: '70% OFF',       icon: Percent,  tint: 'text-rose-500',    duration: 7,   className: 'top-[10%] left-[4%]' },
  { label: 'Best Seller',   icon: Award,    tint: 'text-sky-500',     duration: 8.5, className: 'top-[7%] left-[42%]' },
  { label: 'New Arrival',   icon: Sparkles, tint: 'text-emerald-500', duration: 6.5, className: 'bottom-[6%] left-[10%]' },
  { label: 'Limited Stock', icon: Flame,    tint: 'text-rose-500',    duration: 7.5, className: 'bottom-[10%] left-[42%]' },
  { label: 'Free Shipping', icon: Truck,    tint: 'text-sky-500',     duration: 9,   className: 'bottom-[6%] left-[72%]' },
] as const;

function FloatingBadge({ label, icon: Icon, tint, duration, className, delay }: {
  label: string; icon: typeof Percent; tint: string; duration: number; className: string; delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.6, ease: 'easeOut' }}
      className={cn('pointer-events-none absolute z-20 hidden xl:block', className)}
    >
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration, repeat: Infinity, ease: 'easeInOut' }}
        className="flex items-center gap-1.5 rounded-2xl border border-white/70 bg-white/70 px-3.5 py-2 shadow-lg shadow-rose-100/50 backdrop-blur-md"
      >
        <Icon className={cn('w-3.5 h-3.5', tint)} />
        <span className="whitespace-nowrap text-[11px] font-bold text-ink">{label}</span>
      </motion.div>
    </motion.div>
  );
}

/* ─── Floating "3D" product showcase ───────────────────────────────────── */
function ProductShowcase({ rotateX, rotateY }: { rotateX: MotionValue<number>; rotateY: MotionValue<number> }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.9, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="absolute -left-6 top-2 z-10 hidden lg:block xl:-left-12"
      style={{ perspective: 1200 }}
    >
      <motion.div
        animate={{ y: [0, -16, 0], rotate: [-6, -3, -6] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        style={{ rotateX, rotateY }}
        className="relative"
      >
        <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-rose-300/40 via-sky-300/30 to-emerald-300/40 blur-2xl" />
        <div className="relative w-36 rounded-[1.75rem] border border-white/60 bg-white/40 p-2 shadow-2xl backdrop-blur-sm sm:w-44">
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl">
            <Image src={heroWatch} alt="Featured flash deal" fill sizes="200px" className="object-cover" />
          </div>
        </div>
        <div className="mx-2 h-8 rounded-b-2xl bg-gradient-to-b from-white/50 to-transparent opacity-60 blur-sm" />
      </motion.div>
    </motion.div>
  );
}

/* ─── Glassmorphism countdown card ─────────────────────────────────────── */
function CountdownCard() {
  const { h, m, s } = useCountdown();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-20"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="relative"
      >
        <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-rose-300/40 via-sky-200/30 to-emerald-300/40 opacity-80 blur-xl" />
        <div className="relative w-[280px] rounded-[1.75rem] border border-white/70 bg-white/60 p-6 shadow-2xl backdrop-blur-2xl sm:w-[340px] sm:rounded-[2rem] sm:p-8">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-gray-400 mb-5">Ends in</p>
          <div className="flex items-start justify-center gap-2 sm:gap-3">
            <TimeBlock value={h} label="Hours" colorClass="bg-rose-500" />
            <span className="mt-3 text-2xl font-bold text-gray-300 sm:mt-5 sm:text-4xl">:</span>
            <TimeBlock value={m} label="Mins" colorClass="bg-sky-500" />
            <span className="mt-3 text-2xl font-bold text-gray-300 sm:mt-5 sm:text-4xl">:</span>
            <TimeBlock value={s} label="Secs" colorClass="bg-emerald-500" />
          </div>

          <div className="relative mt-6 space-y-3 border-t border-gray-100 pt-5">
            <div className="flex items-center justify-between text-[11px] font-bold text-ink/80">
              <span>Deal claimed</span>
              <span>68%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '68%' }}
                transition={{ duration: 1.4, ease: 'easeOut', delay: 1.5 }}
                className="h-full rounded-full bg-gradient-to-r from-rose-400 via-sky-400 to-emerald-400"
              />
            </div>
            <div className="flex items-center justify-between text-[11px] font-medium text-gray-500">
              <span>142 left in stock</span>
              <span>1,204 sold today</span>
            </div>
            <motion.div
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              className="flex items-center justify-center gap-1.5 pt-1 text-[11px] font-black uppercase tracking-wide text-rose-500"
            >
              <Flame className="h-3.5 w-3.5" />
              Hurry! Selling fast
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Hero ──────────────────────────────────────────────────────────────
   Only the section below the navbar. Navbar itself is untouched. */
export function FlashDealsHero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  const productRotateY = useTransform(springX, [-300, 300], [-8, 8]);
  const productRotateX = useTransform(springY, [-300, 300], [8, -8]);
  const blobX = useTransform(springX, [-300, 300], [-18, 18]);
  const blobY = useTransform(springY, [-300, 300], [-18, 18]);

  function handleMouseMove(e: MouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  }

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative isolate flex min-h-[92vh] items-center overflow-hidden bg-white sm:min-h-screen"
    >
      {/* Aurora mesh background */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.1 }} className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-aurora-rose via-white to-aurora-blue" />
        <div className="absolute inset-0 bg-gradient-to-tl from-aurora-green/60 via-transparent to-transparent" />

        <motion.div
          style={{ x: blobX, y: blobY }}
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-24 -right-20 h-[28rem] w-[28rem] rounded-full bg-rose-200/50 blur-[110px]"
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -left-24 top-1/3 h-[26rem] w-[26rem] rounded-full bg-sky-200/50 blur-[110px]"
        />
        <motion.div
          animate={{ x: [0, 26, 0], y: [0, 26, 0] }}
          transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-28 left-1/4 h-[24rem] w-[24rem] rounded-full bg-emerald-200/50 blur-[110px]"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.85, 0.5] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-1/2 top-8 h-40 w-40 rounded-full bg-white blur-3xl"
        />

        {/* film-grain noise for depth */}
        <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay" style={{ backgroundImage: NOISE_BG }} />
      </motion.div>

      {/* Decorative sparkles, rings, diamonds, streaks */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -60, 0], opacity: [0, 0.8, 0] }}
            transition={{ duration: 6 + (i % 4), repeat: Infinity, delay: i * 0.5 }}
            className={cn(
              'absolute rounded-full',
              i % 3 === 0 ? 'h-1.5 w-1.5 bg-rose-400/60' : i % 3 === 1 ? 'h-1 w-1 bg-sky-400/60' : 'h-1.5 w-1.5 bg-emerald-400/60'
            )}
            style={{ left: `${(i * 9.5) % 100}%`, top: `${20 + (i * 13) % 60}%` }}
          />
        ))}

        <div className="absolute right-[16%] top-[18%] h-40 w-40 rounded-full border border-rose-300/40 sm:h-48 sm:w-48" />
        <div className="absolute bottom-[14%] left-[10%] h-56 w-56 rounded-full border border-sky-300/30" />

        <motion.div
          animate={{ opacity: [0.25, 0.6, 0.25], scale: [1, 1.15, 1] }}
          transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
          className="absolute right-[10%] top-[30%] hidden sm:block"
          style={{ filter: 'drop-shadow(0 0 6px rgba(244,63,94,0.45))' }}
        >
          <Diamond className="h-4 w-4 text-rose-400" fill="currentColor" />
        </motion.div>
        <motion.div
          animate={{ opacity: [0.2, 0.55, 0.2], scale: [1, 1.15, 1] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1.5 }}
          className="absolute bottom-[28%] right-[22%] hidden sm:block"
          style={{ filter: 'drop-shadow(0 0 6px rgba(14,165,233,0.45))' }}
        >
          <Diamond className="h-3 w-3 text-sky-400" fill="currentColor" />
        </motion.div>

        <div className="absolute left-[8%] top-[55%] hidden h-px w-40 rotate-[-24deg] bg-gradient-to-r from-transparent via-white/70 to-transparent blur-[1px] sm:block" />
      </div>

      {/* Floating badges */}
      {FLOATING_BADGES.map((b, i) => (
        <FloatingBadge key={b.label} {...b} delay={1.35 + i * 0.12} />
      ))}

      {/* Content */}
      <div className="relative z-20 mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 sm:py-28">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-10">
          {/* Left – text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="max-w-2xl text-center lg:text-left"
          >
            <motion.div
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ repeat: Infinity, duration: 2.2 }}
              className="relative mb-6 inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-rose-500 to-sky-500 px-4 py-1.5 shadow-lg shadow-rose-200/50"
            >
              <motion.span
                aria-hidden
                animate={{ x: ['-120%', '220%'] }}
                transition={{ duration: 2.6, repeat: Infinity, repeatDelay: 1.6, ease: 'easeInOut' }}
                className="absolute inset-y-0 w-1/3 -skew-x-[20deg] bg-gradient-to-r from-transparent via-white/60 to-transparent"
              />
              <Zap className="relative h-4 w-4 flex-shrink-0 fill-white text-white" />
              <span className="relative text-xs font-black uppercase tracking-wider text-white">Limited Time Event</span>
            </motion.div>

            <h1 className="mb-5 text-4xl font-serif font-bold leading-[1.05] text-ink xs:text-5xl sm:text-6xl md:text-7xl lg:text-[5.25rem]">
              Mega{' '}
              <motion.span
                animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                transition={{ duration: 8, repeat: Infinity }}
                style={{ backgroundSize: '200% auto' }}
                className="bg-gradient-to-r from-rose-500 via-sky-500 to-emerald-500 bg-clip-text italic text-transparent"
              >
                Flash
              </motion.span>{' '}
              Sale
            </h1>

            <p className="mx-auto mb-8 max-w-md text-base font-light leading-relaxed text-gray-600 sm:text-lg lg:mx-0">
              Our biggest markdown of the season. Premium luxury pieces at up to 70% off — only for the next few hours.
            </p>

            <div className="flex justify-center lg:justify-start">
              <ShineButton />
            </div>

            {/* Trust indicators */}
            <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2.5 lg:justify-start">
              <div className="flex items-center gap-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="ml-1 text-sm font-bold text-ink">4.9</span>
                <span className="text-sm text-gray-500">Rating</span>
              </div>
              <span className="hidden text-gray-300 xs:inline">•</span>
              <span className="text-sm text-gray-600">
                <span className="font-bold text-ink">120K+</span> Happy Customers
              </span>
              <span className="hidden text-gray-300 xs:inline">•</span>
              <span className="inline-flex items-center gap-1.5 text-sm text-gray-600">
                <Clock className="h-3.5 w-3.5 text-sky-500" />
                Updated Every Hour
              </span>
            </div>
          </motion.div>

          {/* Right – product + countdown */}
          <div className="relative flex justify-center lg:justify-end lg:pr-6 xl:pr-10">
            <ProductShowcase rotateX={productRotateX} rotateY={productRotateY} />
            <CountdownCard />
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.6 }}
        className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2"
      >
        <div className="flex h-8 w-5 justify-center rounded-full border-2 border-gray-300">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
            className="mt-1.5 h-2 w-0.5 rounded-full bg-rose-400"
          />
        </div>
      </motion.div>
    </section>
  );
}
