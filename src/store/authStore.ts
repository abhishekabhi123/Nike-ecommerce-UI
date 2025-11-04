import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/types";

interface AuthStore {
  user: Omit<User, "password"> | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: Omit<User, "password">, token: string) => void;
  logout: () => void;
  updateUser: (user: Partial<Omit<User, "password">>) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      setAuth: (user, token) => {
        localStorage.setItem("token", token);
        set({
          user,
          token,
          isAuthenticated: true,
        });
      },
      logout: () => {
        localStorage.removeItem("token");
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },
      updateUser: (updates) => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: { ...currentUser, ...updates },
          });
        }
      },
    }),
    {
      name: "nike-auth-storage",
    }
  )
);
