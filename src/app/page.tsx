'use client';

import { HeroCarousel } from '@/components/home/HeroCarousel';
import { ProductCard } from '@/components/products/ProductCard';
import { motion } from 'framer-motion';
import { FlashDeals } from '@/components/home/FlashDeals';
import { BrandWall } from '@/components/home/BrandWall';
import { FloatingPromo } from '@/components/home/FloatingPromo';
import {
  ArrowRight, Sparkles, Percent, Truck, RotateCcw,
  Star, Shield, Gift, Clock, TrendingUp, Zap, Check,
  Eye, ChevronRight, ShoppingBag, Heart, BarChart3,
  // Professional icons for features
  Gem, Crown, Award, Medal, Diamond, Sparkle, 
  Verified, BadgeCheck, Briefcase, CalendarDays,
  Headphones, Box, Lock, Leaf, Users, Globe
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

import { useState, useEffect } from 'react';
import { dummyProducts, categories, features } from '@/lib/dummy-data';
import { salesDeals } from '@/lib/sales-data';

export default function Home() {
  const [activeTab, setActiveTab] = useState('all');
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const displayProducts = activeTab === 'all'
    ? [...dummyProducts.slice(0, 4), ...salesDeals.slice(0, 4)]
    : activeTab === 'new'
      ? dummyProducts.slice(0, 8)
      : salesDeals.slice(0, 8);

  // Professional features with refined icons
  const professionalFeatures = [
    {
      title: 'Luxury Assurance',
      desc: '100% Authentic Products',
      icon: Gem,
      gradient: 'from-violet-500 to-purple-700'
    },
    {
      title: 'Complimentary Shipping',
      desc: 'Free on orders over LKR 5,000',
      icon: Gift,
      gradient: 'from-rose-400 to-pink-600'
    },
    {
      title: 'Private Concierge',
      desc: '24/7 Dedicated Support',
      icon: Headphones,
      gradient: 'from-amber-400 to-orange-500'
    },
    {
      title: 'Secure Checkout',
      desc: 'Encrypted & Safe Payments',
      icon: BadgeCheck,
      gradient: 'from-emerald-400 to-teal-600'
    },
  ];

  // Optional: Hide features bar on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - hide
        setIsVisible(false);
      } else {
        // Scrolling up - show
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div className="bg-white selection:bg-pink-100 selection:text-pink-600">
      <HeroCarousel />

      
   

      {/* Flash Deals Section */}
      <FlashDeals />

      {/* Categories Grid - Compact (Fits One Screen) */}
      <section className="relative min-h-[90vh] w-full flex items-center justify-center px-4 md:px-8 py-6 overflow-hidden bg-gradient-to-br from-gray-50 to-white">
        <div className="relative max-w-7xl mx-auto w-full">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row items-end justify-between mb-6 gap-2">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500/10 to-purple-500/10 px-3 py-1 rounded-full mb-2 backdrop-blur-sm"
              >
                <Sparkles className="w-3 h-3 text-pink-500" />
                <span className="text-[9px] font-semibold uppercase tracking-wider bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  Curated Collections
                </span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-2xl md:text-3xl font-serif bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
              >
                Shop by Universe
              </motion.h2>
            </div>
            <motion.p
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-gray-500 text-[10px] tracking-wide max-w-md text-right hidden lg:block"
            >
              Explore fashion, jewellery, and luxury timepieces.
            </motion.p>
          </div>

          {/* Categories Grid - Reduced Height */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 h-[400px] md:h-[440px] lg:h-[480px]">
            {/* Main Large Category */}
            {categories[0] && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="md:col-span-6 relative overflow-hidden rounded-xl group shadow-xl h-full"
              >
                <Link href={categories[0].link} className="block relative w-full h-full">
                  <Image
                    src={categories[0].image}
                    alt={categories[0].name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 600px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  <div className="absolute bottom-0 left-0 p-4 md:p-5 w-full">
                    <span className="text-pink-400 font-bold uppercase tracking-widest text-[8px] bg-black/30 px-2 py-0.5 rounded-full inline-block mb-1">
                      {categories[0].count}
                    </span>
                    <h3 className="text-xl md:text-2xl font-serif text-white mb-1 leading-tight">
                      {categories[0].name}
                    </h3>
                    <p className="text-white/70 text-[10px] mb-2 max-w-xs hidden sm:block">
                      Discover exquisite designs.
                    </p>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-white uppercase tracking-wider group-hover:translate-x-2 transition-all duration-300 border-b border-pink-400 pb-0.5">
                      Explore <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            )}

            {/* Right Grid - 2x2 Layout */}
            <div className="md:col-span-6 grid grid-cols-1 md:grid-cols-2 gap-3 h-full">
              {categories.slice(1, 5).map((cat, idx) => (
                <motion.div
                  key={cat.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + (idx * 0.1) }}
                  viewport={{ once: true }}
                  className="relative overflow-hidden rounded-xl group shadow-lg h-full"
                >
                  <Link href={cat.link} className="block relative w-full h-full">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:bg-black/50 transition-colors duration-400" />

                    <div className="absolute inset-0 flex flex-col justify-end p-3">
                      <h3 className="text-base md:text-lg font-serif text-white mb-0.5 leading-tight">
                        {cat.name}
                      </h3>
                      <div className="flex items-center gap-1.5">
                        <div className="w-4 h-px bg-white/40 group-hover:w-6 transition-all duration-300" />
                        <p className="text-white/60 text-[8px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300">
                          Shop
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Features Bar */}
      <section className="py-14 px-4 sm:px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">

          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="inline-flex items-center gap-2 bg-rose-50 px-3 py-1 rounded-full mb-3">
              <Sparkles className="w-3.5 h-3.5 text-rose-500" />
              <span className="text-xs font-bold uppercase tracking-widest text-rose-500">The Glamoura Promise</span>
            </span>
            <h2 className="text-2xl md:text-3xl font-serif text-gray-900">Why Shop With Us</h2>
          </motion.div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {professionalFeatures.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, type: 'spring', stiffness: 90, damping: 16 }}
                viewport={{ once: true }}
                whileHover={{ y: -6, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
                className="group relative bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:border-transparent transition-all duration-300 cursor-default overflow-hidden"
              >
                {/* Gradient top accent on hover */}
                <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${feature.gradient} scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left rounded-t-2xl`} />

                {/* Subtle bg glow */}
                <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-[0.06] rounded-full blur-2xl transition-opacity duration-500`} />

                {/* Icon */}
                <div className="relative mb-5 inline-flex">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-2xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300 scale-125`} />
                  <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Text */}
                <h4 className="text-base font-bold text-gray-900 mb-1.5 group-hover:text-gray-800">
                  {feature.title}
                </h4>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {feature.desc}
                </p>

                {/* Bottom check */}
                <div className="mt-5 pt-4 border-t border-gray-100 flex items-center gap-1.5 text-xs font-semibold text-gray-400 group-hover:text-gray-600 transition-colors">
                  <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${feature.gradient} flex items-center justify-center flex-shrink-0`}>
                    <Check className="w-2.5 h-2.5 text-white" />
                  </div>
                  Guaranteed
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Promotional Sale Banner - Compact */}
      <section className="py-4 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="relative h-[280px] sm:h-[350px] lg:h-[400px] overflow-hidden rounded-2xl shadow-2xl group">
          <Image
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2000"
            alt="Season Sale"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

          {/* Badges */}
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex gap-2">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-lg">
              <span className="text-white font-bold block text-sm">50% OFF</span>
            </div>
            <div className="bg-gradient-to-r from-pink-600 to-rose-600 px-3 py-1.5 rounded-lg flex items-center gap-1">
              <Zap className="w-3 h-3 text-white fill-current animate-pulse" />
              <span className="text-white font-bold text-[8px] uppercase">Live</span>
            </div>
          </div>

          {/* Content */}
          <div className="relative h-full flex items-center px-5 pt-12 sm:px-8">
            <div className="max-w-md text-white">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 text-[8px] font-bold uppercase tracking-wider rounded-full mb-3"
              >
                Limited Season Pass
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-2xl sm:text-3xl md:text-4xl font-serif mb-2"
              >
                The <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-yellow-400 italic">Grand</span> Finale
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-gray-200 text-xs mb-3 max-w-sm"
              >
                Elevate your wardrobe with luxury at unprecedented value.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="flex gap-3"
              >
                <Link
                  href="/products?on-sale=true"
                  className="bg-white text-black px-5 py-2 text-[10px] font-bold uppercase tracking-wider rounded-xl hover:bg-pink-500 hover:text-white transition-all flex items-center gap-1"
                >
                  Shop Now <ArrowRight className="w-3 h-3" />
                </Link>
                <Link
                  href="/lookbook"
                  className="px-5 py-2 text-[10px] font-bold uppercase tracking-wider border border-white/30 rounded-xl hover:bg-white/10 transition-all"
                >
                  Lookbook
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Items */}
      <section className="py-14 px-4 max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 px-3 py-1.5 rounded-full mb-3">
              <TrendingUp className="w-3.5 h-3.5 text-purple-500" />
              <span className="text-xs font-semibold uppercase tracking-wider text-purple-600">Bestsellers</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-gray-900">Most Loved Pieces</h2>
            <p className="text-gray-500 text-sm mt-1">Handpicked favourites from our community</p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Tab switcher */}
            <div className="flex bg-gray-100 p-1 rounded-xl">
              {[
                { id: 'all',  label: 'All'   },
                { id: 'new',  label: 'New'   },
                { id: 'sale', label: 'Deals' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                    activeTab === tab.id
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* View all */}
            <Link
              href="/products"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-gray-700 hover:text-gray-900 border border-gray-200 px-4 py-1.5 rounded-xl hover:border-gray-400 transition-all"
            >
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Grid */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {displayProducts.slice(0, 8).map((product, idx) => {
            const imgSrc   = product.image_urls ? product.image_urls[0] : (product as any).image;
            const catLabel = 'categories' in product ? product.categories[0] : (product as any).category;
            const rating   = (product as any).rating ?? 4.9;
            const origPrice = (product as any).originalPrice;
            const discount  = origPrice ? Math.round((1 - product.price / origPrice) * 100) : null;

            return (
              <motion.div
                key={`${activeTab}-${product.id}-${idx}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.06 }}
                viewport={{ once: true }}
                className="group flex flex-col"
              >
                {/* Image */}
                <div className="relative overflow-hidden rounded-2xl bg-gray-100 aspect-[3/4] mb-3 shadow-sm group-hover:shadow-lg transition-shadow duration-400">
                  <Image
                    src={imgSrc}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Discount badge */}
                  {discount !== null && (
                    <div className="absolute top-2.5 left-2.5 z-10">
                      <span className="bg-rose-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                        -{discount}%
                      </span>
                    </div>
                  )}

                  {/* Wishlist */}
                  <button className="absolute top-2.5 right-2.5 bg-white/90 backdrop-blur-sm p-1.5 rounded-full shadow-sm opacity-0 group-hover:opacity-100 hover:bg-rose-50 transition-all duration-300 z-10">
                    <Heart className="w-3.5 h-3.5 text-gray-500 hover:text-rose-500 transition-colors" />
                  </button>

                  {/* Hover overlay — View + Add to Bag */}
                  <div className="absolute inset-0 flex items-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex gap-2 w-full">
                      <Link
                        href={`/products/${product.id}`}
                        className="flex-1 bg-white/95 backdrop-blur text-gray-900 text-xs font-bold uppercase tracking-wide py-2 rounded-xl text-center hover:bg-gray-900 hover:text-white transition-colors"
                      >
                        View
                      </Link>
                      <button className="bg-gray-900 text-white p-2 rounded-xl hover:bg-gray-700 transition-colors">
                        <ShoppingBag className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="px-0.5 flex flex-col gap-0.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider truncate max-w-[65%]">
                      {catLabel}
                    </span>
                    <div className="flex items-center gap-0.5">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span className="text-[11px] font-semibold text-gray-500">{Number(rating).toFixed(1)}</span>
                    </div>
                  </div>

                  <h3 className="text-sm font-semibold text-gray-900 line-clamp-1 group-hover:text-rose-600 transition-colors">
                    {product.name}
                  </h3>

                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-base font-bold text-gray-900">
                      LKR {Number(product.price).toLocaleString()}
                    </span>
                    {origPrice && (
                      <span className="text-xs text-gray-400 line-through">
                        LKR {Number(origPrice).toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Mobile – view all link */}
        <div className="mt-8 flex justify-center sm:hidden">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-gray-700 transition-colors"
          >
            Shop All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Brand Partners - Compact */}
      <BrandWall />

      {/* Newsletter - Compact */}
      <section className="relative py-16 px-4 overflow-hidden mx-4 my-10 rounded-3xl">
        <div className="absolute inset-0 bg-gray-900">
          <Image
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2000"
            alt="Newsletter BG"
            fill
            className="object-cover opacity-30 mix-blend-overlay"
          />
          <div className="absolute top-0 -left-20 w-64 h-64 bg-pink-500/20 rounded-full blur-[80px] animate-pulse" />
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px] animate-pulse delay-1000" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto text-center text-white">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full mb-6 border border-white/20">
            <Gift className="w-3.5 h-3.5 text-pink-400" />
            <span className="text-[9px] font-bold uppercase tracking-wider">Get 20 Off</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif mb-4 leading-tight">
            Elevate Your <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300">Daily Luxury</span>
          </h2>
          <p className="text-gray-300 text-sm mb-8 max-w-lg mx-auto">
            Join 50,000+ fashion enthusiasts for exclusive collections.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 bg-white/5 backdrop-blur-xl border border-white/20 rounded-full py-3 px-5 focus:outline-none focus:border-white/50 text-sm placeholder:text-xs"
            />
            <button
              type="submit"
              className="bg-white text-black px-6 py-3 rounded-full font-bold uppercase tracking-wider text-[10px] hover:bg-pink-500 hover:text-white transition-all shadow-lg"
            >
              Subscribe <ArrowRight className="inline-block w-3.5 h-3.5 ml-2" />
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}