// src/components/SelectOptions.jsx

import React from 'react';
import { FaHeart, FaList, FaEye } from 'react-icons/fa';

const SelectOptions = ({ onQuickView, productData }) => {
    return (
        <div className='absolute bottom-[100px] left-0 right-0 flex justify-center items-center gap-4
                        opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:bottom-[120px]'>
            <button className='w-12 h-12 bg-white rounded-full flex justify-center items-center text-gray-700 shadow-md hover:bg-main hover:text-white transition-all'>
                <FaHeart size={20} />
            </button>
        </div>
    );
};

export default SelectOptions;