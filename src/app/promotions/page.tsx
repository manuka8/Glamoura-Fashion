'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, ArrowRight, Star, Heart, Flame, Gift, Timer,
  Gem, Bell, UserPlus, Snowflake, Umbrella, Leaf, Ticket,
  Check, Copy, Calendar, Zap, ShieldCheck, TrendingUp, Crown
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { cn, formatCurrency } from '@/lib/utils';

/* ─── Data ───────────────────────────────────────────────── */
const WELCOME_OFFER = {
  title: "Welcome Gift Just for You",
  subtitle: "Exclusive 20% off your first order – no minimum spend",
  discount: "20% OFF",
  code: "WELCOME20",
  gradient: "from-violet-600 via-purple-600 to-indigo-600",
};

const PROMO_CODES = [
  {
    code: "FLASH15",
    discount: "15% OFF",
    description: "All Flash Sale items",
    minSpend: "Rs. 7,500+",
    validUntil: "3 days left",
    used: 1234,
    total: 5000,
    color: "rose",
  },
  {
    code: "SUPER40",
    discount: "40% OFF",
    description: "Orders above Rs. 20,000",
    minSpend: "Rs. 20,000+",
    validUntil: "1 day left",
    used: 2345,
    total: 5000,
    color: "amber",
  },
  {
    code: "FREESHIP",
    discount: "Free Shipping",
    description: "Island-wide delivery",
    minSpend: "Rs. 5,000+",
    validUntil: "Weekend only",
    used: 3456,
    total: 10000,
    color: "emerald",
  },
];

const SEASONS = [
  {
    id: "summer",
    name: "Summer Blast",
    season: "Summer",
    discount: "30–50%",
    icon: Umbrella,
    gradient: "from-amber-500 to-orange-500",
    lightBg: "from-amber-50 to-orange-50",
    accent: "amber",
    items: ["Swimwear", "Sunglasses", "Summer Dresses", "Sandals"],
    description: "Beat the heat in style with our curated summer picks.",
  },
  {
    id: "winter",
    name: "Winter Wonderland",
    season: "Winter",
    discount: "25–40%",
    icon: Snowflake,
    gradient: "from-sky-500 to-cyan-500",
    lightBg: "from-sky-50 to-cyan-50",
    accent: "sky",
    items: ["Jackets", "Boots", "Sweaters", "Scarves"],
    description: "Cozy up in premium winter wear at unbeatable prices.",
  },
  {
    id: "spring",
    name: "Spring Forward",
    season: "Spring",
    discount: "20–35%",
    icon: Leaf,
    gradient: "from-emerald-500 to-green-500",
    lightBg: "from-emerald-50 to-green-50",
    accent: "emerald",
    items: ["Floral Dresses", "Light Jackets", "Accessories"],
    description: "Fresh florals and light layers for the new season.",
  },
];

const SPECIAL_ITEMS = [
  {
    id: 1,
    name: "Limited Edition Watch",
    price: 89700,
    originalPrice: 179700,
    discount: 50,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    category: "Watches",
    badge: "Only 5 left",
    badgeColor: "rose",
    tag: "Trending",
  },
  {
    id: 2,
    name: "Designer Handbag",
    price: 134700,
    originalPrice: 269700,
    discount: 50,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500",
    category: "Accessories",
    badge: "Only 3 left",
    badgeColor: "rose",
    tag: "Last Chance",
  },
  {
    id: 3,
    name: "Premium Headphones",
    price: 59700,
    originalPrice: 119700,
    discount: 50,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    category: "Electronics",
    badge: null,
    badgeColor: "sky",
    tag: "Bestseller",
  },
  {
    id: 4,
    name: "Sneakers Collection",
    price: 26700,
    originalPrice: 47700,
    discount: 44,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
    category: "Footwear",
    badge: "Only 8 left",
    badgeColor: "amber",
    tag: "Limited Release",
  },
];

