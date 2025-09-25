// src/components/Footer.jsx

import React from 'react';
// Import các icon cần thiết
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaFacebookF, FaTwitter, FaPinterestP, FaGooglePlusG, FaLinkedinIn, FaFlickr } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const Footer = () => {
    return (
        <div className='w-full'>
            {/* --- Phần trên: Sign up newsletter --- */}
            <div className='bg-main w-full flex justify-center items-center py-6 sm:py-8'>
                <div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6'>
                        <div className='text-white text-center lg:text-left'>
                            <h3 className='text-lg sm:text-xl lg:text-2xl font-semibold'>SIGN UP TO NEWSLETTER</h3>
                            <p className='text-xs sm:text-sm mt-1'>Subscribe now and receive weekly newsletter</p>
                        </div>
                        <div className='relative w-full lg:w-1/2 max-w-md mx-auto lg:mx-0'>
                            <input 
                                type="text" 
                                placeholder='Email address'
                                className='w-full bg-[#f0f0f0] rounded-full p-3 sm:p-4 pr-14 sm:pr-16 text-gray-700 outline-none text-sm sm:text-base'
                            />
                            <button className='absolute top-0 right-0 h-full bg-main text-white p-3 sm:p-4 rounded-r-full hover:bg-red-600 transition-colors'>
                                <MdEmail size={16} className="sm:hidden" />
                                <MdEmail size={20} className="hidden sm:block" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Phần chính: Thông tin --- */}
            <div className='bg-[#191919] text-white w-full flex justify-center py-8 sm:py-12'>
                <div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8'>
                        {/* Cột 1: ABOUT US */}
                        <div>
                            <h3 className='text-base sm:text-lg font-semibold border-l-4 border-main pl-3 sm:pl-4 mb-4 sm:mb-6'>ABOUT US</h3>
                            <ul className='text-xs sm:text-sm text-gray-400 space-y-2 sm:space-y-3'>
                                <li className='flex items-start gap-2 sm:gap-3'>
                                    <FaMapMarkerAlt className='mt-1 flex-shrink-0' size={12} />
                                    <span>Address: 474 Ontario St Toronto, ON M4X 1M7 Canada</span>
                                </li>
                                <li className='flex items-center gap-2 sm:gap-3'>
                                    <FaPhoneAlt size={12} />
                                    <span>Phone: (+1234)56789xxx</span>
                                </li>
                                <li className='flex items-center gap-2 sm:gap-3'>
                                    <FaEnvelope size={12} />
                                    <span>Mail: tadathemes@gmail.com</span>
                                </li>
                            </ul>
                            <div className='flex gap-2 sm:gap-3 mt-4 flex-wrap'>
                                <a href="#" className='p-2 bg-gray-700 rounded-md hover:bg-main transition-colors'><FaFacebookF size={14} /></a>
                                <a href="#" className='p-2 bg-gray-700 rounded-md hover:bg-main transition-colors'><FaTwitter size={14} /></a>
                                <a href="#" className='p-2 bg-gray-700 rounded-md hover:bg-main transition-colors'><FaPinterestP size={14} /></a>
                                <a href="#" className='p-2 bg-gray-700 rounded-md hover:bg-main transition-colors'><FaGooglePlusG size={14} /></a>
                                <a href="#" className='p-2 bg-gray-700 rounded-md hover:bg-main transition-colors'><FaLinkedinIn size={14} /></a>
                                <a href="#" className='p-2 bg-gray-700 rounded-md hover:bg-main transition-colors'><FaFlickr size={14} /></a>
                            </div>
                        </div>

                        {/* Cột 2: INFORMATION */}
                        <div>
                            <h3 className='text-base sm:text-lg font-semibold border-l-4 border-main pl-3 sm:pl-4 mb-4 sm:mb-6'>INFORMATION</h3>
                            <ul className='text-xs sm:text-sm text-gray-400 space-y-2 sm:space-y-3'>
                                <li><a href="#" className='hover:text-main transition-colors'>Typography</a></li>
                                <li><a href="#" className='hover:text-main transition-colors'>Gallery</a></li>
                                <li><a href="#" className='hover:text-main transition-colors'>Store Location</a></li>
                                <li><a href="#" className='hover:text-main transition-colors'>Today's Deals</a></li>
                                <li><a href="#" className='hover:text-main transition-colors'>Contact</a></li>
                            </ul>
                        </div>

                        {/* Cột 3: WHO WE ARE */}
                        <div>
                            <h3 className='text-base sm:text-lg font-semibold border-l-4 border-main pl-3 sm:pl-4 mb-4 sm:mb-6'>WHO WE ARE</h3>
                            <ul className='text-xs sm:text-sm text-gray-400 space-y-2 sm:space-y-3'>
                                <li><a href="#" className='hover:text-main transition-colors'>Help</a></li>
                                <li><a href="#" className='hover:text-main transition-colors'>Free Shipping</a></li>
                                <li><a href="#" className='hover:text-main transition-colors'>FAQs</a></li>
                                <li><a href="#" className='hover:text-main transition-colors'>Return & Exchange</a></li>
                                <li><a href="#" className='hover:text-main transition-colors'>Testimonials</a></li>
                            </ul>
                        </div>

                        {/* Cột 4: #DIGITALWORLDSTORE */}
                        <div>
                            <h3 className='text-base sm:text-lg font-semibold border-l-4 border-main pl-3 sm:pl-4 mb-4 sm:mb-6'>#DIGITALWORLDSTORE</h3>
                            <p className='text-xs sm:text-sm text-gray-400'>Follow us on social media for latest updates and offers!</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Phần dưới cùng: Copyright --- */}
            <div className='bg-[#0f0f0f] text-gray-500 w-full flex justify-center py-3 sm:py-4'>
                <div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs sm:text-sm text-center'>
                    © 2025, Digital World 2 Powered by Shopify
                </div>
            </div>
        </div>
    );
};

export default Footer;