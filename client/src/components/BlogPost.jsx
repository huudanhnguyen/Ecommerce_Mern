import React, { useEffect, useState } from "react";
import { Calendar, MessageCircle } from "lucide-react";
import { getApiBlogs } from "../apis/blog";

const BlogPost = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await getApiBlogs();
        console.log("API blogs response:", response.data);

        if (response?.data?.blogs) {
          setBlogs(response.data.blogs);
        } else {
          setBlogs([]);
        }
      } catch (error) {
        console.error("Lỗi fetch blogs:", error);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <p>Đang tải blog...</p>;

  return (
    <div className="w-full px-4 my-10">
      <h2 className="text-2xl font-bold mb-4 border-b-2 border-red-500 inline-block">
        BLOG POSTS
      </h2>

      {blogs.length === 0 ? (
        <p>Không có bài viết nào.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="rounded-lg overflow-hidden shadow-md border bg-white"
            >
              <img
                src={blog.image} // Use defaultBlogImage if blog.image is falsy
                alt={blog.title}
                className="w-full h-52 object-cover"
                // Optional: Add an onError handler to replace broken images dynamically
                onError={(e) => { e.target.onerror = null; e.target.src = defaultBlogImage; }}
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2 hover:text-red-500 cursor-pointer">
                  {blog.title}
                </h3>
                <div className="flex items-center text-sm text-gray-500 gap-4 mb-2">
                  <span className="flex items-center gap-1">
                    <Calendar size={16} />{" "}
                    {new Date(blog.createdAt).toLocaleDateString("vi-VN")}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle size={16} /> 0 comments
                  </span>
                </div>
                <p className="text-gray-600 text-sm line-clamp-3">
                  {blog.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogPost;