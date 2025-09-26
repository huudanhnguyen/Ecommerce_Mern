// src/components/QuickViewModal.jsx

import React, { useState, useEffect } from "react";
import { FaTimes, FaMinus, FaPlus } from "react-icons/fa";
import Slider from "react-slick";
import { formatPrice } from "../utils/helpers";
import { useCart } from "../context/CartContext";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const QuickViewModal = ({ product, onClose }) => {
  // State để quản lý ảnh chính đang được hiển thị
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const navigate = useNavigate();

  // Khi sản phẩm thay đổi, cập nhật ảnh chính mặc định là ảnh thumb
  useEffect(() => {
    if (product?.thumb) {
      setMainImage(product.thumb);
    } else if (product?.images && product.images.length > 0) {
      setMainImage(product.images[0]);
    }
  }, [product]);

  // Lính gác
  if (!product) return null;

  const handleModalContentClick = (e) => e.stopPropagation();

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
      await addToCart(product, quantity, {});
      toast.success("🛒 Added to cart!", { position: "top-left" });
      onClose(); // Đóng modal sau khi thêm thành công
    } catch (err) {
      console.error("Add to cart failed:", err);
      toast.error("Failed to add to cart!");
    }
  };

  const thumbnailSliderSettings = {
    slidesToShow: 5, // Hiển thị 5 ảnh thu nhỏ cùng lúc
    slidesToScroll: 1,
    focusOnSelect: true,
    arrows: false, // Ẩn mũi tên mặc định của slider
    infinite: product.images?.length > 5, // Chỉ lặp vô tận nếu có nhiều hơn 5 ảnh
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-4xl p-8 rounded-lg relative max-h-[90vh] overflow-y-auto"
        onClick={handleModalContentClick}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <FaTimes size={24} />
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* --- Cột trái: Hình ảnh --- */}
          <div className="w-full">
            {/* Ảnh chính */}
            <div className="border rounded-md mb-4 h-[400px] flex items-center justify-center">
              <img
                src={mainImage}
                alt={product.title}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {/* 4. SỬ DỤNG SLIDER ĐỂ HIỂN THỊ TẤT CẢ ẢNH THU NHỎ */}
            {product.images && product.images.length > 1 && (
              <div className="relative px-8">
                <Slider ref={sliderRef} {...thumbnailSliderSettings}>
                  {/* Map qua toàn bộ mảng `images` */}
                  {product.images.map((img, index) => (
                                        <div key={index} className='p-1'>
                                            <img 
                                                src={img} 
                                                alt={`${product.title} thumbnail ${index + 1}`} 
                                                onClick={() => setMainImage(img)}
                                                className={`w-full h-auto object-cover cursor-pointer border-2 ${mainImage === img ? 'border-main' : 'border-gray-200'}`} 
                                            />
                                        </div>
                                    ))}
                </Slider>
                {/* Nút Prev/Next tùy chỉnh */}
                <button
                  onClick={() => sliderRef.current.slickPrev()}
                  className="absolute top-1/2 left-0 -translate-y-1/2 bg-gray-200 text-gray-600 px-2 py-1 rounded"
                >
                  prev
                </button>
                <button
                  onClick={() => sliderRef.current.slickNext()}
                  className="absolute top-1/2 right-0 -translate-y-1/2 bg-gray-200 text-gray-600 px-2 py-1 rounded"
                >
                  next
                </button>
              </div>
            )}
          </div>

          {/* --- Cột phải: Thông tin --- */}
          <div className="w-full">
            <h2 className="text-3xl font-bold mb-2 uppercase">
              {product.title}
            </h2>
            <ul className="list-disc list-inside text-sm text-gray-600 mb-4 pl-1">
              {product.description?.map((line, index) => (
                <li key={index}>{line.trim()}</li>
              ))}
            </ul>
            <div className="text-3xl font-bold text-main mb-6">
              {formatPrice(product.price)}
            </div>
            <div className="flex items-center gap-4 mb-4">
              <span className="font-semibold text-gray-700">Quantity</span>
              <div className="flex items-center border rounded">
                <button 
                  className="w-10 h-10 flex items-center justify-center text-lg hover:bg-gray-100"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <FaMinus />
                </button>
                <span className="w-12 h-10 flex items-center justify-center text-lg border-l border-r">
                  {quantity}
                </span>
                <button 
                  className="w-10 h-10 flex items-center justify-center text-lg hover:bg-gray-100"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <FaPlus />
                </button>
              </div>
            </div>
            <div className="space-y-4 mb-6">
              {product.variants?.map((variant) => (
                <div key={variant.label} className="flex items-center gap-4">
                  <span className="font-semibold text-gray-700 w-20">
                    {variant.label}
                  </span>
                  <select className="border rounded p-2 flex-1 bg-gray-100">
                    {variant.options.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
            <button 
              onClick={handleAddToCart}
              className="w-full bg-main text-white font-bold py-3 rounded-md hover:bg-red-700 transition-colors uppercase"
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
