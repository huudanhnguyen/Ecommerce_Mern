// src/pages/public/Public.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import { Header, Navigation, TopHeader, Footer } from "../../components";
import CartSidebar from "../public/CartSidebar";
import { CartProvider } from "../../context/CartContext";
import { WishlistProvider } from "../../context/WishlistContext";
import { AuthProvider } from '../../context/AuthContext';
// ✅ Toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Public = () => {
  return (
     <AuthProvider>
    <CartProvider>
      <WishlistProvider>
        <div className="w-full min-h-screen flex flex-col">
          {/* Header Section - Sticky */}
          <div className="w-full flex flex-col justify-center sticky top-0 z-50 bg-white shadow-sm">
            <TopHeader />
            <Header />
            <Navigation />
          </div>

          {/* Main Content */}
          <div className="flex-1 w-full">
            <Outlet />
          </div>

          {/* Footer */}
          <Footer />

          {/* ✅ Sidebar giỏ hàng luôn nằm trong Public layout */}
          <CartSidebar />
          {/* ✅ Toast hiển thị toàn cục */}
          <ToastContainer 
            position="top-right" 
            autoClose={2000}
            className="mt-16 sm:mt-20"
            toastClassName="text-sm sm:text-base"
          />
        </div>
      </WishlistProvider>
    </CartProvider>
    </AuthProvider>
  );
};

export default Public;
