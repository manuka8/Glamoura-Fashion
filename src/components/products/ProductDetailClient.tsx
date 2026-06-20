'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag, Heart, Check, ChevronRight, Star,
  Share2, Truck, RotateCcw, Shield, CreditCard,
  Minus, Plus, X, ZoomIn, ChevronDown, Package,
  Ruler, BadgeCheck, Sparkles, Copy, Tag, Clock,
} from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { cn, formatCurrency } from '@/lib/utils';

/* ─── Types ──────────────────────────────────────────────────── */
export type ProductDetail = {
  id: string;
  name: string;
  description: string;
  price: number;
  original_price?: number;
  image_urls: Array<string | { src: string; width?: number; height?: number }>;
  categories: string[];
  sizes?: string[];
  colors?: string[];
  stock?: number;
  rating?: number;
  reviews?: number;
  onSale?: boolean;
};

/* ─── Color map ──────────────────────────────────────────────── */
const COLOR_MAP: Record<string, string> = {
  black:  '#111111', white:  '#FFFFFF', red:    '#EF4444',
  blue:   '#3B82F6', green:  '#10B981', gold:   '#F59E0B',
  silver: '#9CA3AF', pink:   '#EC4899', beige:  '#D4B896',
  brown:  '#92400E', navy:   '#1E3A5F', gray:   '#6B7280',
  purple: '#8B5CF6', orange: '#F97316', cream:  '#FEFCE8',
};

/* ─── Toast ──────────────────────────────────────────────────── */
const Toast = ({ message, onClose }: { message: string; onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 40, scale: 0.95 }}
    animate={{ opacity: 1, y: 0,  scale: 1 }}
    exit={{ opacity: 0, y: 40, scale: 0.95 }}
    className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-gray-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl"
  >
    <div className="w-5 h-5 rounded-full bg-emerald-400 flex items-center justify-center flex-shrink-0">
      <Check className="w-3 h-3 text-white" />
    </div>
    <span className="text-sm font-medium">{message}</span>
    <button onClick={onClose} className="ml-2 text-white/60 hover:text-white transition-colors">
      <X className="w-4 h-4" />
    </button>
  </motion.div>
);

/* ─── Size Guide Modal ───────────────────────────────────────── */
const SizeGuideModal = ({ onClose }: { onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4"
    onClick={onClose}
  >
    <motion.div
      initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl"
      onClick={e => e.stopPropagation()}
    >
      <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Ruler className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-serif font-bold">Size Guide</h3>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="p-6 overflow-y-auto max-h-[60vh]">
        <p className="text-xs text-gray-400 mb-4">All measurements in inches. For the best fit, measure over undergarments.</p>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 rounded-xl">
              <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wider text-gray-500 rounded-l-xl">Size</th>
              <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wider text-gray-500">UK</th>
              <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wider text-gray-500">EU</th>
              <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wider text-gray-500">Bust</th>
              <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wider text-gray-500 rounded-r-xl">Waist</th>
            </tr>
          </thead>
          <tbody>
            {[
              { us: 'XS', uk: '6',  eu: '34', bust: '31–32', waist: '23–24' },
              { us: 'S',  uk: '8',  eu: '36', bust: '33–34', waist: '25–26' },
              { us: 'M',  uk: '10', eu: '38', bust: '35–36', waist: '27–28' },
              { us: 'L',  uk: '12', eu: '40', bust: '37–39', waist: '29–31' },
              { us: 'XL', uk: '14', eu: '42', bust: '40–42', waist: '32–34' },
              { us: 'XXL',uk: '16', eu: '44', bust: '43–45', waist: '35–37' },
            ].map(row => (
              <tr key={row.us} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                <td className="py-3 px-4 font-semibold text-gray-900">{row.us}</td>
                <td className="py-3 px-4 text-gray-600">{row.uk}</td>
                <td className="py-3 px-4 text-gray-600">{row.eu}</td>
                <td className="py-3 px-4 text-gray-600">{row.bust}</td>
                <td className="py-3 px-4 text-gray-600">{row.waist}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  </motion.div>
);

/* ─── Lightbox ───────────────────────────────────────────────── */
const Lightbox = ({
  images, activeIndex, onClose,
}: {
  images: ProductDetail['image_urls']; activeIndex: number; onClose: () => void;
}) => {
  const [cur, setCur] = useState(activeIndex);
  const go = (dir: 1 | -1) =>
    setCur(p => (p + dir + images.length) % images.length);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/95 z-50 flex flex-col items-center justify-center"
      onClick={onClose}
    >
      <button onClick={onClose} className="absolute top-5 right-5 bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-colors z-10">
        <X className="w-6 h-6 text-white" />
      </button>

      <div className="relative w-full h-[80vh] max-w-4xl px-4" onClick={e => e.stopPropagation()}>
        <AnimatePresence mode="wait">
          <motion.div
            key={cur}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            className="relative w-full h-full"
          >
            <Image src={images[cur]} alt="Product" fill className="object-contain" />
          </motion.div>
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <button
              onClick={() => go(-1)}
              className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/25 p-3 rounded-full transition-all"
            >
              <ChevronRight className="w-5 h-5 text-white rotate-180" />
            </button>
            <button
              onClick={() => go(1)}
              className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/25 p-3 rounded-full transition-all"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="flex gap-2 mt-4 px-4">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={e => { e.stopPropagation(); setCur(i); }}
              className={cn(
                'relative w-14 h-14 rounded-xl overflow-hidden border-2 transition-all',
                cur === i ? 'border-white' : 'border-white/20 opacity-50 hover:opacity-75',
              )}
            >
              <Image src={img} alt="" fill className="object-cover" />
            </button>
          ))}
        </div>
      )}

      <p className="text-white/40 text-xs mt-3">{cur + 1} / {images.length}</p>
    </motion.div>
  );
};

