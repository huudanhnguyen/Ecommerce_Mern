import React, { useEffect, useState } from "react";
import { getAllProducts } from "../apis/product";
// Không cần import formatPrice nữa
// import { formatPrice } from "../utils/helpers";

const ProductFilter = ({ onFilter, currentFilters }) => {
  const [filters, setFilters] = useState({
    color: [],
    size: [],
    priceRange: [100000, 50000000], // Giá trị mặc định
    sort: "",
  });

  const [variants, setVariants] = useState({
    color: [],
    size: [],
  });

  // Lấy variants từ API
  useEffect(() => {
    const fetchVariants = async () => {
      try {
        const res = await getAllProducts({ limit: 100 });
        if (res.data.success) {
          const products = res.data.products;

          const colors = new Map();
          const sizes = new Map();

          products.forEach((p) => {
            p.variants?.forEach((v) => {
              if (v.label === "Color") {
                v.variants.forEach((c) =>
                  colors.set(c, (colors.get(c) || 0) + 1)
                );
              }
              if (v.label === "Size") {
                v.variants.forEach((s) =>
                  sizes.set(s, (sizes.get(s) || 0) + 1)
                );
              }
            });
          });

          setVariants({
            color: Array.from(colors.entries()),
            size: Array.from(sizes.entries()),
          });
        }
      } catch (err) {
        console.error("Error fetching variants:", err);
      }
    };

    fetchVariants();
  }, []); // Chỉ chạy một lần khi component mount

  // Đồng bộ trạng thái filters nội bộ với currentFilters từ component cha
  useEffect(() => {
    const defaultMinPrice = 100000;
    const defaultMaxPrice = 50000000;

    // Chuyển đổi định dạng từ query string sang mảng cho checkbox
    const newColor = currentFilters.color ? currentFilters.color.split(',') : [];
    const newSize = currentFilters.size ? currentFilters.size.split(',') : [];
    const newPriceMin = currentFilters['price[gte]'] ? Number(currentFilters['price[gte]']) : defaultMinPrice;
    const newPriceMax = currentFilters['price[lte]'] ? Number(currentFilters['price[lte]']) : defaultMaxPrice;
    const newSort = currentFilters.sort || '';

    setFilters({
      color: newColor,
      size: newSize,
      priceRange: [newPriceMin, newPriceMax],
      sort: newSort,
    });
  }, [currentFilters]); // Re-run khi currentFilters từ cha thay đổi

  // Toggle checkbox
  const handleCheckbox = (type, value) => {
    setFilters((prev) => {
      const newValues = prev[type].includes(value)
        ? prev[type].filter((v) => v !== value)
        : [...prev[type], value];
      return { ...prev, [type]: newValues };
    });
  };

  // Apply filter
  const applyFilter = () => {
    const query = {};

    if (filters.color.length > 0) query.color = filters.color.join(",");
    if (filters.size.length > 0) query.size = filters.size.join(",");

    const defaultMinPrice = 100000;
    const defaultMaxPrice = 50000000;

    // Chỉ thêm priceRange vào query nếu chúng khác với giá trị mặc định
    // để tránh gửi các giá trị mặc định nếu người dùng không thay đổi
    if (filters.priceRange[0] !== defaultMinPrice) {
      query["price[gte]"] = filters.priceRange[0];
    }
    if (filters.priceRange[1] !== defaultMaxPrice) {
      query["price[lte]"] = filters.priceRange[1];
    }
    // Nếu cả min và max đều là mặc định, không thêm vào query
    if (filters.priceRange[0] === defaultMinPrice && filters.priceRange[1] === defaultMaxPrice) {
        delete query["price[gte]"];
        delete query["price[lte]"];
    }


    if (filters.sort) query.sort = filters.sort;

    onFilter(query);
  };

  // Reset filter
  const resetFilter = () => {
    // Đặt lại filters về giá trị mặc định của ProductFilter
    setFilters({ color: [], size: [], priceRange: [100000, 50000000], sort: "" });
    // Gửi đối tượng rỗng lên component cha để xóa tất cả các bộ lọc
    onFilter({});
  };

  // Dropdown Component (Component con nằm trong ProductFilter)
  const FilterDropdown = ({ label, options, type }) => (
    <div className="relative group">
      <button className="px-4 py-2 border rounded bg-gray-50 hover:bg-gray-100">
        {label}
      </button>
      <div className="absolute hidden group-hover:block bg-white shadow-lg rounded p-3 z-50 w-56">
        {options.map(([opt, count]) => (
          <div key={opt} className="flex items-center mb-1">
            <input
              type="checkbox"
              checked={filters[type].includes(opt)}
              onChange={() => handleCheckbox(type, opt)}
              className="mr-2"
            />
            <label>
              {opt} ({count})
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex flex-wrap items-center gap-4 p-4 border-b bg-white shadow-sm">
      {/* Filter Groups */}
      <FilterDropdown label="Color" options={variants.color} type="color" />
      <FilterDropdown label="Size" options={variants.size} type="size" />

      {/* Price */}
      <div className="relative group">
        <button className="px-4 py-2 border rounded bg-gray-50 hover:bg-gray-100">
          Price
        </button>
        <div className="absolute hidden group-hover:block bg-white shadow-lg rounded p-3 z-50 w-56">
          <input
            type="number"
            placeholder="Min"
            className="border p-1 w-full mb-1"
            value={filters.priceRange[0]}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                priceRange: [Number(e.target.value), prev.priceRange[1]],
              }))
            }
          />
          <div className="text-sm text-gray-500 mb-2">
            {/* Định dạng giá trực tiếp với toLocaleString */}
            {filters.priceRange[0] > 0 &&
              `${filters.priceRange[0].toLocaleString("vi-VN")} VND`}
          </div>

          <input
            type="number"
            placeholder="Max"
            className="border p-1 w-full mb-1"
            value={filters.priceRange[1]}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                priceRange: [prev.priceRange[0], Number(e.target.value)],
              }))
            }
          />
          <div className="text-sm text-gray-500">
            {/* Định dạng giá trực tiếp với toLocaleString */}
            {filters.priceRange[1] > 0 &&
              `${filters.priceRange[1].toLocaleString("vi-VN")} VND`}
          </div>
        </div>
      </div>

      {/* Sort by */}
      <div className="ml-auto">
        <select
          value={filters.sort}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, sort: e.target.value }))
          }
          className="border px-4 py-2 rounded"
        >
          <option value="">Sort by</option>
          <option value="best-selling">Best selling</option>
          <option value="newest">Newest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>
      <button
        onClick={applyFilter}
        className="px-4 py-2 bg-main text-white rounded"
      >
        Apply
      </button>
    </div>
  );
};

export default ProductFilter;