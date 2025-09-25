import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BlogCategoryForm from "../../../components/Admin/BlogCategoryForm";
import { getBlogCategoryById, updateBlogCategory } from "../../../apis/blogCategory";

const BlogCategoryEdit = () => {
  const { id } = useParams();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Load blog category by id
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        console.log("🔎 Fetching blog category with id:", id);
        const res = await getBlogCategoryById(id);
        console.log("✅ Raw category data:", res.data);

        setInitialData(res.data);
      } catch (err) {
        console.error("❌ Error loading blog category:", err);
        if (err.response) {
          console.error("❌ Error response:", err.response.data);
        }
        alert("Không tải được blog category!");
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
  }, [id]);

  // Submit update blog category
  const handleSubmit = async (values) => {
    try {
      setSubmitting(true);
      const res = await updateBlogCategory(id, values);

      if (res.data) {
        alert("✅ Blog category updated successfully!");
        // Redirect về danh sách categories
        window.location.href = "/admin/blog-categories";
      } else {
        alert("❌ Update failed!");
      }
    } catch (err) {
      console.error("❌ Error updating blog category:", err);
      if (err.response?.data) {
        console.error("📌 Server response body:", err.response.data);
        alert(`Error: ${err.response.data.message || "Update failed!"}`);
      } else {
        alert("Error updating blog category!");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="p-6">⏳ Loading blog category...</p>;

  return (
    <div className="p-6">
      {submitting && (
        <div className="mb-4 text-blue-600 font-medium">
          ⏳ Đang cập nhật blog category, vui lòng đợi...
        </div>
      )}

      <BlogCategoryForm
        initialData={initialData}
        onSubmit={handleSubmit}
        loading={submitting}
      />
    </div>
  );
};

export default BlogCategoryEdit;


