import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { getAllProducts } from "../../apis/product";
import ProductCardFormat from "../../components/ProductCardFormat";
import ProductFilter from "../../components/ProductFilter";
import Breadcrumb from "../../components/Breadcrumb";
import { HiX } from "react-icons/hi";

export default function ProductList() {
  const { category } = useParams(); // ✅ /products/:category
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({});

  // ✅ fetch products
  const fetchProducts = useCallback(
    async (extraQuery = {}) => {
      try {
        setLoading(true);

        // ⚡ Normalize category param -> lowercase để match với slug trong DB
        const normalizedCategory = category ? category.toLowerCase() : null;

        const res = await getAllProducts({
          page,
          limit: 8,
          ...filters,
          ...extraQuery,
          ...(normalizedCategory ? { category: normalizedCategory } : {}), // dùng slug chữ thường
        });

        console.log("👉 API response:", res.data);

        if (res.data.success) {
          setProducts(res.data.products);
          setTotalPages(res.data.totalPages);
        } else {
          setProducts([]);
          setTotalPages(1);
        }
      } catch (error) {
        console.error("Lỗi khi tải sản phẩm:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    },
    [page, filters, category]
  );

  // ✅ gọi API khi page, filters, category đổi
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Nhận filter từ ProductFilter
  const handleFilter = (query) => {
    setFilters(query);
    setPage(1);
  };

  // Xóa filter cụ thể
  const removeFilter = (keyToRemove, valueToRemove = null) => {
    setFilters((prev) => {
      const newFilters = { ...prev };

      if (keyToRemove === "color" || keyToRemove === "size") {
        const currentValues = newFilters[keyToRemove]
          ? newFilters[keyToRemove].split(",")
          : [];
        const updatedValues = currentValues.filter((v) => v !== valueToRemove);
        if (updatedValues.length > 0) {
          newFilters[keyToRemove] = updatedValues.join(",");
        } else {
          delete newFilters[keyToRemove];
        }
      } else if (keyToRemove === "price[gte]" || keyToRemove === "price[lte]") {
        delete newFilters["price[gte]"];
        delete newFilters["price[lte]"];
      } else {
        delete newFilters[keyToRemove];
      }

      return newFilters;
    });
    setPage(1);
  };

  // Render filter tags
  const renderFilterTags = () => {
    const tags = [];
    const sortOptions = {
      "": "Default",
      "best-selling": "Best Selling",
      newest: "Newest",
      "price-asc": "Price: Low to High",
      "price-desc": "Price: High to Low",
    };

    // ✅ Color
    if (filters.color) {
      filters.color.split(",").forEach((c) => {
        tags.push(
          <span
            key={`color-${c}`}
            className="flex items-center bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full mr-2"
          >
            Color: {c}
            <button
              onClick={() => removeFilter("color", c)}
              className="ml-1 -mr-0.5 w-4 h-4 flex items-center justify-center rounded-full hover:bg-blue-200"
            >
              <HiX className="w-3 h-3" />
            </button>
          </span>
        );
      });
    }

    // ✅ Size
    if (filters.size) {
      filters.size.split(",").forEach((s) => {
        tags.push(
          <span
            key={`size-${s}`}
            className="flex items-center bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full mr-2"
          >
            Size: {s}
            <button
              onClick={() => removeFilter("size", s)}
              className="ml-1 -mr-0.5 w-4 h-4 flex items-center justify-center rounded-full hover:bg-green-200"
            >
              <HiX className="w-3 h-3" />
            </button>
          </span>
        );
      });
    }

    // ✅ Price
    const minPrice = filters["price[gte]"]
      ? Number(filters["price[gte]"])
      : null;
    const maxPrice = filters["price[lte]"]
      ? Number(filters["price[lte]"])
      : null;

    if (minPrice || maxPrice) {
      tags.push(
        <span
          key="price"
          className="flex items-center bg-purple-100 text-purple-800 text-sm font-medium px-2.5 py-0.5 rounded-full mr-2"
        >
          {`Price: ${minPrice?.toLocaleString("vi-VN") || 0} - ${
            maxPrice?.toLocaleString("vi-VN") || "∞"
          } VND`}
          <button
            onClick={() => {
              removeFilter("price[gte]");
              removeFilter("price[lte]");
            }}
            className="ml-1 -mr-0.5 w-4 h-4 flex items-center justify-center rounded-full hover:bg-purple-200"
          >
            <HiX className="w-3 h-3" />
          </button>
        </span>
      );
    }

    // ✅ Sort
    if (filters.sort) {
      tags.push(
        <span
          key="sort"
          className="flex items-center bg-yellow-100 text-yellow-800 text-sm font-medium px-2.5 py-0.5 rounded-full mr-2"
        >
          Sort: {sortOptions[filters.sort]}
          <button
            onClick={() => removeFilter("sort")}
            className="ml-1 -mr-0.5 w-4 h-4 flex items-center justify-center rounded-full hover:bg-yellow-200"
          >
            <HiX className="w-3 h-3" />
          </button>
        </span>
      );
    }

    return tags;
  };

  if (loading) return <p className="text-center">Loading products...</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <Breadcrumb />

      {/* Filter bar */}
      <ProductFilter onFilter={handleFilter} currentFilters={filters} />

      {/* Tags */}
      {Object.keys(filters).length > 0 && (
        <div className="flex flex-wrap items-center mt-4 p-2 bg-gray-50 rounded-md shadow-sm">
          <span className="font-semibold text-gray-700 mr-2">Searching:</span>
          {renderFilterTags()}
          <button
            onClick={() => handleFilter({})}
            className="ml-auto px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Product list */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
        {products.length > 0 ? (
          products.map((item) => (
            <ProductCardFormat
              key={item._id}
              productData={item}
              onQuickView={() => console.log("Quick view:", item)}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No products found
          </p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-2">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          className={`px-3 py-2 border rounded-md ${
            page === 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "hover:bg-gray-200"
          }`}
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter(
            (p) =>
              p === 1 || p === totalPages || (p >= page - 1 && p <= page + 1)
          )
          .map((p, i, arr) =>
            i > 0 && arr[i] - arr[i - 1] > 1 ? (
              <span key={`dots-${p}`} className="px-2 py-2">
                ...
              </span>
            ) : (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`px-3 py-2 border rounded-md ${
                  page === p ? "bg-red-500 text-white" : "hover:bg-gray-200"
                }`}
              >
                {p}
              </button>
            )
          )}

        <button
          disabled={page === totalPages}
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          className={`px-3 py-2 border rounded-md ${
            page === totalPages
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "hover:bg-gray-200"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
