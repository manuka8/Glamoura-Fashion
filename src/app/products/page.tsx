'use client';

import { useState, useMemo, useRef } from 'react';
import { dummyProducts } from '@/lib/dummy-data';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Filter, SlidersHorizontal, ArrowRight, Star, Heart,
  ShoppingBag, X, ChevronDown, Sparkles, Check,
  Eye, Grid, List, Truck, RotateCcw, Award, ChevronRight
} from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { formatCurrency } from '@/lib/utils';
import { cn } from '@/lib/utils';

/* ─── Static data ────────────────────────────────────────── */
const PRICE_PRESETS = [
  { label: 'Under 10k',   min: 0,      max: 10000  },
  { label: '10k – 50k',  min: 10000,  max: 50000  },
  { label: '50k – 100k', min: 50000,  max: 100000 },
  { label: '100k – 200k',min: 100000, max: 200000 },
  { label: 'Over 200k',  min: 200000, max: 1000000 },
];

const COLOR_OPTIONS = [
  { name: 'Black',  value: 'black',  cls: 'bg-gray-900' },
  { name: 'White',  value: 'white',  cls: 'bg-white border border-gray-300' },
  { name: 'Red',    value: 'red',    cls: 'bg-red-500' },
  { name: 'Blue',   value: 'blue',   cls: 'bg-blue-600' },
  { name: 'Green',  value: 'green',  cls: 'bg-emerald-600' },
  { name: 'Gold',   value: 'gold',   cls: 'bg-amber-400' },
  { name: 'Silver', value: 'silver', cls: 'bg-gray-400' },
  { name: 'Pink',   value: 'pink',   cls: 'bg-pink-500' },
];

const SIZE_OPTIONS = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const RATING_OPTIONS = [5, 4, 3, 2];

const CATEGORIES = [
  { id: 'all',         label: 'All' },
  { id: 'women',       label: 'Women' },
  { id: 'men',         label: 'Men' },
  { id: 'watches',     label: 'Watches' },
  { id: 'jewellery',   label: 'Jewellery' },
  { id: 'accessories', label: 'Accessories' },
];

/* ─── Collapsible section ────────────────────────────────── */
function Section({ title, open, onToggle, badge, children }: {
  title: string; open: boolean; onToggle: () => void; badge?: number; children: React.ReactNode;
}) {
  return (
    <div className="border-b border-gray-100 py-4">
      <button onClick={onToggle} className="flex items-center justify-between w-full">
        <span className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-900">
          {title}
          {!!badge && <span className="bg-rose-100 text-rose-600 text-[10px] px-1.5 py-0.5 rounded-full font-bold">{badge}</span>}
        </span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="pt-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Toggle switch ──────────────────────────────────────── */
function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={cn('relative w-10 h-5 rounded-full transition-colors flex-shrink-0', on ? 'bg-gray-900' : 'bg-gray-200')}
    >
      <motion.div animate={{ x: on ? 18 : 2 }} transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className="absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm" />
    </button>
  );
}

