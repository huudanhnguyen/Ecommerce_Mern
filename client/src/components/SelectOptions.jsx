import React from "react";
import { FaHeart } from "react-icons/fa";
import { useWishlistActions } from "../hooks/useWishlistActions";

const SelectOptions = ({ onQuickView, productData }) => {
  const { exists, handleToggle } = useWishlistActions(productData._id);

  return (
    <div
      className="absolute bottom-[100px] left-0 right-0 flex justify-center items-center gap-4
                 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:bottom-[120px]"
    >
      <button
        onClick={handleToggle}
        className={`w-12 h-12 rounded-full flex justify-center items-center shadow-md transition-all
          ${exists ? "bg-white text-red-500 border border-red-500" : "bg-white text-gray-700 hover:bg-main hover:text-white"}`}
      >
        <FaHeart size={20} />
      </button>
    </div>
  );
};

export default SelectOptions;
