// src/pages/private/Checkout.jsx
import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import { formatPrice } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
    nameOnCard: "",
  });

  // Nếu giỏ hàng rỗng thì chuyển về trang cart
  if (!cartItems || cartItems.length === 0) {
    navigate("/cart");
    return null;
  }

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item?.productId?.price ?? item.price) * item.quantity,
    0
  );
  const shippingFee = 3000000;
  const total = subtotal + shippingFee;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("✅ Order placed:", { formData, cartItems });
    // 👉 sau này call API tạo đơn hàng ở đây
  };

  return (
    <div className="w-main flex justify-center px-8 py-6">
      {/* Left form */}
      <form
        onSubmit={handleSubmit}
        className="w-2/3 pr-10 border-r border-gray-300"
      >
        <h2 className="text-xl font-semibold mb-4">Contact</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border w-full mb-4 p-2 rounded"
          value={formData.email}
          onChange={handleChange}
        />

        <h2 className="text-xl font-semibold mb-4">Delivery</h2>
        <div className="flex gap-4">
          <input
            type="text"
            name="firstName"
            placeholder="First name"
            className="border w-1/2 mb-4 p-2 rounded"
            value={formData.firstName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last name"
            className="border w-1/2 mb-4 p-2 rounded"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <input
          type="text"
          name="address"
          placeholder="Address"
          className="border w-full mb-4 p-2 rounded"
          value={formData.address}
          onChange={handleChange}
        />
        <div className="flex gap-4">
          <input
            type="text"
            name="city"
            placeholder="City"
            className="border w-1/2 mb-4 p-2 rounded"
            value={formData.city}
            onChange={handleChange}
          />
          <input
            type="text"
            name="postalCode"
            placeholder="Postal code"
            className="border w-1/2 mb-4 p-2 rounded"
            value={formData.postalCode}
            onChange={handleChange}
          />
        </div>

        <h2 className="text-xl font-semibold mb-4">Payment</h2>
        <input
          type="text"
          name="cardNumber"
          placeholder="Card number"
          className="border w-full mb-4 p-2 rounded"
          value={formData.cardNumber}
          onChange={handleChange}
        />
        <div className="flex gap-4">
          <input
            type="text"
            name="expiry"
            placeholder="MM/YY"
            className="border w-1/2 mb-4 p-2 rounded"
            value={formData.expiry}
            onChange={handleChange}
          />
          <input
            type="text"
            name="cvc"
            placeholder="CVC"
            className="border w-1/2 mb-4 p-2 rounded"
            value={formData.cvc}
            onChange={handleChange}
          />
        </div>
        <input
          type="text"
          name="nameOnCard"
          placeholder="Name on card"
          className="border w-full mb-6 p-2 rounded"
          value={formData.nameOnCard}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="bg-black text-white px-6 py-3 rounded w-full"
        >
          Pay now
        </button>
      </form>

      {/* Right summary */}
      <div className="w-1/3 pl-10">
        <h2 className="text-xl font-semibold mb-4">Your Order</h2>
        
        <ul className="space-y-4">
          {cartItems.map((item, index) => {
            const product = item?.productId || {};
            const price = product?.price ?? item.price ?? 0;
            const title = product?.title ?? "Product";
            const thumb = product?.thumb ?? "/no-image.png";
            const variants = item.variants ?? {};
            const key = `${product._id || item._id}-${index}`;

            return (
              <li key={key} className="flex justify-between items-center">
                <div>
                  <img
                    src={thumb}
                    alt={title}
                    className="w-16 h-16 object-cover mb-2"
                  />
                </div>
                <div className="flex-grow px-4">
                  <p className="font-medium">{title}</p>
                  {Object.keys(variants).length > 0 && (
                    <p className="text-sm text-gray-500">
                      {Object.entries(variants)
                        .map(([k, v]) => `${k}: ${v}`)
                        .join(" • ")}
                    </p>
                  )}
                  <p className="text-sm">x{item.quantity}</p>
                </div>
                <span>{formatPrice(price * item.quantity)}</span>
              </li>
            );
          })}
        </ul>

        <div className="mt-6 space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{formatPrice(shippingFee)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg pt-2 border-t">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
