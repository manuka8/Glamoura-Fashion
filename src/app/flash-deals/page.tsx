'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Zap, TrendingUp, ShieldCheck,
  Star, Heart, Flame, Gift, Sparkles, Timer, Crown,
  Gem, ChevronRight, Eye, Bell, Package, Headphones
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { salesDeals } from '@/lib/sales-data';
import { cn, formatCurrency } from '@/lib/utils';
import { FlashDealsHero } from '@/components/flash-deals/FlashDealsHero';

/* ─── Flash Deal Card ─────────────────────────────────────── */
const FlashDealCard = ({ deal, index }: { deal: any; index: number }) => {
  const [wishlist, setWishlist] = useState(false);
  const discount = Math.round((1 - deal.price / deal.originalPrice) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.08, type: 'spring', stiffness: 90, damping: 18 }}
      className="group flex flex-col"
    >
      {/* Image container */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-gradient-to-br from-rose-50 to-sky-50 shadow-md group-hover:shadow-xl transition-shadow duration-500">
        {/* Glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10">
          <div className="absolute inset-0 bg-gradient-to-t from-rose-600/30 via-transparent to-transparent" />
        </div>

        <Image
          src={deal.image}
          alt={deal.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Discount badge */}
        <div className="absolute top-3 left-3 z-20">
          <div className="bg-gradient-to-r from-rose-500 to-rose-600 text-white px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1">
            <Flame className="w-3 h-3 flex-shrink-0" />
            <span className="text-[10px] font-black uppercase tracking-wide">{discount}% OFF</span>
          </div>
        </div>

        {/* Flash badge */}
        <div className="absolute top-3 right-3 z-20">
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
            className="bg-black/75 backdrop-blur-sm text-white px-2 py-1 rounded-full text-[9px] font-bold uppercase flex items-center gap-1"
          >
            <Zap className="w-2.5 h-2.5 fill-sky-400 text-sky-400" />
            Flash
          </motion.div>
        </div>

        {/* Wishlist */}
        <button
          onClick={() => setWishlist(v => !v)}
          className="absolute bottom-3 right-3 z-20 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-rose-50 transition-colors"
        >
          <Heart className={cn("w-4 h-4 transition-colors", wishlist ? "fill-rose-500 text-rose-500" : "text-gray-400")} />
        </button>

        {/* Quick view overlay */}
        <div className="absolute inset-0 z-20 flex items-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Link
            href={`/products/${deal.id}`}
            className="w-full bg-white/95 backdrop-blur text-gray-900 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-rose-500 hover:text-white transition-colors duration-200 shadow-lg"
          >
            <Eye className="w-3.5 h-3.5" />
            Quick View
          </Link>
        </div>
      </div>

      {/* Card body */}
      <div className="mt-3 px-0.5">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] font-bold text-rose-500 uppercase tracking-wider">{deal.category}</span>
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={cn("w-2.5 h-2.5", i < 4 ? "fill-amber-400 text-amber-400" : "text-gray-200")} />
            ))}
          </div>
        </div>

        <h3 className="text-sm sm:text-base font-semibold text-gray-900 line-clamp-1 mb-2 group-hover:text-rose-600 transition-colors">
          {deal.name}
        </h3>

        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-base sm:text-lg font-bold text-rose-600">
            {formatCurrency(deal.price)}
          </span>
          <span className="text-xs text-gray-400 line-through">{formatCurrency(deal.originalPrice)}</span>
        </div>

        {/* Progress bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <motion.span
              animate={{ opacity: [1, 0.6, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-[10px] font-bold text-rose-500"
            >
              {deal.sold}% Sold
            </motion.span>
            <span className="text-[10px] text-gray-400 flex items-center gap-1">
              <Timer className="w-2.5 h-2.5" />
              {deal.endsIn}
            </span>
          </div>
          <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${deal.sold}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: "easeOut", delay: 0.2 + index * 0.08 }}
              className="h-full bg-gradient-to-r from-rose-500 to-sky-500 rounded-full"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ─── Main Page ───────────────────────────────────────────── */
const FILTERS = [
  { id: 'all',        label: 'All Deals',   icon: Flame  },
  { id: 'fashion',    label: 'Fashion',     icon: Crown  },
  { id: 'accessories',label: 'Accessories', icon: Gem    },
  { id: 'ethnic',     label: 'Ethnic',      icon: Sparkles },
];

const TRUST_BADGES = [
  { icon: ShieldCheck, title: '100% Authentic',   desc: 'Genuine products only',   chipBg: 'bg-rose-50',    chipText: 'text-rose-500'    },
  { icon: TrendingUp,  title: 'Global Trends',    desc: 'Curated by experts',      chipBg: 'bg-sky-50',     chipText: 'text-sky-500'     },
  { icon: Package,     title: 'Fast Delivery',    desc: 'Island-wide shipping',    chipBg: 'bg-emerald-50', chipText: 'text-emerald-500' },
  { icon: Headphones,  title: '24/7 Support',     desc: '50k+ happy customers',    chipBg: 'bg-rose-50',    chipText: 'text-rose-500'    },
];

export default function FlashDealsPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const filterRef = useRef<HTMLDivElement>(null);

  return (
    <div className="bg-white min-h-screen overflow-x-hidden">

      <FlashDealsHero />

      {/* ── Trust Badges ─────────────────────────────────── */}
      <div className="bg-white border-b border-gray-100 py-5 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {TRUST_BADGES.map((item, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="flex items-center gap-3 group"
              >
                <div className={cn("flex-shrink-0 p-2 sm:p-2.5 rounded-xl group-hover:scale-110 transition-transform", item.chipBg)}>
                  <item.icon className={cn("w-4 h-4 sm:w-5 sm:h-5", item.chipText)} />
                </div>
                <div className="min-w-0">
                  <h4 className="text-[10px] sm:text-xs font-black uppercase tracking-wider truncate">{item.title}</h4>
                  <p className="text-[9px] sm:text-[10px] text-gray-400 truncate">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Filter Bar ───────────────────────────────────── */}
      <div className="bg-white border-b border-gray-100 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div
            ref={filterRef}
            className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 justify-start sm:justify-center"
          >
            {FILTERS.map((f) => {
              const Icon = f.icon;
              const active = activeFilter === f.id;
              return (
                <motion.button key={f.id}
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                  onClick={() => setActiveFilter(f.id)}
                  className={cn(
                    "flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200",
                    active
                      ? "bg-gradient-to-r from-rose-500 to-sky-500 text-white shadow-md"
                      : "bg-gray-50 text-gray-600 hover:bg-rose-50 hover:text-rose-600"
                  )}
                >
                  <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                  {f.label}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Deals Grid ───────────────────────────────────── */}
      <section id="deals" className="py-12 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-14"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-0.5 bg-gradient-to-r from-rose-500 to-sky-500" />
              <span className="text-xs font-bold uppercase tracking-wider text-rose-500">Hot Deals</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gray-900">
              Current{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-sky-600">Flash Sales</span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base mt-2">Grab them before they're gone.</p>
          </div>

          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-50 to-sky-50 border border-rose-100 px-4 py-2 rounded-full self-start sm:self-auto">
            <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-2 h-2 rounded-full bg-rose-500" />
            <span className="text-xs font-bold text-rose-600">{salesDeals.length} Live Items</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
          {salesDeals.map((deal, idx) => (
            <FlashDealCard key={deal.id} deal={deal} index={idx} />
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-12">
          <motion.button
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-600 to-sky-600 text-white px-8 py-3.5 rounded-full font-bold text-sm uppercase tracking-wide shadow-lg hover:shadow-xl transition-shadow"
          >
            Load More Deals <ChevronRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </section>

      {/* ── Promo Banner ─────────────────────────────────── */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-rose-500 via-sky-500 to-emerald-500 shadow-2xl"
          >
            {/* Decorative rings */}
            <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full border border-white/10" />
            <div className="absolute -right-8 -top-8 w-48 h-48 rounded-full border border-white/10" />
            <div className="absolute -left-16 -bottom-16 w-72 h-72 rounded-full border border-white/10" />

            <div className="relative p-7 sm:p-10 md:p-14 text-center text-white">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                className="inline-block mb-5">
                <Gift className="w-10 h-10 sm:w-14 sm:h-14 opacity-90" />
              </motion.div>
              <h3 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold mb-3">
                Limited Time Offer
              </h3>
              <p className="text-sm sm:text-lg text-white/85 mb-6 max-w-xl mx-auto">
                Get an extra 10% off your first flash sale purchase. Use code:
              </p>
              <div className="inline-flex items-center gap-3 bg-white/15 backdrop-blur border border-white/25 px-6 py-3 rounded-2xl mb-6">
                <span className="font-mono text-xl sm:text-2xl font-black tracking-widest">FLASH10</span>
              </div>
              <br />
              <motion.button
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                className="bg-white text-rose-600 px-7 py-3 rounded-full font-bold text-sm uppercase tracking-wider hover:shadow-xl transition-shadow"
              >
                Claim Offer
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Newsletter ───────────────────────────────────── */}
      <section className="relative py-20 sm:py-28 px-4 sm:px-6 overflow-hidden bg-gradient-to-br from-rose-900 via-sky-900 to-gray-900">
        <motion.div animate={{ scale: [1, 1.15, 1], rotate: [0, 60, 0] }} transition={{ duration: 18, repeat: Infinity }}
          className="absolute top-10 left-10 w-48 h-48 bg-rose-500/15 rounded-full blur-3xl pointer-events-none" />
        <motion.div animate={{ scale: [1.1, 1, 1.1], rotate: [60, 0, 60] }} transition={{ duration: 22, repeat: Infinity }}
          className="absolute bottom-10 right-10 w-64 h-64 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-2xl mx-auto text-center text-white">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <motion.div animate={{ rotate: [0, 12, -12, 0] }} transition={{ duration: 2.5, repeat: Infinity }}
              className="inline-block mb-5">
              <Bell className="w-10 h-10 sm:w-12 sm:h-12 text-rose-300" />
            </motion.div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-4">
              Don't Miss the Next Wave
            </h2>
            <p className="text-white/60 text-sm sm:text-base mb-2">
              Sign up for exclusive early access to flash sales and special drops.
            </p>
            <p className="text-emerald-300 text-xs sm:text-sm font-semibold mb-8">
              First 1,000 subscribers unlock an extra 15% off!
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 bg-white/10 backdrop-blur border border-white/20 rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:border-rose-400 focus:bg-white/15 transition-colors text-white placeholder-white/40"
              />
              <motion.button
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                className="flex-shrink-0 bg-gradient-to-r from-rose-500 to-sky-500 text-white px-8 py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider hover:shadow-xl transition-shadow"
              >
                Notify Me
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
