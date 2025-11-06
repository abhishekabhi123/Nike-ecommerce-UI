import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authApi } from "@/api";
import type { LoginRequest, RegisterRequest } from "@/types";
import { useAuthStore, useUiStore } from "@/store";
import { useNavigate } from "react-router-dom";

export const authKeys = {
  user: ["user"] as const,
};

export function useGetUser() {
  return useQuery({
    queryKey: authKeys.user,
    queryFn: () => authApi.getCurrentUser(),
    enabled: !!useAuthStore.getState().token,
  });
}

export function useLogin() {
  const setAuth = useAuthStore((state) => state.setAuth);
  const showToast = useUiStore((state) => state.showToast);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: (response) => {
      setAuth(response.user, response.token);
      showToast("Login Success", "success");
      navigate("/");
    },
    onError(error) {
      showToast(error.message || "Login error", "error");
    },
  });
}

export function useRegister() {
  const setAuth = useAuthStore((state) => state.setAuth);
  const showToast = useUiStore((state) => state.showToast);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: RegisterRequest) => authApi.register(data),
    onSuccess: (response) => {
      setAuth(response.user, response.token);
      showToast("Registration Success", "success");
      navigate("/");
    },
    onError(error) {
      showToast(error.message || "Registration error", "error");
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const logout = useAuthStore((state) => state.logout);
  const showToast = useUiStore((state) => state.showToast);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      logout();
      queryClient.clear();
      showToast("Logged out successfully", "info");
      navigate("/");
    },
    onError: () => {
      logout();
      queryClient.clear();
      navigate("/");
    },
  });
}
