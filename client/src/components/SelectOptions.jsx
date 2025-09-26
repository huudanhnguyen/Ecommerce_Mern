import React from "react";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { useWishlistActions } from "../hooks/useWishlistActions";
import { useCart } from "../context/CartContext";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SelectOptions = ({ onQuickView, productData }) => {
  const { exists, handleToggle } = useWishlistActions(productData._id);
  const { addToCart } = useCart();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      toast.warn("Please log in to add items to cart!", {
        position: "top-center",
        autoClose: 2000,
      });
      navigate("/login");
      return;
    }

    try {
      await addToCart(productData, 1, {});
      toast.success("🛒 Added to cart!", { position: "top-left" });
    } catch (err) {
      console.error("Add to cart failed:", err);
      toast.error("Failed to add to cart!");
    }
  };

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
      <button
        onClick={handleAddToCart}
        className="w-12 h-12 rounded-full flex justify-center items-center shadow-md transition-all bg-white text-gray-700 hover:bg-main hover:text-white"
      >
        <FaShoppingCart size={20} />
      </button>
    </div>
  );
};

export default SelectOptions;
