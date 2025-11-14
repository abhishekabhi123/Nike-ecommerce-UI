import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cartApi } from "@/api";
import type { AddToCartRequest, UpdateCartItemRequest } from "@/types";
import { useUiStore } from "@/store";

export const cartKeys = {
  all: ["cart"] as const,
  detail: () => [...cartKeys.all, "detail"],
};

export function useCart() {
  return useQuery({
    queryKey: cartKeys.detail(),
    queryFn: () => cartApi.getCart(),
    staleTime: 1 * 60 * 1000,
  });
}

export function useAddToCart() {
  const queryClient = useQueryClient();
  const showToast = useUiStore((state) => state.showToast);

  return useMutation({
    mutationFn: (data: AddToCartRequest) => cartApi.addToCart(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.all });
      showToast("Item added to cart", "success");
    },
    onError: (error) => {
      showToast(error.message || "Error while adding to cart", "error");
    },
  });
}

export function useUpdateCartItem() {
  const queryClient = useQueryClient();
  const showToast = useUiStore((state) => state.showToast);

  return useMutation({
    mutationFn: ({
      itemId,
      data,
    }: {
      itemId: number;
      data: UpdateCartItemRequest;
    }) => cartApi.updateCartItem(itemId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.all });
      showToast("Cart updated", "success");
    },
    onError: (error) => {
      showToast(error.message || "Error while updating cart", "error");
    },
  });
}

export function useRemoveFromCart() {
  const queryClient = useQueryClient();
  const showToast = useUiStore((state) => state.showToast);

  return useMutation({
    mutationFn: (itemId: number) => cartApi.removeFromCart(itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.all });
      showToast("Item removed", "success");
    },
    onError: (error) => {
      showToast(
        error.message || "Error while removing item from cart",
        "error"
      );
    },
  });
}

export function useClearCart() {
  const queryClient = useQueryClient();
  const showToast = useUiStore((state) => state.showToast);

  return useMutation({
    mutationFn: () => cartApi.clearCart(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.all });
      showToast("Cart cleared", "success");
    },
    onError: (error) => {
      showToast(error.message || "Error while clearing cart", "error");
    },
  });
}
