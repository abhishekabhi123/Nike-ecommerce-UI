import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, Product } from "@/types";
import { DELIVERY_COST } from "../utils/constants";

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
}
