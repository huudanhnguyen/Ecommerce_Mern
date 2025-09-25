// src/components/TopHeader.jsx

import React, { useState, useEffect, useRef } from "react"; // 1. Import thêm useEffect và useRef
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/userSlice";
import { FaUserCircle } from "react-icons/fa";
import { FaFacebookF, FaTwitter, FaGoogle, FaPinterestP } from "react-icons/fa";

const TopHeader = () => {
  const { isLoggedIn, currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State để quản lý việc hiển thị dropdown
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null); // Ref để tham chiếu đến dropdown

  // 2. Logic để đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Nếu dropdown đang mở và người dùng click vào một nơi không thuộc dropdown
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    // Thêm event listener
    document.addEventListener("mousedown", handleClickOutside);
    // Dọn dẹp event listener khi component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]); // Chỉ chạy lại nếu ref thay đổi

  return (
    <div className="w-full bg-main text-white">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-2 text-xs sm:text-sm gap-2 sm:gap-4">
          {/* --- Phần trái: Thông tin khuyến mãi --- */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span className="hidden sm:inline">ORDER ONLINE OR CALL US (+1800) 000 8808</span>
            <span className="sm:hidden">ORDER ONLINE OR CALL US</span>
            <span className="border-l pl-2 sm:pl-4">VND</span>
          </div>

          {/* --- Phần phải --- */}
          <div className="flex items-center justify-center sm:justify-end gap-4 sm:gap-6">
          {isLoggedIn && currentUser ? (
            // 3. Gắn ref vào div cha và sửa lại sự kiện
            <div className="relative" ref={dropdownRef}>
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setShowDropdown((prev) => !prev)} // Click để bật/tắt
              >
                <FaUserCircle size={20} />
                <span>
                  {currentUser?.firstname} {currentUser?.lastname}
                </span>
              </div>

              {showDropdown && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20 text-black">
                  <div className="py-1">
                    {currentUser?.role === "admin" ? (
                      <Link
                        to="/admin/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Dashboard
                      </Link>
                    ) : (
                      <Link
                        to="/my-account"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        My Account
                      </Link>
                    )}

                    <button
                      onClick={() => {
                        dispatch(logout());
                        navigate("/login");
                        setShowDropdown(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="hover:text-gray-300">
              Sign In or Create Account
            </Link>
          )}

            <div className="flex items-center gap-3 sm:gap-4">
              <a href="#" className="hover:text-gray-300 transition-colors">
                <FaFacebookF size={14} />
              </a>
              <a href="#" className="hover:text-gray-300 transition-colors">
                <FaTwitter size={14} />
              </a>
              <a href="#" className="hover:text-gray-300 transition-colors">
                <FaGoogle size={14} />
              </a>
              <a href="#" className="hover:text-gray-300 transition-colors">
                <FaPinterestP size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
