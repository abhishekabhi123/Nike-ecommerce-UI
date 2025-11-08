import { Link } from "react-router-dom";
import { Search, ShoppingCart, User, Menu } from "lucide-react";
import { useCartStore, useAuthStore, useUiStore } from "@/store";

export const Header = () => {
  const itemCount = useCartStore((state) => state.itemCount());
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const toggleSearch = useUiStore((state) => state.toggleSearch);

  return (
    <div className="bg-white border-b border-light-400 sticky top-0 z-40">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <svg className="h-6 w-auto" viewBox="0 0 69 32" fill="currentColor">
              <path d="M68.56 4L18.4 25.36Q12.16 28 7.92 28q-4.8 0-6.96-3.36-1.36-2.16-.8-5.48t2.96-7.08q2-3.04 6.56-8-1.6 2.56-2.24 5.28-1.04 4.4 1.36 7.12 2.72 3.04 8.88 1.12l40.64-16.96Q63.2 0 68.56 4z" />
            </svg>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/men"
              className="text-base font-medium hover:text-dark-700 transition-colors"
            >
              Men
            </Link>
            <Link
              to="/women"
              className="text-base font-medium hover:text-dark-700 transition-colors"
            >
              Women
            </Link>
            <Link
              to="/kids"
              className="text-base font-medium hover:text-dark-700 transition-colors"
            >
              Kids
            </Link>
            <Link
              to="/collections"
              className="text-base font-medium hover:text-dark-700 transition-colors"
            >
              Collections
            </Link>
            <Link
              to="/contact"
              className="text-base font-medium hover:text-dark-700 transition-colors"
            >
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-x-4">
            <button
              onClick={toggleSearch}
              className="p-2 hover:bg-light-300 rounded-full transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <Link
              to={isAuthenticated ? "/profile" : "/login"}
              className="p-2 hover:bg-light-300 rounded-full transition-colors"
              aria-label="Account"
            >
              <User className="w-5 h-5" />
            </Link>
            <Link
              to="/cart"
              className="relative p-2 hover:bg-light-300 rounded-full transition-colors"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-dark-900 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {itemCount}
                </span>
              )}
            </Link>
            <button
              className="md:hidden p-2 hover:bg-light-300 rounded-full transition-colors"
              aria-label="Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
