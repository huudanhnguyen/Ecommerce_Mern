import React from "react";
import { useCart } from "../../context/CartContext";
import { formatPrice } from "../../utils/helpers";
import Breadcrumb from "../../components/Breadcrumb";

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const total = cartItems.reduce((acc, it) => {
    const price = it?.price ?? it?.product?.price ?? 0;
    const qty = it?.quantity ?? 0;
    return acc + price * qty;
  }, 0);

  return (
    <div className="w-main px-8 py-6">
      <Breadcrumb />

      {cartItems.length === 0 ? (
        <p>Empty Cart</p>
      ) : (
        <table className="w-main border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2 w-2/3">Product</th>
              <th className="p-2 w-1/6">Quantity</th>
              <th className="p-2 w-1/6">Price</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => {
              const price = item?.price ?? item?.product?.price ?? 0;
              const title = item?.title ?? item?.product?.title ?? "Product";
              const thumb = item?.thumb ?? item?.product?.thumb ?? "/no-image.png";
              const variants = item.variants ?? item.selectedVariants ?? {};
              const key = `${item._id}-${JSON.stringify(variants)}-${index}`;

              return (
                <tr key={key} className="border-b">
                  <td className="flex items-center gap-4 p-2">
                    <img src={thumb} alt={title} className="w-24 h-24 object-cover" />
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
                        onClick={() => removeFromCart(item._id, variants)}
                        className="text-red-500 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  </td>

                  <td className="text-center p-2">
                    <div className="flex items-center justify-center border rounded w-fit mx-auto">
                      <button
                        className="px-2"
                        onClick={() =>
                          updateQuantity(item._id, variants, item.quantity - 1)
                        }
                      >
                        -
                      </button>
                      <span className="px-3">{item.quantity}</span>
                      <button
                        className="px-2"
                        onClick={() =>
                          updateQuantity(item._id, variants, item.quantity + 1)
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
      )}

      <div className="flex justify-end items-center mt-6">
        <span className="text-lg font-bold mr-4">Subtotal:</span>
        <span className="text-xl font-bold text-main">{formatPrice(total)}</span>
      </div>

      <div className="flex justify-end mt-6">
        <button className="bg-black text-white px-6 py-3 rounded">Checkout</button>
      </div>
    </div>
  );
};

export default CartPage;
