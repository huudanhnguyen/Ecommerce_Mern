// src/components/AdBanners.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { useSliders } from '../hooks/useSliders';

const AdBanners = () => {
    // Lấy advertisement banners từ API
    const { sliders, loading, error } = useSliders({ 
        type: 'advertisement',
        limit: 4 
    });

    // Loading state
    if (loading) {
        return (
            <div className='w-full grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5'>
                {[1, 2].map((i) => (
                    <div key={i} className='bg-gray-200 animate-pulse rounded-lg h-32 sm:h-40 lg:h-48'></div>
                ))}
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className='w-full grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5'>
                <div className='bg-gray-200 rounded-lg h-32 sm:h-40 lg:h-48 flex items-center justify-center'>
                    <div className="text-gray-500 text-sm">Failed to load banners</div>
                </div>
                <div className='bg-gray-200 rounded-lg h-32 sm:h-40 lg:h-48 flex items-center justify-center'>
                    <div className="text-gray-500 text-sm">Failed to load banners</div>
                </div>
            </div>
        );
    }

    // No sliders state - show default banners
    if (!sliders || sliders.length === 0) {
        return (
            <div className='w-full grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5'>
                <div className='bg-gray-200 rounded-lg h-32 sm:h-40 lg:h-48 flex items-center justify-center'>
                    <div className="text-gray-500 text-sm">No banners available</div>
                </div>
                <div className='bg-gray-200 rounded-lg h-32 sm:h-40 lg:h-48 flex items-center justify-center'>
                    <div className="text-gray-500 text-sm">No banners available</div>
                </div>
            </div>
        );
    }

    return (
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5'>
            {sliders.slice(0, 2).map((slider) => (
                <div key={slider._id}>
                    {slider.link ? (
                        <Link 
                            to={slider.link} 
                            className='block group overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300'
                        >
                            <div className="relative">
                                <img 
                                    src={slider.image} 
                                    alt={slider.title} 
                                    className='w-full h-32 sm:h-40 lg:h-48 object-cover group-hover:scale-105 transition-transform duration-300'
                                />
                                {/* Overlay with content */}
                                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="text-center text-white p-2">
                                        <h3 className="text-sm sm:text-base font-semibold mb-1">
                                            {slider.title}
                                        </h3>
                                        {slider.description && (
                                            <p className="text-xs sm:text-sm">
                                                {slider.description}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ) : (
                        <div className='group overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300'>
                            <div className="relative">
                                <img 
                                    src={slider.image} 
                                    alt={slider.title} 
                                    className='w-full h-32 sm:h-40 lg:h-48 object-cover group-hover:scale-105 transition-transform duration-300'
                                />
                                {/* Overlay with content */}
                                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="text-center text-white p-2">
                                        <h3 className="text-sm sm:text-base font-semibold mb-1">
                                            {slider.title}
                                        </h3>
                                        {slider.description && (
                                            <p className="text-xs sm:text-sm">
                                                {slider.description}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default AdBanners;