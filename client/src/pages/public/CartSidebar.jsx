import React from "react";
import { useCart } from "../../context/CartContext";
import { FaTimes } from "react-icons/fa";
import { formatPrice } from "../../utils/helpers";
import { Link } from "react-router-dom";

const CartSidebar = () => {
  const { cartItems, removeFromCart, updateQuantity, isOpen, setIsOpen } = useCart();

  // tính tổng an toàn
  const total = cartItems.reduce((acc, it) => {
    const price = it?.price ?? it?.product?.price ?? 0;
    const qty = it?.quantity ?? 0;
    return acc + price * qty;
  }, 0);

  return (
    <div
      className={`fixed top-0 right-0 w-[400px] h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-bold">My Cart</h2>
        <button aria-label="Close cart" onClick={() => setIsOpen(false)}>
          <FaTimes size={20} />
        </button>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col gap-4 overflow-y-auto h-[70%]">
        {cartItems.length === 0 ? (
          <p className="text-gray-500">Empty Cart</p>
        ) : (
          cartItems.map((item, index) => {
            const variants = item.variants ?? item.selectedVariants ?? {};
            const price = item?.price ?? item?.product?.price ?? 0;
            const title = item?.title ?? item?.product?.title ?? "Sản phẩm";
            const thumb = item?.thumb ?? item?.product?.thumb ?? "/no-image.png";
            const key = `${item._id}-${JSON.stringify(variants)}-${index}`;

            return (
              <div key={key} className="flex items-center gap-4 border-b pb-2">
                <img src={thumb} alt={title} className="w-16 h-16 object-cover rounded" />
                <div className="flex-1">
                  <h3 className="text-sm font-medium">{title}</h3>

                  {Object.keys(variants).length > 0 && (
                    <p className="text-xs text-gray-500">
                      {Object.entries(variants).map(([k, v]) => `${k}: ${v}`).join(" • ")}
                    </p>
                  )}

                  {/* Giá + số lượng với nút +/- */}
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-sm text-main font-semibold">
                      {formatPrice(price)}
                    </p>
                    <div className="flex items-center border rounded">
                      <button
                        className="px-2 py-1"
                        onClick={() =>
                          updateQuantity(item._id, variants, item.quantity - 1)
                        }
                      >
                        -
                      </button>
                      <span className="px-2">{item.quantity}</span>
                      <button
                        className="px-2 py-1"
                        onClick={() =>
                          updateQuantity(item._id, variants, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item._id, variants)}
                  className="text-red-500 text-sm"
                  aria-label={`Xóa ${title}`}
                >
                  Delete
                </button>
              </div>
            );
          })
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t">
        <div className="flex justify-between items-center mb-3">
          <span className="font-semibold">Total</span>
          <span className="font-bold text-main">{formatPrice(total)}</span>
        </div>

        <div className="flex gap-2">
          <Link
  to="/cart"
  className="flex-1 bg-main text-white py-2 rounded text-center"
  onClick={() => setIsOpen(false)}
>
  Shopping Cart
</Link>
          <button className="flex-1 bg-black text-white py-2 rounded">Check Out</button>
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;
