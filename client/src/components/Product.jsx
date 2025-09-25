// src/components/Product.jsx
import React from "react";
import { formatPrice, renderRatingStars, createSlug } from "../utils/helpers";
import SelectOptions from "./SelectOptions";
import { Link } from "react-router-dom";
import path from "../utils/path";
import RatingSummary from "./RatingSummary";

const Product = ({ productData, label, onQuickView }) => {
  if (!productData) return null;

  const detailUrl = `/${path.DETAIL_PRODUCT}/${productData._id}/${createSlug(
    productData.title
  )}`;

  const imageUrl =
    productData?.thumb ||
    (productData?.images && productData.images.length > 0
      ? productData.images[0]
      : "https://via.placeholder.com/300");

  const productName = productData?.name || productData?.title || "No name";
  const labelColor = label === "TRENDING" ? "bg-blue-500" : "bg-orange-500";

  // ✅ Khi click vào sản phẩm thì cuộn lên đầu trang
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full border rounded-lg overflow-hidden relative group text-center shadow-sm hover:shadow-md transition-shadow duration-300 bg-white">
      {/* --- Phần hình ảnh --- */}
      <Link
        className="w-full h-48 sm:h-56 lg:h-64 overflow-hidden block"
        to={detailUrl}
        onClick={handleClick}
      >
        <img
          src={imageUrl}
          alt={productName}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      {/* --- Phần nhãn (NEW/TRENDING) --- */}
      {label && (
        <div
          className={`absolute top-2 right-2 text-white text-xs font-semibold px-2 py-1 rounded-full ${labelColor} flex items-center gap-1 shadow-sm`}
        >
          <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
          {label}
        </div>
      )}

      <SelectOptions onQuickView={onQuickView} productData={productData} />

      {/* --- Phần thông tin sản phẩm --- */}
      <div className="p-3 sm:p-4">
        <Link
          className="text-sm sm:text-base lg:text-lg font-semibold truncate block hover:text-main transition-colors duration-200"
          to={detailUrl}
          onClick={handleClick}
        >
          {productName}
        </Link>

        <div className="mt-2 text-base sm:text-lg font-semibold text-main">
          {formatPrice(productData?.price)}
          <div className="flex justify-center mt-2">
            <RatingSummary
              averageRating={
                productData.ratings?.length > 0
                  ? productData.ratings.reduce((sum, r) => sum + r.star, 0) /
                    productData.ratings.length
                  : 0
              }
              showText={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
