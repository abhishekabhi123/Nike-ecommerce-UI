import { DELIVERY_COST } from "./../utils/constants";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Product } from "@/types";

interface CartStore {
  items: CartItem[];
  addItem: (
    product: Product,
    quantity: number,
    size?: string,
    color?: string
  ) => void;
  removeItem: (itemId: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  clearCart: () => void;
  subtotal: () => number;
  total: () => number;
  itemCount: () => number;
  getItemById: (id: number) => CartItem | undefined;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, quantity, size, color) => {
        const existingItem = get().items.find(
          (i) =>
            i.productId === product.id && i.size === size && i.color === color
        );
        if (existingItem) {
          set((state) => ({
            items: state.items.map((i) =>
              i.id === existingItem.id
                ? { ...i, quantity: i.quantity + quantity }
                : i
            ),
          }));
        } else {
          const newItem: CartItem = {
            id: Date.now(),
            cartId: 0,
            productId: product.id,
            product: product,
            quantity: quantity,
            size: size,
            color: color,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          set((state) => ({
            items: [...state.items, newItem],
          }));
        }
      },
      removeItem: (itemId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId),
        })),
      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          ),
        }));
      },
      clearCart: () => set({ items: [] }),
      subtotal: () =>
        get().items.reduce((sum, item) => {
          const price = item.product.discountPrice || item.product.price;
          return sum + price * item.quantity;
        }, 0),
      total: () => {
        const subtotal = get().subtotal();
        return subtotal + (subtotal > 0 ? DELIVERY_COST : 0);
      },

      itemCount: () =>
        get().items.reduce((count, item) => count + item.quantity, 0),
      getItemById: (id) => get().items.find((item) => item.id === id),
    }),
    {
      name: "nike-cart-storage",
    }
  )
);
