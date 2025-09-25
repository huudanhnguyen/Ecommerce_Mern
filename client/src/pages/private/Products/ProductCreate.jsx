import React, { useState } from "react";
import ProductForm from "../../../components/Admin/ProductForm";
import axios from "../../../axios";
import { buildFormData } from "../../../utils/buildFormData";

const ProductCreate = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    try {
      setLoading(true); // bắt đầu loading
      const formData = buildFormData(values);

      const res = await axios.post("/product", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        alert("✅ Product created successfully!");
      }
    } catch (err) {
      console.error("❌ Error creating product:", err);
      alert("Error creating product!");
    } finally {
      setLoading(false); // kết thúc loading
    }
  };

  return (
    <div className="p-6">
      {loading && (
        <div className="mb-4 text-blue-600 font-medium">
          ⏳ Đang tạo sản phẩm, vui lòng đợi...
        </div>
      )}

      <ProductForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
};

export default ProductCreate;
