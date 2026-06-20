'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Product } from '@/types';
import { dummyProducts } from '@/lib/dummy-data';
import { Package, Plus, Search, Filter, Edit, Trash2, SlidersHorizontal, Info } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { cn, formatCurrency } from '@/lib/utils';

// Helper to safely extract image string from imports or plain URLs
function resolveImage(img: any): string {
  if (!img) return 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=100';
  if (typeof img === 'string') return img;
  if (typeof img === 'object' && img.src) return img.src;
  return 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=100';
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const supabase = createClient();

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      // Merge real Supabase products with the pristine dummyProducts catalog
      const combined = [...(data || []), ...dummyProducts];
      
      // Deduplicate by ID just in case
      const unique = combined.filter((v, i, a) => a.findIndex(t => t.id === v.id) === i);
      
      setProducts(unique);
    } catch (e) {
      // Fallback directly to dummy data
      setProducts(dummyProducts);
    }
    setLoading(false);
  }

  const handleDelete = (id: string) => {
    if (!confirm('Are you sure you want to remove this product from the vault catalog?')) return;
    setProducts(products.filter(p => p.id !== id));
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || 
                            p.categories?.includes(selectedCategory.toLowerCase());
    
    return matchesSearch && matchesCategory;
  });

  // Extract unique categories for filter dropdown
  const uniqueCategories = ['All', ...Array.from(new Set(products.flatMap(p => p.categories || [])))
    .map(c => c.charAt(0).toUpperCase() + c.slice(1))];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex justify-between items-start gap-4 flex-wrap border-b border-neutral-900 pb-6">
        <div>
          <span className="text-xs text-amber-500 font-bold uppercase tracking-widest block mb-1">Vault Inventory</span>
          <h1 className="text-3xl font-serif font-black text-white tracking-tight">Product Catalog</h1>
          <p className="text-sm text-neutral-400 mt-1">Manage, update, and upload boutique articles to Glamoura’s active storefront.</p>
        </div>

        <Link
          href="/admin/products/add"
          className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded-xl text-xs uppercase tracking-widest shadow-lg shadow-amber-500/10 transition-all"
        >
          <Plus className="w-4 h-4 stroke-[3]" /> Add Boutique Article
        </Link>
      </div>

      {/* Filters Control Strip */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
          <input
            type="text"
            placeholder="Search article name, details..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-neutral-850 bg-neutral-900/50 backdrop-blur-md rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/10 focus:border-amber-500 text-xs text-white transition-all"
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-500" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-neutral-900 border border-neutral-850 pl-9 pr-8 py-2.5 text-xs rounded-xl text-neutral-450 focus:outline-none focus:border-amber-500 transition-colors"
            >
              {uniqueCategories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Products Ledger Card */}
      <div className="bg-neutral-900/50 backdrop-blur-md rounded-2xl border border-neutral-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-neutral-850 text-[10px] uppercase tracking-wider text-neutral-500 font-bold">
                <th className="px-6 py-4">Boutique Item</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Stock level</th>
                <th className="px-6 py-4">Category Node</th>
                <th className="px-6 py-4">Sizes / Colors</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-900 font-sans">
              {loading ? (
                [1, 2, 3].map(i => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-5" colSpan={6}>
                      <div className="h-11 bg-neutral-850 rounded-lg w-full"></div>
                    </td>
                  </tr>
                ))
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map((product) => {
                  const resolvedImg = resolveImage(product.image_urls?.[0]);
                  const isLowStock = product.stock < 10;

                  return (
                    <tr key={product.id} className="hover:bg-neutral-800/20 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3.5">
                          <div className="w-11 h-14 relative rounded-lg overflow-hidden bg-neutral-950 border border-neutral-850 flex-shrink-0">
                            <Image src={resolvedImg} alt={product.name} fill className="object-cover" />
                          </div>
                          <div>
                            <span className="font-semibold text-white group-hover:text-amber-500 transition-colors block">
                              {product.name}
                            </span>
                            <span className="text-[9px] text-neutral-500 font-mono block mt-1">ID: GLM-{product.id}</span>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="font-bold text-white text-sm">{formatCurrency(product.price)}</span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className={cn("font-bold text-sm", isLowStock ? 'text-rose-500' : 'text-neutral-300')}>
                            {product.stock} units
                          </span>
                          {isLowStock && (
                            <span className="text-[9px] bg-rose-500/10 text-rose-500 px-2 py-0.5 rounded border border-rose-500/20 font-bold uppercase tracking-widest">
                              Critical
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {(product.categories || []).map((cat: string) => (
                            <span key={cat} className="px-2 py-0.5 rounded text-[9px] bg-neutral-950 border border-neutral-850 text-neutral-450 uppercase font-bold tracking-widest">
                              {cat}
                            </span>
                          ))}
                        </div>
                      </td>

                      <td className="px-6 py-4 text-neutral-450">
                        <span className="block truncate max-w-[150px] font-medium">Sizes: {(product.sizes || []).join(', ')}</span>
                        <span className="block truncate max-w-[150px] text-[10px] text-neutral-550 mt-1 font-mono">Colors: {(product.colors || []).join(', ')}</span>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center gap-2 justify-end">
                          <button className="p-2 bg-neutral-950 hover:bg-neutral-800 border border-neutral-850 text-neutral-400 hover:text-white rounded-lg transition-colors">
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="p-2 bg-rose-950/20 hover:bg-rose-950/60 border border-rose-900/30 text-rose-500 hover:text-rose-450 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center text-neutral-500">
                    <div className="flex flex-col items-center gap-2 justify-center">
                      <Info className="w-8 h-8 text-neutral-600" />
                      <span>No matching products found inside the catalog vaults.</span>
                    </div>
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
