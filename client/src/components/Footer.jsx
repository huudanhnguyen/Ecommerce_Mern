// src/components/Footer.jsx

import React from 'react';
// Import các icon cần thiết
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaFacebookF, FaTwitter, FaPinterestP, FaGooglePlusG, FaLinkedinIn, FaFlickr } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const Footer = () => {
    return (
        <div className='w-full'>
            {/* --- Phần trên: Sign up newsletter --- */}
            <div className='bg-main w-full flex justify-center items-center py-8'>
                <div className='w-main flex items-center justify-between'>
                    <div className='text-white'>
                        <h3 className='text-2xl font-semibold'>SIGN UP TO NEWSLETTER</h3>
                        <p className='text-sm'>Subscribe now and receive weekly newsletter</p>
                    </div>
                    <div className='relative w-1/2'>
                        <input 
                            type="text" 
                            placeholder='Email address'
                            className='w-full bg-[#f0f0f0] rounded-full p-4 pr-16 text-gray-700 outline-none'
                        />
                        <button className='absolute top-0 right-0 h-full bg-main text-white p-4 rounded-r-full'>
                            <MdEmail size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* --- Phần chính: Thông tin --- */}
            <div className='bg-[#191919] text-white w-full flex justify-center py-12'>
                <div className='w-main grid grid-cols-1 md:grid-cols-4 gap-8'>
                    {/* Cột 1: ABOUT US */}
                    <div>
                        <h3 className='text-lg font-semibold border-l-4 border-main pl-4 mb-6'>ABOUT US</h3>
                        <ul className='text-sm text-gray-400 space-y-3'>
                            <li className='flex items-start gap-3'><FaMapMarkerAlt className='mt-1' /><span>Address: 474 Ontario St Toronto, ON M4X 1M7 Canada</span></li>
                            <li className='flex items-center gap-3'><FaPhoneAlt /><span>Phone: (+1234)56789xxx</span></li>
                            <li className='flex items-center gap-3'><FaEnvelope /><span>Mail: tadathemes@gmail.com</span></li>
                        </ul>
                        <div className='flex gap-3 mt-4'>
                            <a href="#" className='p-2 bg-gray-700 rounded-md hover:bg-main'><FaFacebookF /></a>
                            <a href="#" className='p-2 bg-gray-700 rounded-md hover:bg-main'><FaTwitter /></a>
                            <a href="#" className='p-2 bg-gray-700 rounded-md hover:bg-main'><FaPinterestP /></a>
                            <a href="#" className='p-2 bg-gray-700 rounded-md hover:bg-main'><FaGooglePlusG /></a>
                            <a href="#" className='p-2 bg-gray-700 rounded-md hover:bg-main'><FaLinkedinIn /></a>
                            <a href="#" className='p-2 bg-gray-700 rounded-md hover:bg-main'><FaFlickr /></a>
                        </div>
                    </div>

                    {/* Cột 2: INFORMATION */}
                    <div>
                        <h3 className='text-lg font-semibold border-l-4 border-main pl-4 mb-6'>INFORMATION</h3>
                        <ul className='text-sm text-gray-400 space-y-3'>
                            <li><a href="#" className='hover:text-main'>Typography</a></li>
                            <li><a href="#" className='hover:text-main'>Gallery</a></li>
                            <li><a href="#" className='hover:text-main'>Store Location</a></li>
                            <li><a href="#" className='hover:text-main'>Today's Deals</a></li>
                            <li><a href="#" className='hover:text-main'>Contact</a></li>
                        </ul>
                    </div>

                    {/* Cột 3: WHO WE ARE */}
                    <div>
                        <h3 className='text-lg font-semibold border-l-4 border-main pl-4 mb-6'>WHO WE ARE</h3>
                        <ul className='text-sm text-gray-400 space-y-3'>
                            <li><a href="#" className='hover:text-main'>Help</a></li>
                            <li><a href="#" className='hover:text-main'>Free Shipping</a></li>
                            <li><a href="#" className='hover:text-main'>FAQs</a></li>
                            <li><a href="#" className='hover:text-main'>Return & Exchange</a></li>
                            <li><a href="#" className='hover:text-main'>Testimonials</a></li>
                        </ul>
                    </div>

                    {/* Cột 4: #DIGITALWORLDSTORE */}
                    <div>
                        <h3 className='text-lg font-semibold border-l-4 border-main pl-4 mb-6'>#DIGITALWORLDSTORE</h3>
                        {/* Phần này có thể là một component gallery ảnh từ Instagram sau này */}
                    </div>
                </div>
            </div>

            {/* --- Phần dưới cùng: Copyright --- */}
            <div className='bg-[#0f0f0f] text-gray-500 w-full flex justify-center py-4'>
                <div className='w-main text-sm text-center'>
                    © 2025, Digital World 2 Powered by Shopify
                </div>
            </div>
        </div>
    );
};

export default Footer;