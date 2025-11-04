import { useQuery } from "@tanstack/react-query";
import { productApi } from "@/api";
import type { ProductQueryParams } from "@/types";
import { useFilterStore } from "@/store";

export const productKeys = {
  all: "products" as const,
  lists: () => [...productKeys.all, "list"] as const,
  list: (filters: ProductQueryParams) =>
    [...productKeys.lists(), filters] as const,
  details: () => [...productKeys.all, "details"] as const,
  detail: (id: number) => [...productKeys.details(), id] as const,
  bySlug: (slug: string) => [...productKeys.all, "slug", slug] as const,
  byCategory: (categoryId: number) =>
    [...productKeys.all, "category", categoryId] as const,
};

export function useProducts() {
  const filters = useFilterStore((state) => state.filters);

  return useQuery({
    queryKey: productKeys.list(filters),
    queryFn: () => productApi.getProducts(filters),
    staleTime: 5 * 60 * 1000,
  });
}

export function useProduct(id: number | undefined) {
  return useQuery({
    queryKey: productKeys.detail(id!),
    queryFn: () => productApi.getProductById(id!),
    enabled: !!id,
  });
}

export function useProductBySlug(slug: string | undefined) {
  return useQuery({
    queryKey: productKeys.bySlug(slug!),
    queryFn: () => productApi.getProductBySlug(slug!),
    enabled: !!slug,
  });
}

export function useProductByCategory(categoryId: number | undefined) {
  return useQuery({
    queryKey: productKeys.byCategory(categoryId!),
    queryFn: () => productApi.getProductsByCategory(categoryId!),
    enabled: !!categoryId,
  });
}
