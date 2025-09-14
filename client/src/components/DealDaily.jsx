// src/components/DealDaily.jsx

import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { formatPrice, renderRatingStars } from "../utils/helpers.jsx";
import { getAllProducts } from "../apis/product";
import { Link } from "react-router-dom";
import path from "../utils/path.js";

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
      <div className="w-full border p-4 rounded-md">Loading Daily Deal...</div>
    );
  }

  const handleQuickView = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="w-full border p-4 rounded-md h-full flex flex-col justify-between">
      <Link
        to={`/${path.DETAIL_PRODUCT}/${dealProduct._id}/${dealProduct.slug}`}
      >
        <div className="flex items-center justify-between pt-10">
          <div className="flex items-center gap-2">
            <FaStar color="red" size={20} />
            <h3 className="font-bold text-xl uppercase">Daily Deals</h3>
          </div>
        </div>
        <div className="text-center pt-4">
          <img
            src={dealProduct.thumb}
            alt={dealProduct.title}
            className="w-full h-auto object-contain mb-4"
          />
          <h4 className="font-semibold truncate mb-2">
            {dealProduct.title.toUpperCase()}
          </h4>
          <div className="flex justify-center mb-2">
            {renderRatingStars(dealProduct.totalRating)}
          </div>
          <p className="text-lg font-semibold text-gray-800 mb-4">
            {formatPrice(dealProduct.price)}
          </p>
        </div>
      </Link>
      <div>
        <div className="grid grid-cols-3 gap-2 text-center mb-4">
          <div className="bg-gray-100 p-2 rounded-md">
            <div className="text-2xl font-bold">{timeLeft.hours}</div>
            <div className="text-xs text-gray-500">Hours</div>
          </div>
          <div className="bg-gray-100 p-2 rounded-md">
            <div className="text-2xl font-bold">{timeLeft.minutes}</div>
            <div className="text-xs text-gray-500">Minutes</div>
          </div>
          <div className="bg-gray-100 p-2 rounded-md">
            <div className="text-2xl font-bold">{timeLeft.seconds}</div>
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
