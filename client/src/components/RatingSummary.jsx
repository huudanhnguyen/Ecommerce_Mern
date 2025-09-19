import React from "react";
import { renderRatingStars } from "../utils/helpers";

const RatingSummary = ({ averageRating = 0, totalReviews = 0, size = "sm", showText = true }) => {
  return (
    <div className="flex items-center gap-2">
      <div className={`flex items-center text-yellow-400 ${size === "lg" ? "text-xl" : "text-sm"}`}>
        {renderRatingStars(averageRating)}
      </div>
      {showText && (
        <span className={`text-gray-600 ${size === "lg" ? "text-base" : "text-xs"}`}>
          {averageRating.toFixed(1)} / 5 ({totalReviews} reviews)
        </span>
      )}
    </div>
  );
};

export default RatingSummary;
