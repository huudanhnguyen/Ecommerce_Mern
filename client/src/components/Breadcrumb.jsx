import React from "react";
import { Link, useLocation } from "react-router-dom";

// format text: viết hoa chữ cái đầu và thay - thành khoảng trắng
const formatSegment = (segment) => {
  if (!segment) return "";
  return segment
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const Breadcrumb = ({ product }) => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <div className="text-sm text-gray-500 mb-6 flex items-center gap-1">
      <Link to="/" className="hover:underline text-black-600">
        Home
      </Link>

      {product ? (
        // ✅ Dữ liệu từ API
        <>
          <span>›</span>
          <Link
            to={`/products/${product.category?.slug}`}
            className="hover:underline text-black-600"
          >
            {product.category?.title}
          </Link>
          <span>›</span>
          <span className="font-semibold uppercase">{product.title}</span>
        </>
      ) : (
        // ✅ Fallback theo URL slug
        pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          return (
            <span key={to} className="flex items-center gap-1">
              <span>›</span>
              {isLast ? (
                <span className="font-semibold uppercase">
                  {formatSegment(value)}
                </span>
              ) : (
                <Link to={to} className="hover:underline text-blue-600">
                  {formatSegment(value)}
                </Link>
              )}
            </span>
          );
        })
      )}
    </div>
  );
};

export default Breadcrumb;
