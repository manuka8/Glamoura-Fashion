'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  FolderOpen,
  Package,
  BadgePercent,
  TrendingUp,
  Warehouse,
  UserCheck,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Bell,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Overview', href: '/admin', icon: LayoutDashboard, desc: 'Dashboard & Reports' },
    { name: 'Categories', href: '/admin/categories', icon: FolderOpen, desc: 'Department Structure' },
    { name: 'Products', href: '/admin/products', icon: Package, desc: 'Catalog Management' },
    { name: 'Sales', href: '/admin/sales', icon: TrendingUp, desc: 'Orders & Revenue' },
    { name: 'Promotions', href: '/admin/promotions', icon: BadgePercent, desc: 'Discounts & Codes' },
    { name: 'Inventory Management', href: '/admin/inventory', icon: Warehouse, desc: 'Stock & Logistics' },
    { name: 'Profile Management', href: '/admin/profile', icon: UserCheck, desc: 'Security & Access' },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  const activeItem = navigation.find(item => item.href === pathname) || navigation[0];

  return (
    <div className="flex min-h-screen bg-neutral-950 text-neutral-100 selection:bg-amber-500/30 selection:text-amber-200">
      {/* Desktop Sidebar */}
      <aside className="w-72 bg-neutral-900 border-r border-neutral-800 hidden lg:flex flex-col fixed inset-y-0 z-40">
        {/* Brand Logo */}
        <div className="p-8 border-b border-neutral-800 bg-neutral-900/50 backdrop-blur-md">
          <Link href="/admin" className="group block">
            <span className="text-2xl font-serif font-black tracking-widest text-white group-hover:text-amber-400 transition-colors">
              GLAMOURA
            </span>
            <span className="flex items-center gap-1 text-[9px] uppercase tracking-[0.3em] text-amber-500 font-semibold mt-1">
              <Sparkles className="w-2.5 h-2.5 animate-pulse" /> ADMIN PANEL
            </span>
          </Link>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent">
          <div className="text-[10px] uppercase tracking-wider text-neutral-500 font-bold px-3 mb-3">
            Navigation Menu
          </div>
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center gap-3.5 px-4 py-3.5 rounded-xl transition-all duration-300 relative",
                  isActive
                    ? "text-neutral-950 font-semibold"
                    : "text-neutral-400 hover:text-white hover:bg-neutral-800/50"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="activePill"
                    className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-500 rounded-xl"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                
                {/* Active Indicator Bar */}
                {isActive && (
                  <div className="absolute left-0 top-1/3 bottom-1/3 w-1 bg-neutral-950 rounded-r-full" />
                )}

                <item.icon className={cn(
                  "w-5 h-5 transition-transform duration-300 relative z-10",
                  isActive ? "text-neutral-950 scale-105" : "text-neutral-400 group-hover:text-amber-400 group-hover:scale-105"
                )} />
                
                <div className="relative z-10 flex flex-col">
                  <span className="text-sm tracking-wide">{item.name}</span>
                  <span className={cn(
                    "text-[10px] font-normal transition-colors",
                    isActive ? "text-neutral-950/70" : "text-neutral-500 group-hover:text-neutral-400"
                  )}>
                    {item.desc}
                  </span>
                </div>

                <ChevronRight className={cn(
                  "w-3.5 h-3.5 ml-auto opacity-0 -translate-x-2 transition-all duration-300 relative z-10",
                  isActive ? "text-neutral-950/40 opacity-100 translate-x-0" : "group-hover:opacity-100 group-hover:translate-x-0"
                )} />
              </Link>
            );
          })}
        </nav>

        {/* Profile / Footer Section */}
        <div className="p-6 border-t border-neutral-800 bg-neutral-900/40">
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center font-bold text-neutral-950 shadow-lg shadow-amber-500/10 text-sm">
                AK
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-neutral-900 rounded-full animate-pulse" />
            </div>
            <div className="flex-1 overflow-hidden">
              <h4 className="text-sm font-semibold text-white truncate">Alexander Knight</h4>
              <p className="text-[10px] text-amber-500 font-medium tracking-wider uppercase">Super Admin</p>
            </div>
            <Link
              href="/admin/profile"
              className="p-2 hover:bg-neutral-800 rounded-lg text-neutral-400 hover:text-white transition-colors"
              title="Profile Settings"
            >
              <Settings className="w-4 h-4" />
            </Link>
          </div>

          <div className="flex gap-2">
            <Link
              href="/"
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-neutral-300 hover:text-white transition-colors"
            >
              View Shop
            </Link>
            <button className="p-2 hover:bg-red-500/10 text-neutral-400 hover:text-red-400 rounded-lg transition-colors border border-neutral-800 hover:border-red-500/20">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Header / Top Bar */}
      <div className="flex-1 lg:pl-72 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 lg:static bg-neutral-950/80 backdrop-blur-md lg:bg-transparent border-b border-neutral-900 lg:border-b-0 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 -ml-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-all lg:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              <span className="text-xs uppercase tracking-widest text-neutral-500 font-bold block lg:hidden">
                Glamoura Admin
              </span>
              <h2 className="text-lg lg:text-2xl font-serif font-bold text-white hidden sm:block">
                {activeItem ? activeItem.name : 'Dashboard Overview'}
              </h2>
            </div>
          </div>

          {/* Top Bar Actions */}
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-all relative">
              <Bell className="w-4.5 h-4.5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full animate-ping" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full" />
            </button>
            
            <Link 
              href="/admin/profile"
              className="flex items-center gap-2.5 p-1.5 pr-3 rounded-xl bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 transition-all"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center font-bold text-neutral-950 text-xs shadow-sm">
                AK
              </div>
              <span className="text-xs font-semibold text-neutral-300 hover:text-white transition-colors hidden sm:inline">
                Admin
              </span>
            </Link>
          </div>
        </header>

        {/* Sliding Mobile Sidebar (Drawer) */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
                className="fixed inset-0 bg-black z-50 lg:hidden"
              />

              {/* Drawer Container */}
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed inset-y-0 left-0 w-80 bg-neutral-900 border-r border-neutral-850 p-6 flex flex-col z-50 lg:hidden shadow-2xl"
              >
                <div className="flex justify-between items-center pb-6 border-b border-neutral-800 mb-6">
                  <div>
                    <span className="text-xl font-serif font-black tracking-widest text-white">
                      GLAMOURA
                    </span>
                    <span className="flex items-center gap-1 text-[8px] uppercase tracking-[0.25em] text-amber-500 font-semibold mt-0.5">
                      ADMIN PORTAL
                    </span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-lg bg-neutral-800 text-neutral-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Navigation links inside drawer */}
                <nav className="flex-1 space-y-1.5 overflow-y-auto">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={handleLinkClick}
                        className={cn(
                          "flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-300 relative",
                          isActive
                            ? "bg-amber-500 text-neutral-950 font-semibold"
                            : "text-neutral-450 hover:text-white hover:bg-neutral-800/50"
                        )}
                      >
                        <item.icon className="w-5 h-5" />
                        <div className="flex flex-col">
                          <span className="text-sm tracking-wide">{item.name}</span>
                          <span className={cn(
                            "text-[9px] font-normal",
                            isActive ? "text-neutral-950/70" : "text-neutral-500"
                          )}>
                            {item.desc}
                          </span>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-40" />
                      </Link>
                    );
                  })}
                </nav>

                {/* Profile section at bottom of mobile drawer */}
                <div className="pt-6 border-t border-neutral-850 bg-neutral-900/60 mt-auto">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center font-bold text-neutral-950 text-xs">
                      AK
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">Alexander Knight</h4>
                      <p className="text-[10px] text-amber-500 font-medium tracking-wider uppercase">Super Admin</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href="/"
                      onClick={handleLinkClick}
                      className="text-center py-2.5 rounded-lg bg-neutral-850 hover:bg-neutral-800 text-xs font-semibold text-neutral-300 hover:text-white transition-colors"
                    >
                      Shop Front
                    </Link>
                    <button className="py-2.5 rounded-lg bg-red-950/30 hover:bg-red-950/60 border border-red-900/30 hover:border-red-500/20 text-xs font-semibold text-red-400 hover:text-red-300 transition-colors">
                      Logout
                    </button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 pt-2 sm:pt-4 lg:pt-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
