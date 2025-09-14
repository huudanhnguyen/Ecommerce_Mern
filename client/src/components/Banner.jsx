// src/components/Banner.jsx

import React from 'react';
import Slider from 'react-slick'; // 1. Import thư viện Slider

// 2. Chuẩn bị một mảng chứa URL của các ảnh banner
const bannerImages = [
    "https://digital-world-2.myshopify.com/cdn/shop/files/promo-20_7441c713-b8bc-4549-b169-67001e3b91e1_1920x.png?v=1750840298",
    "https://digital-world-2.myshopify.com/cdn/shop/files/promo-21_94c561f6-4c50-4a5f-8868-0c7b804bc550_1920x.png?v=1750840379",
    // Thêm các URL ảnh khác vào đây nếu bạn muốn
];

const Banner = () => {
    // 3. Cấu hình cho slider
    const settings = {
        dots: true, // Hiển thị các chấm điều hướng
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true, // Tự động chạy
        autoplaySpeed: 3000, // Chuyển slide sau mỗi 3 giây
        arrows: true
    };

    return (
        <div className='w-full relative custom-banner-slick'>
            {/* 4. Sử dụng component Slider */}
            <Slider {...settings}>
                {/* 5. Map qua mảng ảnh để render từng slide */}
                {bannerImages.map((imageUrl, index) => (
                    <div key={index}>
                        <img 
                            src={imageUrl} 
                            alt={`banner-${index}`} 
                            className='w-full h-[395px]' // Giữ lại class để đảm bảo kích thước
                        />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Banner;