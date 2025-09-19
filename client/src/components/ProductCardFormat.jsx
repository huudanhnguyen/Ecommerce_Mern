import React from "react";
import { Link } from "react-router-dom";
import {
  formatPrice,
  renderRatingStars,
  createSlug,
  getProductLabel,
} from "../utils/helpers";
import SelectOptions from "./SelectOptions";
import path from "../utils/path";
import RatingSummary from "./RatingSummary";

const ProductCardFormat = ({ productData, onQuickView }) => {
  if (!productData) return null;

  const detailUrl = `/${path.DETAIL_PRODUCT}/${productData._id}/${createSlug(
    productData.title || productData.name
  )}`;
  const imageUrl =
    productData?.thumb ||
    (productData?.images?.length > 0
      ? productData.images[0]
      : "https://via.placeholder.com/300");

  const productName = productData?.name || productData?.title || "No name";
  const label = getProductLabel(productData); // ✅ dùng từ helper

  const labelColor =
    label === "TRENDING"
      ? "bg-blue-500"
      : label === "NEW"
      ? "bg-green-500"
      : "";

  return (
    <div className="w-full border rounded-md overflow-hidden relative group text-center">
      {/* --- Hình ảnh --- */}
      <Link className="w-full h-[250px] overflow-hidden block" to={detailUrl}>
        <img
          src={imageUrl}
          alt={productName}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </Link>

      {/* --- Nhãn NEW / TRENDING --- */}
      {label && (
        <div
          className={`absolute top-2 right-[-1px] text-white text-xs font-semibold px-3 py-1 ${labelColor} flex items-center gap-1`}
        >
          <span className="w-2 h-2 bg-white rounded-full"></span>
          {label}
        </div>
      )}

      {/* --- Select Options (❤️ 📋 👁) --- */}
      <SelectOptions onQuickView={onQuickView} productData={productData} />

      {/* --- Thông tin sản phẩm --- */}
      <div className="p-4">
        <Link className="text-lg font-semibold truncate block" to={detailUrl}>
          {productName}
        </Link>

        <div className="mt-1 text-lg font-semibold text-main">
          {formatPrice(productData?.price)}
        </div>

        <div className="flex items-center justify-center my-2">
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
  );
};

export default ProductCardFormat;
