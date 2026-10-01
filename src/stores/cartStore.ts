import { create } from 'zustand';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  variant?: string;
}

interface CartState {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  getTotalCount: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addToCart: (newItem) => {
    const { items } = get();
    const existingIndex = items.findIndex((i) => i.id === newItem.id);

    if (existingIndex > -1) {
      const updated = [...items];
      updated[existingIndex].quantity += newItem.quantity || 1;
      set({ items: updated });
    } else {
      set({ items: [...items, { ...newItem, quantity: newItem.quantity || 1 }] });
    }
  },
  removeFromCart: (id) => {
    set({ items: get().items.filter((i) => i.id !== id) });
  },
  clearCart: () => set({ items: [] }),
  getTotalCount: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },
}));

export default useCartStore;