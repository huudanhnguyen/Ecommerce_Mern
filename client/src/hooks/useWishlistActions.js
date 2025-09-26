// src/hooks/useWishlistActions.js
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useWishlist } from "../context/WishlistContext";

export const useWishlistActions = (productId) => {
  const { wishlistItems, toggleWishlist } = useWishlist();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const navigate = useNavigate();

  // Kiểm tra sản phẩm có trong wishlist chưa
  const exists = wishlistItems.some(item => item._id === productId);

  // Hàm toggle
  const handleToggle = async () => {
    if (!isLoggedIn) {
      toast.warn("Please log in to use this feature!", {
        position: "top-center",
        autoClose: 2000,
      });
      navigate("/login");
      return;
    }

    try {
      await toggleWishlist(productId);
      if (exists) {
        toast.info("❌ Removed from favorites list");
      } else {
        toast.success("❤️ Added to favorites list");
      }
    } catch (err) {
      console.error("Wishlist update failed:", err);
    }
  };

  return { exists, handleToggle };
};
