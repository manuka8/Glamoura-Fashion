import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product } from '@/types';

interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity: number, selectedSize?: string, selectedColor?: string) => void;
  removeItem: (productId: string, selectedSize?: string, selectedColor?: string) => void;
  updateQuantity: (productId: string, quantity: number, selectedSize?: string, selectedColor?: string) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product, quantity, selectedSize, selectedColor) => {
        const currentItems = get().items;
        const existingItemIndex = currentItems.findIndex(
          (item) => 
            item.product.id === product.id && 
            item.selectedSize === selectedSize && 
            item.selectedColor === selectedColor
        );

        if (existingItemIndex !== -1) {
          const newItems = [...currentItems];
          newItems[existingItemIndex].quantity += quantity;
          set({ items: newItems });
        } else {
          set({ items: [...currentItems, { product, quantity, selectedSize, selectedColor }] });
        }
      },

      removeItem: (productId, selectedSize, selectedColor) => {
        set({
          items: get().items.filter(
            (item) => 
              !(item.product.id === productId && 
                item.selectedSize === selectedSize && 
                item.selectedColor === selectedColor)
          ),
        });
      },

      updateQuantity: (productId, quantity, selectedSize, selectedColor) => {
        set({
          items: get().items.map((item) => {
            if (item.product.id === productId && item.selectedSize === selectedSize && item.selectedColor === selectedColor) {
              return { ...item, quantity };
            }
            return item;
          }),
        });
      },

      clearCart: () => set({ items: [] }),

      totalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      totalPrice: () => {
        return get().items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
      }
    }),
    {
      name: 'glamoura-cart-storage',
    }
  )
);
