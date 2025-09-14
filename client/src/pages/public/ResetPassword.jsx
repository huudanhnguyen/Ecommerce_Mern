// src/pages/public/ResetPassword.jsx
import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { apiResetPassword } from "../../apis/user"; // gọi API reset password

const ResetPassword = () => {
  const { token } = useParams(); // lấy token từ URL
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp.");
      setLoading(false);
      return;
    }

    try {
      const response = await apiResetPassword(token, password);
      setMessage(response.data.message || "Đặt lại mật khẩu thành công!");
      // Chờ 2s rồi điều hướng về login
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-gray-100 flex justify-center pt-20 pb-20 min-h-screen">
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg h-fit">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Reset Password
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Nhập mật khẩu mới cho tài khoản của bạn.
        </p>

        {message && (
          <p className="text-center text-green-600 mb-4 bg-green-100 p-2 rounded-md">
            {message}
          </p>
        )}
        {error && (
          <p className="text-center text-red-600 mb-4 bg-red-100 p-2 rounded-md">
            {error}
          </p>
        )}

        <form onSubmit={handleResetPassword} className="space-y-6">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Mật khẩu mới
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm
                         placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500"
              placeholder="Nhập mật khẩu mới"
              disabled={loading}
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Xác nhận mật khẩu
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm
                         placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500"
              placeholder="Nhập lại mật khẩu"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm 
                       text-lg font-bold text-white bg-main hover:bg-red-700 focus:outline-none 
                       focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
            disabled={loading}
          >
            {loading ? "Đang xử lý..." : "Đặt lại mật khẩu"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-500">
          Nhớ mật khẩu?{" "}
          <Link to="/login" className="font-medium text-main hover:underline">
            Quay lại đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
