import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const ProductCategoryForm = ({ onSubmit, initialData = null, loading = false }) => {
  // Validation schema
  const validationSchema = Yup.object({
    title: Yup.string()
      .required("Tên danh mục là bắt buộc")
      .min(3, "Tên danh mục phải có ít nhất 3 ký tự")
      .max(100, "Tên danh mục không được quá 100 ký tự"),
    description: Yup.string()
      .required("Mô tả là bắt buộc")
      .min(10, "Mô tả phải có ít nhất 10 ký tự")
      .max(500, "Mô tả không được quá 500 ký tự"),
  });

  // Initial values
  const initialValues = {
    title: initialData?.title || "",
    description: initialData?.description || "",
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {initialData ? "Chỉnh Sửa Danh Mục Sản Phẩm" : "Tạo Danh Mục Sản Phẩm Mới"}
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize
        >
          {({ errors, touched, values, setFieldValue }) => (
            <Form className="space-y-6">
              {/* Title Field */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Tên Danh Mục *
                </label>
                <Field
                  type="text"
                  id="title"
                  name="title"
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent ${
                    errors.title && touched.title ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Nhập tên danh mục..."
                />
                {errors.title && touched.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                )}
              </div>

              {/* Description Field */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Mô Tả *
                </label>
                <Field
                  as="textarea"
                  id="description"
                  name="description"
                  rows={4}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent ${
                    errors.description && touched.description ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Nhập mô tả danh mục..."
                />
                {errors.description && touched.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                )}
                <p className="mt-1 text-sm text-gray-500">
                  {values.description.length}/500 ký tự
                </p>
              </div>

              {/* Preview */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Xem Trước</h3>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium text-gray-600">Tên:</span>
                    <span className="ml-2 text-sm text-gray-900">
                      {values.title || "Chưa nhập tên"}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Mô tả:</span>
                    <p className="text-sm text-gray-900 mt-1">
                      {values.description || "Chưa nhập mô tả"}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Slug:</span>
                    <span className="ml-2 text-sm text-gray-500">
                      {values.title ? values.title.toLowerCase().replace(/\s+/g, '-') : "chua-nhap-ten"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => window.history.back()}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main"
                >
                  Hủy
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
                      {initialData ? "Đang cập nhật..." : "Đang tạo..."}
                    </span>
                  ) : (
                    initialData ? "Cập Nhật Danh Mục" : "Tạo Danh Mục"
                  )}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ProductCategoryForm;


