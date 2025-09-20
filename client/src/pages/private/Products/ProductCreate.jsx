import React from "react";
import ProductForm from "../../../components/Admin/ProductForm";

const ProductCreate = () => {
  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();

      // Gửi file hoặc text đều qua FormData
      Object.keys(values).forEach((key) => {
        if (key === "images") {
          values.images.forEach((img) => formData.append("images", img));
        } else if (key === "thumb" && values.thumb instanceof File) {
          formData.append("thumb", values.thumb);
        } else {
          formData.append(key, JSON.stringify(values[key]));
        }
      });

      const res = await fetch("/api/product", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Create failed!");
      alert("Product created successfully!");
    } catch (err) {
      console.error(err);
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
