import React, { useState } from "react";
import BlogCategoryForm from "../../../components/Admin/BlogCategoryForm";
import { createBlogCategory } from "../../../apis/blogCategory";

const BlogCategoryCreate = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const res = await createBlogCategory(values);

      if (res.data) {
        alert("✅ Blog category created successfully!");
        // Redirect về danh sách categories
        window.location.href = "/admin/blog-categories";
      }
    } catch (err) {
      console.error("❌ Error creating blog category:", err);
      if (err.response?.data?.message) {
        alert(`Error: ${err.response.data.message}`);
      } else {
        alert("Error creating blog category!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      {loading && (
        <div className="mb-4 text-blue-600 font-medium">
          ⏳ Đang tạo blog category, vui lòng đợi...
        </div>
      )}

      <BlogCategoryForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
};

export default BlogCategoryCreate;
