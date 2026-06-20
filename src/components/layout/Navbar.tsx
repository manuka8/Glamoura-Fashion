'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Search, User, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCart } from '@/hooks/useCart';
import { cn } from '@/lib/utils';
import logoRose from '@/app/assets/logos/logo-rose.png';
{/* Required Imports */}
import { Crown, Diamond, Sparkles, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const cartItemsCount = useCart((state) => state.totalItems());

  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { name: 'Collections', href: '/products' },
    { name: 'Flash Deals', href: '/flash-deals' },
    { name: 'Promotions', href: '/promotions' },
  ];

  const supportLinks = [
    { name: 'Contact Us', href: '/contact' },
    { name: 'FAQs', href: '/faqs' },
    { name: 'Track Order', href: '/track-order' },
  ];

  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-900 hover:text-gray-600 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Elegant Logo with Single Fashion Icon */}
<div className="flex-shrink-0 flex items-center">
  <Link
    href="/"
    className="relative group inline-flex items-center gap-2"
  >
    {/* Animated Fashion Icon */}
    <motion.div
      animate={{
        rotate: [0, -5, 5, 0],
        scale: [1, 1.05, 1]
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="relative"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-rose-300 via-blue-200 to-emerald-300 blur-md opacity-50 rounded-full"></div>
      <Crown className="w-5 h-5 md:w-6 md:h-6 text-rose-300 relative z-10" strokeWidth={1.5} />
    </motion.div>

    {/* Logo Text */}
    <span
      className="text-2xl md:text-3xl font-serif font-black tracking-tighter bg-gradient-to-r from-rose-300 via-blue-200 to-emerald-300 bg-clip-text text-transparent animate-gradient"
      style={{
        backgroundSize: '200% auto',
        animation: 'gradient 4s ease infinite',
        WebkitTextStroke: '0.5px rgba(0,0,0,0.15)'
      }}
    >
      GLAMOURA
    </span>

    {/* Underline Effect */}
    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-rose-300 via-blue-200 to-emerald-300 transition-all duration-500 group-hover:w-full rounded-full"></span>
  </Link>
</div>


          {/* Desktop Navigation */}
          <div className="hidden md:flex md:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors uppercase tracking-widest"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-6">
            <button className="text-gray-900 hover:text-gray-600 transition-colors">
              <Search className="h-5 w-5" />
            </button>
            <Link href="/dashboard" className="text-gray-900 hover:text-gray-600 transition-colors">
              <User className="h-5 w-5" />
            </Link>
            <Link href="/cart" className="relative text-gray-900 hover:text-gray-600 transition-colors">
              <ShoppingBag className="h-5 w-5" />
              {mounted && cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform bg-black rounded-full">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={cn('md:hidden', isOpen ? 'block' : 'hidden')}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-100">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50 uppercase tracking-wider"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="border-t border-gray-100 my-2 pt-2">
            <p className="px-3 text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-2">Support</p>
            {supportLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 uppercase tracking-wider"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
