import React from "react";
import { useWishlist } from "../../context/WishlistContext";
import { formatPrice } from "../../utils/helpers";
import Breadcrumb from "../../components/Breadcrumb";
import { Link } from "react-router-dom";
import path from "../../utils/path";

const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();

  return (
    <div className="w-main px-8 py-6">
        <Breadcrumb />

      {wishlistItems.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-600">Favorites list is empty.</p>
          <a
            href="/"
            className="mt-4 inline-block bg-main text-white px-6 py-2 rounded hover:bg-red-700 transition-colors"
          >
            Continue shopping
          </a>
        </div>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2 w-2/3">Product</th>
              <th className="p-2 w-1/3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {wishlistItems.map((item, index) => {
              const title = item?.title ?? item?.product?.title ?? "Sản phẩm";
              const thumb = item?.thumb ?? item?.product?.thumb ?? "/no-image.png";
              const price = item?.price ?? item?.product?.price ?? 0;
              const key = `${item._id}-${index}`;

              return (
                <tr key={key} className="border-b">
                  <td className="flex items-center gap-4 p-2">
                    <img
                      src={thumb}
                      alt={title}
                      className="w-24 h-24 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium">{title}</p>
                      <p className="text-main font-bold mt-1">{formatPrice(price)}</p>
                      <button
                        onClick={() => removeFromWishlist(item._id)}
                        className="text-red-500 text-sm mt-1"
                      >
                        Remove
                      </button>
                    </div>
                  </td>

<td className="text-center p-2">
          

  <Link
    to={`/${path.DETAIL_PRODUCT}/${item._id}/${item.slug}`}
    className="bg-main text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
  >
    View Details
  </Link>
</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default WishlistPage;
