import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../../axios";
import { getAllBlogs, deleteBlog } from "../../../apis/blog";
import { getApiBlogCategories } from "../../../apis/blogCategory";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Download,
  Upload,
  FileText,
  ChevronLeft,
  ChevronRight,
  Eye,
  Heart,
  MessageCircle,
} from "lucide-react";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBlogs, setSelectedBlogs] = useState([]);
  const itemsPerPage = 10;

  // Fetch blogs
  const fetchBlogs = async () => {
    try {
      const { data } = await getAllBlogs({ page: 1, limit: 100 });
      if (Array.isArray(data.blogs)) {
        setBlogs(data.blogs);
      }
    } catch (error) {
      console.error("❌ Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await getApiBlogCategories();
        if (Array.isArray(data)) {
          setCategories(data);
        }
      } catch (error) {
        console.error("❌ Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Search + Filter
  const filteredBlogs = blogs.filter(
    (b) =>
      (filterCategory === "All" || b.category?.title === filterCategory) &&
      (b.title.toLowerCase().includes(search.toLowerCase()) ||
        b.description.toLowerCase().includes(search.toLowerCase()) ||
        b._id.toLowerCase().includes(search.toLowerCase()))
  );

  // Pagination
  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Toggle chọn blog
  const toggleSelect = (id) => {
    setSelectedBlogs((prev) =>
      prev.includes(id) ? prev.filter((bid) => bid !== id) : [...prev, id]
    );
  };

  // Chọn tất cả
  const toggleSelectAll = () => {
    const idsOnPage = paginatedBlogs.map((b) => b._id);
    if (idsOnPage.every((id) => selectedBlogs.includes(id))) {
      setSelectedBlogs((prev) => prev.filter((id) => !idsOnPage.includes(id)));
    } else {
      setSelectedBlogs((prev) => [...new Set([...prev, ...idsOnPage])]);
    }
  };

  // Xóa 1 blog
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa blog này không?")) {
      try {
        await deleteBlog(id);
        setBlogs((prev) => prev.filter((b) => b._id !== id));
        setSelectedBlogs((prev) => prev.filter((bid) => bid !== id));
      } catch (error) {
        console.error("❌ Error deleting blog:", error);
        alert("Lỗi khi xóa blog!");
      }
    }
  };

  // Xóa nhiều blogs
  const handleDeleteSelected = async () => {
    if (selectedBlogs.length === 0) {
      alert("Vui lòng chọn ít nhất 1 blog để xóa.");
      return;
    }
    if (window.confirm("Bạn có chắc chắn muốn xóa các blogs đã chọn không?")) {
      try {
        await Promise.all(selectedBlogs.map((id) => deleteBlog(id)));
        setBlogs((prev) => prev.filter((b) => !selectedBlogs.includes(b._id)));
        setSelectedBlogs([]);
      } catch (error) {
        console.error("❌ Error deleting selected blogs:", error);
        alert("Lỗi khi xóa blogs!");
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <FileText className="text-main" /> Blog Management
        </h2>

        <div className="flex flex-wrap gap-2">
          <Link
            to="/admin/blogs/create"
            className="flex items-center gap-2 px-3 py-2 bg-main text-white rounded-lg hover:bg-blue-700 transition text-sm flex-1 min-w-0 justify-center"
          >
            <Plus size={16} /> 
            <span className="hidden sm:inline">Add Blog</span>
            <span className="sm:hidden">Add</span>
          </Link>
          <Link
            to="/admin/blog-categories"
            className="flex items-center gap-2 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition text-sm flex-1 min-w-0 justify-center"
          >
            <FileText size={16} /> 
            <span className="hidden sm:inline">Categories</span>
            <span className="sm:hidden">Cat</span>
          </Link>
          <button className="flex items-center gap-2 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition text-sm flex-1 min-w-0 justify-center">
            <Upload size={16} /> 
            <span className="hidden sm:inline">Import</span>
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition text-sm flex-1 min-w-0 justify-center">
            <Download size={16} /> 
            <span className="hidden sm:inline">Export</span>
          </button>
          <button
            onClick={handleDeleteSelected}
            className="flex items-center gap-2 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm flex-1 min-w-0 justify-center"
          >
            <Trash2 size={16} /> 
            <span className="hidden sm:inline">Delete Selected</span>
            <span className="sm:hidden">Delete</span>
          </button>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col gap-4">
        <div className="relative w-full">
          <Search className="absolute top-2.5 left-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search blog..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-main text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="flex-1 min-w-0 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-main text-sm"
          >
            <option value="All">All Categories</option>
            {categories.map((c) => (
              <option key={c._id} value={c.title}>
                {c.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table - Desktop */}
      <div className="hidden md:block bg-white rounded-lg shadow overflow-x-auto">
        {paginatedBlogs.length === 0 ? (
          <div className="p-8 text-center">
            <FileText className="mx-auto text-gray-400 mb-4" size={48} />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No blogs found</h3>
            <p className="text-gray-500 mb-4">
              {search || filterCategory !== "All" 
                ? "Try adjusting your search or filter criteria"
                : "Get started by creating your first blog"
              }
            </p>
            {!search && filterCategory === "All" && (
              <Link
                to="/admin/blogs/create"
                className="inline-flex items-center gap-2 px-4 py-2 bg-main text-white rounded-lg hover:bg-blue-700 transition"
              >
                <Plus size={16} /> Create Blog
              </Link>
            )}
          </div>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-sm">
                <th className="p-3">
                  <input
                    type="checkbox"
                    onChange={toggleSelectAll}
                    checked={
                      paginatedBlogs.length > 0 &&
                      paginatedBlogs.every((b) => selectedBlogs.includes(b._id))
                    }
                  />
                </th>
                <th className="p-3 text-left">Thumbnail</th>
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-left">Author</th>
                <th className="p-3 text-left">Views</th>
                <th className="p-3 text-left">Likes</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedBlogs.map((b) => (
                <tr key={b._id} className="border-b hover:bg-gray-50 text-sm">
                  <td className="p-3 text-center">
                    <input
                      type="checkbox"
                      checked={selectedBlogs.includes(b._id)}
                      onChange={() => toggleSelect(b._id)}
                    />
                  </td>
                  <td className="p-3">
                    <img
                      src={b.images?.[0]?.url || "/no-image.png"}
                      alt={b.title}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </td>
                  <td className="p-3 font-medium max-w-xs">
                    <div className="truncate" title={b.title}>
                      {b.title}
                    </div>
                    <div className="text-xs text-gray-500 truncate" title={b.description}>
                      {b.description}
                    </div>
                  </td>
                  <td className="p-3">{b.category?.title || "—"}</td>
                  <td className="p-3">{b.author || "Admin"}</td>
                  <td className="p-3 flex items-center gap-1">
                    <Eye size={14} />
                    {b.numberViews || 0}
                  </td>
                  <td className="p-3 flex items-center gap-1">
                    <Heart size={14} />
                    {b.likes?.length || 0}
                  </td>
                  <td className="p-3 flex justify-center gap-2">
                    <Link
                      to={`/admin/blogs/edit/${b._id}`}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                    >
                      <Edit size={16} />
                    </Link>
                    <button
                      onClick={() => handleDelete(b._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {paginatedBlogs.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <FileText className="mx-auto text-gray-400 mb-4" size={48} />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No blogs found</h3>
            <p className="text-gray-500 mb-4">
              {search || filterCategory !== "All" 
                ? "Try adjusting your search or filter criteria"
                : "Get started by creating your first blog"
              }
            </p>
            {!search && filterCategory === "All" && (
              <Link
                to="/admin/blogs/create"
                className="inline-flex items-center gap-2 px-4 py-2 bg-main text-white rounded-lg hover:bg-blue-700 transition"
              >
                <Plus size={16} /> Create Blog
              </Link>
            )}
          </div>
        ) : (
          paginatedBlogs.map((b) => (
            <div key={b._id} className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-start gap-3 mb-3">
                <input
                  type="checkbox"
                  checked={selectedBlogs.includes(b._id)}
                  onChange={() => toggleSelect(b._id)}
                  className="mt-1"
                />
                <img
                  src={b.images?.[0]?.url || "/no-image.png"}
                  alt={b.title}
                  className="w-20 h-20 object-cover rounded flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm mb-1 line-clamp-2">{b.title}</h3>
                  <p className="text-xs text-gray-500 mb-1 line-clamp-2">{b.description}</p>
                  <p className="text-xs text-gray-500 mb-2">{b.category?.title || "—"}</p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="text-xs text-gray-500">By: {b.author || "Admin"}</span>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Eye size={12} />
                      {b.numberViews || 0}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Heart size={12} />
                      {b.likes?.length || 0}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t">
                <Link
                  to={`/admin/blogs/edit/${b._id}`}
                  className="flex items-center gap-1 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded text-sm"
                >
                  <Edit size={14} />
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(b._id)}
                  className="flex items-center gap-1 px-3 py-2 text-red-600 hover:bg-red-50 rounded text-sm"
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-4">
        <p className="text-sm text-gray-500">
          Page {currentPage} / {totalPages || 1}
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 border rounded-lg disabled:opacity-50 hover:bg-gray-50"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2 border rounded-lg disabled:opacity-50 hover:bg-gray-50"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogList;
