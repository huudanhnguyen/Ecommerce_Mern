import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  getApiBlogCategories, 
  deleteBlogCategory 
} from "../../../apis/blogCategory";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  FileText,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const BlogCategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const itemsPerPage = 10;

  // Fetch categories
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

  useEffect(() => {
    fetchCategories();
  }, []);

  // Search + Filter
  const filteredCategories = categories.filter(
    (c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase()) ||
      c._id.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCategories = filteredCategories.slice(startIndex, endIndex);

  // Handle select all
  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedCategories(currentCategories.map(c => c._id));
    } else {
      setSelectedCategories([]);
    }
  };

  // Handle individual select
  const handleSelectCategory = (categoryId, checked) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, categoryId]);
    } else {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
    }
  };

  // Delete single category
  const handleDeleteCategory = async (categoryId) => {
    if (!confirm("Bạn có chắc chắn muốn xóa category này?")) return;

    try {
      await deleteBlogCategory(categoryId);
      alert("✅ Category deleted successfully!");
      fetchCategories();
    } catch (error) {
      console.error("❌ Error deleting category:", error);
      alert("Lỗi khi xóa category!");
    }
  };

  // Delete selected categories
  const handleDeleteSelected = async () => {
    if (selectedCategories.length === 0) {
      alert("Vui lòng chọn categories để xóa!");
      return;
    }

    if (!confirm(`Bạn có chắc chắn muốn xóa ${selectedCategories.length} categories?`)) return;

    try {
      await Promise.all(selectedCategories.map(id => deleteBlogCategory(id)));
      alert("✅ Categories deleted successfully!");
      setSelectedCategories([]);
      fetchCategories();
    } catch (error) {
      console.error("❌ Error deleting categories:", error);
      alert("Lỗi khi xóa categories!");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <FileText className="text-main" /> Blog Categories
        </h2>

        <div className="flex flex-wrap gap-2">
          <Link
            to="/admin/blog-categories/create"
            className="flex items-center gap-2 px-3 py-2 bg-main text-white rounded-lg hover:bg-blue-700 transition text-sm flex-1 min-w-0 justify-center"
          >
            <Plus size={16} /> 
            <span className="hidden sm:inline">Add Category</span>
            <span className="sm:hidden">Add</span>
          </Link>
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

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedCategories.length === currentCategories.length && currentCategories.length > 0}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="rounded border-gray-300 text-main focus:ring-main"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Slug
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentCategories.map((category) => (
                <tr key={category._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category._id)}
                      onChange={(e) => handleSelectCategory(category._id, e.target.checked)}
                      className="rounded border-gray-300 text-main focus:ring-main"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {category.title}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate">
                      {category.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {category.slug}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {new Date(category.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <Link
                        to={`/admin/blog-categories/edit/${category._id}`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit size={16} />
                      </Link>
                      <button
                        onClick={() => handleDeleteCategory(category._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
                  <span className="font-medium">{Math.min(endIndex, filteredCategories.length)}</span> of{" "}
                  <span className="font-medium">{filteredCategories.length}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        page === currentPage
                          ? "z-10 bg-main border-main text-white"
                          : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <ChevronRight size={20} />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Empty state */}
      {filteredCategories.length === 0 && (
        <div className="text-center py-12">
          <FileText className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No categories found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {search ? "Try adjusting your search terms." : "Get started by creating a new category."}
          </p>
          {!search && (
            <div className="mt-6">
              <Link
                to="/admin/blog-categories/create"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-main hover:bg-blue-700"
              >
                <Plus className="-ml-1 mr-2 h-5 w-5" />
                New Category
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BlogCategoryList;


