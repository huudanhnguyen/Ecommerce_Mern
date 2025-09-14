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
            <h3 className='text-xl font-semibold py-4 border-b-2 border-main'>
                FEATURED PRODUCTS
            </h3>
            
            {/* --- Lưới sản phẩm 3x3 --- */}
            <div className='mt-4 grid grid-cols-1 md:grid-cols-3 gap-4'>
                {products?.map(product => (
                    // 3. Sử dụng component ProductCard
                    <ProductCard key={product._id} productData={product} />
                ))}
            </div>
        </div>
    );
};

export default FeaturedProducts;