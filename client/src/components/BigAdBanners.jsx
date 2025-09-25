// src/components/BigAdBanners.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { useSliders } from '../hooks/useSliders';

const BigAdBanners = () => {
    // Lấy sliders từ API
    const { sliders, loading, error } = useSliders({ 
        type: 'advertisement',
        limit: 4 
    });

    // Loading state
    if (loading) {
        return (
            <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6 sm:my-8'>
                <div className='sm:col-span-2 lg:col-span-2 bg-gray-200 animate-pulse rounded-lg h-40 sm:h-56 lg:h-72'></div>
                <div className='flex flex-col gap-4'>
                    <div className='bg-gray-200 animate-pulse rounded-lg h-36 sm:h-44 lg:h-52'></div>
                    <div className='bg-gray-200 animate-pulse rounded-lg h-36 sm:h-44 lg:h-52'></div>
                </div>
                <div className='bg-gray-200 animate-pulse rounded-lg h-40 sm:h-56 lg:h-72'></div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6 sm:my-8'>
                <div className='sm:col-span-2 lg:col-span-2 bg-gray-200 rounded-lg h-40 sm:h-56 lg:h-72 flex items-center justify-center'>
                    <div className="text-gray-500 text-sm">Failed to load banners</div>
                </div>
                <div className='flex flex-col gap-4'>
                    <div className='bg-gray-200 rounded-lg h-36 sm:h-44 lg:h-52 flex items-center justify-center'>
                        <div className="text-gray-500 text-xs">Failed</div>
                    </div>
                    <div className='bg-gray-200 rounded-lg h-36 sm:h-44 lg:h-52 flex items-center justify-center'>
                        <div className="text-gray-500 text-xs">Failed</div>
                    </div>
                </div>
                <div className='bg-gray-200 rounded-lg h-40 sm:h-56 lg:h-72 flex items-center justify-center'>
                    <div className="text-gray-500 text-sm">Failed</div>
                </div>
            </div>
        );
    }

    // No sliders state
    if (!sliders || sliders.length === 0) {
    return (
            <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6 sm:my-8'>
                <div className='sm:col-span-2 lg:col-span-2 bg-gray-200 rounded-lg h-40 sm:h-56 lg:h-72 flex items-center justify-center'>
                    <div className="text-gray-500 text-sm">No banners available</div>
                </div>
                <div className='flex flex-col gap-4'>
                    <div className='bg-gray-200 rounded-lg h-36 sm:h-44 lg:h-52 flex items-center justify-center'>
                        <div className="text-gray-500 text-xs">No banners</div>
                    </div>
                    <div className='bg-gray-200 rounded-lg h-36 sm:h-44 lg:h-52 flex items-center justify-center'>
                        <div className="text-gray-500 text-xs">No banners</div>
                    </div>
                </div>
                <div className='bg-gray-200 rounded-lg h-40 sm:h-56 lg:h-72 flex items-center justify-center'>
                    <div className="text-gray-500 text-sm">No banners</div>
                </div>
            </div>
        );
    }

    const renderBanner = (slider, className = '') => {
        const content = (
            <div className={`relative overflow-hidden rounded-lg group shadow-md hover:shadow-lg transition-shadow duration-300 ${className}`}>
                <img 
                    src={slider.image} 
                    alt={slider.title} 
                    className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105' 
                />
                <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300'></div>
                {/* Overlay with content */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-center text-white p-4">
                        <h3 className="text-lg sm:text-xl font-bold mb-2">
                            {slider.title}
                        </h3>
                        {slider.description && (
                            <p className="text-sm sm:text-base">
                                {slider.description}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        );

        return slider.link ? (
            <Link to={slider.link} className="block">
                {content}
            </Link>
        ) : content;
    };

    return (
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6 sm:my-8'>
            {/* Cột 1: Chiếm 2 cột - Banner lớn đầu tiên */}
            {sliders[0] && renderBanner(sliders[0], 'sm:col-span-2 lg:col-span-2 h-40 sm:h-56 lg:h-72')}
            
            {/* Cột 2: Gồm 2 ảnh xếp dọc */}
            <div className='flex flex-col gap-4'>
                {sliders[1] && renderBanner(sliders[1], 'flex-1 h-36 sm:h-44 lg:h-52')}
                {sliders[2] && renderBanner(sliders[2], 'flex-1 h-36 sm:h-44 lg:h-52')}
            </div>

            {/* Cột 3: Chiếm 1 cột - Banner lớn cuối cùng */}
            {sliders[3] && renderBanner(sliders[3], 'h-40 sm:h-56 lg:h-72')}
        </div>
    );
};

export default BigAdBanners;