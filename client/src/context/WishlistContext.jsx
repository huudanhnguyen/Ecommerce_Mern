// src/context/WishlistContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  apiGetWishlist,
  apiAddToWishlist,
  apiRemoveFromWishlist,
} from "../services/user";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  // Load wishlist khi app mount hoặc khi login
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        if (isLoggedIn) {
          const res = await apiGetWishlist();
          if (res.data?.success) {
            setWishlistItems(res.data.wishlist);
          }
        } else {
          // Khi logout thì clear wishlist
          setWishlistItems([]);
        }
      } catch (err) {
        console.error("Fetch wishlist failed:", err);
      }
    };
    fetchWishlist();
  }, [isLoggedIn]);

  // ✅ Toggle wishlist bằng add/remove
  const toggleWishlist = async (productId) => {
    try {
      // Kiểm tra xem product có trong wishlist không (so sánh với _id)
      const isInWishlist = wishlistItems.some(item => item._id === productId);
      
      if (isInWishlist) {
        // Đang có => remove
        const res = await apiRemoveFromWishlist(productId);
        if (res.data?.success) {
          setWishlistItems(res.data.wishlist);
        }
      } else {
        // Chưa có => add
        const res = await apiAddToWishlist(productId);
        if (res.data?.success) {
          setWishlistItems(res.data.wishlist);
        }
      }
    } catch (err) {
      console.error("❌ Toggle wishlist failed:", err);
    }
  };
  // ✅ Xóa sản phẩm
  const removeFromWishlist = async (productId) => {
    try {
      const res = await apiRemoveFromWishlist(productId);
      if (res.data?.success) {
        setWishlistItems(res.data.wishlist);
      }
    } catch (err) {
      console.error("Remove from wishlist failed:", err);
    }
  };

  // ✅ Clear wishlist khi logout
  const clearWishlist = () => setWishlistItems([]);

  return (
    <WishlistContext.Provider
      value={{ wishlistItems, toggleWishlist, clearWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
