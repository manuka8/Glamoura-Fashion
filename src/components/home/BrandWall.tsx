'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Star, Award, Zap, Gem, Crown } from 'lucide-react';

const brands = [
  { name: "LuxeVibe", icon: Crown, color: "text-amber-500", bg: "bg-amber-50" },
  { name: "AuraJewel", icon: Gem, color: "text-blue-500", bg: "bg-blue-50" },
  { name: "SwiftTime", icon: Zap, color: "text-red-500", bg: "bg-red-50" },
  { name: "EliteCraft", icon: Award, color: "text-purple-500", bg: "bg-purple-50" },
  { name: "RoyalFit", icon: Star, color: "text-yellow-500", bg: "bg-yellow-50" },
  { name: "PureStyle", icon: ShieldCheck, color: "text-emerald-500", bg: "bg-emerald-50" },
];

export function BrandWall() {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Trusted by Global Brands</h2>
          <p className="text-gray-500">Official partners of Glamoura Fashion</p>
        </div>

        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {brands.map((brand, idx) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="flex flex-col items-center gap-3 group"
            >
              <div className={`w-20 h-20 rounded-2xl {brand.bg} flex items-center justify-center transition-all group-hover:shadow-xl group-hover:rotate-6`}>
                <brand.icon className={`w-10 h-10 {brand.color}`} />
              </div>
              <span className="font-bold text-gray-400 group-hover:text-gray-900 transition-colors uppercase tracking-widest text-[10px]">
                {brand.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
