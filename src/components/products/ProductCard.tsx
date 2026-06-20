'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Heart, Star, Truck } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/hooks/useCart';
import { motion } from 'framer-motion';
import { formatCurrency } from '@/lib/utils';

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCart((state) => state.addItem);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group"
    >
      <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden mb-4">
        {product.image_urls?.[0] ? (
          <Image
            src={product.image_urls[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-300">No Image</div>
        )}

        {/* Quick Actions */}
        <div className="absolute bottom-4 left-4 right-4 flex gap-2 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={(e) => {
              e.preventDefault();
              addItem(product, 1);
            }}
            className="flex-1 bg-white text-black py-3 text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all flex items-center justify-center gap-2 rounded-lg"
          >
            <ShoppingBag className="w-3 h-3" /> Add to Bag
          </button>
          <button className="bg-white p-3 hover:bg-rose-500 hover:text-white transition-all rounded-lg">
            <Heart className="w-4 h-4" />
          </button>
        </div>

        {/* Free Shipping Tag */}
        <div className="absolute top-4 left-4">
          <span className="bg-emerald-500 text-white text-[8px] font-bold px-2 py-1 rounded-md uppercase tracking-tighter flex items-center gap-1 shadow-lg">
            <Truck className="w-2 h-2" /> Free Shipping
          </span>
        </div>
      </div>

      <Link href={`/products/${product.id}`}>
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-sm font-medium text-gray-900 group-hover:text-pink-600 transition-colors line-clamp-1">{product.name}</h3>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="text-[10px] font-bold text-gray-500">4.9</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold text-gray-900">{formatCurrency(product.price)}</p>
          <span className="text-[10px] text-gray-400 font-medium italic">1.2k+ Sold</span>
        </div>
      </Link>
    </motion.div>
  );
}

