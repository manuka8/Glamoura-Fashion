'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { ArrowLeft, Upload, X, Loader2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function AddProductPage() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category_id: '',
    stock: '',
    sizes: 'S, M, L, XL',
    colors: 'Black, White, Beige',
    is_featured: false
  });

  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [categories, setCategories] = useState<{ id: string, name: string, parent_id: string | null }[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      const { data } = await supabase.from('categories').select('id, name, parent_id').order('name');
      if (data) setCategories(data);
    }
    fetchCategories();
  }, [supabase]);

  const mainCategories = categories.filter(c => !c.parent_id);
  const getSubs = (parentId: string) => categories.filter(c => c.parent_id === parentId);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setImages([...images, ...newFiles]);

      const newPreviews = newFiles.map(file => URL.createObjectURL(file));
      setPreviews([...previews, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);

    const newPreviews = [...previews];
    newPreviews.splice(index, 1);
    setPreviews(newPreviews);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Upload images to Supabase Storage
      const imageUrls = [];
      for (const file of images) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `product-images/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('products')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('products')
          .getPublicUrl(filePath);

        imageUrls.push(publicUrl);
      }

      // 2. Insert product into database
      const { error: insertError } = await supabase.from('products').insert({
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category_id: formData.category_id,
        stock: parseInt(formData.stock),
        sizes: formData.sizes.split(',').map(s => s.trim()),
        colors: formData.colors.split(',').map(c => c.trim()),
        image_urls: imageUrls,
        is_featured: formData.is_featured
      });

      if (insertError) throw insertError;

      router.push('/admin/products');
      router.refresh();
    } catch (error: any) {
      alert(error.message || 'Error adding product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Link href="/admin/products" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Products
      </Link>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h1 className="text-3xl font-serif font-semibold mb-8">Add New Product</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold uppercase tracking-wider text-gray-500">Product Name</label>
              <input
                required
                type="text"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-0 focus:border-black"
                placeholder="e.g. Silk Evening Gown"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold uppercase tracking-wider text-gray-500">Category</label>
              <select
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-0 focus:border-black"
                value={formData.category_id}
                onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
              >
                <option value="">Select Category</option>
                {mainCategories.map(main => (
                  <optgroup key={main.id} label={main.name}>
                    <option value={main.id}>{main.name} (Main)</option>
                    {getSubs(main.id).map(sub => (
                      <option key={sub.id} value={sub.id}>&nbsp;&nbsp;— {sub.name}</option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold uppercase tracking-wider text-gray-500">Description</label>
            <textarea
              required
              rows={4}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-0 focus:border-black"
              placeholder="Tell the story of this product..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold uppercase tracking-wider text-gray-500">Price ()</label>
              <input
                required
                type="number"
                step="0.01"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-0 focus:border-black"
                placeholder="0.00"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold uppercase tracking-wider text-gray-500">Stock Quantity</label>
              <input
                required
                type="number"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-0 focus:border-black"
                placeholder="0"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              />
            </div>
            <div className="flex items-center h-full pt-8">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-5 h-5 border-gray-300 rounded text-black focus:ring-black"
                  checked={formData.is_featured}
                  onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                />
                <span className="text-sm font-medium">Feature on Homepage</span>
              </label>
            </div>
          </div>

          {/* Variants */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold uppercase tracking-wider text-gray-500">Sizes (comma separated)</label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-0 focus:border-black"
                value={formData.sizes}
                onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold uppercase tracking-wider text-gray-500">Colors (comma separated)</label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-0 focus:border-black"
                value={formData.colors}
                onChange={(e) => setFormData({ ...formData, colors: e.target.value })}
              />
            </div>
          </div>

          {/* Images */}
          <div className="space-y-4">
            <label className="text-sm font-semibold uppercase tracking-wider text-gray-500">Product Images</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {previews.map((preview, idx) => (
                <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-gray-100">
                  <Image src={preview} alt="Preview" fill className="object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute top-2 right-2 p-1 bg-black/50 text-white rounded-full hover:bg-black transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
              <label className="aspect-square rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-black hover:bg-gray-50 transition-all text-gray-400 hover:text-black">
                <Upload className="w-6 h-6" />
                <span className="text-xs font-medium">Upload</span>
                <input type="file" className="hidden" multiple accept="image/*" onChange={handleImageChange} />
              </label>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-100 flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-black text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-gray-900 transition-all disabled:bg-gray-400 flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create Product'}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="px-8 border border-gray-200 rounded-xl font-bold uppercase tracking-widest hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
