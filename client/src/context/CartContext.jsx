// src/context/CartContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import {
  apiGetCart,
  apiAddToCart,
  apiUpdateCart,
  apiRemoveFromCart,
} from "../apis/user";
import { useSelector } from "react-redux"; // ✅ thêm để lấy trạng thái đăng nhập

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn); // ✅ lấy từ Redux

  // Load giỏ hàng khi app mount hoặc khi login
  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (isLoggedIn) {
          const res = await apiGetCart();
          if (res.data?.success) {
            setCartItems(res.data.cart);
          }
        } else {
          // ✅ Khi logout thì clear luôn giỏ hàng
          setCartItems([]);
        }
      } catch (err) {
        console.error("Fetch cart failed:", err);
      }
    };
    fetchCart();
  }, [isLoggedIn]); // 👈 thêm dependency

  // ✅ Thêm sản phẩm
  const addToCart = async (product, quantity = 1, variants = {}) => {
    try {
      const res = await apiAddToCart({
        productId: product._id,
        quantity,
        variants,
      });
      if (res.data?.success) {
        setCartItems(res.data.cart);
      }
    } catch (err) {
      console.error("Add to cart failed:", err);
    }
  };

  // ✅ Cập nhật số lượng
  const updateCart = async (productId, quantity, variants = {}) => {
    try {
      const res = await apiUpdateCart({ productId, quantity, variants });
      if (res.data?.success) {
        setCartItems(res.data.cart);
      }
    } catch (err) {
      console.error("Update cart failed:", err);
    }
  };

  // ✅ Xóa sản phẩm
  const removeFromCart = async (productId, variants = {}) => {
    try {
      const res = await apiRemoveFromCart({ productId, variants });
      if (res.data?.success) {
        setCartItems(res.data.cart);
      }
    } catch (err) {
      console.error("Remove from cart failed:", err);
    }
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, updateCart, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
