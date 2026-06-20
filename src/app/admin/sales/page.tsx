'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  ShoppingCart,
  DollarSign,
  ArrowUpRight,
  Search,
  Filter,
  CreditCard,
  Truck,
  CheckCircle,
  XCircle,
  ExternalLink,
  ChevronRight,
  ArrowLeftRight
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

const MOCK_ORDERS = [
  { id: 'ORD-8412', customer: 'Sophia Loren', email: 'sophia@example.com', date: 'May 17, 2026', items: 'Cashmere Trench Coat', amount: 185000, status: 'Pending', method: 'Stripe Card' },
  { id: 'ORD-8411', customer: 'Liam Neeson', email: 'liam@neeson.co.uk', date: 'May 16, 2026', items: 'Italian Leather Brogues', amount: 135000, status: 'Shipped', method: 'Bank Transfer' },
  { id: 'ORD-8410', customer: 'Isabella Ross', email: 'isabella@ross.it', date: 'May 15, 2026', items: 'Silk Slip Dress - Emerald (x2)', amount: 190000, status: 'Delivered', method: 'Stripe Card' },
  { id: 'ORD-8409', customer: 'James Dean', email: 'james@dean.com', date: 'May 14, 2026', items: 'Gold Plated Wave Cuff', amount: 68000, status: 'Delivered', method: 'Stripe Card' },
  { id: 'ORD-8408', customer: 'Charlotte Gainsbourg', email: 'charlotte@gains.fr', date: 'May 12, 2026', items: 'Silk Slip Dress - Emerald', amount: 95000, status: 'Refunded', method: 'Stripe Card' },
  { id: 'ORD-8407', customer: 'Alain Delon', email: 'alain@delon.fr', date: 'May 10, 2026', items: 'Cashmere Trench Coat', amount: 185000, status: 'Delivered', method: 'Bank Transfer' }
];

export default function AdminSalesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredOrders = MOCK_ORDERS.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.items.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'Shipped': return 'bg-blue-500/10 text-blue-450 border-blue-500/20';
      case 'Delivered': return 'bg-emerald-500/10 text-emerald-450 border-emerald-500/20';
      case 'Refunded': return 'bg-rose-500/10 text-rose-500 border-rose-500/20';
      default: return 'bg-neutral-800 text-neutral-400 border-neutral-700';
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <span className="text-xs text-amber-500 font-bold uppercase tracking-widest block mb-1">Financial Ledgers</span>
        <h1 className="text-3xl font-serif font-black text-white tracking-tight">Sales & Orders</h1>
        <p className="text-sm text-neutral-400 mt-1">Audit customer purchase transactions, checkout methods, and delivery logistics.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { name: 'Gross Revenue', value: formatCurrency(858000), trend: '+18.2%', icon: DollarSign, color: 'text-amber-500' },
          { name: 'Average Order', value: formatCurrency(143000), trend: '+4.5%', icon: CreditCard, color: 'text-blue-450' },
          { name: 'Net Orders volume', value: '2,482', trend: '+12.6%', icon: ShoppingCart, color: 'text-purple-450' },
          { name: 'Return/Refund rate', value: '1.2%', trend: '-0.8%', icon: ArrowLeftRight, color: 'text-rose-500' }
        ].map((kpi, idx) => (
          <motion.div
            key={kpi.name}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-neutral-900/50 backdrop-blur-md p-6 rounded-2xl border border-neutral-800 relative overflow-hidden group"
          >
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold block">{kpi.name}</span>
                <h3 className="text-2xl font-serif font-bold text-white tracking-tight mt-1">{kpi.value}</h3>
              </div>
              <div className="p-3 bg-neutral-900 border border-neutral-850 rounded-xl">
                <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-xs">
              <span className={kpi.trend.startsWith('+') || kpi.trend.startsWith('-0') ? "text-emerald-450 font-semibold" : "text-rose-500 font-semibold"}>
                {kpi.trend}
              </span>
              <span className="text-neutral-500">vs last week</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Interactive Orders Ledger */}
      <div className="bg-neutral-900/50 backdrop-blur-md p-6 rounded-2xl border border-neutral-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h3 className="text-lg font-serif font-bold text-white">Order Audits</h3>
            <p className="text-xs text-neutral-400">List of verified sales receipts across the boutique store.</p>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="text"
                placeholder="Search orders, customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-neutral-800 bg-neutral-950 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/10 focus:border-amber-500 text-xs text-neutral-200 transition-all"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-neutral-950 border border-neutral-850 p-2 py-2 text-xs rounded-xl text-neutral-400 hover:text-white focus:outline-none focus:border-amber-500 transition-colors"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Refunded">Refunded</option>
            </select>
          </div>
        </div>

        {/* Transaction Table */}
        <div className="overflow-x-auto -mx-6 sm:mx-0">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-neutral-800 text-[10px] uppercase tracking-wider text-neutral-500 font-bold">
                <th className="px-6 py-4">Receipt ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Products Ordered</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Total Price</th>
                <th className="px-6 py-4">Checkout Method</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-900 font-sans">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-neutral-800/20 transition-colors group">
                    <td className="px-6 py-4.5 font-mono font-semibold text-neutral-300 group-hover:text-amber-500 transition-colors">
                      {order.id}
                    </td>
                    <td className="px-6 py-4.5">
                      <div className="flex flex-col">
                        <span className="font-semibold text-white">{order.customer}</span>
                        <span className="text-[10px] text-neutral-500 mt-0.5">{order.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4.5 text-neutral-300 font-medium">
                      {order.items}
                    </td>
                    <td className="px-6 py-4.5 text-neutral-450 font-medium">
                      {order.date}
                    </td>
                    <td className="px-6 py-4.5 text-white font-bold text-sm">
                      {formatCurrency(order.amount)}
                    </td>
                    <td className="px-6 py-4.5 text-neutral-400 font-medium">
                      {order.method}
                    </td>
                    <td className="px-6 py-4.5">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${getStatusStyle(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4.5 text-right">
                      <button className="p-2 bg-neutral-950 hover:bg-neutral-800 text-neutral-400 hover:text-white rounded-lg transition-colors border border-neutral-850">
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-6 py-20 text-center text-neutral-500">
                    No matching sales records located.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
