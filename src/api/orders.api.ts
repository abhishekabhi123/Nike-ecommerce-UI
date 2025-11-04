import { apiClient } from "./client";
import type { Order, OrderResponse, CreateOrderRequest } from "@/types";

export const orderApi = {
  getOrders: async (): Promise<Order[]> => {
    return apiClient.get(`/orders`);
  },

  getOrderById: async (orderId: number): Promise<OrderResponse> => {
    return apiClient.get(`/orders/${orderId}`);
  },

  createOrder: async (data: CreateOrderRequest): Promise<OrderResponse> => {
    return apiClient.post("/orders", data);
  },

  cancelOrder: async (id: number): Promise<Order> => {
    return apiClient.patch(`/orders/${id}/cancel`);
  },
};
