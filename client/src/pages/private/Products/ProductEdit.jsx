// src/pages/admin/products/ProductEdit.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductForm from "../../../components/Admin/ProductForm";
import axios from "../../../axios";

// Hàm chuẩn hóa dữ liệu từ backend -> form
const normalizeProductData = (data) => {
  if (!data) return null;

  return {
    ...data,
    title: data.title || "",
    slug: data.slug || "",
    brand: data.brand || "",
    price: data.price || 0,
    quantity: data.countInStock ?? data.quantity ?? 0, // ✅ map countInStock

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
    images: Array.isArray(data.images) ? data.images : [],
    category: data.category?._id || data.category || "",
  };
};

const ProductEdit = () => {
  const { id } = useParams();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load product by id
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log("🔎 Fetching product with id:", id);
        const res = await axios.get(`/product/${id}`);
        console.log("✅ Raw product data:", res.data);

        const product = res.data.productData || res.data; // ✅ fix key
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
      const formData = new FormData();

      // append cơ bản
      formData.append("title", values.title);
      formData.append("slug", values.slug);
      formData.append("price", values.price);
      formData.append("brand", values.brand);
      formData.append("description", values.description);
      formData.append("category", values.category);
      formData.append("quantity", values.quantity);
      formData.append("instock", values.instock);
      formData.append("isActive", values.isActive);

      // object / array
      formData.append("infomations", JSON.stringify(values.infomations));
      formData.append("variants", JSON.stringify(values.variants));

      // thumb
      if (values.thumb instanceof File) {
        formData.append("thumb", values.thumb);
      }

      // images
      if (values.images && values.images.length > 0) {
        values.images.forEach((file) => {
          if (file instanceof File) {
            formData.append("images", file);
          }
        });
      }

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
      alert("Error updating product!");
    }
  };

  if (loading) return <p className="p-6">⏳ Loading...</p>;

  return (
    <div className="p-6">
      <ProductForm initialData={initialData} onSubmit={handleSubmit} />
    </div>
  );
};

export default ProductEdit;
