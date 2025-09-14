// src/context/CartContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // 🔹 Load từ localStorage khi khởi động
  useEffect(() => {
    const stored = localStorage.getItem("cartItems");
    if (stored) {
      setCartItems(JSON.parse(stored));
    }
  }, []);

  // 🔹 Lưu xuống localStorage mỗi khi thay đổi
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // ✅ Thêm vào giỏ hàng
  const addToCart = (product, quantity = 1, variants = {}) => {
    const normalizedItem = {
      _id: product._id,
      title: product.title,
      price: product.price,
      thumb: product.thumb,
      variants: variants,
      quantity: quantity,
    };

    setCartItems((prev) => {
      const index = prev.findIndex(
        (item) =>
          item._id === normalizedItem._id &&
          JSON.stringify(item.variants) === JSON.stringify(normalizedItem.variants)
      );

      if (index !== -1) {
        const updated = [...prev];
        updated[index].quantity += quantity;
        return updated;
      } else {
        return [...prev, normalizedItem];
      }
    });

    setIsOpen(true); // mở sidebar sau khi thêm
  };

  // ✅ Xóa khỏi giỏ hàng
  const removeFromCart = (_id, variants = {}) => {
    setCartItems((prev) =>
      prev.filter(
        (item) =>
          !(
            item._id === _id &&
            JSON.stringify(item.variants ?? item.selectedVariants ?? {}) ===
              JSON.stringify(variants)
          )
      )
    );
  };

  // ✅ Cập nhật số lượng sản phẩm
  const updateQuantity = (_id, variants = {}, newQty) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item._id === _id &&
          JSON.stringify(item.variants ?? item.selectedVariants ?? {}) ===
            JSON.stringify(variants)
            ? { ...item, quantity: newQty }
            : item
        )
        .filter((item) => item.quantity > 0) // xoá nếu số lượng <= 0
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity, // ✅ thêm vào context
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
