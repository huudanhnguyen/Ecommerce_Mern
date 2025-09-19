import axios from '../axios';

// ================= PRODUCT =================

// Lấy tất cả sản phẩm
export const getAllProducts = (params) =>
  axios({
    url: '/product',
    method: 'get',
    params,
  });

// Lấy sản phẩm theo id
export const getProductById = (pid) =>
  axios({
    url: `/product/${pid}`,
    method: 'get',
  });

// ================= RATING =================

// Gửi/cập nhật đánh giá cho sản phẩm
// data = { star, comment }
export const rateProduct = ({ productId, star, comment, name }) =>
  axios({
    url: `/product/${productId}/ratings`,
    method: "POST",
    data: { star, comment, name },
  });

// Lấy danh sách đánh giá của sản phẩm
export const getProductRatings = (pid) =>
  axios({
    url: `/product/${pid}/ratings`,
    method: 'GET',
  });
