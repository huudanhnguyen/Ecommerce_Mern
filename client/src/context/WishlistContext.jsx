import React, { createContext, useContext, useState, useEffect } from "react";
import {
  apiGetWishlist,
  apiAddToWishlist,
  apiRemoveFromWishlist,
} from "../apis/user";

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

  // 🔹 Load wishlist khi login
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await apiGetWishlist();
        if (res.data?.success) {
          setWishlistItems(res.data.wishlist); // ✅ populated từ backend
        }
      } catch (err) {
        console.error("❌ Fetch wishlist failed:", err);
      }
    };

    fetchWishlist();
  }, []);

  // 🔹 Toggle (add/remove) wishlist
  const toggleWishlist = async (productId) => {
    try {
      const exists = wishlistItems.some((it) => it._id === productId);

      let res;
      if (exists) {
        res = await apiRemoveFromWishlist(productId); // ❌ remove
      } else {
        res = await apiAddToWishlist(productId); // ❤️ add
      }

      if (res.data?.success) {
        setWishlistItems(res.data.wishlist); // ✅ cập nhật từ server
      }
    } catch (err) {
      console.error("❌ Toggle wishlist failed:", err);
    }
  };

  // 🔹 Remove riêng
  const removeFromWishlist = async (productId) => {
    try {
      const res = await apiRemoveFromWishlist(productId);
      if (res.data?.success) {
        setWishlistItems(res.data.wishlist); // ✅ cập nhật từ server
      }
    } catch (err) {
      console.error("❌ Remove wishlist failed:", err);
    }
  };

  return (
    <WishlistContext.Provider
      value={{ wishlistItems, toggleWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
