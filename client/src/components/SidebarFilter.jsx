// src/components/SidebarFilter.jsx
import React from "react";

const SidebarFilter = ({ filters, setFilters }) => {
  // Xử lý thay đổi giá
  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  // Xử lý sắp xếp
  const handleSortChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      sort: e.target.value,
    }));
  };

  // Reset filter
  const handleReset = () => {
    setFilters({
      sort: "",
      minPrice: 0,
      maxPrice: 50000000,
    });
  };

  return (
    <div className="mb-6 p-4 border rounded-md bg-white shadow-sm">
      {/* Price filter */}
      <div className="mb-4">
        <label className="block font-semibold mb-2">Price:</label>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            name="minPrice"
            value={filters.minPrice}
            onChange={handlePriceChange}
            className="w-28 p-2 border rounded"
            min={0}
          />
          <span>-</span>
          <input
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handlePriceChange}
            className="w-28 p-2 border rounded"
            min={0}
          />
        </div>
      </div>

      {/* Sort */}
      <div className="mb-4">
        <label className="block font-semibold mb-2">Sort by:</label>
        <select
          value={filters.sort}
          onChange={handleSortChange}
          className="p-2 border rounded w-full"
        >
          <option value="">Default</option>
          <option value="price">Price: Low to High</option>
          <option value="-price">Price: High to Low</option>
          <option value="createdAt">Newest</option>
          <option value="-createdAt">Oldest</option>
        </select>
      </div>

      {/* Reset */}
      <button
        onClick={handleReset}
        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded w-full"
      >
        Reset
      </button>
    </div>
  );
};

export default SidebarFilter;
