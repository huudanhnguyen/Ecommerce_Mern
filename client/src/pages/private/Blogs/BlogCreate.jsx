import React, { useState } from "react";
import BlogForm from "../../../components/Admin/BlogForm";
import { createBlog } from "../../../apis/blog";
import { buildFormData } from "../../../utils/buildFormData";

const BlogCreate = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const formData = buildFormData(values);

      const res = await createBlog(formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        alert("✅ Blog created successfully!");
        // Redirect về danh sách blogs
        window.location.href = "/admin/blogs";
      }
    } catch (err) {
      console.error("❌ Error creating blog:", err);
      if (err.response?.data?.message) {
        alert(`Error: ${err.response.data.message}`);
      } else {
        alert("Error creating blog!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      {loading && (
        <div className="mb-4 text-blue-600 font-medium">
          ⏳ Đang tạo blog, vui lòng đợi...
        </div>
      )}

      <BlogForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
};

export default BlogCreate;
