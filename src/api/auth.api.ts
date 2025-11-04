import { apiClient } from "./client";
import type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  User,
} from "@/types";

export const authApi = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    return apiClient.post("/auth/login", data);
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    return apiClient.post("/auth/register", data);
  },

  getCurrentUser: async (): Promise<Omit<User, "password">> => {
    return apiClient.get("/auth/me");
  },

  logout: async (): Promise<void> => {
    return apiClient.post("/auth/login");
  },
};
