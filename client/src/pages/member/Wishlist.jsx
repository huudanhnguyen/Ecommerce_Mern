// src/pages/member/Wishlist.jsx
import React from "react";

const Wishlist = () => {
  // Dữ liệu mẫu
  const wishlist = [
    {
      id: 1,
      name: "iPhone 15 Pro Max",
      price: "35,000,000 VND",
    },
    {
      id: 2,
      name: "MacBook Pro M3",
      price: "50,000,000 VND",
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">My Wishlist</h2>
      {wishlist.length === 0 ? (
        <p className="text-gray-500">Your wishlist is empty.</p>
      ) : (
        <div className="grid gap-4">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border p-4 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-gray-500">{item.price}</p>
              </div>
              <button className="text-red-500 hover:text-red-700">
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
