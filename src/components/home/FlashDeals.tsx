'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, ChevronRight, Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { salesDeals } from '@/lib/sales-data';
import { formatCurrency } from '@/lib/utils';

export function FlashDeals() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 45,
    seconds: 30
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Optional: Filter to show only the first 5 deals or specific flash deals
  const flashDeals = salesDeals.slice(0, 5); // Show first 5 deals
  // Or if you have a flag for flash deals in your data:
  // const flashDeals = salesDeals.filter(deal => deal.isFlashDeal);

  return (
    <section className="py-16 bg-gradient-to-br from-red-50 via-white to-orange-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-red-600 text-white p-3 rounded-2xl animate-pulse shadow-lg shadow-red-200">
              <Zap className="w-6 h-6 fill-current" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Flash Deals</h2>
              <p className="text-gray-500 text-sm">Ends in:</p>
            </div>
            <div className="flex gap-2">
              {[timeLeft.hours, timeLeft.minutes, timeLeft.seconds].map((unit, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="bg-gray-900 text-white px-3 py-2 rounded-lg font-mono font-bold text-xl min-w-[45px] text-center shadow-md">
                    {unit.toString().padStart(2, '0')}
                  </div>
                  {i < 2 && <span className="font-bold text-gray-900">:</span>}
                </div>
              ))}
            </div>
          </div>
          <Link href="/flash-deals" className="group flex items-center gap-2 text-red-600 font-bold hover:text-red-700 transition-colors">
            View All Deals
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {flashDeals.map((deal, idx) => (
            <Link href={`/products/${deal.id}`} key={deal.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all border border-transparent hover:border-red-100 cursor-pointer"
              >
                <div className="relative aspect-square rounded-xl overflow-hidden mb-4 bg-gray-100">
                  <div className="relative w-full h-52 rounded-xl overflow-hidden mb-4 bg-gray-100">
                    <Image
                      src={deal.image}
                      alt={deal.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">
                    -{Math.round((1 - deal.price / deal.originalPrice) * 100)}%
                  </div>
                </div>
                <h3 className="text-sm font-medium text-gray-800 line-clamp-1 mb-2 group-hover:text-red-600 transition-colors">
                  {deal.name}
                </h3>
                <div className="flex items-end gap-2 mb-3">
                  <span className="text-xl font-bold text-red-600">{formatCurrency(deal.price)}</span>
                  <span className="text-xs text-gray-400 line-through mb-1">{formatCurrency(deal.originalPrice)}</span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase tracking-tighter">
                    <span>Sold: {deal.sold}%</span>
                    <span>Limited</span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${deal.sold}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-gradient-to-r from-red-500 to-orange-500"
                    />
                  </div>
                </div>
                {/* Optional: Display category as a badge */}
                <div className="mt-3 pt-2 border-t border-gray-100">
                  <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">
                    {deal.category}
                  </span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}