/* ─── Filter panel content ───────────────────────────────── */
function FilterPanel({
  selectedCategory, setSelectedCategory,
  priceRange, setPriceRange,
  selectedColors, setSelectedColors,
  selectedSizes, setSelectedSizes,
  selectedRatings, setSelectedRatings,
  inStockOnly, setInStockOnly,
  onSaleOnly, setOnSaleOnly,
  clearAll, activeCount,
}: any) {
  const [open, setOpen] = useState({ categories: true, price: true, colors: true, sizes: true, ratings: false, other: false });
  const tog = (k: keyof typeof open) => setOpen(p => ({ ...p, [k]: !p[k] }));

  const getCatCount = (id: string) => id === 'all'
    ? dummyProducts.length
    : dummyProducts.filter(p => p.categories.some(c => c.toLowerCase() === id)).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-serif font-bold">Filters</h3>
        {activeCount > 0 && (
          <button onClick={clearAll} className="text-xs text-rose-600 font-semibold hover:text-rose-700">
            Clear all ({activeCount})
          </button>
        )}
      </div>

      {/* Categories */}
      <Section title="Categories" open={open.categories} onToggle={() => tog('categories')}>
        <div className="space-y-1">
          {CATEGORIES.map(cat => (
            <button key={cat.id} onClick={() => setSelectedCategory(cat.id)}
              className={cn(
                'w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-all',
                selectedCategory === cat.id ? 'bg-gray-900 text-white' : 'hover:bg-gray-50 text-gray-700'
              )}>
              <span>{cat.label}</span>
              <span className={cn('text-xs', selectedCategory === cat.id ? 'text-white/50' : 'text-gray-400')}>
                {getCatCount(cat.id)}
              </span>
            </button>
          ))}
        </div>
      </Section>

      {/* Price */}
      <Section title="Price Range" open={open.price} onToggle={() => tog('price')}>
        <div className="flex gap-2 mb-3">
          <div className="flex-1">
            <label className="text-[10px] text-gray-400 mb-1 block uppercase tracking-wider">Min (Rs.)</label>
            <input type="number" value={priceRange.min}
              onChange={e => setPriceRange((p: any) => ({ ...p, min: +e.target.value }))}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>
          <div className="flex-1">
            <label className="text-[10px] text-gray-400 mb-1 block uppercase tracking-wider">Max (Rs.)</label>
            <input type="number" value={priceRange.max}
              onChange={e => setPriceRange((p: any) => ({ ...p, max: +e.target.value }))}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>
        </div>
        <input type="range" min={0} max={200000} value={priceRange.max}
          onChange={e => setPriceRange((p: any) => ({ ...p, max: +e.target.value }))}
          className="w-full accent-gray-900 mb-1"
        />
        <div className="flex flex-wrap gap-1.5 mt-3">
          {PRICE_PRESETS.map(r => (
            <button key={r.label}
              onClick={() => setPriceRange({ min: r.min, max: r.max })}
              className={cn(
                'text-[10px] px-2.5 py-1 rounded-full border transition-all',
                priceRange.min === r.min && priceRange.max === r.max
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'border-gray-200 text-gray-600 hover:border-gray-400'
              )}>
              {r.label}
            </button>
          ))}
        </div>
      </Section>

      {/* Colors */}
      <Section title="Colors" open={open.colors} onToggle={() => tog('colors')} badge={selectedColors.length}>
        <div className="flex flex-wrap gap-3">
          {COLOR_OPTIONS.map(c => (
            <button key={c.value}
              onClick={() => setSelectedColors((prev: string[]) =>
                prev.includes(c.value) ? prev.filter(x => x !== c.value) : [...prev, c.value]
              )}
              title={c.name}
              className={cn('w-7 h-7 rounded-full transition-all', c.cls,
                selectedColors.includes(c.value) ? 'ring-2 ring-offset-2 ring-gray-900 scale-110' : 'hover:scale-105'
              )}
            />
          ))}
        </div>
      </Section>

      {/* Sizes */}
      <Section title="Sizes" open={open.sizes} onToggle={() => tog('sizes')} badge={selectedSizes.length}>
        <div className="flex flex-wrap gap-2">
          {SIZE_OPTIONS.map(s => (
            <button key={s}
              onClick={() => setSelectedSizes((prev: string[]) =>
                prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]
              )}
              className={cn('px-3 py-1.5 rounded-lg text-sm font-medium border transition-all',
                selectedSizes.includes(s)
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'border-gray-200 text-gray-700 hover:border-gray-400'
              )}>
              {s}
            </button>
          ))}
        </div>
      </Section>

      {/* Ratings */}
      <Section title="Customer Rating" open={open.ratings} onToggle={() => tog('ratings')} badge={selectedRatings.length}>
        <div className="space-y-2.5">
          {RATING_OPTIONS.map(r => (
            <label key={r} className="flex items-center gap-3 cursor-pointer group">
              <div className={cn('w-4 h-4 rounded border flex items-center justify-center transition-all flex-shrink-0',
                selectedRatings.includes(r) ? 'bg-gray-900 border-gray-900' : 'border-gray-300 group-hover:border-gray-500'
              )}>
                {selectedRatings.includes(r) && <Check className="w-2.5 h-2.5 text-white" />}
              </div>
              <input type="checkbox" className="sr-only"
                checked={selectedRatings.includes(r)}
                onChange={() => setSelectedRatings((prev: number[]) =>
                  prev.includes(r) ? prev.filter(x => x !== r) : [...prev, r]
                )}
              />
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={cn('w-3.5 h-3.5', i < r ? 'fill-amber-400 text-amber-400' : 'text-gray-200')} />
                ))}
                <span className="text-xs text-gray-500 ml-1">& up</span>
              </div>
            </label>
          ))}
        </div>
      </Section>

      {/* Other */}
      <Section title="Other" open={open.other} onToggle={() => tog('other')}>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">In Stock Only</span>
            <Toggle on={inStockOnly} onToggle={() => setInStockOnly(!inStockOnly)} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">On Sale Only</span>
            <Toggle on={onSaleOnly} onToggle={() => setOnSaleOnly(!onSaleOnly)} />
          </div>
        </div>
      </Section>

      {/* Trust badges */}
      <div className="mt-5 pt-5 border-t border-gray-100 space-y-2.5">
        {[
          { icon: Truck,     text: 'Free shipping on orders 5,000+' },
          { icon: RotateCcw, text: '30-day easy returns' },
          { icon: Award,     text: '100% authentic products' },
        ].map(({ icon: Icon, text }) => (
          <div key={text} className="flex items-center gap-3 text-xs text-gray-400">
            <Icon className="w-4 h-4 flex-shrink-0" />
            <span>{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Product Card – Grid ────────────────────────────────── */
const GridCard = ({ product, idx, wishlist, toggleWishlist }: any) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: idx * 0.04, type: 'spring', stiffness: 100, damping: 14 }}
    whileHover={{ y: -4 }}
    className="group"
  >
    <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100">
      <Image
        src={product.image_urls[0]} alt={product.name} fill loading="lazy"
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Badges */}
      <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
        {product.onSale && (
          <span className="bg-rose-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase">Sale</span>
        )}
        {idx < 3 && (
          <span className="bg-gray-900 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase">New</span>
        )}
      </div>

      {/* Wishlist */}
      <button
        onClick={e => { e.preventDefault(); toggleWishlist(product.id); }}
        className="absolute top-2.5 right-2.5 bg-white/90 backdrop-blur-sm p-1.5 rounded-full shadow-sm hover:bg-rose-50 transition-colors z-10"
      >
        <Heart className={cn('w-3.5 h-3.5', wishlist.includes(product.id) ? 'fill-rose-500 text-rose-500' : 'text-gray-400')} />
      </button>

      {/* Hover overlay CTA */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
        <div className="w-full flex gap-2">
          <Link href={`/products/${product.id}`}
            className="flex-1 bg-white/95 backdrop-blur text-gray-900 py-2 rounded-xl font-bold text-xs uppercase tracking-wide text-center hover:bg-gray-900 hover:text-white transition-colors"
          >
            View
          </Link>
          <button className="bg-gray-900 text-white p-2 rounded-xl hover:bg-gray-700 transition-colors">
            <ShoppingBag className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <Link href={`/products/${product.id}`} className="absolute inset-0" />
    </div>

    <div className="mt-3 px-0.5">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider truncate max-w-[60%]">
          {product.categories[0]}
        </span>
        <div className="flex items-center gap-0.5">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span className="text-[10px] font-semibold text-gray-500">{product.rating ?? 4.9}</span>
        </div>
      </div>
      <h3 className="text-sm sm:text-base font-semibold text-gray-900 line-clamp-1 mb-1 group-hover:text-rose-600 transition-colors">
        {product.name}
      </h3>
      <div className="flex items-baseline gap-1.5 flex-wrap">
        <span className="text-sm sm:text-base font-bold text-gray-900">{formatCurrency(product.price)}</span>
        {product.originalPrice && (
          <span className="text-xs text-gray-400 line-through">{formatCurrency(product.originalPrice)}</span>
        )}
      </div>
    </div>
  </motion.div>
);

/* ─── Product Card – List ────────────────────────────────── */
const ListCard = ({ product, wishlist, toggleWishlist }: any) => (
  <motion.div
    layout
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    className="flex gap-3 sm:gap-5 bg-white rounded-2xl p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow group"
  >
    <div className="relative w-24 sm:w-32 md:w-40 aspect-[3/4] flex-shrink-0 rounded-xl overflow-hidden bg-gray-100">
      <Image
        src={product.image_urls[0]} alt={product.name} fill loading="lazy"
        sizes="(max-width: 640px) 96px, 160px"
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />
    </div>
    <div className="flex-1 min-w-0 py-1 flex flex-col justify-between">
      <div>
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{product.categories[0]}</span>
        <h3 className="font-semibold text-gray-900 mt-0.5 mb-1 line-clamp-2 text-sm sm:text-base md:text-lg leading-snug">
          {product.name}
        </h3>
        <p className="text-gray-400 text-xs sm:text-sm line-clamp-2 mb-2 hidden sm:block">{product.description}</p>
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={cn('w-3 h-3', i < Math.round(product.rating ?? 4.9) ? 'fill-amber-400 text-amber-400' : 'text-gray-200')} />
          ))}
          <span className="text-[10px] text-gray-400 ml-1">(128)</span>
        </div>
      </div>
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="text-base sm:text-xl font-bold text-gray-900">{formatCurrency(product.price)}</span>
          {product.originalPrice && (
            <span className="text-xs sm:text-sm text-gray-400 line-through">{formatCurrency(product.originalPrice)}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => toggleWishlist(product.id)}
            className="p-2 rounded-xl bg-gray-100 hover:bg-rose-50 hover:text-rose-500 transition-colors">
            <Heart className={cn('w-4 h-4', wishlist.includes(product.id) ? 'fill-rose-500 text-rose-500' : 'text-gray-500')} />
          </button>
          <Link href={`/products/${product.id}`}
            className="flex items-center gap-1.5 bg-gray-900 text-white px-3 sm:px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wide hover:bg-gray-700 transition-colors">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Add to Bag</span>
          </Link>
        </div>
      </div>
    </div>
  </motion.div>
);

