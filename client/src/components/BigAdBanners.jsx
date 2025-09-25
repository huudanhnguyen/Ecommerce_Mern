// src/components/BigAdBanners.jsx

import React from 'react';

const banners = {
    electronicSale: "https://digital-world-2.myshopify.com/cdn/shop/files/Blue_And_Yellow_Modern_Electronic_Sale_Instagram_Post_580_x_655_px_1_600x.png?v=1750860746",
    juiceBlender: "https://digital-world-2.myshopify.com/cdn/shop/files/Orange_Colorful_Juicer_Photo_Instagram_Post_280_x_338_px_1_400x.png?v=1750860819",
    cookwareSet: "https://digital-world-2.myshopify.com/cdn/shop/files/Red_and_Yellow_Classic_Neutrals_Cooking_Set_Product_Summer_Instagram_Post_280_x_338_px_1_cd2b3108-c6f2-4ee5-9597-8a501c61f0d6_400x.png?v=1750861662",
    megaSale:"https://digital-world-2.myshopify.com/cdn/shop/files/Blue_Yellow_Simple_Mega_Sale_Electronic_Instagram_Post_280_x_655_px_1_400x.png?v=1750862046"
}
const BigAdBanners = () => {
    return (
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6 sm:my-8'>
            {/* Cột 1: Chiếm 2 cột */}
            <a href="#" className='sm:col-span-2 lg:col-span-2 relative overflow-hidden rounded-lg group shadow-md hover:shadow-lg transition-shadow duration-300'>
                <img src={banners.electronicSale} alt="Electronic Sale" 
                     className='w-full h-48 sm:h-64 lg:h-80 object-cover transition-transform duration-500 group-hover:scale-105' />
                <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300'></div>
            </a>
            
            {/* Cột 2: Gồm 2 ảnh xếp dọc */}
            <div className='flex flex-col gap-4'>
                <a href="#" className='flex-1 relative overflow-hidden rounded-lg group shadow-md hover:shadow-lg transition-shadow duration-300'>
                    <img src={banners.juiceBlender} alt="Juice Blender" 
                         className='w-full h-32 sm:h-40 lg:h-48 object-cover transition-transform duration-500 group-hover:scale-105' />
                    <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300'></div>
                </a>
                <a href="#" className='flex-1 relative overflow-hidden rounded-lg group shadow-md hover:shadow-lg transition-shadow duration-300'>
                    <img src={banners.cookwareSet} alt="Cookware Set" 
                         className='w-full h-32 sm:h-40 lg:h-48 object-cover transition-transform duration-500 group-hover:scale-105' />
                    <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300'></div>
                </a>
            </div>

            {/* Cột 3: Chiếm 1 cột */}
            <a href="#" className='relative overflow-hidden rounded-lg group shadow-md hover:shadow-lg transition-shadow duration-300'>
                <img src={banners.megaSale} alt="Mega Sale" 
                     className='w-full h-48 sm:h-64 lg:h-80 object-cover transition-transform duration-500 group-hover:scale-105' />
                <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300'></div>
            </a>
        </div>
    );
};

export default BigAdBanners;