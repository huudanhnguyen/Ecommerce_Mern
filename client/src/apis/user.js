// src/apis/user.js
import axios from "../axios"; // Axios instance đã cấu hình interceptor

// ================== AUTH ==================

// Đăng nhập
export const apiLogin = (data) =>
  axios.post("/user/login", data);

// Đăng ký
export const apiRegister = (data) =>
  axios.post("/user/register", data);

// Xác minh email
export const apiVerifyEmail = (token) =>
  axios.get(`/user/finalRegister/${token}`);

// Quên mật khẩu
export const apiForgotPassword = (email) =>
  axios.get(`/user/forgot-password?email=${email}`);

// Reset mật khẩu
export const apiResetPassword = (token, password) =>
  axios.put(`/user/reset-password/${token}`, { password });

// ================== CART ==================

// Lấy giỏ hàng của user
export const apiGetCart = () => axios.get("/user/cart");

// Thêm sản phẩm vào giỏ hàng
// data = { productId, quantity, variants }
export const apiAddToCart = ({ productId, quantity = 1, variants = {} }) =>
  axios.post("/user/cart", { productId, quantity, variants });

// Cập nhật số lượng sản phẩm trong giỏ
// data = { productId, quantity, variants }
export const apiUpdateCart = ({ productId, quantity, variants = {} }) => {
  if (!productId || typeof quantity !== "number") {
    throw new Error("apiUpdateCart: thiếu productId hoặc quantity không hợp lệ");
  }
  return axios.put("/user/cart", { productId, quantity, variants });
};

// Xóa sản phẩm khỏi giỏ
// data = { productId, variants }
export const apiRemoveFromCart = ({ productId, variants = {} }) => {
  if (!productId) {
    throw new Error("apiRemoveFromCart: thiếu productId");
  }
  return axios.delete("/user/cart", { data: { productId, variants } });
};

// ================== WISHLIST ==================

// Lấy danh sách yêu thích
export const apiGetWishlist = () => axios.get("/user/wishlist");

// Thêm sản phẩm vào wishlist
export const apiAddToWishlist = (productId) =>
  axios.post("/user/wishlist", { productId });

// Xóa sản phẩm khỏi wishlist
export const apiRemoveFromWishlist = (productId) =>
  axios.delete("/user/wishlist", { data: { productId } });
