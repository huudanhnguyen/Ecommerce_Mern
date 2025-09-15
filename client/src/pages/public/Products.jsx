import React, { useEffect, useState, useCallback } from "react";
import { getAllProducts } from "../../apis/product";
import ProductCardFormat from "../../components/ProductCardFormat";
import ProductFilter from "../../components/ProductFilter";
import Breadcrumb from "../../components/Breadcrumb";
import { HiX } from "react-icons/hi"; // Icon X để đóng tag

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({}); // <-- query từ ProductFilter

  // Hàm fetch products
  const fetchProducts = useCallback(
    async (extraQuery = {}) => {
      try {
        setLoading(true);

        const res = await getAllProducts({
          page,
          limit: 8,
          // sort: "-createdAt", // Bỏ sort mặc định ở đây, để ProductFilter quản lý
          ...filters, // Sử dụng filters từ state của ProductList
          ...extraQuery,
        });

        if (res.data.success) {
          setProducts(res.data.products);
          setTotalPages(res.data.totalPages);
        }
      } catch (error) {
        console.error("Lỗi khi tải sản phẩm:", error);
      } finally {
        setLoading(false);
      }
    },
    [page, filters] // dependencies: page và filters
  );

  // Fetch khi page hoặc filters thay đổi
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Nhận filter từ ProductFilter
  const handleFilter = (query) => {
    setFilters(query); // Cập nhật state filters
    setPage(1); // reset về trang đầu khi filter mới
  };

  // Hàm để xóa một filter cụ thể
  const removeFilter = (keyToRemove, valueToRemove = null) => {
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters };

      if (keyToRemove === "color" || keyToRemove === "size") {
        const currentValues = newFilters[keyToRemove]
          ? newFilters[keyToRemove].split(",")
          : [];
        const updatedValues = currentValues.filter((v) => v !== valueToRemove);
        if (updatedValues.length === 0) {
          delete newFilters[keyToRemove];
        } else {
          newFilters[keyToRemove] = updatedValues.join(",");
        }
      } else if (keyToRemove === "price[gte]" || keyToRemove === "price[lte]") {
        // Đặt lại về giá trị mặc định của priceRange
        // Hoặc xóa hẳn nếu bạn không muốn hiển thị mặc định
        if (keyToRemove === "price[gte]") {
          newFilters["price[gte]"] = 100000;
          // Nếu bạn muốn xóa hẳn khi reset, hãy bỏ comment dòng dưới và xóa dòng trên
          // delete newFilters['price[gte]'];
        }
        if (keyToRemove === "price[lte]") {
          newFilters["price[lte]"] = 50000000;
          // Nếu bạn muốn xóa hẳn khi reset, hãy bỏ comment dòng dưới và xóa dòng trên
          // delete newFilters['price[lte]'];
        }
        // Kiểm tra nếu cả min và max đều là mặc định/không có thì xóa luôn cả hai
        if (
          (!newFilters["price[gte]"] || newFilters["price[gte]"] === 100000) &&
          (!newFilters["price[lte]"] || newFilters["price[lte]"] === 50000000)
        ) {
          delete newFilters["price[gte]"];
          delete newFilters["price[lte]"];
        }
      } else {
        // Xóa các filter khác (e.g., sort)
        delete newFilters[keyToRemove];
      }
      return newFilters;
    });
    setPage(1); // Reset trang về 1 khi xóa filter
  };

  // Hàm render các filter tags
  const renderFilterTags = () => {
    const tags = [];
    const sortOptions = {
      "": "Default",
      "best-selling": "Best Selling",
      newest: "Newest",
      "price-asc": "Price: Low to High",
      "price-desc": "Price: High to Low",
    };

    // Color filters
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
              className="ml-1 -mr-0.5 w-4 h-4 inline-flex items-center justify-center rounded-full hover:bg-blue-200"
            >
              <HiX className="w-3 h-3" />
            </button>
          </span>
        );
      });
    }

    // Size filters
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
              className="ml-1 -mr-0.5 w-4 h-4 inline-flex items-center justify-center rounded-full hover:bg-green-200"
            >
              <HiX className="w-3 h-3" />
            </button>
          </span>
        );
      });
    }

    // Price range filters
    const minPrice = filters["price[gte]"]
      ? Number(filters["price[gte]"])
      : null;
    const maxPrice = filters["price[lte]"]
      ? Number(filters["price[lte]"])
      : null;
    const defaultMinPrice = 100000;
    const defaultMaxPrice = 50000000;

    if (
      minPrice !== null &&
      (minPrice !== defaultMinPrice || maxPrice !== defaultMaxPrice)
    ) {
      // Chỉ hiển thị tag giá nếu có sự thay đổi so với mặc định
      const priceTagContent =
        minPrice && maxPrice
          ? `Price: ${minPrice.toLocaleString(
              "vi-VN"
            )} - ${maxPrice.toLocaleString("vi-VN")} VND`
          : minPrice
          ? `From: ${minPrice.toLocaleString("vi-VN")} VND`
          : `To: ${maxPrice.toLocaleString("vi-VN")} VND`;

      tags.push(
        <span
          key="price-range"
          className="flex items-center bg-purple-100 text-purple-800 text-sm font-medium px-2.5 py-0.5 rounded-full mr-2"
        >
          {priceTagContent}
          <button
            onClick={() => {
              removeFilter("price[gte]"); // Xóa cả min và max cùng lúc
              removeFilter("price[lte]");
            }}
            className="ml-1 -mr-0.5 w-4 h-4 inline-flex items-center justify-center rounded-full hover:bg-purple-200"
          >
            <HiX className="w-3 h-3" />
          </button>
        </span>
      );
    }

    // Sort filter
    if (filters.sort) {
      tags.push(
        <span
          key="sort"
          className="flex items-center bg-yellow-100 text-yellow-800 text-sm font-medium px-2.5 py-0.5 rounded-full mr-2"
        >
          Sort By: {sortOptions[filters.sort]}
          <button
            onClick={() => removeFilter("sort")}
            className="ml-1 -mr-0.5 w-4 h-4 inline-flex items-center justify-center rounded-full hover:bg-yellow-200"
          >
            <HiX className="w-3 h-3" />
          </button>
        </span>
      );
    }

    return tags;
  };

  if (loading) return <p className="text-center">Đang tải sản phẩm...</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <Breadcrumb />

      {/* Filter bar */}
      {/* Truyền filters hiện tại xuống ProductFilter để nó tự động cập nhật trạng thái */}
      <ProductFilter onFilter={handleFilter} currentFilters={filters} />

      {/* Filter Tags */}
      {Object.keys(filters).length > 0 && (
        <div className="flex flex-wrap items-center mt-4 p-2 bg-gray-50 rounded-md shadow-sm">
          <span className="font-semibold text-gray-700 mr-2">Searching:</span>
          {renderFilterTags()}
          <button
            onClick={() => handleFilter({})} // Reset tất cả filter
            className="ml-auto px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Danh sách sản phẩm */}
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
            Không tìm thấy sản phẩm nào
          </p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-2">
        {/* Nút Previous */}
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

        {/* Hiển thị dải trang (ví dụ 1 ... 4 5 6 ... 10) */}
        {Array.from({ length: totalPages }, (_, idx) => idx + 1)
          .filter(
            (p) =>
              p === 1 || p === totalPages || (p >= page - 1 && p <= page + 1) // chỉ hiển thị quanh current page
          )
          .map((p, index, arr) => {
            // Thêm dấu "..." khi bị nhảy trang
            if (index > 0 && arr[index] - arr[index - 1] > 1) {
              return (
                <span key={`dots-${p}`} className="px-2 py-2">
                  ...
                </span>
              );
            }
            return (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`px-3 py-2 border rounded-md ${
                  page === p ? "bg-red-500 text-white" : "hover:bg-gray-200"
                }`}
              >
                {p}
              </button>
            );
          })}

        {/* Nút Next */}
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
