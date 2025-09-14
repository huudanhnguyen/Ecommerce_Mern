// src/components/Sidebar.jsx

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchCategories } from '../store/asyncActions';
import { createSlug } from '../utils/helpers.jsx'; // 1. Import hàm createSlug
import { categoryIcons } from '../utils/icons'; // 2. Import icon map

const Sidebar = () => {
    const dispatch = useDispatch();
    const { categories, loading } = useSelector(state => state.app);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    return (
        <div className='flex flex-col border rounded-md'>
            {/* --- Tiêu đề --- */}
            <div className='bg-main text-white font-semibold text-lg p-4 rounded-t-md'>
                ALL COLLECTIONS
            </div>

            {/* --- Danh sách danh mục --- */}
            {loading ? (
                <div className='p-4'>Loading categories...</div>
            ) : (
                categories?.map(el => {
                    // 3. Tìm icon tương ứng với danh mục
                    const slug = createSlug(el.title); // Tạo slug từ title, ví dụ: "Smartphone" -> "smartphone"
                    const IconComponent = categoryIcons[slug] || DefaultCategoryIcon; // Tìm icon, nếu không thấy thì dùng icon mặc định

                    return (
                        <NavLink
                            key={el._id}
                            to={`/${slug}`}
                            className={({ isActive }) => 
                                `p-4 flex items-center gap-4 text-sm hover:bg-gray-100 ${
                                    isActive 
                                    ? 'bg-main text-white hover:bg-main' 
                                    : 'text-gray-700'
                                }`
                            }
                        >
                            {/* 4. Render icon */}
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