import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllProducts } from "../../../apis/product";
import { getApiCategories } from "../../../apis/categoryProduct"; // 📌 Import API category
import { formatPrice } from "../../../utils/helpers.jsx";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Download,
  Upload,
  Package,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); // 📌 state lưu category
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // 📌 Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await getAllProducts({ page: 1, limit: 100 });
        if (Array.isArray(data.products)) {
          setProducts(data.products);
        }
      } catch (error) {
        console.error("❌ Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // 📌 Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await getApiCategories();
        if (Array.isArray(data)) {
          setCategories(data);
        }
      } catch (error) {
        console.error("❌ Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // 🔎 Search + Filter
  const filteredProducts = products.filter(
    (p) =>
      (filterCategory === "All" || p.category?.title === filterCategory) &&
      (p.title.toLowerCase().includes(search.toLowerCase()) ||
        p._id.toLowerCase().includes(search.toLowerCase()))
  );

  // 📄 Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Package className="text-main" /> Product Management
        </h2>

        <div className="flex flex-wrap gap-2">
          <Link
            to="/admin/products/create"
            className="flex items-center gap-2 px-3 py-2 bg-main text-white rounded-lg hover:bg-blue-700 transition text-sm"
          >
            <Plus size={16} /> Add Product
          </Link>
          <button className="flex items-center gap-2 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition text-sm">
            <Upload size={16} /> Import
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition text-sm">
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute top-2.5 left-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search product..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-main text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-main text-sm"
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
      <div className="hidden md:block bg-white p-6 rounded-lg shadow overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-600 text-sm">
              <th className="p-3 text-left">Thumbnail</th>
              <th className="p-3 text-left">Product Name</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Stock</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedProducts.map((p) => (
              <tr key={p._id} className="border-b hover:bg-gray-50 text-sm">
                <td className="p-3">
                  <img
                    src={p.thumb || "/no-image.png"}
                    alt={p.title}
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>
                <td className="p-3 font-medium">{p.title}</td>
                <td className="p-3">{p.category?.title || "—"}</td>
                <td className="p-3 text-red-600 font-semibold">
                  {formatPrice(p.price)}
                </td>
                <td className="p-3">{p.quantity}</td>
                <td className="p-3 flex justify-center gap-2">
                  <Link
                    to={`/admin/products/edit/${p._id}`}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                  >
                    <Edit size={16} />
                  </Link>
                  <button className="p-2 text-red-600 hover:bg-red-50 rounded">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card view - Mobile */}
      <div className="block md:hidden space-y-4">
        {paginatedProducts.map((p) => (
          <div
            key={p._id}
            className="bg-white rounded-lg shadow p-4 flex flex-col space-y-2"
          >
            <div className="flex items-center gap-3">
              <img
                src={p.thumb || "/no-image.png"}
                alt={p.title}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{p.title}</h3>
                <p className="text-sm text-gray-500">
                  Category: {p.category?.title || "—"}
                </p>
                <p className="text-sm text-gray-500">Stock: {p.quantity}</p>
              </div>
              <span className="text-red-600 font-semibold">
                {formatPrice(p.price)}
              </span>
            </div>
            <div className="flex gap-2 mt-2">
              <Link
                to={`/admin/products/edit/${p._id}`}
                className="flex-1 py-1 bg-blue-50 text-blue-600 rounded text-sm text-center"
              >
                <Edit size={14} className="inline mr-1" /> Edit
              </Link>
              <button className="flex-1 py-1 bg-red-50 text-red-600 rounded text-sm">
                <Trash2 size={14} className="inline mr-1" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-500">
          Page {currentPage} / {totalPages || 1}
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 border rounded-lg disabled:opacity-50"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2 border rounded-lg disabled:opacity-50"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
