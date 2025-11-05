import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { orderApi } from "@/api";
import type { CreateOrderRequest } from "@/types";
import { useUiStore, useCartStore } from "@/store";

const orderKeys = {
  all: ["orders"] as const,
  lists: () => [...orderKeys.all, "list"] as const,
  detail: (id: number) => [...orderKeys.all, "detail", id] as const,
};

export function useOrders() {
  return useQuery({
    queryKey: orderKeys.lists(),
    queryFn: () => orderApi.getOrders(),
  });
}

export function useOrder(id: number) {
  return useQuery({
    queryKey: orderKeys.detail(id!),
    queryFn: () => orderApi.getOrderById(id!),
    enabled: !!id,
  });
}

export function useCreateOrder() {
  const queryClient = useQueryClient();
  const showToast = useUiStore((state) => state.showToast);
  const clearCart = useCartStore((state) => state.clearCart);
  return useMutation({
    mutationFn: (data: CreateOrderRequest) => orderApi.createOrder(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orderKeys.all });
      showToast("Order placed", "success");
      clearCart();
    },
    onError: (error) => {
      showToast(error.message || "Error while placing order", "error");
    },
  });
}

export function useCancelOrder() {
  const queryClient = useQueryClient();
  const showToast = useUiStore((state) => state.showToast);

  return useMutation({
    mutationFn: (orderId: number) => orderApi.cancelOrder(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orderKeys.all });
      showToast("Order cancelled successfully", "success");
    },
    onError: (error) => {
      showToast(error.message || "Error while cancelling the order", "error");
    },
  });
}
