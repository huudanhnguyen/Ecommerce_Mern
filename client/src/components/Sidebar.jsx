// src/components/Sidebar.jsx

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchCategories } from "../store/asyncActions";
import { createSlug } from "../utils/helpers.jsx";
import { categoryIcons } from "../utils/icons";
import { HiOutlineCollection } from "react-icons/hi"; // Icon mặc định

const Sidebar = () => {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state) => state.app);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="flex flex-col border rounded-lg shadow-sm bg-white">
      {/* --- Tiêu đề --- */}
      <div className="bg-main text-white font-semibold text-base sm:text-lg p-3 sm:p-4 rounded-t-lg">
        ALL COLLECTIONS
      </div>

      {/* --- Danh sách danh mục --- */}
      {loading ? (
        <div className="p-4 text-center text-gray-500 text-sm">Loading categories...</div>
      ) : (
        <div className="max-h-96 overflow-y-auto">
          {categories?.map((el) => {
            const slug = createSlug(el.title); 
            const IconComponent = categoryIcons[slug] || HiOutlineCollection;

            return (
              <NavLink
                key={el._id}
                to={`/product/${slug}`}
                className={({ isActive }) =>
                  `p-3 sm:p-4 flex items-center gap-3 sm:gap-4 text-sm hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 ${
                    isActive
                      ? "bg-red-50 text-main font-semibold border-l-4 border-l-main"
                      : "text-gray-700 hover:text-main"
                  }`
                }
              >
                <IconComponent size={16} className="flex-shrink-0" />
                <span className="truncate">{el.title}</span>
              </NavLink>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
