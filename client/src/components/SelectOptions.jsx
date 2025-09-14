// src/components/SelectOptions.jsx

import React from 'react';
import { FaHeart, FaList, FaEye } from 'react-icons/fa';

// Component nhận vào các props cần thiết từ cha (Product.jsx)
const SelectOptions = ({ onQuickView, productData }) => {
    return (
        // Đây chính là đoạn code bạn đã cắt từ Product.jsx
        <div className='absolute bottom-[100px] left-0 right-0 flex justify-center items-center gap-4
                        opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:bottom-[120px]'>
            <button className='w-12 h-12 bg-white rounded-full flex justify-center items-center text-gray-700 shadow-md hover:bg-main hover:text-white transition-all'>
                <FaHeart size={20} />
            </button>
            <button className='w-12 h-12 bg-white rounded-full flex justify-center items-center text-gray-700 shadow-md hover:bg-main hover:text-white transition-all'>
                <FaList size={20} />
            </button>
            {/* Nút Quick View cần gọi hàm onQuickView và truyền vào productData */}
            <button 
                onClick={(e) => {
                    e.stopPropagation(); // Ngăn sự kiện click lan ra các phần tử cha
                    onQuickView(productData);
                }}
                className='w-12 h-12 bg-white rounded-full flex justify-center items-center text-gray-700 shadow-md hover:bg-main hover:text-white transition-all'>
                <FaEye size={20} />
            </button>
        </div>
    );
};

export default SelectOptions;