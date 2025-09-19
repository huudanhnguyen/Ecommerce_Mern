import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../../apis/product";
import { formatPrice, renderRatingStars } from "../../utils/helpers";
import Breadcrumb from "../../components/Breadcrumb";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import { useSelector } from "react-redux";
import RatingSummary from "../../components/RatingSummary";

import {
  FaShieldAlt,
  FaShippingFast,
  FaGift,
  FaUndo,
  FaHeadset,
  FaFacebookF,
  FaTwitter,
  FaPinterestP,
  FaMinus,
  FaPlus,
} from "react-icons/fa";
import ProductSlider from "../../components/ProductSlider";
import { toast } from "react-toastify";

// ✅ import API user (đã fix đường dẫn)
import { rateProduct } from "../../apis/product"; // <-- API rating bạn đã làm ở BE

const DetailProduct = () => {
  const { pid } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(null);
  const { wishlistItems, toggleWishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const isInWishlist = product
    ? wishlistItems.some((item) => item._id === product._id)
    : false;

  const tabs = [
    { key: "DESCRIPTION", label: "DESCRIPTION" },
    { key: "WARRANTY", label: "WARRANTY" },
    { key: "DELIVERY", label: "DELIVERY" },
    { key: "PAYMENT", label: "PAYMENT" },
  ];
  const [activeTab, setActiveTab] = useState(tabs[0].key);
  const [selectedVariants, setSelectedVariants] = useState({});
  const [reviewName, setReviewName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reviewStar, setReviewStar] = useState(5);

  // ✅ fetch sản phẩm
  const fetchProduct = async () => {
    try {
      const response = await getProductById(pid);
      if (response?.data?.success) {
        const data = response.data.productData;

        const flatImages = Array.isArray(data.images?.[0])
          ? data.images[0]
          : data.images || [];

        const allImgs =
          flatImages?.length > 0
            ? flatImages.includes(data.thumb)
              ? flatImages
              : [data.thumb, ...flatImages]
            : [data.thumb];

        setProduct({ ...data, allImages: allImgs });
        setMainImage(allImgs[0]);

        // chọn mặc định variants đầu tiên
        if (data.variants && data.variants.length > 0) {
          const initialVariants = {};
          data.variants.forEach((v) => {
            if (v.variants && v.variants.length > 0) {
              initialVariants[v.label] = v.variants[0];
            }
          });
          setSelectedVariants(initialVariants);
        }
      }
    } catch (error) {
      console.error("Lỗi fetch sản phẩm:", error);
    }
  };

  useEffect(() => {
    if (pid) fetchProduct();
  }, [pid]);

  const handleQuantity = (type) => {
    if (type === "decrease" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
    if (type === "increase") {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleVariantSelect = (label, value) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [label]: value,
    }));
  };

  // ✅ check login trước khi thực hiện action
  const checkLoginAndPerformAction = (action) => {
    if (isLoggedIn) {
      action();
    } else {
      toast.warn("Please log in to use this feature!", {
        position: "top-center",
        autoClose: 2000,
      });
      navigate("/login");
    }
  };

  // ✅ thêm vào cart (context + DB)
  const handleAddToCart = () => {
    if (!product) return;

    checkLoginAndPerformAction(async () => {
      try {
        await addToCart(product, quantity, selectedVariants);
        toast.success("🛒 Added to cart!", { position: "top-left" });
      } catch (err) {
        console.error("Add to cart failed:", err);
        toast.error("Failed to add to cart!");
      }
    });
  };

  const handleToggleWishlist = () => {
    if (!product) return;

    checkLoginAndPerformAction(async () => {
      try {
        if (isInWishlist) {
          await removeFromWishlist(product._id);
          toast.info("❌ Removed from favorites list");
        } else {
          await toggleWishlist({
            _id: product._id,
            title: product.title,
            price: product.price,
            thumb: product.thumb,
          });
          toast.success("❤️ Added to favorites list");
        }
      } catch (err) {
        console.error("Wishlist update failed:", err);
        toast.error("Failed to update wishlist!");
      }
    });
  };

  // ✅ gửi đánh giá
  const handleSubmitReview = () => {
    if (!reviewText.trim()) {
      toast.warn("Please write something before submitting!");
      return;
    }

    checkLoginAndPerformAction(async () => {
      try {
        await rateProduct({
          productId: product._id,
          star: reviewStar,
          comment: reviewText,
          name: reviewName,
        });
        toast.success("✅ Review submitted!");
        setReviewName("");
        setReviewText("");
        setReviewStar(5);
        fetchProduct(); // reload dữ liệu mới
      } catch (err) {
        console.error("Submit review failed:", err);
        toast.error("Failed to submit review!");
      }
    });
  };

  const isVariantSelected =
    !product?.variants ||
    product.variants.every((v) => selectedVariants[v.label]);

  if (!product) return <div>Loading...</div>;

  // ✅ tính rating trung bình
  const averageRating =
    product?.ratings && product.ratings.length > 0
      ? product.ratings.reduce((sum, r) => sum + r.star, 0) /
        product.ratings.length
      : 0;
  const totalReviews = product?.ratings?.length || 0;

  return (
    <div className="w-main mx-auto my-8">
      {/* --- Breadcrumb --- */}
      <div className="text-black mb-6">
        <Breadcrumb product={product} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-10 gap-8">
        {/* Cột trái: Hình ảnh */}
        <div className="md:col-span-4">
          <div className="border rounded-md">
            <img
              src={mainImage}
              alt={product.title}
              className="w-full h-[400px] object-contain"
            />
          </div>

          {/* Thumbnails */}
          <div className="relative mt-4">
            <button
              onClick={() => {
                const container = document.getElementById("thumbs-container");
                if (container) container.scrollLeft -= 120;
              }}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow p-2 rounded-full z-10"
            >
              ◀
            </button>

            <div
              id="thumbs-container"
              className="flex gap-2 overflow-x-auto scrollbar-hide px-8"
            >
              {product.allImages.map((img, index) => (
                <div
                  key={index}
                  className={`cursor-pointer border rounded p-1 flex-shrink-0 ${
                    mainImage === img ? "border-main" : "border-gray-300"
                  }`}
                  onClick={() => setMainImage(img)}
                >
                  <img
                    src={img}
                    alt={`thumb-${index}`}
                    className="w-20 h-20 object-cover rounded"
                  />
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                const container = document.getElementById("thumbs-container");
                if (container) container.scrollLeft += 120;
              }}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow p-2 rounded-full z-10"
            >
              ▶
            </button>
          </div>
        </div>

        {/* Cột giữa: Thông tin sản phẩm */}
        <div className="md:col-span-3">
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>

          {Object.keys(selectedVariants).length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {Object.entries(selectedVariants).map(([label, value]) => (
                <span
                  key={label}
                  className="px-3 py-1 bg-gray-100 border border-gray-300 rounded-full text-sm text-gray-700"
                >
                  {label}:{" "}
                  <span className="font-semibold text-main">{value}</span>
                </span>
              ))}
            </div>
          )}

          <div className="flex justify-between items-center mb-2">
            <p className="text-3xl font-bold text-main">
              {formatPrice(product.price)}
            </p>
          </div>

          {/* ⭐ Rating summary */}
          <div className="flex items-center gap-4 text-sm mb-6">
            <RatingSummary
              averageRating={averageRating}
              totalReviews={totalReviews}
              size="lg"
            />
            <span className="text-gray-600 italic">Sold: {product.sold}</span>
          </div>

          <ul className="list-disc list-inside text-sm text-gray-600 mb-4 space-y-1">
            {product.description
              ?.filter((line) => !line.toLowerCase().startsWith("thumbnail:"))
              .map((line, index) => (
                <li key={index}>{line}</li>
              ))}
          </ul>

          {/* Variants */}
          {product.variants?.map((v) => (
            <div key={v.label} className="mb-4">
              <span className="font-semibold">{v.label}</span>
              <div className="flex gap-2 mt-2">
                {v.variants.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleVariantSelect(v.label, option)}
                    className={`px-4 py-1 border rounded ${
                      selectedVariants[v.label] === option
                        ? "border-main bg-main text-white"
                        : "border-gray-300"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}

          {/* Quantity */}
          <div className="flex items-center gap-4 mb-6">
            <span className="font-semibold">Quantity</span>
            <div className="flex items-center border rounded">
              <button
                onClick={() => handleQuantity("decrease")}
                className="p-3"
              >
                <FaMinus size={12} />
              </button>
              <span className="px-4">{quantity}</span>
              <button
                onClick={() => handleQuantity("increase")}
                className="p-3"
              >
                <FaPlus size={12} />
              </button>
            </div>
          </div>

          <div className="flex gap-3">
            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              disabled={!isVariantSelected}
              className={`flex-1 flex items-center justify-center gap-2 font-bold py-3 rounded-md transition-colors
                ${
                  isVariantSelected
                    ? "border border-main text-main hover:bg-main hover:text-white"
                    : "border border-gray-300 text-gray-400 cursor-not-allowed"
                }`}
            >
              ADD TO CART
            </button>

            {/* Wishlist */}
            <button
              onClick={handleToggleWishlist}
              className={`flex-1 flex items-center justify-center gap-2 font-bold py-3 rounded-md transition-colors
                ${
                  isInWishlist
                    ? "border border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                    : "border border-main text-main hover:bg-main hover:text-white"
                }`}
            >
              {isInWishlist ? "REMOVE WISHLIST" : "ADD TO WISHLIST"}
            </button>
          </div>

          {/* Social */}
          <div className="flex gap-2 mt-4">
            <a href="#" className="p-3 bg-gray-800 text-white rounded-full">
              <FaFacebookF />
            </a>
            <a href="#" className="p-3 bg-gray-800 text-white rounded-full">
              <FaTwitter />
            </a>
            <a href="#" className="p-3 bg-gray-800 text-white rounded-full">
              <FaPinterestP />
            </a>
          </div>
        </div>

        {/* Cột phải: Chính sách */}
        <div className="md:col-span-3">
          <div className="space-y-4">
            <PolicyItem
              icon={<FaShieldAlt />}
              title="Guarantee"
              subtitle="Quality Checked"
            />
            <PolicyItem
              icon={<FaShippingFast />}
              title="Free Shipping"
              subtitle="Free On All Products"
            />
            <PolicyItem
              icon={<FaGift />}
              title="Special Gift Cards"
              subtitle="Special Gift Cards"
            />
            <PolicyItem
              icon={<FaUndo />}
              title="Free Return"
              subtitle="Within 7 Days"
            />
            <PolicyItem
              icon={<FaHeadset />}
              title="Consultancy"
              subtitle="Lifetime 24/7/356"
            />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-12">
        <div className="border-b flex gap-6 text-sm font-semibold">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`pb-2 border-b-2 transition-colors ${
                activeTab === tab.key
                  ? "border-main text-main"
                  : "border-transparent text-gray-500 hover:text-main"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-4 text-gray-700 text-sm leading-relaxed">
          <table className="w-full border rounded-md">
            <tbody>
              <tr className="border-b">
                <td className="p-3 whitespace-pre-line">
                  {product?.infomations?.[activeTab] ||
                    "No information available."}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-16">
        <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>

        {/* List */}
        {product.ratings && product.ratings.length > 0 ? (
          <div className="space-y-4">
            {product.ratings.map((r, i) => (
              <div key={i} className="border-b pb-3">
                <div className="flex items-center gap-2">
                  {renderRatingStars(r.star)}
                  <span className="font-semibold">{r.name || "Anonymous"}</span>
                  <span className="text-sm text-gray-500">
                    {new Date(r.postedAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-700">{r.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}

        {/* Form */}
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Write a review</h3>
          <input
            type="text"
            value={reviewName}
            onChange={(e) => setReviewName(e.target.value)}
            className="w-full border rounded p-2 mb-3"
            placeholder="Your name"
          />

          <div className="flex items-center gap-2 mb-3">
            <span>Rating:</span>
            {[1, 2, 3, 4, 5].map((s) => (
              <button
                key={s}
                onClick={() => setReviewStar(s)}
                className={`text-xl ${
                  s <= reviewStar ? "text-yellow-400" : "text-gray-300"
                }`}
              >
                ★
              </button>
            ))}
          </div>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            className="w-full border rounded p-2 mb-3"
            placeholder="Write your review..."
            rows={3}
          />
          <button
            onClick={handleSubmitReview}
            className="px-4 py-2 bg-main text-white rounded hover:bg-opacity-90"
          >
            Submit Review
          </button>
        </div>
      </div>

      {/* Gợi ý sản phẩm */}
      <div className="mt-16">
        {product?.category && (
          <ProductSlider
            title="Other Customers Also Buy"
            apiParams={{ category: product.category.slug, limit: 10 }}
            excludeId={product._id}
          />
        )}
      </div>
    </div>
  );
};

const PolicyItem = ({ icon, title, subtitle }) => (
  <div className="flex items-center gap-4 p-4 border rounded-md">
    <span className="text-2xl text-gray-500">{icon}</span>
    <div>
      <p className="font-semibold">{title}</p>
      <p className="text-sm text-gray-500">{subtitle}</p>
    </div>
  </div>
);

export default DetailProduct;
