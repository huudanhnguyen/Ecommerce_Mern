// src/components/DealDaily.jsx

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { FaStar } from "react-icons/fa";
import { formatPrice, renderRatingStars } from "../utils/helpers.jsx";
import { getAllProducts } from "../apis/product";
import { Link } from "react-router-dom";
import path from "../utils/path.js";
import QuickViewModal from "./QuickViewModal";

const DealDaily = () => {
  const [dealProduct, setDealProduct] = useState(null);
  const [timeLeft, setTimeLeft] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });
  const [showModal, setShowModal] = useState(false);

  // Hàm để lấy sản phẩm mới và lưu vào storage
  const fetchAndSetNewDeal = async () => {
    try {
      const response = await getAllProducts({ limit: 20 }); // Lấy một lượng sản phẩm đủ lớn để random
      if (response?.data?.success && response.data.products.length > 0) {
        const products = response.data.products;
        const randomIndex = Math.floor(Math.random() * products.length);
        const newProduct = products[randomIndex];
        const newExpireTime = new Date().getTime() + 24 * 60 * 60 * 1000;

        // Lưu deal mới vào Local Storage
        localStorage.setItem(
          "dailyDeal",
          JSON.stringify({
            product: newProduct,
            expireTime: newExpireTime,
          })
        );

        // Cập nhật state
        setDealProduct(newProduct);
        return newExpireTime; // Trả về thời gian hết hạn mới
      }
    } catch (error) {
      console.error("Failed to fetch new daily deal:", error);
    }
    return null;
  };

  // useEffect chính để quản lý deal và đồng hồ
  useEffect(() => {
    let intervalId;

    const updateCountdown = (expireTime) => {
      intervalId = setInterval(() => {
        const now = new Date().getTime();
        const distance = expireTime - now;

        if (distance < 0) {
          clearInterval(intervalId);
          // Hết giờ, tự động fetch deal mới
          fetchAndSetNewDeal().then((newExpireTime) => {
            if (newExpireTime) {
              updateCountdown(newExpireTime);
            }
          });
        } else {
          const hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const minutes = Math.floor(
            (distance % (1000 * 60 * 60)) / (1000 * 60)
          );
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);
          setTimeLeft({
            hours: hours < 10 ? `0${hours}` : hours,
            minutes: minutes < 10 ? `0${minutes}` : minutes,
            seconds: seconds < 10 ? `0${seconds}` : seconds,
          });
        }
      }, 1000);
    };

    // Logic khởi tạo khi component mount
    const initializeDeal = async () => {
      const savedDealJSON = localStorage.getItem("dailyDeal");
      const now = new Date().getTime();

      if (savedDealJSON) {
        const { product, expireTime } = JSON.parse(savedDealJSON);
        if (expireTime > now) {
          // Nếu deal cũ vẫn còn hạn
          setDealProduct(product);
          updateCountdown(expireTime);
        } else {
          // Nếu deal cũ hết hạn
          const newExpireTime = await fetchAndSetNewDeal();
          if (newExpireTime) updateCountdown(newExpireTime);
        }
      } else {
        // Nếu chưa có deal nào được lưu
        const newExpireTime = await fetchAndSetNewDeal();
        if (newExpireTime) updateCountdown(newExpireTime);
      }
    };

    initializeDeal();

    // Dọn dẹp khi component unmount
    return () => clearInterval(intervalId);
  }, []); // Chỉ chạy một lần duy nhất khi component mount

  // Lính gác: Hiển thị trạng thái loading
  if (!dealProduct) {
    return (
      <div className="w-full border p-3 sm:p-4 rounded-md bg-white shadow-sm">
        <div className="flex items-center justify-center h-48 sm:h-56">
          <div className="text-gray-500 text-sm">Loading Daily Deal...</div>
        </div>
      </div>
    );
  }

  const handleQuickView = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="w-full border p-3 sm:p-4 rounded-md bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
      <Link
        to={`/${path.DETAIL_PRODUCT}/${dealProduct._id}/${dealProduct.slug}`}
      >
        <div className="flex items-center justify-between pt-6 sm:pt-8">
          <div className="flex items-center gap-2">
            <FaStar color="red" size={16} className="sm:w-5 sm:h-5" />
            <h3 className="font-bold text-lg sm:text-xl uppercase text-gray-800">Daily Deals</h3>
          </div>
        </div>
        <div className="text-center pt-3 sm:pt-4">
          <img
            src={dealProduct.thumb}
            alt={dealProduct.title}
            className="w-full h-24 sm:h-32 lg:h-36 object-contain mb-3 sm:mb-4"
          />
          <h4 className="font-semibold truncate mb-2 text-sm sm:text-base text-gray-700">
            {dealProduct.title.toUpperCase()}
          </h4>
          <div className="flex justify-center mb-2">
            {renderRatingStars(dealProduct.totalRating)}
          </div>
          <p className="text-base sm:text-lg font-semibold text-red-600 mb-3 sm:mb-4">
            {formatPrice(dealProduct.price)}
          </p>
        </div>
      </Link>
      <div className="mt-4">
        <div className="grid grid-cols-3 gap-1 sm:gap-2 text-center">
          <div className="bg-gray-100 p-1 sm:p-1.5 rounded-md">
            <div className="text-sm sm:text-base font-bold text-red-600">{timeLeft.hours}</div>
            <div className="text-xs text-gray-500">Hours</div>
          </div>
          <div className="bg-gray-100 p-1 sm:p-1.5 rounded-md">
            <div className="text-sm sm:text-base font-bold text-red-600">{timeLeft.minutes}</div>
            <div className="text-xs text-gray-500">Minutes</div>
          </div>
          <div className="bg-gray-100 p-1 sm:p-1.5 rounded-md">
            <div className="text-sm sm:text-base font-bold text-red-600">{timeLeft.seconds}</div>
            <div className="text-xs text-gray-500">Seconds</div>
          </div>
        </div>

      </div>
      {showModal &&
        dealProduct &&
        ReactDOM.createPortal(
          <QuickViewModal product={dealProduct} onClose={handleCloseModal} />,
          document.getElementById("modal-root")
        )}
    </div>
  );
};

export default DealDaily;
