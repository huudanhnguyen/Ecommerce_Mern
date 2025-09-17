// src/pages/public/Public.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import { Header, Navigation, TopHeader, Footer } from "../../components";
import CartSidebar from "../public/CartSidebar";
import { CartProvider } from "../../context/CartContext";
import { WishlistProvider } from "../../context/WishlistContext";


const Public = () => {
  return (
    <CartProvider>
      <WishlistProvider>
        <div className="w-full flex flex-col items-center">
          <TopHeader />
          <Header />
          <Navigation />

          <div className="w-full flex flex-col justify-center items-center">
            <Outlet />
          </div>

          <Footer />

          {/* ✅ Sidebar giỏ hàng luôn nằm trong Public layout */}
          <CartSidebar />
        </div>
      </WishlistProvider>
    </CartProvider>
  );
};

export default Public;
