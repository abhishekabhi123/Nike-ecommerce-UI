import axios, { AxiosError } from "axios";
import { API_BASE_URL } from "@/utils/constants";
import type { ApiError } from "@/types";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError<ApiError>) => {
    const apiError: ApiError = {
      message:
        error.response?.data?.message || error.message || "An error occurred",
      statusCode: error.response?.status,
      errors: error.response?.data?.errors,
    };

    console.error("API Error:", apiError);
    return Promise.reject(apiError);
  }
);