/* ─── Accordion item ─────────────────────────────────────────── */
function AccordionItem({ title, icon: Icon, children, defaultOpen = false }: {
  title: string; icon: React.ElementType; children: React.ReactNode; defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-100">
      <button
        onClick={() => setOpen(p => !p)}
        className="flex items-center justify-between w-full py-4 text-left group"
      >
        <div className="flex items-center gap-2.5 text-sm font-semibold text-gray-800">
          <Icon className="w-4 h-4 text-gray-400" />
          {title}
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="pb-4 text-sm text-gray-500 leading-relaxed">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────────── */
export default function ProductDetailClient({ product }: { product: ProductDetail }) {
  const router = useRouter();
  const [selectedSize,  setSelectedSize]  = useState(product.sizes?.[0]  ?? '');
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] ?? '');
  const [activeImage,   setActiveImage]   = useState(0);
  const [quantity,      setQuantity]      = useState(1);
  const [wishlisted,    setWishlisted]    = useState(false);
  const [showToast,     setShowToast]     = useState(false);
  const [toastMsg,      setToastMsg]      = useState('');
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [showLightbox,  setShowLightbox]  = useState(false);
  const [copied,        setCopied]        = useState(false);
  const [imgHovered,    setImgHovered]    = useState(false);
  const addItem = useCart(s => s.addItem);

  const images = product.image_urls ?? [];
  const discount = product.original_price && product.original_price > product.price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0;
  const inStock = (product.stock ?? 10) > 0;
  const lowStock = (product.stock ?? 10) <= 5 && inStock;

  const toast = (msg: string) => {
    setToastMsg(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleAddToCart = () => {
    addItem(product as any, quantity, selectedSize, selectedColor);
    toast('Added to bag successfully!');
  };

  const handleBuyNow = () => {
    addItem(product as any, quantity, selectedSize, selectedColor);
    router.push('/cart');
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast('Link copied to clipboard!');
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast('Could not copy link');
    }
  };

  const ratingVal   = product.rating  ?? 4.8;
  const reviewCount = product.reviews ?? 128;
  const fullStars   = Math.floor(ratingVal);
  const hasHalf     = ratingVal % 1 >= 0.5;

  return (
    <div className="bg-white min-h-screen">

      {/* ── Toasts & Modals ── */}
      <AnimatePresence>
        {showToast && <Toast key="toast" message={toastMsg} onClose={() => setShowToast(false)} />}
      </AnimatePresence>
      <AnimatePresence>
        {showSizeGuide && <SizeGuideModal key="size" onClose={() => setShowSizeGuide(false)} />}
      </AnimatePresence>
      <AnimatePresence>
        {showLightbox && images.length > 0 && (
          <Lightbox key="lb" images={images} activeIndex={activeImage} onClose={() => setShowLightbox(false)} />
        )}
      </AnimatePresence>

      {/* ── Breadcrumb ── */}
      <div className="border-b border-gray-100 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1.5 text-xs text-gray-400 flex-wrap">
            <Link href="/" className="hover:text-gray-700 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/products" className="hover:text-gray-700 transition-colors">Collections</Link>
            {product.categories?.[0] && (
              <>
                <ChevronRight className="w-3 h-3" />
                <Link
                  href={`/products?category=${encodeURIComponent(product.categories[0].toLowerCase())}`}
                  className="hover:text-gray-700 transition-colors capitalize"
                >
                  {product.categories[0]}
                </Link>
              </>
            )}
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-700 font-medium truncate max-w-[180px]">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* ── Main layout ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-16">

          {/* ════════ LEFT — Image Gallery ════════ */}
          <div className="flex gap-3 lg:gap-4">

            {/* Thumbnail strip — hidden on mobile */}
            {images.length > 1 && (
              <div className="hidden sm:flex flex-col gap-2 w-16 xl:w-20 flex-shrink-0">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={cn(
                      'relative aspect-square rounded-xl overflow-hidden border-2 transition-all duration-200',
                      activeImage === i
                        ? 'border-gray-900 shadow-md'
                        : 'border-transparent hover:border-gray-300 opacity-60 hover:opacity-100',
                    )}
                  >
                    <Image src={img} alt={`${product.name} ${i + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Main image */}
            <div className="flex-1 flex flex-col gap-3">
              <div
                className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-gray-100 cursor-zoom-in group"
                onMouseEnter={() => setImgHovered(true)}
                onMouseLeave={() => setImgHovered(false)}
                onClick={() => setShowLightbox(true)}
              >
                {images.length > 0 ? (
                  <>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeImage}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0"
                      >
                        <Image
                          src={images[activeImage]}
                          alt={product.name}
                          fill
                          priority
                          className={cn(
                            'object-cover transition-transform duration-700',
                            imgHovered ? 'scale-110' : 'scale-100',
                          )}
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                      </motion.div>
                    </AnimatePresence>

                    {/* Zoom hint */}
                    <div className={cn(
                      'absolute inset-0 flex items-center justify-center transition-opacity duration-300',
                      imgHovered ? 'opacity-100' : 'opacity-0',
                    )}>
                      <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 text-xs font-semibold text-gray-700 shadow">
                        <ZoomIn className="w-3.5 h-3.5" /> Click to enlarge
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                    <ShoppingBag className="w-16 h-16" />
                  </div>
                )}

                {/* Badges */}
                <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5 z-10">
                  {discount > 0 && (
                    <span className="bg-rose-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wide shadow">
                      -{discount}% OFF
                    </span>
                  )}
                  {product.onSale && discount === 0 && (
                    <span className="bg-rose-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wide shadow">
                      Sale
                    </span>
                  )}
                </div>

                {/* Wishlist on image */}
                <button
                  onClick={e => { e.stopPropagation(); setWishlisted(p => !p); }}
                  className="absolute top-3.5 right-3.5 z-10 bg-white/90 backdrop-blur-sm p-2.5 rounded-full shadow-md hover:scale-110 transition-all duration-200"
                >
                  <Heart className={cn('w-4 h-4 transition-colors', wishlisted ? 'fill-rose-500 text-rose-500' : 'text-gray-400')} />
                </button>
              </div>

              {/* Mobile thumbnail strip */}
              {images.length > 1 && (
                <div className="flex sm:hidden gap-2 overflow-x-auto scrollbar-hide pb-1">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={cn(
                        'relative w-16 aspect-square rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all',
                        activeImage === i ? 'border-gray-900' : 'border-transparent opacity-50',
                      )}
                    >
                      <Image src={img} alt={`${product.name} ${i + 1}`} fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ════════ RIGHT — Product Info ════════ */}
          <div className="flex flex-col">

            {/* Category + Share */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 flex-wrap">
                {product.categories?.map(cat => (
                  <Link
                    key={cat}
                    href={`/products?category=${encodeURIComponent(cat.toLowerCase())}`}
                    className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-rose-600 bg-rose-50 hover:bg-rose-100 px-2.5 py-1 rounded-full transition-colors"
                  >
                    <Sparkles className="w-2.5 h-2.5" /> {cat}
                  </Link>
                ))}
              </div>
              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-700 transition-colors px-3 py-1.5 border border-gray-200 hover:border-gray-400 rounded-full"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
                Share
              </button>
            </div>

            {/* Name */}
            <h1 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-serif font-bold text-gray-900 leading-tight mb-3">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      'w-4 h-4',
                      i < fullStars
                        ? 'fill-amber-400 text-amber-400'
                        : i === fullStars && hasHalf
                          ? 'fill-amber-200 text-amber-400'
                          : 'text-gray-200',
                    )}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-700">{ratingVal.toFixed(1)}</span>
              <span className="text-sm text-gray-400">({reviewCount.toLocaleString()} reviews)</span>
              {product.onSale && (
                <span className="ml-auto inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full uppercase tracking-wide">
                  <BadgeCheck className="w-3 h-3" /> Bestseller
                </span>
              )}
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 flex-wrap mb-5 pb-5 border-b border-gray-100">
              <span className="text-3xl font-bold text-gray-900">{formatCurrency(product.price)}</span>
              {product.original_price && product.original_price > product.price && (
                <>
                  <span className="text-lg text-gray-400 line-through font-medium">
                    {formatCurrency(product.original_price)}
                  </span>
                  <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                    Save {formatCurrency(product.original_price - product.price)}
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-800">
                    Colour: <span className="text-gray-500 font-semibold normal-case tracking-normal capitalize">{selectedColor}</span>
                  </span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {product.colors.map(color => {
                    const hex = COLOR_MAP[color.toLowerCase()] ?? '#CCCCCC';
                    const isLight = ['white', 'cream', 'beige', 'silver'].includes(color.toLowerCase());
                    return (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        title={color}
                        className={cn(
                          'w-8 h-8 rounded-full border-2 transition-all duration-200 hover:scale-110',
                          selectedColor === color
                            ? 'border-gray-900 ring-2 ring-gray-900 ring-offset-2 scale-110'
                            : isLight ? 'border-gray-300' : 'border-transparent hover:border-gray-400',
                        )}
                        style={{ backgroundColor: hex }}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-800">
                    Size: <span className="text-gray-500 font-semibold normal-case tracking-normal">{selectedSize}</span>
                  </span>
                  <button
                    onClick={() => setShowSizeGuide(true)}
                    className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-700 underline underline-offset-2 transition-colors"
                  >
                    <Ruler className="w-3 h-3" /> Size guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        'min-w-[52px] h-11 px-3 rounded-xl border-2 text-sm font-semibold transition-all duration-200',
                        selectedSize === size
                          ? 'border-gray-900 bg-gray-900 text-white shadow-md'
                          : 'border-gray-200 text-gray-700 hover:border-gray-900 hover:bg-gray-50',
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Stock indicator */}
            {lowStock && (
              <div className="flex items-center gap-2 mb-4 bg-amber-50 border border-amber-100 rounded-xl px-4 py-2.5">
                <Clock className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <p className="text-xs font-semibold text-amber-700">
                  Only {product.stock} left in stock — order soon!
                </p>
              </div>
            )}
            {!inStock && (
              <div className="flex items-center gap-2 mb-4 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5">
                <Tag className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <p className="text-xs font-semibold text-gray-500">Out of stock — notify me when available</p>
              </div>
            )}

            {/* Quantity + CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">

              {/* Qty stepper */}
              <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden h-12 flex-shrink-0">
                <button
                  onClick={() => setQuantity(p => Math.max(1, p - 1))}
                  className="w-11 h-full flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center text-sm font-bold text-gray-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(p => p + 1)}
                  disabled={!inStock}
                  className="w-11 h-full flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors disabled:opacity-40"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Add to bag */}
              <button
                onClick={handleAddToCart}
                disabled={!inStock}
                className="flex-1 flex items-center justify-center gap-2 bg-gray-900 text-white h-12 rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-gray-800 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
              >
                <ShoppingBag className="w-4 h-4" />
                Add to Bag
              </button>

              {/* Wishlist */}
              <button
                onClick={() => setWishlisted(p => !p)}
                className={cn(
                  'w-12 h-12 flex items-center justify-center rounded-xl border-2 transition-all duration-200 flex-shrink-0',
                  wishlisted
                    ? 'border-rose-400 bg-rose-50 text-rose-500'
                    : 'border-gray-200 text-gray-400 hover:border-gray-400',
                )}
              >
                <Heart className={cn('w-5 h-5', wishlisted && 'fill-rose-500')} />
              </button>
            </div>

            {/* Buy Now */}
            <button
              onClick={handleBuyNow}
              disabled={!inStock}
              className="w-full h-12 rounded-xl border-2 border-gray-900 text-gray-900 font-bold text-sm uppercase tracking-widest hover:bg-gray-900 hover:text-white active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mb-6"
            >
              Buy Now
            </button>

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-3 mb-6 pb-6 border-b border-gray-100">
              {[
                { icon: Truck,      title: 'Free Shipping',   sub: 'Orders over LKR 5,000'    },
                { icon: RotateCcw,  title: '30-Day Returns',  sub: 'Hassle-free returns'       },
                { icon: Shield,     title: 'Secure Checkout', sub: '256-bit SSL encryption'    },
                { icon: CreditCard, title: 'Easy Payments',   sub: 'Visa, Master, Cash on del' },
              ].map(({ icon: Icon, title, sub }) => (
                <div key={title} className="flex items-start gap-2.5 bg-gray-50 rounded-xl p-3">
                  <div className="w-7 h-7 rounded-lg bg-gray-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="w-3.5 h-3.5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-800">{title}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5 leading-relaxed">{sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Accordion sections */}
            <div>
              <AccordionItem title="Product Details" icon={Package} defaultOpen>
                <ul className="space-y-2 mt-2">
                  {product.categories?.length > 0 && (
                    <li className="flex justify-between text-xs">
                      <span className="text-gray-400 font-medium">Category</span>
                      <span className="text-gray-700 font-semibold capitalize">{product.categories.join(', ')}</span>
                    </li>
                  )}
                  {product.sizes && product.sizes.length > 0 && (
                    <li className="flex justify-between text-xs">
                      <span className="text-gray-400 font-medium">Available Sizes</span>
                      <span className="text-gray-700 font-semibold">{product.sizes.join(', ')}</span>
                    </li>
                  )}
                  {product.colors && product.colors.length > 0 && (
                    <li className="flex justify-between text-xs">
                      <span className="text-gray-400 font-medium">Available Colours</span>
                      <span className="text-gray-700 font-semibold capitalize">{product.colors.join(', ')}</span>
                    </li>
                  )}
                  <li className="flex justify-between text-xs">
                    <span className="text-gray-400 font-medium">Product ID</span>
                    <span className="text-gray-700 font-mono">{product.id}</span>
                  </li>
                </ul>
              </AccordionItem>

              <AccordionItem title="Care Instructions" icon={Sparkles}>
                <ul className="space-y-1.5 mt-2 text-xs text-gray-500">
                  {[
                    'Dry clean or hand wash in cold water',
                    'Do not bleach or tumble dry',
                    'Iron on low heat with a pressing cloth',
                    'Store in a cool, dry place away from direct sunlight',
                  ].map(line => (
                    <li key={line} className="flex items-start gap-2">
                      <Check className="w-3 h-3 text-gray-400 mt-0.5 flex-shrink-0" />
                      {line}
                    </li>
                  ))}
                </ul>
              </AccordionItem>

              <AccordionItem title="Delivery & Returns" icon={Truck}>
                <div className="space-y-3 mt-2 text-xs text-gray-500">
                  <div className="flex items-start gap-2">
                    <Truck className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <p><span className="font-semibold text-gray-700">Standard delivery</span> — 3–5 business days. Free on orders over LKR 5,000.</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <RotateCcw className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <p><span className="font-semibold text-gray-700">30-day returns</span> — Items must be unworn with original tags attached.</p>
                  </div>
                </div>
              </AccordionItem>
            </div>
          </div>
        </div>
      </div>

      {/* ── Sticky mobile CTA bar ── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white border-t border-gray-100 px-4 py-3 flex gap-3 shadow-[0_-4px_24px_rgba(0,0,0,0.08)]">
        <button
          onClick={() => setWishlisted(p => !p)}
          className={cn(
            'w-12 h-12 flex items-center justify-center rounded-xl border-2 flex-shrink-0 transition-all',
            wishlisted ? 'border-rose-400 bg-rose-50 text-rose-500' : 'border-gray-200 text-gray-400',
          )}
        >
          <Heart className={cn('w-5 h-5', wishlisted && 'fill-rose-500')} />
        </button>
        <button
          onClick={handleAddToCart}
          disabled={!inStock}
          className="flex-1 flex items-center justify-center gap-2 bg-gray-900 text-white rounded-xl font-bold text-sm uppercase tracking-widest disabled:opacity-50"
        >
          <ShoppingBag className="w-4 h-4" /> Add to Bag
        </button>
        <button
          onClick={handleBuyNow}
          disabled={!inStock}
          className="flex-1 flex items-center justify-center gap-2 border-2 border-gray-900 text-gray-900 rounded-xl font-bold text-sm uppercase tracking-widest disabled:opacity-50"
        >
          Buy Now
        </button>
      </div>

      {/* Bottom padding for mobile sticky bar */}
      <div className="h-20 lg:hidden" />
    </div>
  );
}
