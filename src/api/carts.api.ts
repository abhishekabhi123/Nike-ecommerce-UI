import { apiClient } from "./client";
import type {
  CartResponse,
  AddToCartRequest,
  UpdateCartItemRequest,
} from "@/types";
export const cartApi = {
  getCart: async (): Promise<CartResponse> => {
    return apiClient.get("/cart");
  },

  addToCart: async (data: AddToCartRequest): Promise<CartResponse> => {
    return apiClient.post(`/cart/add/${data}`);
  },

  updateCartItem: async (
    itemId: number,
    data: UpdateCartItemRequest
  ): Promise<CartResponse> => {
    return apiClient.patch(`/cart/update/${itemId}`, data);
  },

  removeFromCart: async (itemId: number): Promise<void> => {
    return apiClient.delete(`/cart/delete/${itemId}`);
  },

  clearCart: async (): Promise<void> => {
    return apiClient.delete("/cart/delete");
  },
};
