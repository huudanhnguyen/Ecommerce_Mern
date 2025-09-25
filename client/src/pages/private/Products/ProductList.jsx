import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllProducts, deleteProduct } from "../../../apis/product"; // 📌 thêm deleteProduct
import { getApiCategories } from "../../../apis/categoryProduct"; 
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
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProducts, setSelectedProducts] = useState([]); // 📌 lưu sản phẩm được chọn
  const itemsPerPage = 10;

  // 📌 Fetch products
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

  useEffect(() => {
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

  // 📌 Toggle chọn sản phẩm
  const toggleSelect = (id) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  // 📌 Chọn tất cả
  const toggleSelectAll = () => {
    const idsOnPage = paginatedProducts.map((p) => p._id);
    if (idsOnPage.every((id) => selectedProducts.includes(id))) {
      setSelectedProducts((prev) => prev.filter((id) => !idsOnPage.includes(id)));
    } else {
      setSelectedProducts((prev) => [...new Set([...prev, ...idsOnPage])]);
    }
  };

  // 📌 Xóa 1 sản phẩm
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) {
      try {
        await deleteProduct(id);
        setProducts((prev) => prev.filter((p) => p._id !== id));
        setSelectedProducts((prev) => prev.filter((pid) => pid !== id));
      } catch (error) {
        console.error("❌ Error deleting product:", error);
      }
    }
  };

  // 📌 Xóa nhiều sản phẩm
  const handleDeleteSelected = async () => {
    if (selectedProducts.length === 0) {
      alert("Vui lòng chọn ít nhất 1 sản phẩm để xóa.");
      return;
    }
    if (window.confirm("Bạn có chắc chắn muốn xóa các sản phẩm đã chọn không?")) {
      try {
        await Promise.all(selectedProducts.map((id) => deleteProduct(id)));
        setProducts((prev) => prev.filter((p) => !selectedProducts.includes(p._id)));
        setSelectedProducts([]);
      } catch (error) {
        console.error("❌ Error deleting selected products:", error);
      }
    }
  };

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
          <button
            onClick={handleDeleteSelected}
            className="flex items-center gap-2 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm"
          >
            <Trash2 size={16} /> Delete Selected
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
              <th className="p-3">
                <input
                  type="checkbox"
                  onChange={toggleSelectAll}
                  checked={
                    paginatedProducts.length > 0 &&
                    paginatedProducts.every((p) => selectedProducts.includes(p._id))
                  }
                />
              </th>
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
                <td className="p-3 text-center">
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(p._id)}
                    onChange={() => toggleSelect(p._id)}
                  />
                </td>
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
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
