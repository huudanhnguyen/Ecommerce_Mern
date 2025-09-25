// src/components/Admin/BlogForm.jsx
import React, { useEffect, useState, useRef } from "react";
import { Formik, Form, Field } from "formik";
import { getApiBlogCategories } from "../../apis/blogCategory";

const BlogForm = ({ onSubmit, initialData = null, loading = false }) => {
  const [categories, setCategories] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const createdObjectUrls = useRef([]);

  // fetch blog categories
  useEffect(() => {
    (async () => {
      try {
        const res = await getApiBlogCategories();
        setCategories(res.data || []);
      } catch (err) {
        console.error("❌ Error loading blog categories:", err);
      }
    })();
  }, []);

  // xử lý preview ảnh khi load initialData
  useEffect(() => {
    if (initialData) {
      setPreviewImages(Array.isArray(initialData.images) ? initialData.images : []);
    }
    return () => {
      // revoke những object URL đã tạo
      createdObjectUrls.current.forEach((u) => {
        try {
          URL.revokeObjectURL(u);
        } catch {}
      });
      createdObjectUrls.current = [];
    };
  }, [initialData]);

  // initial values
  const initialFormik = {
    title: initialData?.title || "",
    description: initialData?.description || "",
    content: initialData?.content || "",
    category: initialData?.category?._id || initialData?.category || "",
    author: initialData?.author || "Admin",
    // giữ các URL hiện có trong values để khi update gửi về backend
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
        const handleImagesChange = (e) => {
          const files = e.target.files ? Array.from(e.target.files) : [];
          if (!files.length) return;
          
          // Tạo object URLs cho preview
          const urls = files.map((f) => {
            if (f instanceof File) {
              const u = URL.createObjectURL(f);
              createdObjectUrls.current.push(u);
              return u;
            }
            return typeof f === "string" ? f : "";
          });
          
          // Cập nhật cả files và preview
          setFieldValue("images", [...values.images, ...files]);
          setPreviewImages((prev) => [...prev, ...urls]);
        };

        const removeImageAt = (index) => {
          const newVals = (values.images || []).filter((_, i) => i !== index);
          setFieldValue("images", newVals);
          setPreviewImages((prev) => prev.filter((_, i) => i !== index));
        };

        return (
          <Form className="space-y-4">
            {/* Title */}
            <div>
              <Field 
                name="title" 
                placeholder="Blog Title" 
                className="border p-2 w-full rounded" 
              />
            </div>

            {/* Description */}
            <div>
              <Field 
                name="description" 
                as="textarea" 
                placeholder="Short description" 
                className="border p-2 w-full rounded h-20" 
              />
            </div>

            {/* Content */}
            <div>
              <label className="block mb-1 font-semibold">Content</label>
              <Field 
                name="content" 
                as="textarea" 
                placeholder="Blog content..." 
                className="border p-2 w-full rounded h-40" 
              />
            </div>

            {/* Category + Author */}
            <div className="grid grid-cols-2 gap-4">
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
              <div>
                <Field 
                  name="author" 
                  placeholder="Author" 
                  className="border p-2 w-full rounded" 
                />
              </div>
            </div>

            {/* Images */}
            <div>
              <label className="block mb-1 font-semibold">Images</label>
              <div className="flex gap-2 flex-wrap mb-2">
                {previewImages.length > 0 ? (
                  previewImages.map((img, idx) => (
                    <div key={idx} className="relative">
                      <img 
                        src={img} 
                        alt={`preview-${idx}`} 
                        className="w-24 h-24 object-cover rounded border" 
                      />
                      <button 
                        type="button" 
                        onClick={() => removeImageAt(idx)} 
                        className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-6 h-6 text-xs"
                      >
                        ✕
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-gray-500">No images selected</div>
                )}
              </div>
              <input 
                type="file" 
                accept="image/*" 
                multiple 
                onChange={handleImagesChange} 
              />
            </div>

            {/* Submit */}
            <div>
              <button 
                type="submit" 
                disabled={loading} 
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                {loading ? "⏳ Processing..." : initialData ? "Update Blog" : "Create Blog"}
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default BlogForm;
