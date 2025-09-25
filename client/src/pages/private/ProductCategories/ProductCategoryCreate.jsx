import React, { useState } from "react";
import ProductCategoryForm from "../../../components/Admin/ProductCategoryForm";
import { createProductCategory } from "../../../apis/productCategory";

const ProductCategoryCreate = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const res = await createProductCategory(values);

      if (res.data) {
        alert("✅ Danh mục sản phẩm đã được tạo thành công!");
        // Redirect về danh sách categories
        window.location.href = "/admin/product-categories";
      }
    } catch (err) {
      console.error("❌ Error creating product category:", err);
      if (err.response?.data?.message) {
        alert(`Lỗi: ${err.response.data.message}`);
      } else {
        alert("Lỗi khi tạo danh mục sản phẩm!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      {loading && (
        <div className="mb-4 text-blue-600 font-medium">
          ⏳ Đang tạo danh mục sản phẩm, vui lòng đợi...
        </div>
      )}

      <ProductCategoryForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
};

export default ProductCategoryCreate;


