// src/components/Lightbox.jsx
import React from "react";
import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Lightbox = ({ images, currentIndex, setCurrentIndex, onClose }) => {
  if (!images || images.length === 0) return null;

  const goPrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      {/* Nút đóng */}
      <button
        className="absolute top-5 right-5 text-white text-3xl"
        onClick={onClose}
      >
        <FaTimes />
      </button>

      {/* Nút trái */}
      <button
        className="absolute left-5 text-white text-3xl"
        onClick={goPrev}
      >
        <FaChevronLeft />
      </button>

      {/* Ảnh chính */}
      <div className="max-w-4xl max-h-[80vh] flex items-center justify-center">
        <img
          src={images[currentIndex]}
          alt={`lightbox-${currentIndex}`}
          className="max-h-[80vh] object-contain rounded-md"
        />
      </div>

      {/* Nút phải */}
      <button
        className="absolute right-5 text-white text-3xl"
        onClick={goNext}
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default Lightbox;
