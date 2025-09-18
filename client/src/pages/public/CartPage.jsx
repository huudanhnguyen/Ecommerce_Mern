// src/pages/public/CartPage.jsx
import React from "react";
import { formatPrice } from "../../utils/helpers";
import { useCart } from "../../context/CartContext";
import Breadcrumb from "../../components/Breadcrumb";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CartPage = () => {
  const { cartItems, updateCart, removeFromCart } = useCart();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const total = cartItems.reduce((acc, it) => {
    const price = it?.productId?.price ?? 0;
    const qty = it?.quantity ?? 0;
    return acc + price * qty;
  }, 0);

  const handleCheckout = () => {
    navigate("/checkout");
  };

  // 🔹 Nếu chưa đăng nhập hoặc cartItems rỗng → hiển thị Empty Cart
  if (!isLoggedIn || cartItems.length === 0) {
    return (
      <div className="w-main px-8 py-6">
        <Breadcrumb />
        <div className="text-center py-10">
          <p className="mb-4">Your cart is empty.</p>
          <a
            href="/"
            className="mt-4 inline-block bg-main text-white px-6 py-2 rounded hover:bg-red-700 transition-colors"
          >
            Continue shopping
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="w-main px-8 py-6">
      <Breadcrumb />

      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2 w-2/3">Product</th>
            <th className="p-2 w-1/6">Quantity</th>
            <th className="p-2 w-1/6">Price</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item, index) => {
            const product = item?.productId || {};
            const price = product?.price ?? 0;
            const title = product?.title ?? "Product";
            const thumb = product?.thumb ?? "/no-image.png";
            const variants = item.variants ?? {};
            const key = `${product._id}-${index}`;

            return (
              <tr key={key} className="border-b">
                <td className="flex items-center gap-4 p-2">
                  <img
                    src={thumb}
                    alt={title}
                    className="w-24 h-24 object-cover"
                  />
                  <div>
                    <p className="font-medium">{title}</p>
                    {Object.keys(variants).length > 0 && (
                      <p className="text-sm text-gray-500">
                        {Object.entries(variants)
                          .map(([k, v]) => `${k}: ${v}`)
                          .join(" • ")}
                      </p>
                    )}
                    <button
                      onClick={() => removeFromCart(product._id, variants)}
                      className="text-red-500 text-sm mt-1"
                    >
                      Remove
                    </button>
                  </div>
                </td>

                <td className="text-center p-2">
                  <div className="flex items-center justify-center border rounded w-fit mx-auto">
                    <button
                      className="px-2"
                      onClick={() => {
                        if (item.quantity > 1) {
                          updateCart(product._id, item.quantity - 1, variants);
                        } else {
                          removeFromCart(product._id, variants);
                        }
                      }}
                    >
                      -
                    </button>
                    <span className="px-3">{item.quantity}</span>
                    <button
                      className="px-2"
                      onClick={() =>
                        updateCart(product._id, item.quantity + 1, variants)
                      }
                    >
                      +
                    </button>
                  </div>
                </td>

                <td className="text-center p-2 font-semibold">
                  {formatPrice(price * item.quantity)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="flex justify-end items-center mt-6">
        <span className="text-lg font-bold mr-4">Subtotal:</span>
        <span className="text-xl font-bold text-main">
          {formatPrice(total)}
        </span>
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={handleCheckout}
          className="bg-black text-white px-6 py-3 rounded"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
