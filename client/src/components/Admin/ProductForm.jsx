// src/components/ProductForm.jsx
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import { getApiCategories } from "../../apis/categoryProduct";

const ProductForm = ({ onSubmit, initialData = null, loading = false }) => {
  const [categories, setCategories] = useState([]);

  // fetch categories
  useEffect(() => {
    (async () => {
      try {
        const res = await getApiCategories();
        setCategories(res.data || []);
      } catch (err) {
        console.error("❌ Error loading categories:", err);
      }
    })();
  }, []);

  const initialFormik = {
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    price: initialData?.price || "",
    brand: initialData?.brand || "",
    description: Array.isArray(initialData?.description)
      ? initialData.description.join("\n")
      : initialData?.description || "",
    category: initialData?.category?._id || initialData?.category || "",
    infomations: initialData?.infomations || {
      DESCRIPTION: "",
      WARRANTY: "",
      DELIVERY: "",
      PAYMENT: "",
    },
    variants:
      initialData?.variants?.length > 0
        ? initialData.variants
        : [{ label: "", variants: [""] }],
    inStock: initialData?.inStock ?? true,
    isActive: initialData?.isActive ?? true,
    quantity: initialData?.quantity ?? 0,
    thumb: initialData?.thumb || null,
    images: Array.isArray(initialData?.images) ? initialData.images : [],
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialFormik}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(values);
        setSubmitting(false);
      }}
    >
      {({ setFieldValue, values }) => {
        return (
          <Form className="space-y-4">
            <fieldset disabled={loading} className="opacity-70">
              {/* Title + Slug */}
              <div className="grid grid-cols-2 gap-4">
                <Field
                  name="title"
                  placeholder="Product Title"
                  className="border p-2 w-full rounded"
                />
                <Field
                  name="slug"
                  placeholder="Slug"
                  className="border p-2 w-full rounded"
                />
              </div>

              {/* Price + Brand + Quantity */}
              <div className="grid grid-cols-3 gap-4">
                <Field
                  name="price"
                  type="number"
                  placeholder="Price"
                  className="border p-2 w-full rounded"
                />
                <Field
                  name="brand"
                  placeholder="Brand"
                  className="border p-2 w-full rounded"
                />
                <Field
                  name="quantity"
                  type="number"
                  placeholder="Quantity"
                  className="border p-2 w-full rounded"
                />
              </div>

              {/* Description */}
              <Field
                name="description"
                as="textarea"
                placeholder="Description"
                className="border p-2 w-full rounded h-28"
              />

              {/* Informations */}
              <div>
                <h3 className="font-semibold mb-2">Informations</h3>
                {["DESCRIPTION", "WARRANTY", "DELIVERY", "PAYMENT"].map((k) => (
                  <div key={k} className="flex gap-2 mb-2">
                    <label className="w-28">{k}:</label>
                    <Field
                      name={`infomations.${k}`}
                      placeholder={k}
                      className="border p-2 flex-1 rounded"
                    />
                  </div>
                ))}
              </div>

              {/* Variants */}
              <div>
                <h3 className="font-semibold mb-2">Variants</h3>
                <FieldArray name="variants">
                  {(arrayHelpers) => (
                    <div className="space-y-4">
                      {(values.variants || []).map((variant, vIdx) => (
                        <div
                          key={vIdx}
                          className="border p-2 rounded space-y-2 bg-gray-50"
                        >
                          <Field
                            name={`variants[${vIdx}].label`}
                            placeholder="Variant Label"
                            className="border p-2 w-full rounded"
                          />
                          <FieldArray name={`variants[${vIdx}].variants`}>
                            {(innerHelpers) => (
                              <div className="space-y-2">
                                {(variant.variants || []).map((val, iIdx) => (
                                  <div key={iIdx} className="flex gap-2">
                                    <Field
                                      name={`variants[${vIdx}].variants[${iIdx}]`}
                                      placeholder="Value"
                                      className="border p-2 flex-1 rounded"
                                    />
                                    <button
                                      type="button"
                                      onClick={() => innerHelpers.remove(iIdx)}
                                      className="px-2 bg-red-500 text-white rounded"
                                    >
                                      ❌
                                    </button>
                                  </div>
                                ))}
                                <button
                                  type="button"
                                  onClick={() => innerHelpers.push("")}
                                  className="px-3 py-1 bg-green-500 text-white rounded"
                                >
                                  + Add Value
                                </button>
                              </div>
                            )}
                          </FieldArray>
                          <div className="flex justify-end">
                            <button
                              type="button"
                              onClick={() => arrayHelpers.remove(vIdx)}
                              className="px-2 py-1 bg-red-600 text-white rounded"
                            >
                              Remove Variant
                            </button>
                          </div>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() =>
                          arrayHelpers.push({ label: "", variants: [""] })
                        }
                        className="px-3 py-1 bg-blue-600 text-white rounded"
                      >
                        + Add Variant Group
                      </button>
                    </div>
                  )}
                </FieldArray>
              </div>

              {/* Category */}
              <div>
                <label className="block mb-1 font-semibold">Category</label>
                <Field
                  as="select"
                  name="category"
                  className="border p-2 w-full rounded"
                >
                  <option value="">Select category</option>
                  {categories.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.title}
                    </option>
                  ))}
                </Field>
              </div>

              {/* inStock + isActive */}
              <div className="flex gap-4 items-center">
                <label className="flex items-center gap-2">
                  <Field type="checkbox" name="inStock" />
                  In Stock
                </label>
                <label className="flex items-center gap-2">
                  <Field type="checkbox" name="isActive" />
                  Active
                </label>
              </div>

              {/* Thumbnail */}
              <div>
                <label className="block mb-1 font-semibold">Thumbnail</label>
                <div className="flex items-center gap-4">
                  {values.thumb ? (
                    <div className="relative inline-block">
                      <img
                        src={
                          values.thumb instanceof File
                            ? URL.createObjectURL(values.thumb)
                            : values.thumb
                        }
                        alt="thumb"
                        className="w-28 h-28 object-cover rounded border"
                      />
                      <button
                        type="button"
                        onClick={() => setFieldValue("thumb", null)}
                        className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-6 h-6 text-xs"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <div className="w-28 h-28 bg-gray-100 flex items-center justify-center rounded border text-sm text-gray-500">
                      No thumb
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) setFieldValue("thumb", file);
                    }}
                  />
                </div>
              </div>

              {/* Images */}
              <div>
                <label className="block mb-1 font-semibold">Images</label>
                <div className="flex gap-2 flex-wrap mb-2">
                  {values.images.length > 0 ? (
                    values.images.map((img, idx) => (
                      <div key={idx} className="relative">
                        <img
                          src={
                            img instanceof File ? URL.createObjectURL(img) : img
                          }
                          alt={`preview-${idx}`}
                          className="w-24 h-24 object-cover rounded border"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setFieldValue(
                              "images",
                              values.images.filter((_, i) => i !== idx)
                            )
                          }
                          className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-6 h-6 text-xs"
                        >
                          ✕
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="text-sm text-gray-500">
                      No images selected
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => {
                    const files = e.target.files
                      ? Array.from(e.target.files)
                      : [];
                    if (files.length > 0) {
                      setFieldValue("images", [...values.images, ...files]);
                    }
                  }}
                />
              </div>

              {/* Submit */}
              <div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded disabled:opacity-50"
                  disabled={loading}
                >
                  {loading
                    ? "⏳ Đang xử lý..."
                    : initialData
                    ? "Update Product"
                    : "Create Product"}
                </button>
              </div>
            </fieldset>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ProductForm;
