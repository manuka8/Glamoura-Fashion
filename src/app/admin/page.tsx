'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '@/types';
import {
  TrendingUp,
  ShoppingCart,
  Package,
  Users,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  DollarSign,
  Calendar,
  Sparkles,
  ArrowRight,
  Edit2,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { cn, formatCurrency } from '@/lib/utils';

// Premium high-end luxury products to fallback on if Supabase is empty
const MOCK_LUXURY_PRODUCTS: Product[] = [
  {
    id: 'mock-1',
    name: 'Cashmere Trench Coat',
    description: 'An elegant long trench coat tailored from 100% Mongolian cashmere. Features custom horn buttons.',
    price: 185000,
    image_urls: ['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&auto=format&fit=crop&q=80'],
    category_id: 'apparel',
    sizes: ['S', 'M', 'L'],
    colors: ['Camel', 'Midnight Black'],
    stock: 14,
    created_at: new Date().toISOString()
  },
  {
    id: 'mock-2',
    name: 'Silk Slip Dress - Emerald',
    description: 'Cut from fluid Mulberry silk satin, this emerald slip dress features a refined cowl neckline and adjustable straps.',
    price: 95000,
    image_urls: ['https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=600&auto=format&fit=crop&q=80'],
    category_id: 'dresses',
    sizes: ['XS', 'S', 'M'],
    colors: ['Emerald Green', 'Pearl White'],
    stock: 4,
    created_at: new Date().toISOString()
  },
  {
    id: 'mock-3',
    name: 'Gold Plated Wave Cuff',
    description: 'A striking structural cuff sculpted in brass and heavily plated in 24k yellow gold.',
    price: 68000,
    image_urls: ['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&auto=format&fit=crop&q=80'],
    category_id: 'accessories',
    sizes: ['OS'],
    colors: ['Gold'],
    stock: 25,
    created_at: new Date().toISOString()
  },
  {
    id: 'mock-4',
    name: 'Italian Leather Brogues',
    description: 'Hand-burnished Italian calfskin leather oxfords with custom Goodyear-welted soles.',
    price: 135000,
    image_urls: ['https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=600&auto=format&fit=crop&q=80'],
    category_id: 'footwear',
    sizes: ['40', '41', '42', '43'],
    colors: ['Chestnut Brown', 'Nero Black'],
    stock: 7,
    created_at: new Date().toISOString()
  }
];

// Interactive Revenue Data Chart coordinates
const REVENUE_DATA_SETS = {
  week: [
    { label: 'Mon', value: 120000, orders: 12 },
    { label: 'Tue', value: 185000, orders: 18 },
    { label: 'Wed', value: 145000, orders: 15 },
    { label: 'Thu', value: 290000, orders: 24 },
    { label: 'Fri', value: 240000, orders: 20 },
    { label: 'Sat', value: 380000, orders: 35 },
    { label: 'Sun', value: 310000, orders: 29 }
  ],
  month: [
    { label: 'Week 1', value: 850000, orders: 84 },
    { label: 'Week 2', value: 1240000, orders: 110 },
    { label: 'Week 3', value: 980000, orders: 95 },
    { label: 'Week 4', value: 1650000, orders: 142 }
  ],
  year: [
    { label: 'Jan-Feb', value: 2800000, orders: 245 },
    { label: 'Mar-Apr', value: 3400000, orders: 312 },
    { label: 'May-Jun', value: 4200000, orders: 385 },
    { label: 'Jul-Aug', value: 3900000, orders: 340 },
    { label: 'Sep-Oct', value: 5100000, orders: 490 },
    { label: 'Nov-Dec', value: 6800000, orders: 620 }
  ]
};

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [chartTimeframe, setChartTimeframe] = useState<'week' | 'month' | 'year'>('week');
  const [hoveredDataPoint, setHoveredDataPoint] = useState<{ x: number; y: number; label: string; value: number; orders: number } | null>(null);
  const [hoveredDonutIndex, setHoveredDonutIndex] = useState<number | null>(null);

  useEffect(() => {
    setProducts(MOCK_LUXURY_PRODUCTS);
    setLoadingProducts(false);
  }, []);

  // Compute stats metrics dynamically
  const totalProducts = products.length;
  const lowStockCount = products.filter(p => p.stock < 10).length;
  
  // High fidelity summary statistics
  const stats = [
    {
      name: 'Total Revenue',
      value: formatCurrency(1685400),
      change: '+14.2%',
      isPositive: true,
      icon: DollarSign,
      color: 'from-amber-500/20 to-amber-500/5',
      accentColor: 'text-amber-500',
      sparkline: [20, 35, 25, 45, 38, 55, 48, 65, 58, 80],
      desc: 'vs. last month'
    },
    {
      name: 'Sales Orders',
      value: '2,482',
      change: '+8.6%',
      isPositive: true,
      icon: ShoppingCart,
      color: 'from-blue-500/20 to-blue-500/5',
      accentColor: 'text-blue-400',
      sparkline: [30, 25, 40, 35, 50, 42, 60, 52, 70, 68],
      desc: 'vs. last month'
    },
    {
      name: 'Active Catalog',
      value: String(totalProducts),
      change: '12 added',
      isPositive: true,
      icon: Package,
      color: 'from-purple-500/20 to-purple-500/5',
      accentColor: 'text-purple-450',
      sparkline: [40, 42, 45, 45, 48, 50, 52, 53, 55, 58],
      desc: 'This week'
    },
    {
      name: 'Low Stock Alerts',
      value: String(lowStockCount),
      change: lowStockCount > 3 ? '-18.4%' : 'Healthy',
      isPositive: lowStockCount <= 3,
      icon: AlertTriangle,
      color: lowStockCount > 3 ? 'from-rose-500/20 to-rose-500/5' : 'from-emerald-500/20 to-emerald-500/5',
      accentColor: lowStockCount > 3 ? 'text-rose-500' : 'text-emerald-450',
      sparkline: [12, 14, 10, 8, 9, 7, 5, 4, 3, String(lowStockCount)],
      desc: 'Urgent restocking'
    }
  ];

  // Donut chart calculations
  const categoryDistribution = [
    { name: 'Apparel', count: 48, percentage: 38, color: '#f59e0b' }, // Amber
    { name: 'Dresses', count: 32, percentage: 26, color: '#3b82f6' }, // Blue
    { name: 'Accessories', count: 25, percentage: 20, color: '#a855f7' }, // Purple
    { name: 'Footwear', count: 19, percentage: 16, color: '#ec4899' }  // Pink
  ];

  // SVG dimensions & charting path config
  const chartHeight = 220;
  const chartWidth = 600;
  const chartPadding = { top: 20, right: 30, bottom: 40, left: 40 };

  const currentDataset = REVENUE_DATA_SETS[chartTimeframe];
  const maxVal = Math.max(...currentDataset.map(d => d.value)) * 1.15;
  const minVal = Math.min(...currentDataset.map(d => d.value)) * 0.85;
  
  // Calculate SVG coordinates
  const getCoordinates = () => {
    return currentDataset.map((d, index) => {
      const x = chartPadding.left + (index * (chartWidth - chartPadding.left - chartPadding.right) / (currentDataset.length - 1));
      const y = chartHeight - chartPadding.bottom - ((d.value - minVal) * (chartHeight - chartPadding.top - chartPadding.bottom) / (maxVal - minVal));
      return { x, y, label: d.label, value: d.value, orders: d.orders };
    });
  };

  const points = getCoordinates();
  const linePath = points.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${chartHeight - chartPadding.bottom} L ${points[0].x} ${chartHeight - chartPadding.bottom} Z`;

  return (
    <div className="space-y-8">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-900 pb-6">
        <div>
          <span className="flex items-center gap-1.5 text-xs text-amber-500 font-semibold tracking-widest uppercase mb-1">
            <Sparkles className="w-3.5 h-3.5" /> Luxury Brand Overview
          </span>
          <h1 className="text-3xl font-serif font-black text-white tracking-tight">Executive Dashboard</h1>
          <p className="text-sm text-neutral-400 mt-1">Real-time statistics, active inventory levels, and visual sale projections.</p>
        </div>

        {/* Action controls */}
        <div className="flex items-center gap-3">
          <div className="flex bg-neutral-900 border border-neutral-800 p-1 rounded-xl">
            {(['week', 'month', 'year'] as const).map((t) => (
              <button
                key={t}
                onClick={() => {
                  setChartTimeframe(t);
                  setHoveredDataPoint(null);
                }}
                className={cn(
                  "px-4 py-2 rounded-lg text-xs font-semibold capitalize transition-all",
                  chartTimeframe === t
                    ? "bg-amber-500 text-neutral-950 font-bold shadow-sm"
                    : "text-neutral-400 hover:text-white"
                )}
              >
                {t === 'week' ? 'Weekly' : t === 'month' ? 'Monthly' : 'Yearly'}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-4.5 py-2.5 bg-neutral-900 border border-neutral-800 rounded-xl hover:bg-neutral-800 text-xs font-semibold text-neutral-300 hover:text-white transition-all">
            <Filter className="w-4 h-4" /> Filters
          </button>
        </div>
      </div>

      {/* Stats Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-neutral-900/50 backdrop-blur-md p-6 rounded-2xl border border-neutral-800 hover:border-neutral-700/60 transition-all group relative overflow-hidden"
          >
            {/* Ambient Background Glow */}
            <div className={cn("absolute -right-8 -top-8 w-24 h-24 rounded-full filter blur-2xl opacity-10 transition-opacity duration-500 group-hover:opacity-20 bg-gradient-to-br", stat.color)} />
            
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-neutral-900 rounded-xl border border-neutral-850 group-hover:border-neutral-750 transition-colors">
                <stat.icon className={cn("w-6 h-6", stat.accentColor)} />
              </div>
              <div className="flex flex-col items-end">
                <span className={cn(
                  "text-xs font-bold px-2 py-0.5 rounded-md flex items-center gap-0.5",
                  stat.isPositive ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"
                )}>
                  {stat.isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {stat.change}
                </span>
                <span className="text-[9px] text-neutral-500 mt-1 font-medium">{stat.desc}</span>
              </div>
            </div>
            
            <span className="text-[11px] uppercase tracking-widest text-neutral-500 font-bold block">{stat.name}</span>
            <div className="flex items-baseline gap-2 mt-1">
              <p className="text-2xl font-serif font-bold text-white tracking-tight">{stat.value}</p>
            </div>

            {/* Sparkline mini-graph */}
            <div className="mt-4 h-8 w-full opacity-60 group-hover:opacity-100 transition-opacity">
              <svg className="w-full h-full" viewBox="0 0 100 20" preserveAspectRatio="none">
                <defs>
                  <linearGradient id={`sparkGlow-${i}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={stat.accentColor.includes('amber') ? '#f59e0b' : stat.accentColor.includes('blue') ? '#3b82f6' : stat.accentColor.includes('rose') ? '#f43f5e' : '#a855f7'} stopOpacity="0.3"/>
                    <stop offset="100%" stopColor={stat.accentColor.includes('amber') ? '#f59e0b' : stat.accentColor.includes('blue') ? '#3b82f6' : stat.accentColor.includes('rose') ? '#f43f5e' : '#a855f7'} stopOpacity="0"/>
                  </linearGradient>
                </defs>
                <path
                  d={`M ${stat.sparkline.map((val, idx) => `${idx * (100 / (stat.sparkline.length - 1))} ${20 - (Number(val) * 18 / 90)}`).join(' L ')}`}
                  fill="none"
                  stroke={stat.accentColor.includes('amber') ? '#f59e0b' : stat.accentColor.includes('blue') ? '#3b82f6' : stat.accentColor.includes('rose') ? '#f43f5e' : '#a855f7'}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d={`M 0 20 L ${stat.sparkline.map((val, idx) => `${idx * (100 / (stat.sparkline.length - 1))} ${20 - (Number(val) * 18 / 90)}`).join(' L ')} L 100 20 Z`}
                  fill={`url(#sparkGlow-${i})`}
                />
              </svg>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Charts & Visualizations Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Animated Custom Line Chart */}
        <div className="lg:col-span-2 bg-neutral-900/50 backdrop-blur-md p-6 rounded-2xl border border-neutral-800 flex flex-col h-[380px]">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-serif font-bold text-white">Revenue Performance</h3>
              <p className="text-xs text-neutral-400">Projected billing volumes and order numbers over selected time frames.</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-neutral-400">
                <span className="w-2.5 h-2.5 bg-amber-500 rounded-full" /> Revenue (LKR)
              </span>
              <span className="flex items-center gap-1.5 text-neutral-400">
                <span className="w-2.5 h-2.5 bg-blue-400 rounded-full" /> Orders
              </span>
            </div>
          </div>

          {/* Interactive Chart Core */}
          <div className="flex-1 relative mt-2 select-none">
            <svg
              className="w-full h-full overflow-visible"
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              preserveAspectRatio="none"
            >
              {/* Chart Gradients Definitions */}
              <defs>
                <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
                </linearGradient>
                <filter id="shadowGlow" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#f59e0b" floodOpacity="0.15" />
                </filter>
              </defs>

              {/* Grid Lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
                const y = chartPadding.top + ratio * (chartHeight - chartPadding.top - chartPadding.bottom);
                return (
                  <line
                    key={ratio}
                    x1={chartPadding.left}
                    y1={y}
                    x2={chartWidth - chartPadding.right}
                    y2={y}
                    stroke="#262626"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                );
              })}

              {/* Animated Glowing Area under Path */}
              <motion.path
                initial={{ opacity: 0, pathLength: 0 }}
                animate={{ opacity: 1, pathLength: 1 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                d={areaPath}
                fill="url(#chartGlow)"
              />

              {/* Animated Stroke Path Line */}
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                d={linePath}
                fill="none"
                stroke="#f59e0b"
                strokeWidth="3.5"
                strokeLinecap="round"
                filter="url(#shadowGlow)"
              />

              {/* Intersecting vertical guideline */}
              {hoveredDataPoint && (
                <line
                  x1={hoveredDataPoint.x}
                  y1={chartPadding.top}
                  x2={hoveredDataPoint.x}
                  y2={chartHeight - chartPadding.bottom}
                  stroke="#525252"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />
              )}

              {/* Interactive nodes */}
              {points.map((p, idx) => (
                <g key={idx} className="cursor-pointer">
                  {/* Invisible broad hitbox for hovering */}
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r="15"
                    fill="transparent"
                    onMouseEnter={() => setHoveredDataPoint(p)}
                  />
                  {/* Visual Node */}
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={hoveredDataPoint?.label === p.label ? "6" : "4.5"}
                    className="transition-all duration-200"
                    fill={hoveredDataPoint?.label === p.label ? "#f59e0b" : "#171717"}
                    stroke="#f59e0b"
                    strokeWidth={hoveredDataPoint?.label === p.label ? "3" : "2.5"}
                  />
                </g>
              ))}

              {/* X Axis Labels */}
              {points.map((p, idx) => (
                <text
                  key={idx}
                  x={p.x}
                  y={chartHeight - 12}
                  textAnchor="middle"
                  fill="#737373"
                  className="text-[10px] font-semibold tracking-wide font-sans"
                >
                  {p.label}
                </text>
              ))}

              {/* Y Axis Guides */}
              <text
                x={chartPadding.left - 10}
                y={chartPadding.top + 5}
                textAnchor="end"
                fill="#525252"
                className="text-[8px] font-bold"
              >
                MAX
              </text>
              <text
                x={chartPadding.left - 10}
                y={chartHeight - chartPadding.bottom}
                textAnchor="end"
                fill="#525252"
                className="text-[8px] font-bold"
              >
                MIN
              </text>
            </svg>

            {/* Glowing Interactive HTML Tooltip Box inside React */}
            <AnimatePresence>
              {hoveredDataPoint && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute p-4 rounded-xl bg-neutral-900/90 border border-neutral-750 backdrop-blur-md shadow-2xl z-20 flex flex-col gap-1 w-44 pointer-events-none"
                  style={{
                    left: `${Math.min(hoveredDataPoint.x / chartWidth * 100, 70)}%`,
                    top: `${Math.max(hoveredDataPoint.y / chartHeight * 100 - 45, 5)}%`,
                  }}
                >
                  <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest flex items-center justify-between">
                    <span>{hoveredDataPoint.label} Sales</span>
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                  </div>
                  <span className="text-sm font-serif font-bold text-white tracking-wide">
                    {formatCurrency(hoveredDataPoint.value)}
                  </span>
                  <span className="text-[10px] text-blue-400 font-semibold mt-1">
                    🛍 {hoveredDataPoint.orders} Completed Orders
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Category distribution donut chart */}
        <div className="bg-neutral-900/50 backdrop-blur-md p-6 rounded-2xl border border-neutral-800 flex flex-col justify-between h-[380px]">
          <div>
            <h3 className="text-lg font-serif font-bold text-white">Stock Allocation</h3>
            <p className="text-xs text-neutral-400">Total volume shares grouped by product categories.</p>
          </div>

          <div className="flex-1 flex items-center justify-center relative my-4">
            <svg width="180" height="180" className="transform -rotate-90 overflow-visible">
              <circle
                cx="90"
                cy="90"
                r="70"
                stroke="#1f1f1f"
                strokeWidth="15"
                fill="none"
              />
              {/* Draw animated segments for each category */}
              {(() => {
                let cumulativePercent = 0;
                return categoryDistribution.map((cat, idx) => {
                  const strokeLength = (2 * Math.PI * 70) * (cat.percentage / 100);
                  const strokeOffset = (2 * Math.PI * 70) - ((2 * Math.PI * 70) * (cumulativePercent / 100));
                  cumulativePercent += cat.percentage;
                  const isHovered = hoveredDonutIndex === idx;

                  return (
                    <motion.circle
                      key={cat.name}
                      cx="90"
                      cy="90"
                      r="70"
                      stroke={cat.color}
                      strokeWidth={isHovered ? "19" : "15"}
                      fill="none"
                      strokeDasharray={`${strokeLength} ${2 * Math.PI * 70}`}
                      strokeDashoffset={strokeOffset}
                      className="transition-all duration-300 cursor-pointer"
                      strokeLinecap="round"
                      initial={{ strokeDashoffset: 2 * Math.PI * 70 }}
                      animate={{ strokeDashoffset: strokeOffset }}
                      transition={{ duration: 1.2, delay: 0.2 }}
                      onMouseEnter={() => setHoveredDonutIndex(idx)}
                      onMouseLeave={() => setHoveredDonutIndex(null)}
                    />
                  );
                });
              })()}
            </svg>
            
            {/* Total display inside donut ring */}
            <div className="absolute flex flex-col items-center justify-center">
              {hoveredDonutIndex !== null ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  <span className="text-2xl font-black text-white">
                    {categoryDistribution[hoveredDonutIndex].percentage}%
                  </span>
                  <span className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold block mt-0.5">
                    {categoryDistribution[hoveredDonutIndex].name}
                  </span>
                </motion.div>
              ) : (
                <div className="text-center">
                  <span className="text-2xl font-serif font-black text-white">124</span>
                  <span className="text-[9px] text-neutral-500 uppercase tracking-widest font-bold block mt-0.5">Items Total</span>
                </div>
              )}
            </div>
          </div>

          {/* Donut Legend */}
          <div className="grid grid-cols-2 gap-3.5 pt-4 border-t border-neutral-850">
            {categoryDistribution.map((cat, idx) => (
              <div
                key={cat.name}
                className={cn(
                  "flex items-center gap-2 cursor-pointer transition-opacity duration-200",
                  hoveredDonutIndex !== null && hoveredDonutIndex !== idx ? "opacity-40" : "opacity-100"
                )}
                onMouseEnter={() => setHoveredDonutIndex(idx)}
                onMouseLeave={() => setHoveredDonutIndex(null)}
              >
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: cat.color }} />
                <div className="overflow-hidden">
                  <span className="text-xs text-neutral-300 font-semibold block truncate">{cat.name}</span>
                  <span className="text-[10px] text-neutral-500 font-semibold block">{cat.count} products ({cat.percentage}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Catalog & Inventory Alerts - Showcasing Existing Products */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Existing Products List Showcase */}
        <div className="lg:col-span-2 bg-neutral-900/50 backdrop-blur-md p-6 rounded-2xl border border-neutral-800">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-serif font-bold text-white">Existing Products Catalog</h3>
              <p className="text-xs text-neutral-400">Live products retrieved from the storage vault.</p>
            </div>
            <Link
              href="/admin/products"
              className="flex items-center gap-1.5 text-xs text-amber-500 hover:text-amber-400 font-bold transition-colors uppercase tracking-widest"
            >
              Manage Catalog <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-4 max-h-[360px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent">
            {loadingProducts ? (
              [1, 2, 3].map((n) => (
                <div key={n} className="h-16 w-full bg-neutral-900 rounded-xl animate-pulse border border-neutral-850" />
              ))
            ) : products.length > 0 ? (
              products.map((product) => {
                const isLowStock = product.stock < 10;
                return (
                  <div
                    key={product.id}
                    className="flex justify-between items-center p-3.5 bg-neutral-900/60 hover:bg-neutral-800/40 rounded-xl border border-neutral-850 hover:border-neutral-750 transition-all group"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-12 h-12 relative rounded-lg overflow-hidden bg-neutral-800 flex-shrink-0 border border-neutral-850">
                        {product.image_urls?.[0] ? (
                          <Image
                            src={product.image_urls[0]}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full bg-neutral-850 flex items-center justify-center">
                            <Package className="w-5 h-5 text-neutral-600" />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-sm font-semibold text-white truncate">{product.name}</h4>
                        <span className="text-[10px] text-amber-500 font-semibold uppercase tracking-wider block mt-0.5">
                          {product.category_id}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-right hidden sm:block">
                        <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider block">Stock Status</span>
                        <div className="flex items-center gap-1.5 justify-end mt-0.5">
                          <span className={cn(
                            "w-1.5 h-1.5 rounded-full",
                            isLowStock ? "bg-rose-500 animate-pulse" : "bg-emerald-500"
                          )} />
                          <span className={cn(
                            "text-xs font-semibold",
                            isLowStock ? "text-rose-400" : "text-neutral-300"
                          )}>
                            {product.stock} units
                          </span>
                        </div>
                      </div>

                      <div className="text-right min-w-[90px]">
                        <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider block">Price</span>
                        <span className="text-xs font-bold text-white block mt-0.5">
                          {formatCurrency(product.price)}
                        </span>
                      </div>

                      <div className="flex gap-1.5">
                        <Link
                          href={`/admin/products`}
                          className="p-2 bg-neutral-850 hover:bg-neutral-750 text-neutral-400 hover:text-white rounded-lg transition-colors border border-neutral-800"
                          title="Manage product"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-10 text-neutral-500 text-sm">
                No active products detected.
              </div>
            )}
          </div>
        </div>

        {/* Live Admin Audit & Recent Activity Feed */}
        <div className="bg-neutral-900/50 backdrop-blur-md p-6 rounded-2xl border border-neutral-800 flex flex-col h-[460px]">
          <div className="mb-6">
            <h3 className="text-lg font-serif font-bold text-white">Live Activity Logs</h3>
            <p className="text-xs text-neutral-400">Audits and security alerts from user operations.</p>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent text-xs">
            {[
              { time: '10 mins ago', type: 'order', label: 'New Order #ORD-8412', text: 'Sophia Loren bought Cashmere Trench Coat for LKR 185,000.', stat: 'Pending' },
              { time: '40 mins ago', type: 'system', label: 'Security Login Approved', text: 'Alexander Knight logged into Admin Panel from Colombo, LK.', stat: 'Info' },
              { time: '1 hr ago', type: 'stock', label: 'Low Stock Alert triggered', text: 'Silk Slip Dress stock level dropped below 5 units (4 remaining).', stat: 'Warning' },
              { time: '3 hrs ago', type: 'promo', label: 'Coupon Code Created', text: 'Discount coupon code GOLDEN30 (30% OFF) successfully registered.', stat: 'Success' },
              { time: '5 hrs ago', type: 'catalog', label: 'Category details adjusted', text: 'Category Accessories updated with refined navigation slug properties.', stat: 'Info' }
            ].map((act, idx) => (
              <div key={idx} className="p-3 bg-neutral-900 rounded-xl border border-neutral-850 flex flex-col gap-1.5 relative overflow-hidden group">
                {/* Visual badge indicators */}
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-neutral-300 uppercase tracking-widest flex items-center gap-1.5">
                    <span className={cn(
                      "w-1.5 h-1.5 rounded-full",
                      act.stat === 'Warning' ? 'bg-rose-500' : act.stat === 'Success' ? 'bg-emerald-500' : act.stat === 'Pending' ? 'bg-amber-500' : 'bg-blue-400'
                    )} />
                    {act.label}
                  </span>
                  <span className="text-[9px] text-neutral-500 font-bold">{act.time}</span>
                </div>
                <p className="text-neutral-400 leading-relaxed font-sans">{act.text}</p>
                <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-amber-500/0 group-hover:bg-amber-500/50 transition-colors" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
