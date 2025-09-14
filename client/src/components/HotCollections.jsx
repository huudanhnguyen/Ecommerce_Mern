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
    <div className="w-full p-6 bg-white">
      <h3 className="text-2xl font-bold mb-4 border-b-2 border-red-500 pb-2">
        HOT COLLECTIONS
      </h3>

      {loading ? (
        <p className="text-gray-500">Loading data...</p>
      ) : categories.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-6 border rounded-lg shadow-sm hover:shadow-md transition"
            >
              {/* Icon / Image */}
              {cat.img && (
                <img
                  src={cat.img}
                  alt={cat.cate}
                  className="w-20 h-20 object-contain"
                />
              )}

              {/* Text content */}
              <div>
                <h4 className="text-lg font-bold uppercase mb-2">
                  {cat.cate}
                </h4>
                <ul className="space-y-1 text-gray-600 text-sm">
                  {cat.brand &&
                    Array.isArray(cat.brand) &&
                    cat.brand.map((b, i) => (
                      <li key={i} className="flex items-center gap-1">
                        <span className="text-red-500">›</span>
                        <span>{b}</span>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No categories found.</p>
      )}
    </div>
  );
};

export default HotCollections;
