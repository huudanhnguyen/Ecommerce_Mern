// src/components/ProductCard.jsx
import React from "react";
import { formatPrice, renderRatingStars } from "../utils/helpers.jsx";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import path from "../utils/path";
import { useWishlist } from "../context/WishlistContext";
import { toast } from "react-toastify"; // ✅ import toastify
import "react-toastify/dist/ReactToastify.css";

const ProductCard = ({ productData }) => {
  if (!productData) return null;

  const imageUrl =
    productData?.thumb ||
    (productData?.images && productData.images.length > 0
      ? productData.images[0]
      : "https://via.placeholder.com/150");

  const productName = productData?.name || productData?.title || "No name";

  // ✅ Lấy context wishlist
  const { addToWishlist, wishlistItems, removeFromWishlist } = useWishlist();

  // ✅ Kiểm tra sản phẩm có trong wishlist chưa
  const exists = wishlistItems.some((it) => it._id === productData._id);

  // ✅ Hàm toggle wishlist
  const handleWishlistClick = () => {
    if (exists) {
      removeFromWishlist(productData._id);
      toast.info("❌ Removed from favorites list");
    } else {
      addToWishlist({
        _id: productData._id,
        title: productData.title,
        price: productData.price,
        thumb: productData.thumb,
      });
      toast.success("❤️ Added to favorites list");
    }
  };

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
          {renderRatingStars(productData.totalRating)}
        </div>

        {/* Icon hành động */}
        <div className="h-0 opacity-0 group-hover:h-full group-hover:opacity-100 transition-all flex items-center gap-2 mt-2">
          <button
            onClick={handleWishlistClick}
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
