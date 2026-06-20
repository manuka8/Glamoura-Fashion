import { notFound } from 'next/navigation';
import { dummyProducts } from '@/lib/dummy-data';
import ProductDetailClient from '@/components/products/ProductDetailClient';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = dummyProducts.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
