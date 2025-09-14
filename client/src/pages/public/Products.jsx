import React, { useEffect, useState } from "react";
import { getAllProducts } from "../../apis/product";
import ProductCardFormat from "../../components/ProductCardFormat";
import Breadcrumb from "../../components/Breadcrumb";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await getAllProducts({
          page,
          limit: 8,
          sort: "-createdAt",
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
    };
    fetchProducts();
  }, [page]);

  if (loading) return <p className="text-center">Đang tải sản phẩm...</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <Breadcrumb />
      {/* Grid sản phẩm */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((item) => (
          <ProductCardFormat
            key={item._id}
            productData={item}
            onQuickView={() => console.log("Quick view:", item)}
          />
        ))}
      </div>

      {/* Phân trang */}
      <div className="flex justify-center mt-6 gap-2">
        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx}
            onClick={() => setPage(idx + 1)}
            className={`px-3 py-2 border rounded-md ${
              page === idx + 1 ? "bg-red-500 text-white" : "hover:bg-gray-200"
            }`}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
