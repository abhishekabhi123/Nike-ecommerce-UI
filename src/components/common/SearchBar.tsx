import { Search, X } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUiStore } from "@/store";

export const SearchBar = () => {
  const { isSearchOpen, searchQuery, setSearchQuery, toggleSearch } =
    useUiStore();
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (localQuery.trim()) {
      setSearchQuery(localQuery);
      navigate(`/products?search=${encodeURIComponent(localQuery)}`);
      toggleSearch();
    }
  };
  if (!isSearchOpen) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/50" onClick={toggleSearch}>
      <div
        className="container-custom pt-20"
        onCanPlay={(e) => {
          e.stopPropagation();
        }}
      >
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
            <input
              type="text"
              value={localQuery}
              onChange={(e) => {
                setLocalQuery(e.target.value);
              }}
              placeholder="Search for products..."
              className="w-full pl-12 pr-12 py-4 rounded-full bg-white text-lg focus:outline-none focus:ring-2 focus:ring-dark-900"
              autoFocus
            />
            <button
              type="button"
              onClick={toggleSearch}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-light-300 rounded-full transition-colors"
            >
              {" "}
              <X className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
