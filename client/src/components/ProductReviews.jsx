// src/components/ProductReviews.jsx
import React, { useState } from "react";
import { toast } from "react-toastify";
import { rateProduct } from "../apis/product";
import { renderRatingStars } from "../utils/helpers";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "../axios";

const ProductReviews = ({ product, fetchProduct }) => {
  const [reviewName, setReviewName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reviewStar, setReviewStar] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingReview, setEditingReview] = useState(null);

  const reviewsPerPage = 5;

  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const currentUser = useSelector((state) => state.user.current);

  // ✅ Sắp xếp mới nhất lên trước
  const ratings = [...(product?.ratings || [])].sort(
    (a, b) => new Date(b.postedAt) - new Date(a.postedAt)
  );

  // Pagination
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = ratings.slice(indexOfFirstReview, indexOfLastReview);
  const totalPages = Math.ceil(ratings.length / reviewsPerPage);

  const checkLoginAndPerformAction = (action) => {
    if (isLoggedIn) {
      action();
    } else {
      toast.warn("Please log in to write a review!", {
        position: "top-center",
        autoClose: 2000,
      });
      navigate("/login");
    }
  };

  // ✅ Thêm / cập nhật review
  const handleSubmitReview = () => {
    checkLoginAndPerformAction(async () => {
      try {
        await rateProduct({
          productId: product._id,
          star: reviewStar,
          comment: reviewText || undefined,
          name: reviewName || undefined,
          postedBy: currentUser?._id,
        });
        toast.success(
          editingReview ? "✅ Review updated!" : "✅ Review submitted!"
        );
        setReviewName("");
        setReviewText("");
        setReviewStar(5);
        setEditingReview(null);
        fetchProduct();
      } catch (err) {
        console.error("Submit review failed:", err);
        toast.error("Failed to submit review!");
      }
    });
  };

  // ✅ Bắt đầu chỉnh sửa
  const handleEditReview = (review) => {
    setEditingReview(review);
    setReviewName(review.name || "");
    setReviewText(review.comment || "");
    setReviewStar(review.star);
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  // ✅ Xóa review
  const handleDeleteReview = (reviewId) => {
    checkLoginAndPerformAction(async () => {
      try {
        await axios.delete(`/product/${product._id}/ratings/${reviewId}`);
        toast.success("🗑️ Review deleted!");
        fetchProduct();
      } catch (err) {
        console.error("Delete review failed:", err);
        toast.error("Failed to delete review!");
      }
    });
  };

  return (
    <div className="mt-16">
      <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>

      {/* ✅ Reviews List */}
      {ratings.length > 0 ? (
        <div className="space-y-4">
          {currentReviews.map((r) => {
            const isMine =
              currentUser &&
              String(r.postedBy?._id || r.postedBy) === String(currentUser._id);

            return (
              <div
                key={r._id}
                className={`border-b pb-3 ${
                  isMine ? "bg-yellow-50 border-yellow-300 p-3 rounded" : ""
                }`}
              >
                <div className="flex items-center gap-2">
                  {renderRatingStars(r.star)}
                  <span
                    className={`font-semibold ${
                      isMine ? "text-blue-600" : ""
                    }`}
                  >
                    {r.name || (isMine ? "You" : "Anonymous")}
                  </span>
                  <span className="text-sm text-gray-500">
                    {r.postedAt ? new Date(r.postedAt).toLocaleDateString() : ""}
                  </span>
                </div>
                {r.comment && <p className="text-gray-700">{r.comment}</p>}

                {isMine && (
                  <div className="flex gap-3 mt-2">
                    <button
                      onClick={() => handleEditReview(r)}
                      className="px-3 py-1 text-sm border rounded hover:bg-gray-100"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteReview(r._id)}
                      className="px-3 py-1 text-sm border rounded text-red-500 hover:bg-red-100"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            );
          })}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-4">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx + 1)}
                  className={`px-3 py-1 border rounded ${
                    currentPage === idx + 1
                      ? "bg-main text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      ) : (
        <p className="text-gray-500">No reviews yet.</p>
      )}

      {/* ✅ Review form */}
      <div className="mt-6">
        <h3 className="font-semibold mb-2">
          {editingReview ? "Edit your review" : "Write a review"}
        </h3>

        <input
          type="text"
          value={reviewName}
          onChange={(e) => setReviewName(e.target.value)}
          className="w-full border rounded p-2 mb-3"
          placeholder="Your name (optional)"
        />

        <div className="flex items-center gap-2 mb-3">
          <span>Rating:</span>
          {[1, 2, 3, 4, 5].map((s) => (
            <button
              key={s}
              type="button"
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
          placeholder="Write a review (optional)"
          className="w-full border rounded p-2 mb-3"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />

        <button
          onClick={handleSubmitReview}
          disabled={!reviewStar}
          className="px-4 py-2 bg-main text-white rounded hover:bg-opacity-90 disabled:opacity-50"
        >
          {editingReview ? "Update Review" : "Submit Review"}
        </button>

        {editingReview && (
          <button
            onClick={() => {
              setEditingReview(null);
              setReviewName("");
              setReviewText("");
              setReviewStar(5);
            }}
            className="ml-3 px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductReviews;
