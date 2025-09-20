import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductForm from "../../../components/Admin/ProductForm";

const ProductEdit = () => {
  const { id } = useParams();
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`/api/product/${id}`);
      const data = await res.json();
      setInitialData(data);
    };
    fetchProduct();
  }, [id]);

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        if (key === "images") {
          values.images.forEach((img) => formData.append("images", img));
        } else if (key === "thumb" && values.thumb instanceof File) {
          formData.append("thumb", values.thumb);
        } else {
          formData.append(key, JSON.stringify(values[key]));
        }
      });

      const res = await fetch(`/api/product/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) throw new Error("Update failed!");
      alert("Product updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Error updating product!");
    }
  };

  if (!initialData) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <ProductForm initialData={initialData} onSubmit={handleSubmit} />
    </div>
  );
};

export default ProductEdit;
