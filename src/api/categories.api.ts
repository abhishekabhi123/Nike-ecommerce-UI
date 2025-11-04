import { apiClient } from "./client";
import type { Category } from "@/types";

export const categoryApi = {
  getCategory: async (): Promise<Category[]> => {
    return apiClient.get("/categories");
  },

  getCategoryById: async (id: number): Promise<Category> => {
    return apiClient.get(`/categories/${id}`);
  },
  getCategoryBySlug: async (slug: string): Promise<Category> => {
    return apiClient.get(`/categories/slug/${slug}`);
  },
};
