import React from "react";
import logo from "../assets/logo.png";
import icons from "../utils/icons";
import { Link } from "react-router-dom";
import path from "../utils/path";
import { FaHeart } from "react-icons/fa";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

const { MdLocalPhone, MdOutlineEmail, FaBagShopping } = icons;

const Header = () => {
  const { wishlistItems } = useWishlist();
  const { cartItems } = useCart();

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center py-4 lg:py-8 gap-4">
        {/* Logo */}
        <div className="flex justify-center lg:justify-start">
          <Link to={`/${path.HOME}`}>
            <img src={logo} alt="logo" className="w-40 sm:w-48 lg:w-[234px] h-auto" />
          </Link>
        </div>

        {/* Contact Info & Actions - Hidden on mobile, visible on desktop */}
        <div className="hidden lg:flex text-sm">
          {/* Phone */}
          <div className="flex flex-col items-center px-4 xl:px-6 border-r">
            <span className="flex gap-2 items-center">
              <MdLocalPhone color="red" size={16} />
              <span className="font-semibold text-sm">0362 7148 69</span>
            </span>
            <span className="text-gray-500 text-xs">Mon-Sat 9:00AM - 8:00PM</span>
          </div>

          {/* Email */}
          <div className="flex flex-col items-center px-4 xl:px-6 border-r">
            <span className="flex gap-2 items-center">
              <MdOutlineEmail color="red" size={16} />
              <span className="font-semibold text-sm">support@huudanh.com</span>
            </span>
            <span className="text-gray-500 text-xs">Online Support 24/7</span>
          </div>

          {/* Wishlist & Cart */}
          <div className="flex flex-col items-center px-4 xl:px-6">
            <Link to={`/${path.WISHLIST}`} className="flex gap-2 items-center hover:text-red-500 transition-colors">
              <FaHeart color="red" size={16} />
              <span className="font-semibold text-sm">
                {wishlistItems.length} item(s)
              </span>
            </Link>
            <Link to={`/${path.CART}`} className="flex gap-2 items-center hover:text-red-500 transition-colors">
              <FaBagShopping color="red" size={16} />
              <span className="font-semibold text-sm">
                {cartItems.length} item(s)
              </span>
            </Link>
          </div>
        </div>

        {/* Mobile Actions - Visible on mobile only */}
        <div className="flex justify-center lg:hidden gap-6">
          <Link to={`/${path.WISHLIST}`} className="flex flex-col items-center text-red-500 hover:text-red-600 transition-colors">
            <FaHeart size={20} />
            <span className="text-xs font-semibold mt-1">
              {wishlistItems.length}
            </span>
          </Link>
          <Link to={`/${path.CART}`} className="flex flex-col items-center text-red-500 hover:text-red-600 transition-colors">
            <FaBagShopping size={20} />
            <span className="text-xs font-semibold mt-1">
              {cartItems.length}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
