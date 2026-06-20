'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Boxes,
  Search,
  Filter,
  AlertTriangle,
  ArrowRight,
  TrendingDown,
  TrendingUp,
  RotateCcw,
  CheckCircle,
  PackagePlus,
  RefreshCw
} from 'lucide-react';
import Image from 'next/image';
import { formatCurrency } from '@/lib/utils';

const INITIAL_INVENTORY = [
  { id: 'INV-101', name: 'Cashmere Trench Coat', SKU: 'GLM-CASH-CT-01', stock: 14, minLevel: 10, category: 'Apparel', cost: 72000, price: 185000, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=100' },
  { id: 'INV-102', name: 'Silk Slip Dress - Emerald', SKU: 'GLM-SILK-DR-02', stock: 4, minLevel: 8, category: 'Dresses', cost: 38000, price: 95000, image: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=100' },
  { id: 'INV-103', name: 'Gold Plated Wave Cuff', SKU: 'GLM-GOLD-CF-03', stock: 25, minLevel: 5, category: 'Accessories', cost: 22000, price: 68000, image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=100' },
  { id: 'INV-104', name: 'Italian Leather Brogues', SKU: 'GLM-ITAL-BR-04', stock: 7, minLevel: 10, category: 'Footwear', cost: 54000, price: 135000, image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=100' },
  { id: 'INV-105', name: 'Premium Oversized Blazer', SKU: 'GLM-OVR-BZ-05', stock: 2, minLevel: 6, category: 'Apparel', cost: 42000, price: 110000, image: 'https://images.unsplash.com/photo-1548624149-f7b31668853b?w=100' }
];

export default function AdminInventoryPage() {
  const [inventory, setInventory] = useState(INITIAL_INVENTORY);
  const [searchTerm, setSearchTerm] = useState('');
  const [stockLevelFilter, setStockLevelFilter] = useState('All');
  const [adjustingId, setAdjustingId] = useState<string | null>(null);
  const [adjustAmount, setAdjustAmount] = useState('');

  const handleStockAdjust = (id: string, currentStock: number) => {
    const amount = Number(adjustAmount);
    if (isNaN(amount) || amount === 0) return;

    setInventory(inventory.map(item => {
      if (item.id === id) {
        return { ...item, stock: Math.max(0, currentStock + amount) };
      }
      return item;
    }));

    setAdjustingId(null);
    setAdjustAmount('');
  };

  const getStockStatus = (stock: number, min: number) => {
    if (stock === 0) return { label: 'Out of Stock', style: 'bg-rose-500/10 text-rose-500 border-rose-500/20', isCritical: true };
    if (stock < min) return { label: 'Low Stock', style: 'bg-amber-500/10 text-amber-400 border-amber-500/20', isCritical: true };
    if (stock > min * 3) return { label: 'Excess Stock', style: 'bg-blue-500/10 text-blue-400 border-blue-500/20', isCritical: false };
    return { label: 'Healthy', style: 'bg-emerald-500/10 text-emerald-450 border-emerald-500/20', isCritical: false };
  };

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.SKU.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const status = getStockStatus(item.stock, item.minLevel);
    const matchesFilter = stockLevelFilter === 'All' || 
                          (stockLevelFilter === 'Low' && (item.stock < item.minLevel)) ||
                          (stockLevelFilter === 'Healthy' && (item.stock >= item.minLevel));
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <span className="text-xs text-amber-500 font-bold uppercase tracking-widest block mb-1">Vault Inventory</span>
        <h1 className="text-3xl font-serif font-black text-white tracking-tight">Stock & Logistics</h1>
        <p className="text-sm text-neutral-400 mt-1">Audit warehouse storage spaces, adjust available units, and manage raw goods cost rates.</p>
      </div>

      {/* Warehouse Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Warehouse Capacity', value: '74.2%', desc: 'Occupied volume', icon: Boxes, color: 'text-amber-500' },
          { title: 'Inventory Cost Base', value: formatCurrency(INITIAL_INVENTORY.reduce((a, b) => a + b.cost * b.stock, 0)), desc: 'Total asset valuation', icon: TrendingUp, color: 'text-blue-450' },
          { title: 'Critical Stock Items', value: String(inventory.filter(i => i.stock < i.minLevel).length), desc: 'Items below minimum threshold', icon: AlertTriangle, color: 'text-rose-500' }
        ].map((stat, idx) => (
          <div key={idx} className="bg-neutral-900/50 backdrop-blur-md p-6 rounded-2xl border border-neutral-800 flex justify-between items-center">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold block">{stat.title}</span>
              <h3 className="text-2xl font-serif font-bold text-white tracking-tight mt-1">{stat.value}</h3>
              <p className="text-[10px] text-neutral-400 mt-1.5">{stat.desc}</p>
            </div>
            <div className="p-3 bg-neutral-900 border border-neutral-850 rounded-xl">
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Core Inventory Panel */}
      <div className="bg-neutral-900/50 backdrop-blur-md p-6 rounded-2xl border border-neutral-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h3 className="text-lg font-serif font-bold text-white">Stock Ledger</h3>
            <p className="text-xs text-neutral-400">List of physical apparel assets stored in central units.</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="text"
                placeholder="Search SKU, item name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-neutral-850 bg-neutral-950 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/10 focus:border-amber-500 text-xs text-neutral-200 transition-all"
              />
            </div>
            <select
              value={stockLevelFilter}
              onChange={(e) => setStockLevelFilter(e.target.value)}
              className="bg-neutral-950 border border-neutral-850 p-2 py-2 text-xs rounded-xl text-neutral-400 hover:text-white focus:outline-none focus:border-amber-500 transition-colors"
            >
              <option value="All">All stock levels</option>
              <option value="Low">Low Stock / Out of Stock</option>
              <option value="Healthy">Healthy Stock levels</option>
            </select>
          </div>
        </div>

        {/* Ledger Grid */}
        <div className="overflow-x-auto -mx-6 sm:mx-0">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-neutral-800 text-[10px] uppercase tracking-wider text-neutral-500 font-bold">
                <th className="px-6 py-4">Item Details</th>
                <th className="px-6 py-4">SKU Code</th>
                <th className="px-6 py-4">Stock level</th>
                <th className="px-6 py-4">Min. Threshold</th>
                <th className="px-6 py-4">Unit Cost</th>
                <th className="px-6 py-4">Unit Price</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Quick Restock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-900 font-sans">
              {filteredInventory.map((item) => {
                const isAdjusting = adjustingId === item.id;
                const status = getStockStatus(item.stock, item.minLevel);

                return (
                  <tr key={item.id} className="hover:bg-neutral-800/20 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3.5">
                        <div className="w-11 h-11 relative rounded-lg overflow-hidden bg-neutral-800 border border-neutral-850">
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                        <div>
                          <span className="font-semibold text-white block">{item.name}</span>
                          <span className="text-[9px] text-amber-500 font-bold uppercase tracking-wider mt-0.5 block">{item.category}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono text-neutral-350">{item.SKU}</td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-white block">{item.stock} units</span>
                    </td>
                    <td className="px-6 py-4 text-neutral-450 font-medium">{item.minLevel} units</td>
                    <td className="px-6 py-4 text-neutral-400 font-medium">{formatCurrency(item.cost)}</td>
                    <td className="px-6 py-4 text-white font-bold">{formatCurrency(item.price)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-md text-[9px] font-bold uppercase tracking-wider border ${status.style}`}>
                        {status.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {isAdjusting ? (
                        <div className="flex items-center gap-2 justify-end">
                          <input
                            type="number"
                            placeholder="+/- Qty"
                            value={adjustAmount}
                            onChange={(e) => setAdjustAmount(e.target.value)}
                            className="w-20 p-1.5 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white text-center focus:outline-none focus:border-amber-500"
                          />
                          <button
                            onClick={() => handleStockAdjust(item.id, item.stock)}
                            className="px-3 py-1.5 bg-amber-500 text-neutral-950 font-bold text-[10px] rounded-lg uppercase tracking-wider"
                          >
                            Apply
                          </button>
                          <button
                            onClick={() => setAdjustingId(null)}
                            className="p-1.5 text-neutral-400 hover:text-white"
                          >
                            ×
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setAdjustingId(item.id)}
                          className="px-3 py-1.5 bg-neutral-950 hover:bg-neutral-800 border border-neutral-850 text-[10px] uppercase font-bold tracking-wider text-neutral-400 hover:text-white rounded-lg transition-colors flex items-center gap-1.5 ml-auto"
                        >
                          <PackagePlus className="w-3.5 h-3.5" /> Adjust Stock
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
