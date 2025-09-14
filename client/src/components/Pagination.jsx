import React from "react";

const Pagination = ({ page, setPage, totalPages }) => {
  return (
    <div className="flex justify-center mt-6 gap-2 items-center">
      <button
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        disabled={page === 1}
        className={`px-4 py-2 border rounded ${
          page === 1
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-white hover:bg-gray-100"
        }`}
      >
        Prev
      </button>

      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          onClick={() => setPage(i + 1)}
          className={`px-4 py-2 border rounded ${
            page === i + 1
              ? "bg-main text-white font-bold"
              : "bg-white hover:bg-gray-100"
          }`}
        >
          {i + 1}
        </button>
      ))}

      <button
        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={page === totalPages}
        className={`px-4 py-2 border rounded ${
          page === totalPages
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-white hover:bg-gray-100"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
