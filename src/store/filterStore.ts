import { create } from "zustand";
import type { ProductQueryParams } from "@/types";

interface FilterStore {
  filters: ProductQueryParams;
  setFilter: <K extends keyof ProductQueryParams>(
    key: K,
    value: ProductQueryParams[K]
  ) => void;
  setFilters: (filters: Partial<ProductQueryParams>) => void;
  clearFilters: () => void;
  resetPagination: () => void;
}

const defaultFilters: ProductQueryParams = {
  page: 1,
  limit: 12,
  sortBy: "createdAt",
  sortOrder: "desc",
};

export const useFilterStore = create<FilterStore>((set) => ({
  filters: defaultFilters,
  setFilter: (key, value) =>
    set((state) => ({
      filters: {
        ...state.filters,
        [key]: value,
        ...(key !== "page" && key !== "limit" ? { page: 1 } : {}),
      },
    })),

  setFilters: (newFilters) =>
    set((state) => ({
      filters: {
        ...state.filters,
        ...newFilters,
      },
    })),

  clearFilters: () => set({ filters: defaultFilters }),

  resetPagination: () =>
    set((state) => ({
      filters: {
        ...state.filters,
        page: 1,
      },
    })),
}));
