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
    <div className="w-main flex justify-between h-[11px] py-[35px]">
      <Link to={`/${path.HOME}`}>
        <img src={logo} alt="logo" className="w-[234px] h-[24px]" />
      </Link>
      <div className="flex text-[13px]">
        {/* Phone */}
        <div className="flex flex-col items-center px-6 border-r">
          <span className="flex gap-3 items-center">
            <MdLocalPhone color="red" />
            <span className="font-semibold">0362 7148 69</span>
          </span>
          <span className="text-gray-500">Mon-Sat 9:00AM - 8:00PM</span>
        </div>

        {/* Email */}
        <div className="flex flex-col items-center px-6 border-r">
          <span className="flex gap-3 items-center">
            <MdOutlineEmail color="red" />
            <span className="font-semibold">support@huudanh.com</span>
          </span>
          <span className="text-gray-500">Online Support 24/7</span>
        </div>

        {/* Wishlist & Cart */}
        <div className="flex flex-col items-center px-6 border-r">
          <Link to={`/${path.WISHLIST}`} className="flex gap-2 items-center">
            <FaHeart color="red" />
            <span className="font-semibold">
              {wishlistItems.length} item(s)
            </span>
          </Link>
          <Link to={`/${path.CART}`} className="flex gap-2 items-center">
            <FaBagShopping color="red" />
            <span className="font-semibold">
              {cartItems.length} item(s)
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
