import { apiClient } from "./client";
import type { Product, ProductListResponse, ProductQueryParams } from "@/types";

export const productApi = {
  getProducts: async (
    params?: ProductQueryParams
  ): Promise<ProductListResponse> => {
    return apiClient.get("/products", { params });
  },

  getProductById: async (id: number): Promise<Product> => {
    return apiClient.get(`/products/${id}`);
  },
  getProductBySlug: (slug: string): Promise<Product> => {
    return apiClient.get(`/products/slug/${slug}`);
  },

  getProductsByCategory: async (categoryId: number): Promise<Product[]> => {
    return apiClient.get(`/products/category/${categoryId}`);
  },
};
