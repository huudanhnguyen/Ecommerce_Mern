import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getAllProducts } from "../../apis/product";
import ProductCardFormat from "../../components/ProductCardFormat";

export default function SearchResult() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("title") || "";
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getAllProducts({
          page,
          limit: 8,
          title: keyword, // ✅ search theo title
        });
        if (res.data.success) {
          setProducts(res.data.products);
          setTotalPages(res.data.totalPages);
        }
      } catch (err) {
        console.error("Error fetching search results:", err);
      } finally {
        setLoading(false);
      }
    };

    if (keyword) fetchData();
  }, [keyword, page]);

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">
        Search results for: <span className="text-red-500">{keyword}</span>
      </h2>

      {products.length > 0 ? (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((item) => (
              <ProductCardFormat key={item._id} productData={item} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-6 gap-2">
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx}
                onClick={() => setPage(idx + 1)}
                className={`px-3 py-2 border rounded-md ${
                  page === idx + 1
                    ? "bg-red-500 text-white"
                    : "hover:bg-gray-200"
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </>
      ) : (
        <p className="text-gray-500">Không tìm thấy sản phẩm nào.</p>
      )}
    </div>
  );
}
