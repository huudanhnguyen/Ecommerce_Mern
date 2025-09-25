import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllProducts } from "../apis/product";
import { createSlug, formatPrice } from "../utils/helpers";
import path from "../utils/path";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [history, setHistory] = useState(() => {
    return JSON.parse(localStorage.getItem("searchHistory")) || [];
  });

  const navigate = useNavigate();

  // Lưu lịch sử vào localStorage
  const saveHistory = (keyword) => {
    let newHistory = [keyword, ...history.filter((h) => h !== keyword)];
    if (newHistory.length > 5) newHistory = newHistory.slice(0, 5);
    setHistory(newHistory);
    localStorage.setItem("searchHistory", JSON.stringify(newHistory));
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchTerm.trim().length < 2) {
        setSuggestions([]);
        return;
      }
      try {
        const res = await getAllProducts({ title: searchTerm, limit: 5 });
        if (res.data.success) {
          setSuggestions(res.data.products);
        }
      } catch (err) {
        console.error("Error fetching suggestions:", err);
      }
    };

    const delayDebounce = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  // ✅ Bấm Enter → sang SearchResult + lưu lịch sử + clear input
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?title=${encodeURIComponent(searchTerm)}`);
      saveHistory(searchTerm.trim());
      setSearchTerm(""); // xoá input
      setSuggestions([]);
    }
  };

  // ✅ Bấm chọn gợi ý → sang chi tiết sản phẩm
  const handleSelectSuggestion = (product) => {
    const detailUrl = `/${path.DETAIL_PRODUCT}/${product._id}/${createSlug(
      product.title || product.name
    )}`;
    navigate(detailUrl);
    setSearchTerm("");
    setSuggestions([]);
  };

  // ✅ Bấm chọn lịch sử → sang trang SearchResult
  const handleSelectHistory = (keyword) => {
    navigate(`/search?title=${encodeURIComponent(keyword)}`);
    saveHistory(keyword);
    setSearchTerm("");
    setSuggestions([]);
  };

  // Xoá 1 item khỏi lịch sử
  const handleRemoveHistoryItem = (keyword, e) => {
    e.stopPropagation();
    const newHistory = history.filter((h) => h !== keyword);
    setHistory(newHistory);
    localStorage.setItem("searchHistory", JSON.stringify(newHistory));
  };

  // Xoá toàn bộ lịch sử
  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem("searchHistory");
  };

  return (
    <div className="relative w-full max-w-xs sm:max-w-sm">
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          className="w-full border border-gray-300 rounded-md px-3 sm:px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent"
        />
      </form>

      {/* Dropdown gợi ý hoặc lịch sử */}
      {(suggestions.length > 0 || history.length > 0) && searchTerm && (
        <div className="absolute top-[110%] left-0 w-full bg-white border border-gray-200 shadow-lg rounded-md z-10">
          {suggestions.length > 0 ? (
            suggestions.map((p) => (
              <div
                key={p._id}
                onClick={() => handleSelectSuggestion(p)}
                className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
              >
                <img
                  src={
                    p.thumb ||
                    (p.images?.[0] ?? "https://via.placeholder.com/40")
                  }
                  alt={p.title || p.name}
                  className="w-8 h-8 object-cover rounded"
                />
                <div className="flex flex-col">
                  <span className="truncate">{p.title || p.name}</span>
                  <span className="text-xs text-gray-500">
                    {formatPrice(p.price)}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <>
              <div className="flex justify-between items-center px-3 py-2 text-xs text-gray-500 border-b">
                <span>History</span>
                <button
                  onClick={handleClearHistory}
                  className="text-red-500 hover:underline"
                >
                  Clear all
                </button>
              </div>
              {history.map((h) => (
                <div
                  key={h}
                  onClick={() => handleSelectHistory(h)}
                  className="flex items-center justify-between px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                >
                  <span>{h}</span>
                  <button
                    onClick={(e) => handleRemoveHistoryItem(h, e)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}
