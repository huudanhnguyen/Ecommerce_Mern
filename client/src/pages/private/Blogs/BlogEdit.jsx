import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BlogForm from "../../../components/Admin/BlogForm";
import { getBlogById, updateBlog } from "../../../apis/blog";
import { buildBlogFormData } from "../../../utils/buildBlogFormData";

// Chuẩn hóa dữ liệu từ backend -> form
const normalizeBlogData = (data) => {
  if (!data) return null;

  // Chuẩn hóa danh sách ảnh: có case API trả về dạng [[url1,url2,...]]
  const normalizedImages = Array.isArray(data.images)
    ? (Array.isArray(data.images[0]) ? data.images[0] : data.images)
    : [];

  return {
    ...data,
    title: data.title || "",
    description: data.description || "",
    content: data.content || "",
    author: data.author || "Admin",
    category: data.category?._id || data.category || "",
    images: normalizedImages,
  };
};

const BlogEdit = () => {
  const { id } = useParams();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Load blog by id
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        console.log("🔎 Fetching blog with id:", id);
        const res = await getBlogById(id);
        console.log("✅ Raw blog data:", res.data);

        const blog = res.data;
        setInitialData(normalizeBlogData(blog));
      } catch (err) {
        console.error("❌ Error loading blog:", err);
        if (err.response) {
          console.error("❌ Error response:", err.response.data);
        }
        alert("Không tải được blog!");
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  // Submit update blog
  const handleSubmit = async (values) => {
    try {
      setSubmitting(true);
      const formData = buildBlogFormData(values);

      const res = await updateBlog(id, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        alert("✅ Blog updated successfully!");
        // Redirect về danh sách blogs
        window.location.href = "/admin/blogs";
      } else {
        alert("❌ Update failed!");
      }
    } catch (err) {
      console.error("❌ Error updating blog:", err);
      if (err.response?.data) {
        console.error("📌 Server response body:", err.response.data);
        alert(`Error: ${err.response.data.message || "Update failed!"}`);
      } else {
        alert("Error updating blog!");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="p-6">⏳ Loading blog...</p>;

  return (
    <div className="p-6">
      {submitting && (
        <div className="mb-4 text-blue-600 font-medium">
          ⏳ Đang cập nhật blog, vui lòng đợi...
        </div>
      )}

      <BlogForm
        initialData={initialData}
        onSubmit={handleSubmit}
        loading={submitting}
      />
    </div>
  );
};

export default BlogEdit;
