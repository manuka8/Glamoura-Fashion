'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { categories as dummyCategories } from '@/lib/dummy-data';
import { Plus, Folder, Subtitles, Trash2, Edit2, Loader2, ChevronRight, Image as ImageIcon, Sliders } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

// Helper to safely extract image string from imports or plain URLs
function resolveImage(img: any): string {
  if (!img) return 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100';
  if (typeof img === 'string') return img;
  if (typeof img === 'object' && img.src) return img.src;
  return 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100';
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    parent_id: ''
  });
  useEffect(() => {
    setCategories(dummyCategories);
    setLoading(false);
  }, []);

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const slug = formData.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    const newCat = {
      name: formData.name,
      image: formData.image || null,
      count: '0 Items',
      link: `/products?category=${slug}`,
      gradient: 'from-amber-500/15 to-neutral-900'
    };
    setCategories([newCat, ...categories]);
    setFormData({ name: '', description: '', image: '', parent_id: '' });
    setSubmitting(false);
  };

  const deleteCategory = (name: string) => {
    if (!confirm(`Are you sure you want to remove ${name} from the categories list?`)) return;
    setCategories(categories.filter(c => c.name !== name));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <span className="text-xs text-amber-500 font-bold uppercase tracking-widest block mb-1">Architecture Suite</span>
        <h1 className="text-3xl font-serif font-black text-white tracking-tight">Category Hierarchies</h1>
        <p className="text-sm text-neutral-400 mt-1">Structure boutique articles, arrange collection lines, and manage navigation nodes.</p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Add Category Form */}
        <div className="lg:col-span-1">
          <div className="bg-neutral-900/50 backdrop-blur-md p-6 rounded-2xl border border-neutral-800 sticky top-8">
            <h3 className="text-base font-serif font-bold text-white flex items-center gap-2 pb-3.5 border-b border-neutral-850 mb-5">
              <Plus className="w-5 h-5 text-amber-500" /> Register Category
            </h3>
            
            <form onSubmit={handleAddCategory} className="space-y-5 text-xs">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold">Category Name</label>
                <input 
                  required
                  type="text" 
                  className="bg-neutral-950 border border-neutral-850 rounded-xl p-3 text-white focus:outline-none focus:border-amber-500 transition-colors"
                  placeholder="e.g. Resort Wear"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold">Banner Image URL</label>
                <input 
                  type="text" 
                  className="bg-neutral-950 border border-neutral-850 rounded-xl p-3 text-white focus:outline-none focus:border-amber-500 transition-colors font-mono"
                  placeholder="https://images.unsplash.com/... or blank"
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold">Description Details</label>
                <textarea 
                  className="bg-neutral-950 border border-neutral-850 rounded-xl p-3 text-white focus:outline-none focus:border-amber-500 transition-colors"
                  rows={4}
                  placeholder="Brief description outlining items included..."
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>

              <button 
                type="submit" 
                disabled={submitting}
                className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold uppercase tracking-widest rounded-xl transition-all disabled:bg-neutral-650 flex items-center justify-center gap-2"
              >
                {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Register Category'}
              </button>
            </form>
          </div>
        </div>

        {/* Category List Grid */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center bg-neutral-900/30 p-4 border border-neutral-800/80 rounded-2xl">
            <span className="text-xs text-neutral-400 font-medium">Hierarchy Tree</span>
            <span className="text-[10px] bg-neutral-950 text-amber-500 px-3 py-1 rounded-lg border border-neutral-850 font-bold uppercase tracking-wider">
              {categories.length} Nodes Configured
            </span>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {categories.map((cat, idx) => {
                const resolvedImg = resolveImage(cat.image);
                const hasGradient = cat.gradient;

                return (
                  <div
                    key={`${cat.name}-${idx}`}
                    className="bg-neutral-900/50 backdrop-blur-md rounded-2xl border border-neutral-800 overflow-hidden relative group flex flex-col justify-between hover:border-neutral-750 transition-all h-[180px]"
                  >
                    {/* Brand glow overlay background */}
                    <div className={cn("absolute inset-0 bg-gradient-to-tr opacity-20 pointer-events-none transition-opacity group-hover:opacity-30", hasGradient || 'from-amber-500/10 to-transparent')} />

                    {/* Image banner backdrop */}
                    <div className="absolute right-0 bottom-0 w-24 h-24 opacity-25 group-hover:opacity-45 transition-all overflow-hidden rounded-tl-full border-t border-l border-neutral-800">
                      <Image src={resolvedImg} alt={cat.name} fill className="object-cover" />
                    </div>

                    <div className="p-5 relative z-10 space-y-1">
                      <span className="text-[10px] text-amber-500 font-bold uppercase tracking-wider block">
                        Category Link
                      </span>
                      <h4 className="text-lg font-serif font-bold text-white tracking-tight mt-1">{cat.name}</h4>
                      <p className="text-[10px] text-neutral-550 font-mono tracking-wider block mt-1">{cat.link}</p>
                    </div>

                    <div className="p-5 pt-0 relative z-10 flex justify-between items-center border-t border-neutral-850/60 mt-auto bg-neutral-900/20 backdrop-blur-sm">
                      <span className="text-[10px] font-bold text-white uppercase tracking-widest bg-neutral-950 px-2 py-0.5 rounded border border-neutral-850">
                        {cat.count || '0 Items'}
                      </span>
                      
                      <div className="flex gap-1.5">
                        <button className="p-1.5 bg-neutral-950 hover:bg-neutral-800 border border-neutral-850 text-neutral-450 hover:text-white rounded transition-colors">
                          <Edit2 className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => deleteCategory(cat.name)}
                          className="p-1.5 bg-rose-950/20 hover:bg-rose-950/60 border border-rose-900/30 text-rose-500 hover:text-rose-400 rounded transition-colors"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
