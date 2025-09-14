// src/components/ProductCard.jsx

import React, { useState } from "react";
import ReactDOM from "react-dom"; // 1. Import ReactDOM để dùng Portal
import { formatPrice, renderRatingStars } from "../utils/helpers.jsx";
import { FaEye, FaHeart, FaList } from "react-icons/fa";
import QuickViewModal from "./QuickViewModal"; // 2. Import Modal
import { Link } from "react-router-dom";
import path from "../utils/path";

const ProductCard = ({ productData }) => {
  // 3. Component tự quản lý state của modal
  const [showModal, setShowModal] = useState(false);

  if (!productData) return null;

  const imageUrl =
    productData?.thumb ||
    (productData?.images && productData.images.length > 0
      ? productData.images[0]
      : "https://via.placeholder.com/150");

  const productName = productData?.name || productData?.title || "No name";

  return (
    // Thẻ cha bây giờ có thể là div, không nhất thiết là <a>
    <div className="w-full flex items-center gap-4 p-2 border hover:shadow-lg rounded-md transition-shadow group relative">
      <Link className="w-30 h-40 flex-shrink-0"
      to={`/${path.DETAIL_PRODUCT}/${productData._id}/${productData.slug}`}>
        <img
          src={imageUrl}
          alt={productName}
          className="w-full h-full object-cover rounded-md"
        />
      </Link>

      {/* --- Thông tin sản phẩm --- */}
      <div className="flex flex-col flex-grow">
        <Link className="font-semibold truncate"
        to={`/${path.DETAIL_PRODUCT}/${productData._id}/${productData.slug}`}>{productName}</Link>
        <p className="text-gray-500 mt-1">
          {formatPrice(productData.price)}
        </p>
        <div className="flex items-center text-sm text-gray-500 mt-1">
          {renderRatingStars(productData.totalRating)}
        </div>

        {/* --- Các icon tùy chọn --- */}
        <div className="h-0 opacity-0 group-hover:h-full group-hover:opacity-100 transition-all flex items-center gap-2 mt-2">
          <button className="p-2 bg-gray-100 rounded-full text-gray-700 hover:bg-main hover:text-white transition-all">
            <FaHeart />
          </button>
          <button className="p-2 bg-gray-100 rounded-full text-gray-700 hover:bg-main hover:text-white transition-all">
            <FaList />
          </button>

          {/* 4. Nút FaEye giờ sẽ trực tiếp set state của chính component này */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setShowModal(true); // Mở modal
            }}
            className="p-2 bg-gray-100 rounded-full text-gray-700 hover:bg-main hover:text-white transition-all"
          >
            <FaEye />
          </button>
        </div>
      </div>

      {/* 5. SỬ DỤNG PORTAL ĐỂ RENDER MODAL */}
      {/* Modal sẽ được render ra ngoài, tại <div id="modal-root"></div> */}
      {showModal &&
        ReactDOM.createPortal(
          <QuickViewModal
            product={productData}
            onClose={() => setShowModal(false)} // Truyền hàm để đóng modal
          />,
          document.getElementById("modal-root")
        )}
    </div>
  );
};

export default ProductCard;
