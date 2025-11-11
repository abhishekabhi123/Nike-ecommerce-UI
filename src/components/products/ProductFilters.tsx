import { useCategories } from "@/hooks";
import { useFilterStore } from "@/store";
import { LoadingSpinner } from "@/components/common";

export const ProductFilters = () => {
  const { data: categories, isLoading } = useCategories();
  const { filters, setFilter, clearFilters } = useFilterStore();

  const handleCategoryChange = (categoryName: string) => {
    setFilter(
      "category",
      categoryName == filters.category ? undefined : categoryName
    );
  };
  const handlePriceChange = (min?: number, max?: number) => {
    setFilter("minPrice", min);
    setFilter("maxPrice", max);
  };

  const handleSortChange = (
    sortBy: "price" | "createdAt" | "name",
    sortOrder: "asc" | "desc"
  ) => {
    setFilter("sortBy", sortBy);
    setFilter("sortOrder", sortOrder);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Filters</h3>
        <button
          onClick={clearFilters}
          className="text-sm text-dark-700 hover:text-dark-900"
        >
          Clear All
        </button>
      </div>
      <div>
        <h4 className="text-base font-medium mb-3">Categories</h4>
        <div className="space-y-2">
          {categories?.map((category) => (
            <label
              key={category.id}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                name=""
                id=""
                checked={filters.category === category.name}
                onChange={() => handleCategoryChange(category.name)}
                className="w-4 h-4 rounded border-dark-400 text-dark-900 focus:ring-dark-900"
              />
            </label>
          ))}
        </div>
      </div>
      <div>
        <h4 className="text-base font-medium mb-3">Price range</h4>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="price"
              checked={!filters.minPrice && !filters.maxPrice}
              onChange={() => handlePriceChange(undefined, undefined)}
              className="w-4 h-4 text-dark-900 focus:ring-dark-900"
            />
            <span className="text-sm">All prices</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="price"
              checked={filters.minPrice == 0 && filters.maxPrice === 50}
              onChange={() => handlePriceChange(0, 50)}
              className="w-4 h-4 text-dark-900 focus:ring-dark-900"
            />
            <span className="text-sm">Under $50</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="price"
              checked={filters.minPrice === 50 && filters.maxPrice === 100}
              onChange={() => handlePriceChange(50, 100)}
              className="w-4 h-4 text-dark-900 focus:ring-dark-900"
            />
            <span className="text-sm">$50 - $100</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="price"
              checked={filters.minPrice === 100 && filters.maxPrice === 150}
              onChange={() => handlePriceChange(100, 150)}
              className="w-4 h-4 text-dark-900 focus:ring-dark-900"
            />
            <span className="text-sm">$100 - $150</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="price"
              checked={filters.minPrice === 150}
              onChange={() => handlePriceChange(150, undefined)}
              className="w-4 h-4 text-dark-900 focus:ring-dark-900"
            />
            <span className="text-sm">Over $150</span>
          </label>
        </div>
      </div>
      <div>
        <h4 className="text-base font-medium mb-3">Sort by</h4>
        <select
          value={`${filters.sortBy} - ${filters.sortOrder}`}
          onChange={(e) => {
            const [orderBy, sortBy] = e.target.value.split("-") as [
              "price" | "createdAt" | "name",
              "asc" | "desc"
            ];
            handleSortChange(orderBy, sortBy);
          }}
          className="w-full px-4 py-2 border border-light-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark-900"
        >
          <option value="createdAt-desc">Newest First</option>
          <option value="createdAt-asc">Oldest First</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name-asc">Name: A to Z</option>
          <option value="name-desc">Name: Z to A</option>
        </select>
      </div>
    </div>
  );
};
