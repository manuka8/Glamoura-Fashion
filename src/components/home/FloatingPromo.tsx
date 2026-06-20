'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift, Percent, ArrowRight } from 'lucide-react';

export function FloatingPromo() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ scale: 0, opacity: 0, rotate: -20 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            className="relative bg-gradient-to-br from-pink-600 to-purple-700 text-white p-6 rounded-3xl shadow-2xl max-w-[280px] border-4 border-white"
          >
            <button
              onClick={() => setIsVisible(false)}
              className="absolute -top-3 -right-3 bg-white text-black p-1.5 rounded-full shadow-lg hover:rotate-90 transition-transform"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white/20 p-2 rounded-xl">
                <Gift className="w-6 h-6" />
              </div>
              <span className="font-bold text-sm uppercase tracking-wider">New User Gift</span>
            </div>

            <h3 className="text-xl font-bold mb-2">Claim Your Rs.5000 Discount!</h3>
            <p className="text-pink-100 text-xs mb-4 leading-relaxed">
              Register now and get an exclusive discount on your first order over 100.
            </p>

            <button className="w-full bg-white text-pink-600 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-pink-50 transition-colors shadow-lg">
              Get It Now
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Decorative dots */}
            <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-yellow-400 rounded-full -z-10 animate-bounce" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
