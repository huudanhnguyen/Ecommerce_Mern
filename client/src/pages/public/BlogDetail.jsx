import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getApiBlogDetail, likeBlog, dislikeBlog } from "../../apis/blog";

const BlogDetail = () => {
  const { id } = useParams(); // URL: /blog/:id
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch blog chi tiết
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await getApiBlogDetail(id);
        setBlog(res.data);
      } catch (err) {
        console.error("Lỗi lấy blog detail:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  // Xử lý Like
  const handleLike = async () => {
    try {
      await likeBlog(id);
      const res = await getApiBlogDetail(id); // reload dữ liệu
      setBlog(res.data);
    } catch (err) {
      console.error("Lỗi like blog:", err);
    }
  };

  // Xử lý Dislike
  const handleDislike = async () => {
    try {
      await dislikeBlog(id);
      const res = await getApiBlogDetail(id);
      setBlog(res.data);
    } catch (err) {
      console.error("Lỗi dislike blog:", err);
    }
  };

  if (loading) return <p className="text-center py-10">Đang tải...</p>;
  if (!blog) return <p className="text-center py-10">Không tìm thấy bài viết</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <p className="text-gray-400 text-sm mb-6">
        By {blog.author?.firstName || "Admin"} •{" "}
        {new Date(blog.createdAt).toLocaleDateString()} • {blog.numberViews} lượt xem
      </p>

      {blog.images?.[0]?.url && (
        <img
          src={blog.images[0].url}
          alt={blog.images[0].alt || blog.title}
          className="w-full rounded-lg shadow-md mb-6"
        />
      )}

      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />

      {/* Like / Dislike */}
      <div className="flex items-center space-x-4 mt-6">
        <button
          onClick={handleLike}
          className={`px-4 py-2 rounded-md font-semibold ${
            blog.isLiked ? "bg-red-600 text-white" : "bg-gray-200 text-gray-700"
          }`}
        >
          👍 Like ({blog.likes?.length || 0})
        </button>
        <button
          onClick={handleDislike}
          className={`px-4 py-2 rounded-md font-semibold ${
            blog.isDisliked ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
          }`}
        >
          👎 Dislike ({blog.dislikes?.length || 0})
        </button>
      </div>
    </div>
  );
};

export default BlogDetail;
