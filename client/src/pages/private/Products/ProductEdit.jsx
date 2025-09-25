// src/pages/admin/products/ProductEdit.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductForm from "../../../components/Admin/ProductForm";
import axios from "../../../axios";
import { buildFormData } from "../../../utils/buildFormData";

// Chuẩn hóa dữ liệu từ backend -> form
const normalizeProductData = (data) => {
  if (!data) return null;

  // Chuẩn hóa danh sách ảnh: có case API trả về dạng [[url1,url2,...]]
  const normalizedImages = Array.isArray(data.images)
    ? (Array.isArray(data.images[0]) ? data.images[0] : data.images)
    : [];

  return {
    ...data,
    title: data.title || "",
    slug: data.slug || "",
    brand: data.brand || "",
    price: data.price || 0,
    quantity: data.quantity ?? data.quantity ?? 0,

    description: Array.isArray(data.description)
      ? data.description.join("\n")
      : data.description || "",

    infomations: {
      DESCRIPTION: data.infomations?.DESCRIPTION || "",
      WARRANTY: data.infomations?.WARRANTY || "",
      DELIVERY: data.infomations?.DELIVERY || "",
      PAYMENT: data.infomations?.PAYMENT || "",
    },

    variants:
      Array.isArray(data.variants) && data.variants.length > 0
        ? data.variants
        : [{ label: "", variants: [""] }],

    instock: data.inStock ?? true,
    isActive: data.isActive ?? true,

    thumb: data.thumb || "",
    images: normalizedImages,

    // ✅ luôn dùng _id thay vì name
    category: data.category?._id || data.category || "",
  };
};

const ProductEdit = () => {
  const { id } = useParams();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Load product by id
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log("🔎 Fetching product with id:", id);
        const res = await axios.get(`/product/${id}`);
        console.log("✅ Raw product data:", res.data);

        const product = res.data.productData || res.data;
        setInitialData(normalizeProductData(product));
      } catch (err) {
        console.error("❌ Error loading product:", err);
        if (err.response) {
          console.error("❌ Error response:", err.response.data);
        }
        alert("Không tải được sản phẩm!");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // Submit update product
  const handleSubmit = async (values) => {
    try {
      setSubmitting(true);
      const formData = buildFormData(values);

      const res = await axios.put(`/product/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        alert("✅ Product updated successfully!");
      } else {
        alert("❌ Update failed!");
      }
    } catch (err) {
      console.error("❌ Error updating product:", err);
      if (err.response?.data) {
        console.error("📌 Server response body:", err.response.data);
        alert(`Error: ${err.response.data.message || "Update failed!"}`);
      } else {
        alert("Error updating product!");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="p-6">⏳ Loading product...</p>;

  return (
    <div className="p-6">
      {submitting && (
        <div className="mb-4 text-blue-600 font-medium">
          ⏳ Đang cập nhật sản phẩm, vui lòng đợi...
        </div>
      )}

      <ProductForm
        initialData={initialData}
        onSubmit={handleSubmit}
        loading={submitting}
      />
    </div>
  );
};

export default ProductEdit;
