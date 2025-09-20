import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams, useNavigate } from "react-router-dom";

const ProductForm = ({ onSubmit }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [thumbPreview, setThumbPreview] = useState("");
  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch categories
  useEffect(() => {
    fetch("/api/product-categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  // fetch product if edit
  useEffect(() => {
    if (id) {
      fetch(`/api/product/${id}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("🔄 Product edit data:", data);

          formik.setValues({
            title: data.title || "",
            price: data.price || "",
            slug: data.slug || "",
            brand: data.brand || "",
            description: data.description || [""],
            infomations: data.infomations || {
              DESCRIPTION: "",
              WARRANTY: "",
              DELIVERY: "",
              PAYMENT: "",
            },
            category: data.category?._id || data.category || "",
            variants: data.variants || [],
            quantity: data.quantity || 0,
            isActive: data.isActive ?? true,
            thumb: data.thumb || "",
            images: data.images || [],
          });

          setThumbPreview(data.thumb || "");
          setImagePreviews(data.images || []);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [id]);

  const formik = useFormik({
    initialValues: {
      title: "",
      price: "",
      slug: "",
      brand: "",
      description: [""],
      infomations: {
        DESCRIPTION: "",
        WARRANTY: "",
        DELIVERY: "",
        PAYMENT: "",
      },
      category: "",
      variants: [],
      quantity: 0,
      isActive: true,
      thumb: "",
      images: [],
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      price: Yup.number().required("Price is required"),
      slug: Yup.string().required("Slug is required"),
      brand: Yup.string().required("Brand is required"),
    }),
    onSubmit: async (values) => {
      const method = id ? "PUT" : "POST";
      const url = id ? `/api/product/${id}` : "/api/product";

      console.log("🚀 Submitting product:", values);

      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      navigate("/admin/products");
    },
  });

  const handleThumbChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbPreview(URL.createObjectURL(file));
      formik.setFieldValue("thumb", file);
    }
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
    formik.setFieldValue("images", files);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="space-y-6 bg-white p-6 rounded-xl shadow-lg"
    >
      <h2 className="text-2xl font-bold text-red-600">
        {id ? "Edit Product" : "Add Product"}
      </h2>

      {/* Title & Slug */}
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="title"
          placeholder="Product Title"
          onChange={formik.handleChange}
          value={formik.values.title}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          name="slug"
          placeholder="Slug"
          onChange={formik.handleChange}
          value={formik.values.slug}
          className="border p-2 rounded w-full"
        />
      </div>

      {/* Price & Brand */}
      <div className="grid grid-cols-2 gap-4">
        <input
          type="number"
          name="price"
          placeholder="Price"
          onChange={formik.handleChange}
          value={formik.values.price}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          name="brand"
          placeholder="Brand"
          onChange={formik.handleChange}
          value={formik.values.brand}
          className="border p-2 rounded w-full"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block mb-2 font-semibold">Description</label>
        {formik.values.description.map((desc, idx) => (
          <input
            key={idx}
            type="text"
            value={desc}
            onChange={(e) => {
              const descArr = [...formik.values.description];
              descArr[idx] = e.target.value;
              formik.setFieldValue("description", descArr);
            }}
            className="border p-2 rounded w-full mb-2"
          />
        ))}
        <button
          type="button"
          onClick={() =>
            formik.setFieldValue("description", [
              ...formik.values.description,
              "",
            ])
          }
          className="text-sm text-blue-600"
        >
          + Add Description
        </button>
      </div>

      {/* Infomations */}
      <div>
        <label className="block mb-2 font-semibold">Infomations</label>
        {["DESCRIPTION", "WARRANTY", "DELIVERY", "PAYMENT"].map((key) => (
          <textarea
            key={key}
            name={`infomations.${key}`}
            placeholder={key}
            value={formik.values.infomations[key] || ""}
            onChange={formik.handleChange}
            className="border p-2 rounded w-full mb-2"
          />
        ))}
      </div>

      {/* Category */}
      <div>
        <label className="block mb-2 font-semibold">Category</label>
        <select
          name="category"
          value={formik.values.category}
          onChange={formik.handleChange}
          className="border p-2 rounded w-full"
        >
          <option value="">Select category</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.title}
            </option>
          ))}
        </select>
      </div>

      {/* Variants */}
      <div>
        <label className="block mb-2 font-semibold">Variants</label>
        {formik.values.variants.map((v, idx) => (
          <div key={idx} className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="Label"
              value={v.label}
              onChange={(e) => {
                const newVariants = [...formik.values.variants];
                newVariants[idx].label = e.target.value;
                formik.setFieldValue("variants", newVariants);
              }}
              className="border p-2 rounded w-1/3"
            />
            <input
              type="text"
              placeholder="Variants (comma separated)"
              value={v.variants.join(", ")}
              onChange={(e) => {
                const newVariants = [...formik.values.variants];
                newVariants[idx].variants = e.target.value
                  .split(",")
                  .map((s) => s.trim());
                formik.setFieldValue("variants", newVariants);
              }}
              className="border p-2 rounded w-2/3"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            formik.setFieldValue("variants", [
              ...formik.values.variants,
              { label: "", variants: [] },
            ])
          }
          className="text-sm text-blue-600"
        >
          + Add Variant
        </button>
      </div>

      {/* Quantity & Active */}
      <div className="grid grid-cols-2 gap-4">
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          onChange={formik.handleChange}
          value={formik.values.quantity}
          className="border p-2 rounded w-full"
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isActive"
            checked={formik.values.isActive}
            onChange={formik.handleChange}
          />
          Active
        </label>
      </div>

      {/* Thumbnail */}
      <div>
        <label className="block mb-2 font-semibold">Thumbnail</label>
        {thumbPreview && (
          <img
            src={thumbPreview}
            alt="Thumb Preview"
            className="w-32 h-32 object-cover mb-2 rounded"
          />
        )}
        <input type="file" accept="image/*" onChange={handleThumbChange} />
        <input
          type="text"
          placeholder="Or paste image URL"
          value={formik.values.thumb}
          onChange={(e) => {
            formik.setFieldValue("thumb", e.target.value);
            setThumbPreview(e.target.value);
          }}
          className="border p-2 rounded w-full mt-2"
        />
      </div>

      {/* Images */}
      <div>
        <label className="block mb-2 font-semibold">Images</label>
        <div className="flex gap-2 flex-wrap mb-2">
          {imagePreviews.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Preview ${idx}`}
              className="w-24 h-24 object-cover rounded"
            />
          ))}
        </div>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImagesChange}
        />
      </div>

      <button
        type="submit"
        className="bg-red-600 text-white px-6 py-2 rounded-lg"
      >
        {id ? "Update Product" : "Create Product"}
      </button>
    </form>
  );
};

export default ProductForm;
