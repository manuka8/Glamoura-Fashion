'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Tag,
  Plus,
  Ticket,
  Calendar,
  Percent,
  TrendingUp,
  Sparkles,
  Search,
  CheckCircle,
  XCircle,
  Clock,
  Gift
} from 'lucide-react';

const MOCK_PROMO_CODES = [
  { code: 'GOLDEN30', discount: '30% OFF', type: 'Percentage', minSpend: 15000, redeemed: 1420, limit: 2000, expires: 'June 30, 2026', status: 'Active' },
  { code: 'WELCOME20', discount: '20% OFF', type: 'Percentage', minSpend: 5000, redeemed: 3562, limit: 5000, expires: 'Dec 31, 2026', status: 'Active' },
  { code: 'FLASH15', discount: '15% OFF', type: 'Percentage', minSpend: 10000, redeemed: 980, limit: 1000, expires: 'May 20, 2026', status: 'Active' },
  { code: 'FREESHIP', discount: 'Free Delivery', type: 'Shipping', minSpend: 6000, redeemed: 1245, limit: 10000, expires: 'June 15, 2026', status: 'Active' },
  { code: 'COZYWINTER', discount: '40% OFF', type: 'Percentage', minSpend: 25000, redeemed: 1500, limit: 1500, expires: 'Jan 15, 2026', status: 'Expired' }
];

export default function AdminPromotionsPage() {
  const [promos, setPromos] = useState(MOCK_PROMO_CODES);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  // Form State
  const [newCode, setNewCode] = useState('');
  const [newDiscount, setNewDiscount] = useState('');
  const [newType, setNewType] = useState('Percentage');
  const [newMinSpend, setNewMinSpend] = useState('');
  const [newLimit, setNewLimit] = useState('');
  const [newExpiry, setNewExpiry] = useState('');

  const handleAddPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode || !newDiscount) return;

    const newPromoItem = {
      code: newCode.toUpperCase().replace(/\s+/g, ''),
      discount: newDiscount,
      type: newType,
      minSpend: Number(newMinSpend) || 0,
      redeemed: 0,
      limit: Number(newLimit) || 1000,
      expires: newExpiry || 'Open ended',
      status: 'Active'
    };

    setPromos([newPromoItem, ...promos]);
    setShowAddForm(false);
    
    // Reset Form
    setNewCode('');
    setNewDiscount('');
    setNewType('Percentage');
    setNewMinSpend('');
    setNewLimit('');
    setNewExpiry('');
  };

  const filteredPromos = promos.filter(p =>
    p.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.discount.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex justify-between items-start gap-4 flex-wrap border-b border-neutral-900 pb-6">
        <div>
          <span className="text-xs text-amber-500 font-bold uppercase tracking-widest block mb-1">Marketing Suite</span>
          <h1 className="text-3xl font-serif font-black text-white tracking-tight">Discounts & Promotions</h1>
          <p className="text-sm text-neutral-400 mt-1">Configure active customer rewards, flash code coupons, and seasonal sales campaign details.</p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded-xl text-xs uppercase tracking-widest shadow-lg shadow-amber-500/10 transition-all"
        >
          <Plus className="w-4 h-4 stroke-[3]" /> Register Coupon
        </button>
      </div>

      {/* Register coupon sliding form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <form onSubmit={handleAddPromo} className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="md:col-span-3 pb-3 border-b border-neutral-800">
                <span className="flex items-center gap-1.5 text-xs text-amber-500 font-bold uppercase tracking-wider">
                  <Gift className="w-4 h-4" /> Create Promo Voucher
                </span>
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold">Voucher Code</label>
                <input
                  type="text"
                  placeholder="e.g. LUXURY40"
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                  className="bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold">Benefit details</label>
                <input
                  type="text"
                  placeholder="e.g. 40% OFF or Free Shipping"
                  value={newDiscount}
                  onChange={(e) => setNewDiscount(e.target.value)}
                  className="bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold">Reward type</label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value)}
                  className="bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-xs text-neutral-400 focus:outline-none focus:border-amber-500 transition-colors"
                >
                  <option value="Percentage">Percentage Discount</option>
                  <option value="Fixed">Fixed Amount Off</option>
                  <option value="Shipping">Free Delivery Voucher</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold">Minimum Spend (LKR)</label>
                <input
                  type="number"
                  placeholder="e.g. 10000"
                  value={newMinSpend}
                  onChange={(e) => setNewMinSpend(e.target.value)}
                  className="bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold">Claim Limit</label>
                <input
                  type="number"
                  placeholder="e.g. 5000"
                  value={newLimit}
                  onChange={(e) => setNewLimit(e.target.value)}
                  className="bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold">Expiration Date</label>
                <input
                  type="text"
                  placeholder="e.g. June 30, 2026"
                  value={newExpiry}
                  onChange={(e) => setNewExpiry(e.target.value)}
                  className="bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>

              <div className="md:col-span-3 flex justify-end gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 text-xs font-semibold text-neutral-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-neutral-800 hover:bg-neutral-700 text-xs font-bold text-white border border-neutral-700 rounded-xl transition-all"
                >
                  Register Coupon
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredPromos.map((promo, idx) => {
          const isExpired = promo.status === 'Expired';
          const usagePercent = Math.min((promo.redeemed / promo.limit) * 100, 100);

          return (
            <motion.div
              key={promo.code}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-neutral-900/50 backdrop-blur-md rounded-2xl p-6 border border-neutral-800 flex flex-col justify-between relative overflow-hidden group hover:border-neutral-750 transition-all"
            >
              {/* Premium Glow indicator */}
              <div className="absolute top-0 right-0 w-24 h-1 bg-gradient-to-l from-amber-500 to-transparent opacity-40 group-hover:opacity-100 transition-opacity" />

              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-mono text-xl font-black text-white group-hover:text-amber-500 transition-colors tracking-wider block">
                      {promo.code}
                    </span>
                    <span className="text-[10px] text-neutral-500 font-semibold uppercase tracking-wider block mt-1">
                      {promo.type} Coupon
                    </span>
                  </div>

                  <span className={`px-2.5 py-0.5 rounded text-[9px] uppercase font-bold tracking-widest ${
                    isExpired ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20' : 'bg-emerald-500/10 text-emerald-450 border border-emerald-500/20'
                  }`}>
                    {promo.status}
                  </span>
                </div>

                <div className="my-6">
                  <span className="text-2xl font-serif font-black text-amber-500 block">{promo.discount}</span>
                  <span className="text-[10px] text-neutral-400 mt-1 font-medium block">Min Spend: LKR {promo.minSpend.toLocaleString()}</span>
                </div>
              </div>

              {/* Usage Rate Slider */}
              <div className="space-y-2.5 pt-4 border-t border-neutral-850">
                <div className="flex justify-between text-[10px] text-neutral-400 font-bold uppercase tracking-wider">
                  <span>Redemption usage</span>
                  <span className="font-semibold text-white">{promo.redeemed.toLocaleString()} / {promo.limit.toLocaleString()}</span>
                </div>

                <div className="h-1.5 bg-neutral-950 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${usagePercent}%` }}
                    className={`h-full rounded-full bg-gradient-to-r ${isExpired ? 'from-neutral-750 to-neutral-700' : 'from-amber-500 to-amber-300'}`}
                    transition={{ duration: 1, ease: 'easeOut' }}
                  />
                </div>

                <div className="flex justify-between items-center text-[10px] text-neutral-500 pt-1">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> Expires {promo.expires}
                  </span>
                  <span>{Math.round(usagePercent)}% used</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
