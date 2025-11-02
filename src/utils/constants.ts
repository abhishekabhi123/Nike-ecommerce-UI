export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const ROUTES = {
  HOME: "/",
  PRODUCTS: "/products",
  PRODUCT_DETAIL: "/products/:id",
  CART: "/cart",
  CHECKOUT: "/checkout",
  PROFILE: "/profile",
  ORDERS: "/orders",
  FAVORITES: "/favorites",
  LOGIN: "/login",
  REGISTER: "/register",
} as const;

export const DELIVERY_COST = 2.0;

export const ORDER_STATUS_LABELS: Record<string, string> = {
  pending: "Pending",
  processing: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
  canceled: "Canceled",
};

export const PRODUCT_BADGES = {
  JUST_IN: "Just In",
  BEST_SELLER: "Best Seller",
  SALE: "Sale",
} as const;
