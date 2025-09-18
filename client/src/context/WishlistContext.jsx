// src/context/WishlistContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import {
  apiGetWishlist,
  apiAddToWishlist,
  apiRemoveFromWishlist,
} from "../apis/user";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

  // Load wishlist khi app mount
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await apiGetWishlist();
        if (res.data?.success) {
          setWishlistItems(res.data.wishlist);
        }
      } catch (err) {
        console.error("Fetch wishlist failed:", err);
      }
    };
    fetchWishlist();
  }, []);

  // ✅ Toggle wishlist bằng add/remove
  const toggleWishlist = async (productId) => {
    try {
      if (wishlistItems.includes(productId)) {
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
