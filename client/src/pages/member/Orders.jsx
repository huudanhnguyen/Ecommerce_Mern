// src/pages/member/Orders.jsx
import React from "react";

const Orders = () => {
  // Dữ liệu mẫu
  const orders = [
    {
      id: "OD12345",
      date: "2025-09-01",
      status: "Delivered",
      total: "1,200,000 VND",
    },
    {
      id: "OD12346",
      date: "2025-09-03",
      status: "Processing",
      total: "850,000 VND",
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>
      {orders.length === 0 ? (
        <p className="text-gray-500">You have no orders yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3 border">Order ID</th>
                <th className="p-3 border">Date</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="p-3 border">{order.id}</td>
                  <td className="p-3 border">{order.date}</td>
                  <td className="p-3 border">{order.status}</td>
                  <td className="p-3 border">{order.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
