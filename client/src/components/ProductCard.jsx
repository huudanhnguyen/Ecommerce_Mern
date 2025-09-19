import React from "react";
import { formatPrice, renderRatingStars } from "../utils/helpers.jsx";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import path from "../utils/path";
import { useWishlistActions } from "../hooks/useWishlistActions";
import RatingSummary from "./RatingSummary.jsx";

const ProductCard = ({ productData }) => {
  if (!productData) return null;

  const imageUrl =
    productData?.thumb ||
    (productData?.images && productData.images.length > 0
      ? productData.images[0]
      : "https://via.placeholder.com/150");

  const productName = productData?.name || productData?.title || "No name";

  // ✅ Dùng hook chung
  const { exists, handleToggle } = useWishlistActions(productData._id);

  return (
    <div className="w-full flex items-center gap-4 p-2 border hover:shadow-lg rounded-md transition-shadow group relative">
      {/* Ảnh sản phẩm */}
      <Link
        className="w-30 h-40 flex-shrink-0"
        to={`/${path.DETAIL_PRODUCT}/${productData._id}/${productData.slug}`}
      >
        <img
          src={imageUrl}
          alt={productName}
          className="w-full h-full object-cover rounded-md"
        />
      </Link>

      {/* Thông tin sản phẩm */}
      <div className="flex flex-col flex-grow">
        <Link
          className="font-semibold truncate"
          to={`/${path.DETAIL_PRODUCT}/${productData._id}/${productData.slug}`}
        >
          {productName}
        </Link>
        <p className="text-gray-500 mt-1">{formatPrice(productData.price)}</p>
        <div className="flex items-center text-sm text-gray-500 mt-1">
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

        {/* Icon hành động */}
        <div className="h-0 opacity-0 group-hover:h-full group-hover:opacity-100 transition-all flex items-center gap-2 mt-2">
          <button
            onClick={handleToggle}
            className={`p-2 rounded-full transition-all ${
              exists
                ? "bg-main text-white"
                : "bg-gray-100 text-gray-700 hover:bg-main hover:text-white"
            }`}
          >
            <FaHeart />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
