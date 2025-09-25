// src/components/HotCollections.jsx

import React, { useState, useEffect } from "react";
import { getApiCategories } from "../apis/categoryProduct";

const HotCollections = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await getApiCategories();

        let categoriesData = [];

        if (Array.isArray(response?.data)) {
          categoriesData = response.data;
        } else if (Array.isArray(response?.data?.data)) {
          categoriesData = response.data.data;
        } else if (Array.isArray(response?.data?.categories)) {
          categoriesData = response.data.categories;
        } else {
          console.warn("API response format is not as expected.");
        }

// 🔥 Lọc bỏ Camera & Speaker
const hiddenCategories = ["camera", "speaker"];

categoriesData = categoriesData.filter((cat) => {
  const cateName = cat.title?.trim().toLowerCase();
  return !hiddenCategories.includes(cateName);
});

        setCategories(categoriesData);
      } catch (error) {
        console.error("Failed to fetch hot collections:", error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="w-full p-4 sm:p-6 bg-white">
      <h3 className="text-xl sm:text-2xl font-bold mb-6 border-b-2 border-red-500 pb-2">
        HOT COLLECTIONS
      </h3>

      {loading ? (
        <div className="flex justify-center items-center py-8">
          <p className="text-gray-500">Loading data...</p>
        </div>
      ) : categories.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="flex items-center gap-3 sm:gap-4 p-4 sm:p-6 border rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105"
            >
              {/* Icon / Image */}
              {cat.img && (
                <img
                  src={cat.img}
                  alt={cat.cate}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-contain flex-shrink-0"
                />
              )}

              {/* Text content */}
              <div className="flex-1 min-w-0">
                <h4 className="text-base sm:text-lg font-bold uppercase mb-2 text-gray-800">
                  {cat.cate}
                </h4>
                <ul className="space-y-1 text-gray-600 text-xs sm:text-sm">
                  {cat.brand &&
                    Array.isArray(cat.brand) &&
                    cat.brand.slice(0, 5).map((b, i) => (
                      <li key={i} className="flex items-center gap-1">
                        <span className="text-red-500">›</span>
                        <span className="truncate">{b}</span>
                      </li>
                    ))}
                  {cat.brand && cat.brand.length > 5 && (
                    <li className="text-gray-400 text-xs">
                      +{cat.brand.length - 5} more...
                    </li>
                  )}
                </ul>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center py-8">
          <p className="text-gray-500">No categories found.</p>
        </div>
      )}
    </div>
  );
};

export default HotCollections;
