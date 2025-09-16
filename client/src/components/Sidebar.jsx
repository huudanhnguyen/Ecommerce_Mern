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
    <div className="flex flex-col border rounded-md">
      {/* --- Tiêu đề --- */}
      <div className="bg-main text-white font-semibold text-lg p-4 rounded-t-md">
        ALL COLLECTIONS
      </div>

      {/* --- Danh sách danh mục --- */}
      {loading ? (
        <div className="p-4">Loading categories...</div>
      ) : (
        categories?.map((el) => {
          const slug = createSlug(el.title); 
          const IconComponent = categoryIcons[slug] || HiOutlineCollection;

          return (
            <NavLink
              key={el._id}
              to={`/product/${slug}`} // ✅ Sửa lại đúng route
              className={({ isActive }) =>
                `p-4 flex items-center gap-4 text-sm hover:bg-gray-100 ${
                  isActive
                    ? "bg-main text-white hover:bg-main"
                    : "text-gray-700"
                }`
              }
            >
              <IconComponent size={18} />
              <span>{el.title}</span>
            </NavLink>
          );
        })
      )}
    </div>
  );
};

export default Sidebar;
