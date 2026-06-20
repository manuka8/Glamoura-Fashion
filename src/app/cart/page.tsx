'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { formatCurrency } from '@/lib/utils';

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <div className="flex justify-center mb-6">
          <div className="p-6 bg-gray-50 rounded-full">
            <ShoppingBag className="w-12 h-12 text-gray-300" />
          </div>
        </div>
        <h1 className="text-3xl font-serif mb-4">Your bag is empty</h1>
        <p className="text-gray-500 mb-10">Discover our latest collections and find your new favorites.</p>
        <Link
          href="/products"
          className="bg-black text-white px-12 py-4 uppercase tracking-widest font-medium hover:bg-gray-900 transition-all"
        >
          Explore Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-serif tracking-tight text-gray-900 mb-12 text-center">Your Bag</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-8">
          {items.map((item, idx) => (
            <div key={`${item.product.id}-${idx}`} className="flex gap-6 pb-8 border-b border-gray-100 last:border-0">
              <div className="relative w-32 h-40 bg-gray-100 flex-shrink-0">
                {item.product.image_urls?.[0] && (
                  <Image src={item.product.image_urls[0]} alt={item.product.name} fill className="object-cover" />
                )}
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-medium text-gray-900">{item.product.name}</h3>
                    <p className="text-lg font-light">{formatCurrency(item.product.price * item.quantity)}</p>
                  </div>
                  <div className="flex gap-4 text-xs uppercase tracking-widest text-gray-500 mb-4">
                    {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                    {item.selectedColor && (
                      <span className="flex items-center gap-1">
                        Color: <span className="w-2 h-2 rounded-full border border-gray-300" style={{ backgroundColor: item.selectedColor }} /> {item.selectedColor}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center border border-gray-200">
                    <button
                      onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1), item.selectedSize, item.selectedColor)}
                      className="p-2 hover:bg-gray-50 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 text-sm font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedSize, item.selectedColor)}
                      className="p-2 hover:bg-gray-50 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item.product.id, item.selectedSize, item.selectedColor)}
                    className="text-gray-400 hover:text-black transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 p-8 sticky top-32">
            <h2 className="text-xl font-serif mb-8">Order Summary</h2>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span>{formatCurrency(totalPrice())}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="text-gray-900 font-medium">Free</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Estimated Tax</span>
                <span>{formatCurrency(0)}</span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6 mb-8 flex justify-between items-baseline">
              <span className="text-lg font-medium">Total</span>
              <span className="text-2xl font-light">{formatCurrency(totalPrice())}</span>
            </div>

            <Link
              href="/checkout"
              className="w-full bg-black text-white py-4 uppercase tracking-widest font-medium hover:bg-gray-900 transition-all flex items-center justify-center gap-2 text-center"
            >
              Proceed to Checkout <ArrowRight className="w-4 h-4" />
            </Link>

            <p className="mt-6 text-center text-xs text-gray-400 leading-relaxed">
              Shipping, taxes, and discount codes are calculated at checkout.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
