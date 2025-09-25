import React from "react";
import ProductForm from "../../../components/Admin/ProductForm";
import axios from "../../../axios";

const ProductCreate = () => {
  const handleSubmit = async (values) => {
    try {
      // console.log("👉 Values từ form:", values);

      const formData = new FormData();

      // Field cơ bản
      formData.append("title", values.title || "");
      formData.append("price", values.price || 0);
      formData.append("brand", values.brand || "");
      formData.append("slug", values.slug || "");
      formData.append("description", values.description || "");
      formData.append("category", values.category || "");
      formData.append("quantity", values.quantity || 0);

      // Boolean (phải trùng backend)
      formData.append("instock", values.inStock ?? false);   // ✅ sửa inStock -> instock
      formData.append("isActive", values.isActive ?? true);

      // Object → JSON string
      formData.append("infomations", JSON.stringify(values.infomations || {}));
      formData.append("variants", JSON.stringify(values.variants || []));

      // Thumbnail (1 file)
      if (values.thumb instanceof File) {
        formData.append("thumb", values.thumb);
      }

      // Images (nhiều file)
      if (values.images && values.images.length > 0) {
        values.images.forEach((file) => {
          formData.append("images", file);
        });
      }

      const res = await axios.post("/product", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        alert("✅ Product created successfully!");
      }
    } catch (err) {
      console.error("❌ Error creating product:", err);
      alert("Error creating product!");
    }
  };

  return (
    <div className="p-6">
      <ProductForm onSubmit={handleSubmit} />
    </div>
  );
};

export default ProductCreate;
