'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/hooks/useCart';
import {
  CreditCard,
  Truck,
  ShoppingBag,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  Tag,
  Lock,
  ArrowLeft
} from 'lucide-react';
import { cn, formatCurrency } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

// Mock product fallback if cart is empty
const MOCK_CHECKOUT_ITEM = {
  product: {
    id: 'mock-cashmere',
    name: 'Cashmere Trench Coat',
    price: 185000,
    image_urls: ['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=200&q=80'],
    description: 'Bespoke cashmere coat'
  },
  quantity: 1,
  selectedColor: 'Camel',
  selectedSize: 'M'
};

export default function CheckoutPage() {
  const [mounted, setMounted] = useState(false);
  const { items: cartItems, totalPrice, clearCart } = useCart();
  
  // Checkout values
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [phone, setPhone] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');

  // Coupon promo state
  const [couponCode, setCouponCode] = useState('');
  const [activeDiscount, setActiveDiscount] = useState<{ code: string; percent: number } | null>(null);
  const [couponError, setCouponError] = useState('');

  // Form Validation State
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [generatedOrderId, setGeneratedOrderId] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  // Compute live checkout items
  const activeItems = mounted && cartItems.length > 0 ? cartItems : [MOCK_CHECKOUT_ITEM];
  const itemsPrice = mounted && cartItems.length > 0 ? totalPrice() : MOCK_CHECKOUT_ITEM.product.price;
  
  // Promo and tax math
  const discountAmount = activeDiscount ? Math.round(itemsPrice * (activeDiscount.percent / 100)) : 0;
  const shippingFee = itemsPrice > 50000 ? 0 : 2500;
  const grandTotal = Math.max(0, itemsPrice - discountAmount + shippingFee);

  const applyPromoCode = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    
    if (code === 'GOLDEN30') {
      setActiveDiscount({ code: 'GOLDEN30', percent: 30 });
      setCouponError('');
    } else if (code === 'WELCOME20') {
      setActiveDiscount({ code: 'WELCOME20', percent: 20 });
      setCouponError('');
    } else if (code === 'FLASH15') {
      setActiveDiscount({ code: 'FLASH15', percent: 15 });
      setCouponError('');
    } else {
      setCouponError('Invalid promo code. Try GOLDEN30 or WELCOME20.');
      setActiveDiscount(null);
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // Basic shipping audits
    if (!email.match(/.+@.+\..+/)) newErrors.email = 'Please enter a valid email address.';
    if (firstName.trim().length < 2) newErrors.firstName = 'First name must be at least 2 characters.';
    if (lastName.trim().length < 2) newErrors.lastName = 'Last name must be at least 2 characters.';
    if (!address.trim()) newErrors.address = 'Shipping address is required.';
    if (!city.trim()) newErrors.city = 'City is required.';
    if (!postalCode.trim().match(/^\d{5}$/)) newErrors.postalCode = 'Postal code must be exactly 5 digits.';
    if (!phone.trim().match(/^\+?\d{8,15}$/)) newErrors.phone = 'Please enter a valid telephone number.';

    // Basic credit card validation
    if (cardName.trim().length < 4) newErrors.cardName = 'Name must match credit card holder.';
    
    const plainCard = cardNumber.replace(/\s+/g, '');
    if (!plainCard.match(/^\d{13,19}$/)) newErrors.cardNumber = 'Please enter a valid 16-digit card number.';
    
    if (!cardExpiry.match(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/)) {
      newErrors.cardExpiry = 'Expiry must be in MM/YY format.';
    }
    
    if (!cardCvc.match(/^\d{3,4}$/)) newErrors.cardCvc = 'CVC must be a 3 or 4-digit code.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate secure luxury payment validation delay
    setTimeout(() => {
      setIsSubmitting(false);
      setGeneratedOrderId(`GLM-ORD-${Math.floor(100000 + Math.random() * 900000)}`);
      setIsConfirmed(true);
      
      // Clear out the live Zustand cart state on success!
      if (mounted && cartItems.length > 0) {
        clearCart();
      }
    }, 2000);
  };

  // Card number input autofill styling spacer
  const handleCardNumberInput = (val: string) => {
    const raw = val.replace(/\D/g, '');
    const segments = [];
    for (let i = 0; i < raw.length && i < 16; i += 4) {
      segments.push(raw.substring(i, i + 4));
    }
    setCardNumber(segments.join(' '));
  };

  const handleExpiryInput = (val: string) => {
    const raw = val.replace(/\D/g, '');
    if (raw.length >= 2) {
      setCardExpiry(`${raw.substring(0, 2)}/${raw.substring(2, 4)}`);
    } else {
      setCardExpiry(raw);
    }
  };

  return (
    <div className="bg-neutral-50/50 min-h-screen py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <AnimatePresence mode="wait">
          {!isConfirmed ? (
            
            /* SECURE CHECKOUT CORE STATE */
            <motion.div
              key="checkout-form"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10"
            >
              
              {/* Left Column: Secure Checkout Forms */}
              <div className="lg:col-span-7 space-y-8">
                
                {/* Header backlink */}
                <div className="flex items-center gap-3">
                  <Link href="/cart" className="p-2 hover:bg-white rounded-xl border border-neutral-200 text-gray-500 hover:text-black transition-all">
                    <ArrowLeft className="w-4 h-4" />
                  </Link>
                  <div>
                    <span className="text-[10px] text-amber-500 font-bold uppercase tracking-widest block">Secure Payment Vault</span>
                    <h1 className="text-2xl font-serif font-bold text-gray-900 tracking-tight">Luxury Checkout</h1>
                  </div>
                </div>

                <form onSubmit={handleCheckoutSubmit} className="space-y-6 text-xs">
                  
                  {/* Shipping Address Section */}
                  <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm space-y-5">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 pb-3 border-b border-gray-150 flex items-center gap-2">
                      <Truck className="w-4.5 h-4.5 text-amber-500" /> Shipping & Delivery Information
                    </h3>

                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Email Address</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={cn(
                          "w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-500/10 focus:border-amber-500 text-gray-800 transition-colors",
                          errors.email ? "border-rose-500 bg-rose-50/10" : "border-neutral-200"
                        )}
                        placeholder="e.g. isabella@ross.it"
                      />
                      {errors.email && <span className="text-[10px] text-rose-500 font-bold mt-0.5">{errors.email}</span>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">First Name</label>
                        <input
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className={cn(
                            "w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-500/10 focus:border-amber-500 text-gray-800 transition-colors",
                            errors.firstName ? "border-rose-500 bg-rose-50/10" : "border-neutral-200"
                          )}
                          placeholder="First Name"
                        />
                        {errors.firstName && <span className="text-[10px] text-rose-500 font-bold mt-0.5">{errors.firstName}</span>}
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Last Name</label>
                        <input
                          type="text"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className={cn(
                            "w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-500/10 focus:border-amber-500 text-gray-800 transition-colors",
                            errors.lastName ? "border-rose-500 bg-rose-50/10" : "border-neutral-200"
                          )}
                          placeholder="Last Name"
                        />
                        {errors.lastName && <span className="text-[10px] text-rose-500 font-bold mt-0.5">{errors.lastName}</span>}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Delivery Address</label>
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className={cn(
                          "w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-500/10 focus:border-amber-500 text-gray-800 transition-colors",
                          errors.address ? "border-rose-500 bg-rose-50/10" : "border-neutral-200"
                        )}
                        placeholder="Street Address, Apartment or Suite"
                      />
                      {errors.address && <span className="text-[10px] text-rose-500 font-bold mt-0.5">{errors.address}</span>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">City</label>
                        <input
                          type="text"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className={cn(
                            "w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-500/10 focus:border-amber-500 text-gray-800 transition-colors",
                            errors.city ? "border-rose-500 bg-rose-50/10" : "border-neutral-200"
                          )}
                          placeholder="e.g. Colombo 07"
                        />
                        {errors.city && <span className="text-[10px] text-rose-500 font-bold mt-0.5">{errors.city}</span>}
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Postal Code (5 digits)</label>
                        <input
                          type="text"
                          value={postalCode}
                          onChange={(e) => setPostalCode(e.target.value)}
                          className={cn(
                            "w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-500/10 focus:border-amber-500 text-gray-800 transition-colors",
                            errors.postalCode ? "border-rose-500 bg-rose-50/10" : "border-neutral-200"
                          )}
                          placeholder="e.g. 00700"
                        />
                        {errors.postalCode && <span className="text-[10px] text-rose-500 font-bold mt-0.5">{errors.postalCode}</span>}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Phone Number</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className={cn(
                          "w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-500/10 focus:border-amber-500 text-gray-800 transition-colors",
                          errors.phone ? "border-rose-500 bg-rose-50/10" : "border-neutral-200"
                        )}
                        placeholder="e.g. +94771234567"
                      />
                      {errors.phone && <span className="text-[10px] text-rose-500 font-bold mt-0.5">{errors.phone}</span>}
                    </div>
                  </div>

                  {/* Payment Credit Card details */}
                  <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm space-y-5">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 pb-3 border-b border-gray-150 flex items-center gap-2">
                      <CreditCard className="w-4.5 h-4.5 text-amber-500" /> Secure Card Payments
                    </h3>

                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Name on Credit Card</label>
                      <input
                        type="text"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        className={cn(
                          "w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-500/10 focus:border-amber-500 text-gray-800 transition-colors",
                          errors.cardName ? "border-rose-500 bg-rose-50/10" : "border-neutral-200"
                        )}
                        placeholder="e.g. ISABELLA ROSS"
                      />
                      {errors.cardName && <span className="text-[10px] text-rose-500 font-bold mt-0.5">{errors.cardName}</span>}
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Card Number</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => handleCardNumberInput(e.target.value)}
                          className={cn(
                            "w-full pl-4 pr-10 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-500/10 focus:border-amber-500 text-gray-800 transition-colors font-mono tracking-wider",
                            errors.cardNumber ? "border-rose-500 bg-rose-50/10" : "border-neutral-200"
                          )}
                          placeholder="0000 0000 0000 0000"
                        />
                        <Lock className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                      </div>
                      {errors.cardNumber && <span className="text-[10px] text-rose-500 font-bold mt-0.5">{errors.cardNumber}</span>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Expiry Date (MM/YY)</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => handleExpiryInput(e.target.value)}
                          maxLength={5}
                          className={cn(
                            "w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-500/10 focus:border-amber-500 text-gray-800 transition-colors font-mono",
                            errors.cardExpiry ? "border-rose-500 bg-rose-50/10" : "border-neutral-200"
                          )}
                          placeholder="MM/YY"
                        />
                        {errors.cardExpiry && <span className="text-[10px] text-rose-500 font-bold mt-0.5">{errors.cardExpiry}</span>}
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">CVC / CVV</label>
                        <input
                          type="password"
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, ''))}
                          maxLength={4}
                          className={cn(
                            "w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-500/10 focus:border-amber-500 text-gray-800 transition-colors font-mono",
                            errors.cardCvc ? "border-rose-500 bg-rose-50/10" : "border-neutral-200"
                          )}
                          placeholder="•••"
                        />
                        {errors.cardCvc && <span className="text-[10px] text-rose-500 font-bold mt-0.5">{errors.cardCvc}</span>}
                      </div>
                    </div>
                  </div>

                  {/* Submission triggers */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2.5 py-4 bg-black hover:bg-neutral-800 text-white font-bold rounded-2xl text-xs uppercase tracking-widest transition-all shadow-md shadow-black/5 disabled:bg-neutral-400"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Validating credentials...
                      </span>
                    ) : (
                      <>
                        Authorize payment for {formatCurrency(grandTotal)} <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-2 text-neutral-450 text-[10px] font-bold uppercase tracking-wider">
                    <ShieldCheck className="w-4.5 h-4.5 text-emerald-500" /> Fully Encrypted SSL Security Clearance
                  </div>

                </form>
              </div>

              {/* Right Column: Order Summary & Coupon inputs */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Cart summary list */}
                <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm space-y-5">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 pb-3 border-b border-gray-150 flex items-center justify-between">
                    <span>Order Details Summary</span>
                    <span className="text-[10px] text-neutral-400 font-semibold">{activeItems.length} articles</span>
                  </h3>

                  <div className="space-y-4 max-h-[280px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-neutral-200 scrollbar-track-transparent">
                    {activeItems.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center gap-4 py-2 border-b border-neutral-50 last:border-0">
                        <div className="flex items-center gap-3.5 min-w-0">
                          <div className="w-12 h-16 relative rounded-lg overflow-hidden bg-neutral-100 flex-shrink-0 border border-neutral-100">
                            <Image
                              src={item.product.image_urls?.[0] || 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=200'}
                              alt={item.product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="text-xs min-w-0">
                            <h4 className="font-semibold text-gray-900 truncate">{item.product.name}</h4>
                            <p className="text-[10px] text-neutral-400 mt-1">
                              {item.selectedColor || 'Camel'} / {item.selectedSize || 'M'} • Qty {item.quantity}
                            </p>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-gray-900">{formatCurrency(item.product.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>

                  {/* Dynamic coupon form */}
                  <form onSubmit={applyPromoCode} className="pt-4 border-t border-neutral-100 flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                      <input
                        type="text"
                        placeholder="VOUCHER CODE (GOLDEN30)"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 border border-neutral-200 bg-neutral-50 rounded-xl focus:outline-none focus:border-amber-500 text-[10px] text-gray-800 tracking-wider font-bold"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white font-bold rounded-xl text-[10px] uppercase tracking-wider transition-colors"
                    >
                      Apply
                    </button>
                  </form>

                  {/* Coupon feedback */}
                  {couponError && <span className="text-[10px] text-rose-500 font-bold block mt-1">{couponError}</span>}
                  {activeDiscount && (
                    <span className="text-[10px] text-emerald-500 font-bold block mt-1 flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" /> Coupon Applied: {activeDiscount.code} (-{activeDiscount.percent}%)
                    </span>
                  )}

                  {/* Financial math breakdowns */}
                  <div className="pt-4 border-t border-neutral-100 space-y-2.5 text-xs">
                    <div className="flex justify-between text-gray-500">
                      <span>Cart Subtotal</span>
                      <span className="font-semibold text-gray-800">{formatCurrency(itemsPrice)}</span>
                    </div>

                    {activeDiscount && (
                      <div className="flex justify-between text-emerald-500">
                        <span>Campaign Discount ({activeDiscount.code})</span>
                        <span className="font-semibold">- {formatCurrency(discountAmount)}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-gray-500">
                      <span>Express Delivery</span>
                      <span className="font-semibold text-gray-800">
                        {shippingFee === 0 ? 'Complimentary' : formatCurrency(shippingFee)}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm text-gray-900 pt-3 border-t border-neutral-100 font-bold">
                      <span>Total Payment (LKR)</span>
                      <span className="text-amber-500 text-lg font-serif font-black">{formatCurrency(grandTotal)}</span>
                    </div>
                  </div>
                </div>

              </div>

            </motion.div>
          ) : (
            
            /* GORGEOUS ORDER CONFIRMATION STATE */
            <motion.div
              key="confirmation-card"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-2xl mx-auto bg-white rounded-3xl p-8 sm:p-10 border border-neutral-100 shadow-xl text-center space-y-8"
            >
              {/* Circular gold Checkmark Animation */}
              <div className="flex justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="w-20 h-20 bg-amber-500 rounded-full flex items-center justify-center text-white shadow-xl shadow-amber-500/10"
                >
                  <CheckCircle className="w-10 h-10 stroke-[1.5]" />
                </motion.div>
              </div>

              <div>
                <span className="inline-flex items-center gap-1 bg-amber-500/10 text-amber-500 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-amber-500/10 mb-3">
                  <Sparkles className="w-3.5 h-3.5" /> Order Confirmed
                </span>
                <h1 className="text-3xl font-serif font-black text-gray-900 tracking-tight">Thank you for your purchase</h1>
                <p className="text-xs text-gray-500 mt-2">
                  A verification receipt has been transmitted to <span className="font-semibold text-gray-800">{email || 'isabella@ross.it'}</span>.
                </p>
              </div>

              {/* Receipt Summary Grid */}
              <div className="bg-neutral-50 p-5 rounded-2xl border border-neutral-100 text-left text-xs space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-gray-150">
                  <div>
                    <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block">Invoice ID</span>
                    <span className="font-mono font-bold text-gray-900 mt-0.5 block">{generatedOrderId}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block">Payment Date</span>
                    <span className="font-bold text-gray-900 mt-0.5 block">
                      {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                </div>

                {/* Shipping info recap */}
                <div>
                  <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block mb-1">Delivered Destination</span>
                  <p className="text-gray-700 font-medium leading-relaxed">
                    {firstName} {lastName}
                    <br />
                    {address}, {city}, {postalCode}
                  </p>
                </div>

                {/* Amount Paid breakdown */}
                <div className="pt-3 border-t border-gray-150 flex justify-between items-center text-sm font-bold text-gray-900">
                  <span>Grand Total Paid</span>
                  <span className="text-amber-500 text-base">{formatCurrency(grandTotal)}</span>
                </div>
              </div>

              {/* Tickers & Delivery Timelines */}
              <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-100 flex items-center gap-3.5 text-xs text-left">
                <div className="p-2 bg-amber-500/10 rounded-xl">
                  <Truck className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Estimated hand-delivery timeline</h4>
                  <p className="text-[10px] text-gray-500 mt-0.5">Your package is entering tailoring audit. Estimated: Wednesday, May 20.</p>
                </div>
              </div>

              {/* Option Actions links */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link
                  href="/dashboard"
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-black hover:bg-neutral-800 text-white font-bold rounded-xl text-xs uppercase tracking-widest transition-all shadow-sm"
                >
                  Track in Dashboard <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/products"
                  className="flex-1 py-3.5 bg-white hover:bg-neutral-50 text-gray-700 border border-neutral-200 font-bold rounded-xl text-xs uppercase tracking-widest transition-all"
                >
                  Continue Shopping
                </Link>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
