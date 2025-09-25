// src/components/FeaturedProducts.jsx

import React, { useState, useEffect } from 'react';
import { getAllProducts } from '../apis/product';
import ProductCard from './ProductCard'; // 1. Import component ProductCard mới

const FeaturedProducts = () => {
    const [products, setProducts] = useState(null);

    const fetchProducts = async () => {
        try {
            // Lấy một lượng sản phẩm đủ lớn để random
            const response = await getAllProducts({ limit: 50 }); 
            if (response?.data?.success) {
                // 2. Logic để lấy ngẫu nhiên 9 sản phẩm
                const allProducts = response.data.products;
                const shuffled = allProducts.sort(() => 0.5 - Math.random()); // Xáo trộn mảng
                setProducts(shuffled.slice(0, 9)); // Lấy 9 sản phẩm đầu tiên
            }
        } catch (error) {
            console.error("Failed to fetch featured products:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className='w-full'>
            {/* --- Tiêu đề Section --- */}
            <h3 className='text-xl sm:text-2xl font-bold py-4 border-b-2 border-main text-gray-800'>
                FEATURED PRODUCTS
            </h3>
            
            {/* --- Lưới sản phẩm responsive --- */}
            <div className='mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
                {products?.map(product => (
                    <ProductCard key={product._id} productData={product} />
                ))}
            </div>
        </div>
    );
};

export default FeaturedProducts;