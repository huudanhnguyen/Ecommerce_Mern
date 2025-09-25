import axios from '../axios';

// Lấy tất cả product categories
export const getApiProductCategories = () => axios({
  url: '/product-categories',
  method: 'get'
});

// Lấy product category theo ID
export const getProductCategoryById = (id) => axios({
  url: `/product-categories/${id}`,
  method: 'get'
});

// Tạo product category mới (admin)
export const createProductCategory = (data) => axios({
  url: '/product-categories',
  method: 'post',
  data
});

// Cập nhật product category (admin)
export const updateProductCategory = (id, data) => axios({
  url: `/product-categories/${id}`,
  method: 'put',
  data
});

// Xóa product category (admin)
export const deleteProductCategory = (id) => axios({
  url: `/product-categories/${id}`,
  method: 'delete'
});
