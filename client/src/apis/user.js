import axios from '../axios';

// Lấy thông tin user hiện tại
export const getCurrentUser = () =>
  axios.get("/user/profile");

// Cập nhật thông tin user
export const updateUserProfile = (data) =>
  axios.put("/user/profile/update", data);

// Đổi mật khẩu
export const changePassword = (data) => axios({
  url: '/user/change-password',
  method: 'put',
  data
});

// Upload avatar
export const uploadAvatar = (data) =>
  axios({
    url: '/user/profile/upload-avatar',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

// Lấy lịch sử đơn hàng
export const getUserOrders = (params) => axios({
  url: '/user/orders',
  method: 'get',
  params
});

// Lấy thông tin đơn hàng chi tiết
export const getOrderById = (id) => axios({
  url: `/user/orders/${id}`,
  method: 'get'
});

// Wishlist APIs
export const apiGetWishlist = () => axios({
  url: '/user/wishlist',
  method: 'get'
});

export const apiAddToWishlist = (productId) => axios({
  url: '/user/wishlist/add',
  method: 'post',
  data: { productId }
});

export const apiRemoveFromWishlist = (productId) => axios({
  url: '/user/wishlist',
  method: 'delete',
  data: { productId }
});

// Cart APIs
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

// Admin User Management APIs
export const getAllUsers = (params = {}) => axios({
  url: '/user/admin/users',
  method: 'get',
  params
});

export const getUserById = (userId) => axios({
  url: `/user/admin/${userId}`,
  method: 'get'
});

export const createUser = (userData) => axios({
  url: '/user/admin/create',
  method: 'post',
  data: userData
});

export const updateUser = (userId, userData) => axios({
  url: `/user/admin/${userId}`,
  method: 'put',
  data: userData
});

export const deleteUser = (userId) => axios({
  url: `/user/admin/${userId}`,
  method: 'delete'
});

export const toggleBlockUser = (userId) => axios({
  url: `/user/admin/${userId}/toggle-block`,
  method: 'put'
});