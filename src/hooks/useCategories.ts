import { useQuery } from "@tanstack/react-query";
import { categoryApi } from "@/api";

export const categoryKeys = {
  all: ["categories"] as const,
  detail: (id: number) => [...categoryKeys.all, "detail", id] as const,
  bySlug: (slug: string) => [...categoryKeys.all, "slug", slug] as const,
};

export function useCategories() {
  return useQuery({
    queryKey: categoryKeys.all,
    queryFn: () => categoryApi.getCategory(),
    staleTime: 10 * 60 * 1000,
  });
}

export function useCategory(id: number | undefined) {
  return useQuery({
    queryKey: categoryKeys.detail(id!),
    queryFn: () => categoryApi.getCategoryById(id!),
    enabled: !!id,
  });
}

export function useCategoryBySlug(slug: string | undefined) {
  return useQuery({
    queryKey: categoryKeys.bySlug(slug!),
    queryFn: () => categoryApi.getCategoryBySlug(slug!),
    enabled: !!slug,
  });
}
