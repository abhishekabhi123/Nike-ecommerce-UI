import { useFilterStore } from "@/store";
import type React from "react";

export const SortDropdown = () => {
  const { filters, setFilter } = useFilterStore();
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [sortBy, sortOrder] = e.target.value.split("-") as [
      "price" | "createdAt" | "name",
      "asc" | "desc"
    ];
    setFilter("sortBy", sortBy);
    setFilter("sortOrder", sortOrder);
  };
  return (
    <div className="flex items-center gap-3">
      <label className="text-sm font-medium text-dark-900">Sort By:</label>
      <select
        value={`${filters.sortBy}-${filters.sortOrder}`}
        onChange={handleSortChange}
        className="px-4 py-2 border border-light-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark-900 bg-white"
      >
        <option value="createdAt-desc">Newest First</option>
        <option value="createdAt-asc">Oldest First</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="name-asc">Name: A to Z</option>
        <option value="name-desc">Name: Z to A</option>
      </select>
    </div>
  );
};
