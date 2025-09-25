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
            <div className='w-full grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 my-6 sm:my-8'>
                <div className='bg-gray-200 animate-pulse rounded-lg h-48 sm:h-64 lg:h-80'></div>
                <div className='bg-gray-200 animate-pulse rounded-lg h-48 sm:h-64 lg:h-80'></div>
                <div className='bg-gray-200 animate-pulse rounded-lg h-48 sm:h-64 lg:h-80'></div>
                <div className='bg-gray-200 animate-pulse rounded-lg h-48 sm:h-64 lg:h-80'></div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className='w-full grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 my-6 sm:my-8'>
                <div className='bg-gray-200 rounded-lg h-48 sm:h-64 lg:h-80 flex items-center justify-center'>
                    <div className="text-gray-500 text-sm">Failed to load banners</div>
                </div>
                <div className='bg-gray-200 rounded-lg h-48 sm:h-64 lg:h-80 flex items-center justify-center'>
                    <div className="text-gray-500 text-sm">Failed to load banners</div>
                </div>
                <div className='bg-gray-200 rounded-lg h-48 sm:h-64 lg:h-80 flex items-center justify-center'>
                    <div className="text-gray-500 text-sm">Failed to load banners</div>
                </div>
                <div className='bg-gray-200 rounded-lg h-48 sm:h-64 lg:h-80 flex items-center justify-center'>
                    <div className="text-gray-500 text-sm">Failed to load banners</div>
                </div>
            </div>
        );
    }

    // No sliders state
    if (!sliders || sliders.length === 0) {
        return (
            <div className='w-full grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 my-6 sm:my-8'>
                <div className='bg-gray-200 rounded-lg h-48 sm:h-64 lg:h-80 flex items-center justify-center'>
                    <div className="text-gray-500 text-sm">No banners available</div>
                </div>
                <div className='bg-gray-200 rounded-lg h-48 sm:h-64 lg:h-80 flex items-center justify-center'>
                    <div className="text-gray-500 text-sm">No banners available</div>
                </div>
                <div className='bg-gray-200 rounded-lg h-48 sm:h-64 lg:h-80 flex items-center justify-center'>
                    <div className="text-gray-500 text-sm">No banners available</div>
                </div>
                <div className='bg-gray-200 rounded-lg h-48 sm:h-64 lg:h-80 flex items-center justify-center'>
                    <div className="text-gray-500 text-sm">No banners available</div>
                </div>
            </div>
        );
    }

    const renderBanner = (slider, className = '') => {
        const content = (
            <div className={`relative overflow-hidden rounded-lg group shadow-md hover:shadow-lg transition-all duration-300 ${className}`}>
                <img 
                    src={slider.image} 
                    alt={slider.title} 
                    className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105' 
                />
                <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300'></div>
                {/* Overlay with content */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-center text-white p-4">
                        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2">
                            {slider.title}
                        </h3>
                        {slider.description && (
                            <p className="text-sm sm:text-base lg:text-lg">
                                {slider.description}
                            </p>
                        )}
                        {slider.buttonText && (
                            <button className="mt-3 bg-white text-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                                {slider.buttonText}
                            </button>
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
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 my-6 sm:my-8'>
            {/* Banner 1 - Top Left */}
            {sliders[0] && renderBanner(sliders[0], 'h-48 sm:h-64 lg:h-80')}
            
            {/* Banner 2 - Top Right */}
            {sliders[1] && renderBanner(sliders[1], 'h-48 sm:h-64 lg:h-80')}

            {/* Banner 3 - Bottom Left */}
            {sliders[2] && renderBanner(sliders[2], 'h-48 sm:h-64 lg:h-80')}

            {/* Banner 4 - Bottom Right */}
            {sliders[3] && renderBanner(sliders[3], 'h-48 sm:h-64 lg:h-80')}
        </div>
    );
};

export default BigAdBanners;