import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCategoryForm from "../../../components/Admin/ProductCategoryForm";
import { getProductCategoryById, updateProductCategory } from "../../../apis/productCategory";

const ProductCategoryEdit = () => {
  const { id } = useParams();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Load product category by id
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        console.log("🔎 Fetching product category with id:", id);
        const res = await getProductCategoryById(id);
        console.log("✅ Raw category data:", res.data);

        setInitialData(res.data);
      } catch (err) {
        console.error("❌ Error loading product category:", err);
        if (err.response) {
          console.error("❌ Error response:", err.response.data);
        }
        alert("Không tải được danh mục sản phẩm!");
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
  }, [id]);

  // Submit update product category
  const handleSubmit = async (values) => {
    try {
      setSubmitting(true);
      const res = await updateProductCategory(id, values);

      if (res.data) {
        alert("✅ Danh mục sản phẩm đã được cập nhật thành công!");
        // Redirect về danh sách categories
        window.location.href = "/admin/product-categories";
      } else {
        alert("❌ Cập nhật thất bại!");
      }
    } catch (err) {
      console.error("❌ Error updating product category:", err);
      if (err.response?.data) {
        console.error("📌 Server response body:", err.response.data);
        alert(`Lỗi: ${err.response.data.message || "Cập nhật thất bại!"}`);
      } else {
        alert("Lỗi khi cập nhật danh mục sản phẩm!");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="p-6">⏳ Đang tải danh mục sản phẩm...</p>;

  return (
    <div className="p-6">
      {submitting && (
        <div className="mb-4 text-blue-600 font-medium">
          ⏳ Đang cập nhật danh mục sản phẩm, vui lòng đợi...
        </div>
      )}

      <ProductCategoryForm
        initialData={initialData}
        onSubmit={handleSubmit}
        loading={submitting}
      />
    </div>
  );
};

export default ProductCategoryEdit;


