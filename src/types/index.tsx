// ============================================
// BASE TYPES (matching Prisma models)
// ============================================

export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  createdAt: string;
}

export interface ProductColor {
  name: string;
  hex: string;
  image?: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  images: string[];
  price: number;
  discountPrice?: number;
  categoryId: number;
  category?: Category;
  sizes: string[];
  colors?: ProductColor[];
  stock: number;
  badge?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Cart {
  id: number;
  userId: number;
  items: CartItem[];
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  id: number;
  cartId: number;
  productId: number;
  product: Product;
  quantity: number;
  size?: string;
  color?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: number;
  userId: number;
  items: OrderItem[];
  status: string;
  total: number;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  product: Product;
  quantity: number;
  price: number;
  size?: string;
  color?: string;
}

export interface Address {
  id: number;
  userId: number;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

// ============================================
// API REQUEST/RESPONSE TYPES
// ============================================

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  user: Omit<User, "password">;
  token: string;
}

export interface ProductListResponse {
  products: Product[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface ProductQueryParams {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: "price" | "createdAt" | "name";
  sortOrder?: "asc" | "desc";
}

export interface AddToCartRequest {
  productId: number;
  quantity: number;
  size?: string;
  color?: string;
}

export interface UpdateCartItemRequest {
  quantity: number;
}

export interface CartResponse {
  items: CartItem[];
  total: string;
}

export interface CreateOrderRequest {
  addressId: number;
}

export interface OrderResponse {
  order: Order;
}

export interface CreateAddressRequest {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

// ============================================
// UTILITY TYPES
// ============================================

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "canceled";

export type UserRole = "customer" | "admin";

export interface ApiError {
  message: string;
  statusCode?: number;
  errors?: Record<string, string[]>;
}
