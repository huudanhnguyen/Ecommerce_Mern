// src/components/Banner.jsx

import React from 'react';
import Slider from 'react-slick';
import { useSliders } from '../hooks/useSliders';
import { Link } from 'react-router-dom';

const Banner = () => {
    // Lấy sliders từ API
    const { sliders, loading, error } = useSliders({ 
        type: 'banner',
        limit: 10 
    });

    // Cấu hình cho slider
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        arrows: true,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    dots: true
                }
            }
        ]
    };

    // Loading state
    if (loading) {
        return (
            <div className='w-full relative custom-banner-slick rounded-lg overflow-hidden shadow-lg'>
                <div className='w-full h-[250px] sm:h-[350px] lg:h-[395px] bg-gray-200 animate-pulse flex items-center justify-center'>
                    <div className="text-gray-500">Loading banners...</div>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className='w-full relative custom-banner-slick rounded-lg overflow-hidden shadow-lg'>
                <div className='w-full h-[250px] sm:h-[350px] lg:h-[395px] bg-gray-200 flex items-center justify-center'>
                    <div className="text-gray-500">Failed to load banners</div>
                </div>
            </div>
        );
    }

    // No sliders state
    if (!sliders || sliders.length === 0) {
        return (
            <div className='w-full relative custom-banner-slick rounded-lg overflow-hidden shadow-lg'>
                <div className='w-full h-[250px] sm:h-[350px] lg:h-[395px] bg-gray-200 flex items-center justify-center'>
                    <div className="text-gray-500">No banners available</div>
                </div>
            </div>
        );
    }

    return (
        <div className='w-full relative custom-banner-slick rounded-lg overflow-hidden shadow-lg'>
            <Slider {...settings}>
                {sliders.map((slider) => (
                    <div key={slider._id}>
                        {slider.link ? (
                            <Link to={slider.link} className="block group">
                                <div className="relative">
                                    <img 
                                        src={slider.image} 
                                        alt={slider.title} 
                                        className='w-full h-[250px] sm:h-[350px] lg:h-[395px] object-cover group-hover:scale-105 transition-transform duration-500'
                                    />
                                    {/* Overlay with content */}
                                    <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                                        <div className="text-center text-white p-4">
                                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
                                                {slider.title}
                                            </h2>
                                            {slider.description && (
                                                <p className="text-sm sm:text-base lg:text-lg mb-4 max-w-2xl">
                                                    {slider.description}
                                                </p>
                                            )}
                                            {slider.buttonText && (
                                                <button className="bg-main hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                                                    {slider.buttonText}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ) : (
                            <div className="relative">
                                <img 
                                    src={slider.image} 
                                    alt={slider.title} 
                                    className='w-full h-[250px] sm:h-[350px] lg:h-[395px] object-cover'
                                />
                                {/* Overlay with content */}
                                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                                    <div className="text-center text-white p-4">
                                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
                                            {slider.title}
                                        </h2>
                                        {slider.description && (
                                            <p className="text-sm sm:text-base lg:text-lg mb-4 max-w-2xl">
                                                {slider.description}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Banner;