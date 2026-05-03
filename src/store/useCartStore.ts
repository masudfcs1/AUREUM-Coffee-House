import { create } from 'zustand';

export interface CartItem {
  id: string;
  name: string;
  image: string;
  size: string;
  milk: string;
  sweetness: number;
  flavors: string[];
  addons: string[];
  brewMethod: string;
  price: number;
  quantity: number;
  customName?: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isOpen: false,

  addItem: (item) =>
    set((state) => {
      const existingIndex = state.items.findIndex(
        (i) =>
          i.name === item.name &&
          i.size === item.size &&
          i.milk === item.milk &&
          i.sweetness === item.sweetness &&
          JSON.stringify(i.flavors) === JSON.stringify(item.flavors) &&
          JSON.stringify(i.addons) === JSON.stringify(item.addons)
      );

      if (existingIndex > -1) {
        const newItems = [...state.items];
        newItems[existingIndex].quantity += 1;
        return { items: newItems, isOpen: true };
      }

      return {
        items: [...state.items, { ...item, quantity: 1 }],
        isOpen: true,
      };
    }),

  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),

  updateQuantity: (id, quantity) =>
    set((state) => ({
      items:
        quantity <= 0
          ? state.items.filter((item) => item.id !== id)
          : state.items.map((item) =>
              item.id === id ? { ...item, quantity } : item
            ),
    })),

  clearCart: () => set({ items: [] }),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),

  totalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),

  totalPrice: () =>
    get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
}));
