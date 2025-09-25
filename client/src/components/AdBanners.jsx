// src/components/AdBanners.jsx

import React from 'react';

// Không cần import ảnh nữa, thay vào đó chúng ta định nghĩa URL trực tiếp
const banner1Url = "https://digital-world-2.myshopify.com/cdn/shop/files/promo-23_2000x_crop_center.png?v=1750842393";
const banner2Url = "https://digital-world-2.myshopify.com/cdn/shop/files/promo-24_2000x_crop_center.png?v=1750842410";

const AdBanners = () => {
    return (
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5'>
            <a href="#" className='block group overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300'>
                <img 
                    src={banner1Url} 
                    alt="Discover the new watch" 
                    className='w-full h-32 sm:h-40 lg:h-48 object-cover group-hover:scale-105 transition-transform duration-300'
                />
            </a>
            <a href="#" className='block group overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300'>
                <img 
                    src={banner2Url} 
                    alt="We're launching exclusive phone" 
                    className='w-full h-32 sm:h-40 lg:h-48 object-cover group-hover:scale-105 transition-transform duration-300'
                />
            </a>
        </div>
    );
};

export default AdBanners;