export type User = {
  id: string;
  email: string;
  role: 'admin' | 'user';
  created_at: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image_urls: any[];
  category_id: string;
  sizes: string[];
  colors: string[];
  stock: number;
  created_at: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  created_at: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
};