/* ─── Countdown Hook ─────────────────────────────────────── */
function useCountdown(targetDate: Date) {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = targetDate.getTime() - Date.now();
      if (diff <= 0) return;
      setT({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  return t;
}

/* ─── Sub-components ─────────────────────────────────────── */
const TimeUnit = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center">
    <div className="bg-white/20 backdrop-blur rounded-xl w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center border border-white/20">
      <motion.span key={value} initial={{ y: -8, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className="text-lg sm:text-2xl font-bold font-mono text-white tabular-nums">
        {String(value).padStart(2, '0')}
      </motion.span>
    </div>
    <span className="mt-1 text-[9px] uppercase tracking-widest text-white/60 font-semibold">{label}</span>
  </div>
);

const PromoCodeCard = ({ promo, index }: { promo: typeof PROMO_CODES[0]; index: number }) => {
  const [copied, setCopied] = useState(false);
  const pct = Math.round((promo.used / promo.total) * 100);

  const colorMap: Record<string, string> = {
    rose: 'text-rose-600 bg-rose-50 border-rose-100',
    amber: 'text-amber-600 bg-amber-50 border-amber-100',
    emerald: 'text-emerald-600 bg-emerald-50 border-emerald-100',
  };
  const barMap: Record<string, string> = {
    rose: 'from-rose-500 to-rose-400',
    amber: 'from-amber-500 to-amber-400',
    emerald: 'from-emerald-500 to-emerald-400',
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(promo.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ delay: index * 0.1 }}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
    >
      {/* Top stripe */}
      <div className={cn("h-1.5 bg-gradient-to-r", barMap[promo.color] ?? 'from-rose-500 to-rose-400')} />

      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <div className={cn("inline-block font-mono text-xl sm:text-2xl font-black tracking-widest px-3 py-1 rounded-lg border", colorMap[promo.color])}>
              {promo.code}
            </div>
            <div className="mt-2 text-sm font-bold text-gray-700">{promo.discount}</div>
            <div className="text-xs text-gray-400 mt-0.5">{promo.description}</div>
          </div>
          <button
            onClick={handleCopy}
            className="flex-shrink-0 flex items-center gap-1.5 bg-gray-900 text-white px-3 py-2 rounded-xl text-xs font-bold hover:bg-gray-700 transition-colors"
          >
            <AnimatePresence mode="wait">
              {copied
                ? <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-1">
                    <Check className="w-3 h-3 text-emerald-400" /> Copied!
                  </motion.span>
                : <motion.span key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-1">
                    <Copy className="w-3 h-3" /> Copy
                  </motion.span>
              }
            </AnimatePresence>
          </button>
        </div>

        <div className="flex items-center justify-between text-[10px] text-gray-400 mb-2">
          <span>Min. spend: <strong className="text-gray-600">{promo.minSpend}</strong></span>
          <span className="flex items-center gap-1">
            <Timer className="w-3 h-3" /> {promo.validUntil}
          </span>
        </div>

        <div>
          <div className="flex justify-between text-[10px] text-gray-400 mb-1">
            <span>{promo.used.toLocaleString()} claimed</span>
            <span>{pct}% used</span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }} whileInView={{ width: `${pct}%` }}
              viewport={{ once: true }} transition={{ duration: 1.2, ease: 'easeOut' }}
              className={cn("h-full rounded-full bg-gradient-to-r", barMap[promo.color])}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const SpecialItemCard = ({ item, index }: { item: typeof SPECIAL_ITEMS[0]; index: number }) => {
  const [wishlist, setWishlist] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }} transition={{ delay: index * 0.09 }}
      className="group"
    >
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100 mb-3">
        <Image src={item.image} alt={item.name} fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {item.badge && (
          <div className="absolute top-3 left-3 bg-rose-600 text-white px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1">
            <Flame className="w-2.5 h-2.5" /> {item.badge}
          </div>
        )}
        <div className="absolute top-3 right-3 bg-black/70 backdrop-blur text-white px-2.5 py-1 rounded-full text-[10px] font-bold">
          {item.tag}
        </div>

        <button
          onClick={() => setWishlist(v => !v)}
          className="absolute bottom-3 right-3 bg-white/90 p-2 rounded-full shadow-md hover:bg-rose-50 transition-colors"
        >
          <Heart className={cn("w-3.5 h-3.5", wishlist ? "fill-rose-500 text-rose-500" : "text-gray-400")} />
        </button>

        <div className="absolute inset-0 flex items-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="w-full bg-white/95 backdrop-blur text-gray-900 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-rose-500 hover:text-white transition-colors shadow-lg">
            Quick Shop
          </button>
        </div>
      </div>

      <div className="px-0.5">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] font-bold text-purple-500 uppercase tracking-wider">{item.category}</span>
          <div className="flex items-center gap-0.5">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span className="text-[10px] font-bold text-gray-500">4.8</span>
          </div>
        </div>
        <h3 className="text-sm sm:text-base font-semibold text-gray-900 line-clamp-1 mb-1.5">{item.name}</h3>
        <div className="flex items-baseline gap-2">
          <span className="text-base font-bold text-rose-600">{formatCurrency(item.price)}</span>
          <span className="text-xs text-gray-400 line-through">{formatCurrency(item.originalPrice)}</span>
          <span className="text-[10px] font-bold text-emerald-600">-{item.discount}%</span>
        </div>
      </div>
    </motion.div>
  );
};

