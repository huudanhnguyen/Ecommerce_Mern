// src/components/SelectOptions.jsx
import React from "react";
import { FaHeart } from "react-icons/fa";
import { useWishlist } from "../context/WishlistContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SelectOptions = ({ onQuickView, productData }) => {
  const { addToWishlist, wishlistItems, removeFromWishlist } = useWishlist();

  // Kiểm tra sản phẩm đã trong danh sách yêu thích chưa
  const exists = wishlistItems.some((it) => it._id === productData._id);

  const handleWishlistClick = () => {
    if (exists) {
      removeFromWishlist(productData._id);
      toast.info("❌ Removed from favorites list");
    } else {
      addToWishlist(productData);
      toast.success("❤️ Added to favorites list");
    }
  };

  return (
    <div
      className="absolute bottom-[100px] left-0 right-0 flex justify-center items-center gap-4
                 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:bottom-[120px]"
    >
      <button
        onClick={handleWishlistClick}
        className={`w-12 h-12 rounded-full flex justify-center items-center shadow-md transition-all
          ${exists ? "bg-white text-red-500 border border-red-500" : "bg-white text-gray-700 hover:bg-main hover:text-white"}`}
      >
        <FaHeart size={20} />
      </button>
    </div>
  );
};

export default SelectOptions;
