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
    <div className="w-full border rounded-md overflow-hidden relative group text-center">
      {/* --- Phần hình ảnh --- */}
      <Link
        className="w-full h-[250px] overflow-hidden"
        to={detailUrl}
        onClick={handleClick}
      >
        <img
          src={imageUrl}
          alt={productName}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </Link>

      {/* --- Phần nhãn (NEW/TRENDING) --- */}
      {label && (
        <div
          className={`absolute top-2 right-[-1px] text-white text-xs font-semibold px-3 py-1 ${labelColor} flex items-center gap-1`}
        >
          <span className="w-2 h-2 bg-white rounded-full"></span>
          {label}
        </div>
      )}

      <SelectOptions onQuickView={onQuickView} productData={productData} />

      {/* --- Phần thông tin sản phẩm --- */}
      <div className="p-4">
        <Link
          className="text-lg font-semibold truncate"
          to={detailUrl}
          onClick={handleClick}
        >
          {productName}
        </Link>

        <div className="mt-1 text-lg font-semibold text-main">
          {formatPrice(productData?.price)}
          <div className="flex justify-center mt-1">
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
