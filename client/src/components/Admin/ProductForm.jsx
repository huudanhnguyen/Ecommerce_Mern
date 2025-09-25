// src/components/Admin/ProductForm.jsx
import React, { useEffect, useState, useRef } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import { getApiCategories } from "../../apis/categoryProduct";

const ProductForm = ({ onSubmit, initialData = null, loading = false }) => {
  const [categories, setCategories] = useState([]);
  const [previewThumb, setPreviewThumb] = useState("");
  const [previewImages, setPreviewImages] = useState([]);
  const createdObjectUrls = useRef([]);

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

  // xử lý preview ảnh khi load initialData
  useEffect(() => {
    if (initialData) {
      setPreviewThumb(initialData.thumb || "");
      setPreviewImages(Array.isArray(initialData.images) ? initialData.images : []);
    }
    return () => {
      // revoke những object URL đã tạo (chỉ những url do createObjectURL tạo)
      createdObjectUrls.current.forEach((u) => {
        try {
          URL.revokeObjectURL(u);
        } catch {}
      });
      createdObjectUrls.current = [];
    };
  }, [initialData]);

  // initial values: LƯU Ý: images và thumb lấy luôn từ initialData (nếu có)
  const initialFormik = {
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    price: initialData?.price || "",
    brand: initialData?.brand || "",
    description:
      Array.isArray(initialData?.description) ? initialData.description.join("\n") : initialData?.description || "",
    category: initialData?.category?._id || initialData?.category || "",
    infomations: initialData?.infomations || {
      DESCRIPTION: "",
      WARRANTY: "",
      DELIVERY: "",
      PAYMENT: "",
    },
    variants: Array.isArray(initialData?.variants) && initialData?.variants.length > 0 ? initialData.variants : [{ label: "", variants: [""] }],
    inStock: initialData?.inStock ?? true,
    isActive: initialData?.isActive ?? true,
    quantity: initialData?.quantity ?? initialData?.countInStock ?? 0,
    // *** quan trọng: giữ các URL hiện có trong values để khi update gửi về backend ***
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
        const handleThumbChange = (e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          setFieldValue("thumb", file);
          // chỉ tạo objectURL cho File
          const url = URL.createObjectURL(file);
          createdObjectUrls.current.push(url);
          setPreviewThumb(url);
        };

        const handleImagesChange = (e) => {
          const files = e.target.files ? Array.from(e.target.files) : [];
          if (!files.length) return;
          // replace toàn bộ ảnh cũ bằng file mới (nếu user upload)
          setFieldValue("images", files);
          const urls = files.map((f) => {
            if (f instanceof File) {
              const u = URL.createObjectURL(f);
              createdObjectUrls.current.push(u);
              return u;
            }
            // phòng trường hợp không phải File (ít khả năng) — dùng cái giá trị trực tiếp
            return typeof f === "string" ? f : "";
          });
          setPreviewImages(urls);
        };

        const removeImageAt = (index) => {
          const newVals = (values.images || []).filter((_, i) => i !== index);
          setFieldValue("images", newVals);
          setPreviewImages((prev) => prev.filter((_, i) => i !== index));
        };

        const removeThumb = () => {
          setFieldValue("thumb", null);
          setPreviewThumb("");
        };

        return (
          <Form className="space-y-4">
            {/* Title + Slug */}
            <div className="grid grid-cols-2 gap-4">
              <Field name="title" placeholder="Product Title" className="border p-2 w-full rounded" />
              <Field name="slug" placeholder="Slug" className="border p-2 w-full rounded" />
            </div>

            {/* Price + Brand + Quantity */}
            <div className="grid grid-cols-3 gap-4">
              <Field name="price" type="number" placeholder="Price" className="border p-2 w-full rounded" />
              <Field name="brand" placeholder="Brand" className="border p-2 w-full rounded" />
              <Field name="quantity" type="number" placeholder="Quantity" className="border p-2 w-full rounded" />
            </div>

            {/* Description */}
            <Field name="description" as="textarea" placeholder="Description" className="border p-2 w-full rounded h-28" />

            {/* Informations */}
            <div>
              <h3 className="font-semibold mb-2">Informations</h3>
              {["DESCRIPTION", "WARRANTY", "DELIVERY", "PAYMENT"].map((k) => (
                <div key={k} className="flex gap-2 mb-2">
                  <label className="w-28">{k}:</label>
                  <Field name={`infomations.${k}`} placeholder={k} className="border p-2 flex-1 rounded" />
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
                      <div key={vIdx} className="border p-2 rounded space-y-2 bg-gray-50">
                        <Field name={`variants[${vIdx}].label`} placeholder="Variant Label" className="border p-2 w-full rounded" />
                        <FieldArray name={`variants[${vIdx}].variants`}>
                          {(innerHelpers) => (
                            <div className="space-y-2">
                              {(variant.variants || []).map((val, iIdx) => (
                                <div key={iIdx} className="flex gap-2">
                                  <Field name={`variants[${vIdx}].variants[${iIdx}]`} placeholder="Value" className="border p-2 flex-1 rounded" />
                                  <button type="button" onClick={() => innerHelpers.remove(iIdx)} className="px-2 bg-red-500 text-white rounded">
                                    ❌
                                  </button>
                                </div>
                              ))}
                              <button type="button" onClick={() => innerHelpers.push("")} className="px-3 py-1 bg-green-500 text-white rounded">
                                + Add Value
                              </button>
                            </div>
                          )}
                        </FieldArray>
                        <div className="flex justify-end">
                          <button type="button" onClick={() => arrayHelpers.remove(vIdx)} className="px-2 py-1 bg-red-600 text-white rounded">
                            Remove Variant
                          </button>
                        </div>
                      </div>
                    ))}
                    <button type="button" onClick={() => arrayHelpers.push({ label: "", variants: [""] })} className="px-3 py-1 bg-blue-600 text-white rounded">
                      + Add Variant Group
                    </button>
                  </div>
                )}
              </FieldArray>
            </div>

            {/* Category */}
            <div>
              <label className="block mb-1 font-semibold">Category</label>
              <Field as="select" name="category" className="border p-2 w-full rounded">
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
                {previewThumb ? (
                  <div className="relative inline-block">
                    <img src={previewThumb} alt="thumb" className="w-28 h-28 object-cover rounded border" />
                    <button type="button" onClick={removeThumb} className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-6 h-6 text-xs">
                      ✕
                    </button>
                  </div>
                ) : (
                  <div className="w-28 h-28 bg-gray-100 flex items-center justify-center rounded border text-sm text-gray-500">No thumb</div>
                )}
                <input type="file" accept="image/*" onChange={handleThumbChange} />
              </div>
            </div>

            {/* Images */}
            <div>
              <label className="block mb-1 font-semibold">Images</label>
              <div className="flex gap-2 flex-wrap mb-2">
                {previewImages.length > 0 ? (
                  previewImages.map((img, idx) => (
                    <div key={idx} className="relative">
                      <img src={img} alt={`preview-${idx}`} className="w-24 h-24 object-cover rounded border" />
                      <button type="button" onClick={() => removeImageAt(idx)} className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-6 h-6 text-xs">
                        ✕
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-gray-500">No images selected</div>
                )}
              </div>
              <input type="file" accept="image/*" multiple onChange={handleImagesChange} />
            </div>

            {/* Submit */}
            <div>
              <button type="submit" disabled={loading} className="px-4 py-2 bg-red-600 text-white rounded">
                {loading ? "⏳ Processing..." : initialData ? "Update Product" : "Create Product"}
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ProductForm;