/* ─── Main Page ───────────────────────────────────────────── */
export default function PromotionsPage() {
  const [selectedSeason, setSelectedSeason] = useState("summer");
  const [email, setEmail] = useState("");
  const [notifySuccess, setNotifySuccess] = useState(false);
  const [claimedWelcome, setClaimedWelcome] = useState(false);

  // useRef keeps the same Date object across renders — prevents the infinite
  // re-render loop caused by passing `new Date()` (new reference every render)
  // into useCountdown's [targetDate] dependency array.
  const targetDate = useRef(new Date(Date.now() + 3 * 24 * 3600 * 1000)).current;
  const countdown = useCountdown(targetDate);
  const season = SEASONS.find(s => s.id === selectedSeason)!;

  const handleNotify = () => {
    if (!email) return;
    setNotifySuccess(true);
    setEmail("");
    setTimeout(() => setNotifySuccess(false), 4000);
  };

  return (
    <div className="bg-white min-h-screen">

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative min-h-[75vh] sm:min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-violet-800 to-rose-700">
          {/* Orbs */}
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute -top-24 -right-24 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl" />
          <motion.div animate={{ rotate: -360 }} transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
            className="absolute -bottom-24 -left-24 w-80 h-80 bg-rose-500/20 rounded-full blur-3xl" />
          {/* Particles */}
          {[...Array(14)].map((_, i) => (
            <motion.div key={i}
              animate={{ y: [0, -60, 0], opacity: [0, 0.5, 0] }}
              transition={{ duration: 4 + (i % 3), repeat: Infinity, delay: i * 0.35 }}
              className="absolute w-1 h-1 bg-white/25 rounded-full"
              style={{ left: `${(i * 7.1) % 100}%`, top: `${20 + (i * 13) % 65}%` }}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 w-full py-20 sm:py-28 text-center">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <motion.div
              animate={{ scale: [1, 1.04, 1] }} transition={{ repeat: Infinity, duration: 2.5 }}
              className="inline-flex items-center gap-2 bg-white/15 backdrop-blur border border-white/25 px-5 py-2 rounded-full mb-7"
            >
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span className="text-xs font-black uppercase tracking-wider text-white">Limited Time Offers</span>
            </motion.div>

            <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] mb-5">
              Mega Promotions
              <br />
              <motion.span
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 7, repeat: Infinity }}
                className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300"
              >
                & Big Savings
              </motion.span>
            </h1>

            <p className="text-white/60 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
              Welcome bonus · Seasonal discounts · Exclusive promo codes · Limited special drops
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              {['New User 20% Off', 'Seasonal Deals', 'Promo Codes', 'Flash Sale'].map((tag) => (
                <span key={tag} className="bg-white/10 backdrop-blur border border-white/20 px-4 py-1.5 rounded-full text-xs font-semibold text-white/80">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Welcome Offer ────────────────────────────────── */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            className={`relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br ${WELCOME_OFFER.gradient} shadow-2xl`}
          >
            {/* Decorative rings */}
            <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full border border-white/10" />
            <div className="absolute -left-10 -bottom-10 w-56 h-56 rounded-full border border-white/10" />

            <div className="relative p-7 sm:p-10 md:p-12 text-white">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                {/* Left */}
                <div className="flex items-start gap-5">
                  <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2.2 }}
                    className="flex-shrink-0 bg-white/15 backdrop-blur p-4 rounded-2xl border border-white/20">
                    <UserPlus className="w-8 h-8 sm:w-10 sm:h-10" />
                  </motion.div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1">{WELCOME_OFFER.title}</h2>
                    <p className="text-white/70 text-sm sm:text-base mb-4">{WELCOME_OFFER.subtitle}</p>
                    <div className="flex flex-wrap gap-2">
                      {[WELCOME_OFFER.discount, 'No min. spend', 'First purchase only'].map(tag => (
                        <span key={tag} className="bg-white/15 border border-white/20 px-3 py-1 rounded-full text-xs font-semibold">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right – code + CTA */}
                <div className="flex flex-col items-start md:items-end gap-3 w-full md:w-auto">
                  <div className="bg-white/15 backdrop-blur border border-white/25 rounded-2xl px-6 py-4 w-full md:w-auto text-center">
                    <div className="text-[10px] uppercase tracking-widest text-white/60 mb-1">Your code</div>
                    <code className="text-2xl sm:text-3xl font-mono font-black tracking-widest">{WELCOME_OFFER.code}</code>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                    onClick={() => setClaimedWelcome(true)}
                    className="w-full md:w-auto flex items-center justify-center gap-2 bg-white text-purple-700 px-7 py-3 rounded-full font-bold text-sm uppercase tracking-wide hover:shadow-xl transition-shadow"
                  >
                    {claimedWelcome ? <><Check className="w-4 h-4 text-emerald-500" /> Claimed!</> : <><Gift className="w-4 h-4" /> Claim Welcome Gift</>}
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Special Items ────────────────────────────────── */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-10 sm:mb-12">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Gem className="w-5 h-5 text-purple-500" />
              <span className="text-xs font-black uppercase tracking-wider text-purple-500">Exclusive Drops</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-3">Special Items</h2>
            <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto">
              Limited edition products you won't find anywhere else — get them before they're gone.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {SPECIAL_ITEMS.map((item, idx) => (
              <SpecialItemCard key={item.id} item={item} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Promo Codes ──────────────────────────────────── */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-10 sm:mb-12">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Ticket className="w-5 h-5 text-emerald-500" />
              <span className="text-xs font-black uppercase tracking-wider text-emerald-500">Active Promotions</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-3">Promo Codes</h2>
            <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto">
              Grab these limited-time codes before they expire — tap to copy instantly.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {PROMO_CODES.map((promo, idx) => (
              <PromoCodeCard key={promo.code} promo={promo} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Seasonal Deals ───────────────────────────────── */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-10 sm:mb-12">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Calendar className="w-5 h-5 text-orange-500" />
              <span className="text-xs font-black uppercase tracking-wider text-orange-500">Shop by Season</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-3">Seasonal Collections</h2>
            <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto">
              Curated seasonal discounts updated every quarter.
            </p>
          </motion.div>

          {/* Season tabs – scrollable on mobile */}
          <div className="flex gap-2 sm:gap-3 overflow-x-auto scrollbar-hide pb-1 justify-start sm:justify-center mb-8">
            {SEASONS.map((s) => {
              const Icon = s.icon;
              const active = selectedSeason === s.id;
              return (
                <motion.button key={s.id}
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                  onClick={() => setSelectedSeason(s.id)}
                  className={cn(
                    "flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-200",
                    active
                      ? `bg-gradient-to-r ${s.gradient} text-white shadow-lg`
                      : "bg-white text-gray-600 border border-gray-100 shadow-sm hover:border-gray-200"
                  )}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  {s.season}
                </motion.button>
              );
            })}
          </div>

          {/* Season panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedSeason}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className={`bg-gradient-to-br ${season.gradient} rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl`}
            >
              <div className="p-7 sm:p-10 text-white">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
                  {/* Info */}
                  <div className="max-w-xl">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-white/20 p-2.5 rounded-xl">
                        <season.icon className="w-6 h-6" />
                      </div>
                      <span className="text-lg font-black uppercase tracking-wider">{season.name}</span>
                    </div>
                    <div className="text-4xl sm:text-5xl font-bold mb-2">{season.discount} <span className="text-2xl font-normal opacity-70">OFF</span></div>
                    <p className="text-white/70 text-sm sm:text-base mb-5">{season.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {season.items.map(item => (
                        <span key={item} className="bg-white/15 border border-white/20 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Timer + CTA */}
                  <div className="bg-black/20 backdrop-blur border border-white/10 rounded-2xl p-6 w-full lg:w-auto flex-shrink-0">
                    <p className="text-white/60 text-[10px] uppercase tracking-widest mb-4 text-center font-semibold">Offer ends in</p>
                    <div className="flex items-start gap-2 justify-center mb-5">
                      <TimeUnit value={countdown.d} label="Days" />
                      <span className="text-white/40 text-lg font-bold mt-3">:</span>
                      <TimeUnit value={countdown.h} label="Hrs" />
                      <span className="text-white/40 text-lg font-bold mt-3">:</span>
                      <TimeUnit value={countdown.m} label="Min" />
                      <span className="text-white/40 text-lg font-bold mt-3">:</span>
                      <TimeUnit value={countdown.s} label="Sec" />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                      className="w-full bg-white text-gray-900 px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-wide hover:shadow-lg transition-shadow flex items-center justify-center gap-2"
                    >
                      Shop {season.season} Collection <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── Flash Sale Banner ────────────────────────────── */}
      <section className="relative py-16 sm:py-20 px-4 sm:px-6">
        <div className="absolute inset-0 bg-gray-950" />
        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-0 bg-gradient-to-br from-rose-900/40 via-transparent to-orange-900/30 pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center text-white">
          <motion.div animate={{ scale: [1, 1.12, 1] }} transition={{ repeat: Infinity, duration: 2.2 }}
            className="inline-block mb-5">
            <Flame className="w-12 h-12 sm:w-16 sm:h-16 text-orange-500" />
          </motion.div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-3">24-Hour Flash Sale!</h2>
          <p className="text-gray-300 text-sm sm:text-xl mb-5">
            Extra 15% off when you spend Rs. 15,000+
          </p>
          <div className="inline-flex items-center gap-3 bg-white/10 border border-white/20 px-5 py-3 rounded-2xl mb-7">
            <span className="text-white/60 text-xs uppercase tracking-wider">Use code:</span>
            <span className="font-mono text-lg sm:text-2xl font-black tracking-widest text-orange-400">FLASH15</span>
          </div>
          <br />
          <motion.button
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            className="bg-gradient-to-r from-rose-600 to-orange-500 text-white px-8 sm:px-10 py-3.5 rounded-full font-bold text-sm sm:text-base uppercase tracking-wide hover:shadow-2xl transition-shadow"
          >
            Shop Flash Sale Now
          </motion.button>
        </div>
      </section>

      {/* ── Newsletter ───────────────────────────────────── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-gray-900">
        <div className="max-w-2xl mx-auto text-center text-white">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <motion.div animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 2.5, repeat: Infinity }}
              className="inline-block mb-5">
              <Bell className="w-10 h-10 sm:w-12 sm:h-12 text-purple-400" />
            </motion.div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-3">Get Early Access</h2>
            <p className="text-gray-400 text-sm sm:text-base mb-7">
              Subscribe to receive exclusive promotions and early access to flash sales — straight to your inbox.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleNotify()}
                placeholder="Enter your email"
                className="flex-1 bg-white/10 border border-white/20 rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:border-purple-400 transition-colors text-white placeholder-white/40"
              />
              <motion.button
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                onClick={handleNotify}
                className="flex-shrink-0 bg-gradient-to-r from-purple-600 to-rose-500 px-7 py-3.5 rounded-xl font-bold text-sm uppercase tracking-wide hover:shadow-xl transition-shadow"
              >
                Notify Me
              </motion.button>
            </div>

            <AnimatePresence>
              {notifySuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                  className="mt-4 text-emerald-400 font-semibold text-sm flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" /> You're in! Exclusive offers are on their way.
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
