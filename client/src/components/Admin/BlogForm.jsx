// src/components/Admin/BlogForm.jsx
import React, { useEffect, useState, useRef } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
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

  // Validation schema
  const validationSchema = Yup.object({
    title: Yup.string()
      .required("Title is required")
      .min(3, "Title must be at least 3 characters")
      .max(200, "Title must be less than 200 characters"),
    description: Yup.string()
      .required("Description is required")
      .min(10, "Description must be at least 10 characters")
      .max(500, "Description must be less than 500 characters"),
    content: Yup.string()
      .required("Content is required")
      .min(50, "Content must be at least 50 characters"),
    category: Yup.string()
      .required("Category is required"),
    author: Yup.string()
      .required("Author is required")
      .min(2, "Author must be at least 2 characters"),
  });

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
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {initialData ? "Edit Blog" : "Create New Blog"}
        </h2>

        <Formik
          enableReinitialize
          initialValues={initialFormik}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            onSubmit(values);
            setSubmitting(false);
          }}
        >
      {({ setFieldValue, values, errors, touched }) => {
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
          <Form className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Blog Title *
              </label>
              <Field 
                id="title"
                name="title" 
                placeholder="Enter blog title..." 
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent ${
                  errors.title && touched.title ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.title && touched.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Short Description *
              </label>
              <Field 
                id="description"
                name="description" 
                as="textarea" 
                rows={3}
                placeholder="Enter short description..." 
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent ${
                  errors.description && touched.description ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.description && touched.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description}</p>
              )}
              <p className="mt-1 text-sm text-gray-500">
                {values.description.length}/500 characters
              </p>
            </div>

            {/* Content */}
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                Blog Content *
              </label>
              <Field 
                id="content"
                name="content" 
                as="textarea" 
                rows={8}
                placeholder="Write your blog content here..." 
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent ${
                  errors.content && touched.content ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.content && touched.content && (
                <p className="mt-1 text-sm text-red-600">{errors.content}</p>
              )}
              <p className="mt-1 text-sm text-gray-500">
                {values.content.length} characters
              </p>
            </div>

            {/* Category + Author */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <Field 
                  as="select" 
                  id="category"
                  name="category" 
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent ${
                    errors.category && touched.category ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select category</option>
                  {categories.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.title}
                    </option>
                  ))}
                </Field>
                {errors.category && touched.category && (
                  <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                )}
              </div>
              <div>
                <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
                  Author *
                </label>
                <Field 
                  id="author"
                  name="author" 
                  placeholder="Enter author name..." 
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent ${
                    errors.author && touched.author ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.author && touched.author && (
                  <p className="mt-1 text-sm text-red-600">{errors.author}</p>
                )}
              </div>
            </div>

            {/* Images */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Blog Images
              </label>
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
                        className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-6 h-6 text-xs hover:bg-red-700"
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
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-main file:text-white hover:file:bg-blue-700"
              />
              <p className="mt-1 text-sm text-gray-500">
                You can upload multiple images. Supported formats: JPG, PNG, GIF
              </p>
            </div>

            {/* Submit */}
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={loading} 
                className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-main hover:bg-blue-700"
                }`}
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {initialData ? "Updating..." : "Creating..."}
                  </span>
                ) : (
                  initialData ? "Update Blog" : "Create Blog"
                )}
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
      </div>
    </div>
  );
};

export default BlogForm;