/* ─── Main Page ───────────────────────────────────────────── */
export default function ProductsPage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 200000 });
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [onSaleOnly, setOnSaleOnly] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const productsAreaRef = useRef<HTMLDivElement>(null);

  const toggleWishlist = (id: string) =>
    setWishlist(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  // Called only on explicit user interaction — never on initial mount
  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setTimeout(() => {
      productsAreaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  const clearAll = () => {
    setSelectedCategory('all');
    setPriceRange({ min: 0, max: 200000 });
    setSelectedColors([]);
    setSelectedSizes([]);
    setSelectedRatings([]);
    setInStockOnly(false);
    setOnSaleOnly(false);
    setSortBy('newest');
  };

  const activeCount = [
    selectedCategory !== 'all' ? 1 : 0,
    priceRange.min > 0 || priceRange.max < 200000 ? 1 : 0,
    selectedColors.length,
    selectedSizes.length,
    selectedRatings.length,
    inStockOnly ? 1 : 0,
    onSaleOnly ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  const filtered = useMemo(() => {
    let r = [...dummyProducts];
    if (selectedCategory !== 'all')
      r = r.filter(p => p.categories.some(c => c.toLowerCase() === selectedCategory));
    r = r.filter(p => p.price >= priceRange.min && p.price <= priceRange.max);
    if (selectedColors.length)
      r = r.filter((_, i) => selectedColors.includes(COLOR_OPTIONS[i % COLOR_OPTIONS.length].value));
    if (selectedSizes.length)
      r = r.filter((_, i) => selectedSizes.includes(SIZE_OPTIONS[i % SIZE_OPTIONS.length]));
    if (selectedRatings.length)
      r = r.filter(p => (p.rating ?? 4) >= Math.min(...selectedRatings));
    if (inStockOnly) r = r.filter(p => p.inStock ?? true);
    if (onSaleOnly)  r = r.filter(p => p.onSale ?? false);
    if (sortBy === 'price-asc')  r.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') r.sort((a, b) => b.price - a.price);
    if (sortBy === 'popularity') r.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    if (sortBy === 'newest')     r.sort((a, b) => b.id.localeCompare(a.id));
    return r;
  }, [selectedCategory, priceRange, selectedColors, selectedSizes, selectedRatings, inStockOnly, onSaleOnly, sortBy]);

  const filterProps = {
    selectedCategory, setSelectedCategory: handleCategoryChange,
    priceRange, setPriceRange,
    selectedColors, setSelectedColors,
    selectedSizes, setSelectedSizes,
    selectedRatings, setSelectedRatings,
    inStockOnly, setInStockOnly,
    onSaleOnly, setOnSaleOnly,
    clearAll, activeCount,
  };

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* ── Page Header ──────────────────────────────────── */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-3 uppercase tracking-wider font-semibold">
              <span>Home</span> <ChevronRight className="w-3 h-3" /> <span className="text-gray-700">Collections</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-2">
              All Collections
            </h1>
            <p className="text-gray-400 text-sm sm:text-base">
              {dummyProducts.length} curated pieces — from everyday elegance to occasion wear
            </p>
          </motion.div>

          {/* Category quick-tabs (mobile-scrollable) */}
          <div className="flex gap-2 mt-6 overflow-x-auto scrollbar-hide ">
            {CATEGORIES.map(cat => (
              <button key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={cn(
                  'flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all',
                  selectedCategory === cat.id
                    ? 'bg-gray-900 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                )}>
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Mobile: filter button bar ─────────────────────── */}
      <div className="lg:hidden sticky top-[4.5rem] z-30 bg-white border-b border-gray-100 px-4 py-1 flex items-center gap-2">
        <button onClick={() => setIsMobileFilterOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl text-sm font-semibold hover:bg-gray-200 transition-colors"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
          {activeCount > 0 && (
            <span className="bg-gray-900 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">{activeCount}</span>
          )}
        </button>

        {/* Sort – compact on mobile */}
        <select value={sortBy} onChange={e => setSortBy(e.target.value)}
          className="flex-1 bg-gray-100 border-0 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-gray-900 cursor-pointer font-medium text-gray-700 min-w-0"
        >
          <option value="newest">Newest</option>
          <option value="popularity">Top Rated</option>
          <option value="price-asc">Price ↑</option>
          <option value="price-desc">Price ↓</option>
        </select>

        {/* View toggle */}
        <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
          <button onClick={() => setViewMode('grid')}
            className={cn('p-1.5 rounded-lg transition-all', viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-gray-400')}>
            <Grid className="w-4 h-4" />
          </button>
          <button onClick={() => setViewMode('list')}
            className={cn('p-1.5 rounded-lg transition-all', viewMode === 'list' ? 'bg-white shadow-sm' : 'text-gray-400')}>
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── Mobile Filter Drawer ──────────────────────────── */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />
            <motion.div
              key="drawer"
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 left-0 bottom-0 w-[85vw] max-w-sm bg-white z-50 overflow-y-auto lg:hidden shadow-2xl"
            >
              <div className="p-5">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-xl font-serif font-bold">Filters</h3>
                  <button onClick={() => setIsMobileFilterOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <FilterPanel {...filterProps} />
              </div>

              {/* Sticky apply button */}
              <div className="sticky bottom-0 bg-white border-t border-gray-100 p-4">
                <button onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full bg-gray-900 text-white py-3 rounded-xl font-bold text-sm uppercase tracking-wide hover:bg-gray-700 transition-colors">
                  Show {filtered.length} Results
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Main layout ───────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex gap-7 lg:gap-8">

          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-72 xl:w-80 flex-shrink-0">
            <div className="sticky top-24 bg-white rounded-2xl p-5 shadow-sm border border-gray-100 max-h-[calc(100vh-7rem)] overflow-y-auto">
              <FilterPanel {...filterProps} />
            </div>
          </aside>

          {/* Products area */}
          <div ref={productsAreaRef} className="flex-1 min-w-0">

            {/* Desktop toolbar */}
            <div className="hidden lg:flex items-center justify-between mb-5">
              <p className="text-sm text-gray-500">
                Showing <span className="font-bold text-gray-900">{filtered.length}</span> products
              </p>
              <div className="flex items-center gap-3">
                {/* View toggle */}
                <div className="flex items-center gap-1 bg-white rounded-xl p-1 border border-gray-100 shadow-sm">
                  <button onClick={() => setViewMode('grid')}
                    className={cn('p-2 rounded-lg transition-all', viewMode === 'grid' ? 'bg-gray-900 text-white' : 'text-gray-400 hover:text-gray-600')}>
                    <Grid className="w-4 h-4" />
                  </button>
                  <button onClick={() => setViewMode('list')}
                    className={cn('p-2 rounded-lg transition-all', viewMode === 'list' ? 'bg-gray-900 text-white' : 'text-gray-400 hover:text-gray-600')}>
                    <List className="w-4 h-4" />
                  </button>
                </div>
                {/* Sort */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400 font-medium">Sort by:</span>
                  <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                    className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-gray-900 cursor-pointer">
                    <option value="newest">Newest</option>
                    <option value="popularity">Top Rated</option>
                    <option value="price-asc">Price: Low → High</option>
                    <option value="price-desc">Price: High → Low</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Active filter chips */}
            {activeCount > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedCategory !== 'all' && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-900 text-white rounded-full text-xs font-semibold capitalize">
                    {selectedCategory}
                    <button onClick={() => setSelectedCategory('all')}><X className="w-3 h-3" /></button>
                  </span>
                )}
                {selectedColors.map(c => (
                  <span key={c} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 rounded-full text-xs font-semibold capitalize">
                    {c} <button onClick={() => setSelectedColors(p => p.filter(x => x !== c))}><X className="w-3 h-3" /></button>
                  </span>
                ))}
                {selectedSizes.map(s => (
                  <span key={s} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 rounded-full text-xs font-semibold">
                    Size {s} <button onClick={() => setSelectedSizes(p => p.filter(x => x !== s))}><X className="w-3 h-3" /></button>
                  </span>
                ))}
                {activeCount > 1 && (
                  <button onClick={clearAll} className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-full text-xs font-semibold text-gray-500 hover:border-rose-400 hover:text-rose-600 transition-colors">
                    Clear all <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            )}

            {/* Products */}
            {filtered.length > 0 ? (
              <motion.div
                key={viewMode}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}
                className={viewMode === 'grid'
                  ? 'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5'
                  : 'space-y-3 sm:space-y-4'
                }
              >
                {filtered.map((p, i) =>
                  viewMode === 'grid'
                    ? <GridCard key={p.id} product={p} idx={i} wishlist={wishlist} toggleWishlist={toggleWishlist} />
                    : <ListCard key={p.id} product={p} wishlist={wishlist} toggleWishlist={toggleWishlist} />
                )}
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-20">
                <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                  <Search className="w-16 h-16 text-gray-200 mx-auto mb-5" />
                </motion.div>
                <h3 className="text-2xl font-serif font-bold text-gray-700 mb-2">No products found</h3>
                <p className="text-gray-400 mb-6 text-sm">Try adjusting your filters.</p>
                <button onClick={clearAll}
                  className="bg-gray-900 text-white px-8 py-3 rounded-full font-semibold text-sm hover:bg-gray-700 transition-colors">
                  Clear all filters
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
