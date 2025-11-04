import { create } from "zustand";

interface UiStore {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;

  isSearchOpen: boolean;
  searchQuery: string;
  toggleSearch: () => void;
  setSearchQuery: (query: string) => void;

  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;

  toast: {
    message: string;
    type: "success" | "error" | "info" | "warning";
    isVisible: boolean;
  };
  showToast: (
    message: string,
    type: "success" | "error" | "info" | "warning"
  ) => void;
  hideToast: () => void;
}

export const useUiStore = create<UiStore>((set) => ({
  isMobileMenuOpen: false,
  toggleMobileMenu: () =>
    set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),

  isSearchOpen: false,
  searchQuery: "",
  toggleSearch: () => set((state) => ({ isSearchOpen: !state.isSearchOpen })),
  setSearchQuery: (query) => set({ searchQuery: query }),

  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),

  toast: {
    message: "",
    type: "info",
    isVisible: false,
  },
  showToast: (message, type) =>
    set({
      toast: {
        isVisible: true,
        message,
        type,
      },
    }),
  hideToast: () =>
    set((state) => ({
      toast: {
        ...state.toast,
        isVisible: false,
      },
    })),
}));
