import React, { useEffect, useState } from "react";
import { getApiBlogs } from "../../apis/blog";
import Pagination from "../../components/Pagination";
import Breadcrumb from "../../components/Breadcrumb";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await getApiBlogs(currentPage, 6); // 6 blog mỗi trang
        setBlogs(res.data.blogs);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.error("Lỗi lấy blogs:", err);
      }
    };
    fetchBlogs();
  }, [currentPage]);

  return (
    <div className="w-main max-w-6xl mx-auto px-4 py-10">
      <Breadcrumb />

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => {
          const imageUrl = blog.images?.[0]?.url || "/no-image.png"; // fallback nếu không có ảnh
          const imageAlt = blog.images?.[0]?.alt || blog.title;

          return (
            <div key={blog._id} className="group">
              {/* Image */}
              <div className="overflow-hidden rounded-lg shadow-sm">
                <img
                  src={imageUrl}
                  alt={imageAlt}
                  className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Info */}
              <div className="mt-4">
                <h3 className="text-lg font-bold uppercase group-hover:text-red-500 transition">
                  {blog.title}
                </h3>
                <p className="text-gray-400 text-sm mt-1">
                  By {blog.author || "Admin"} •{" "}
                  {blog.createdAt
                    ? new Date(blog.createdAt).toLocaleDateString()
                    : "N/A"}
                </p>
                <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                  {blog.description}
                </p>
                <a
                  href={`/blog/${blog._id}`}
                  className="text-red-500 text-sm font-semibold mt-2 inline-block hover:underline"
                >
                  Read More →
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default BlogList;
