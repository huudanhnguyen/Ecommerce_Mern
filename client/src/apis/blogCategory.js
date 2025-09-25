import axios from '../axios';

// Lấy tất cả blog categories
export const getApiBlogCategories = () => axios({
  url: '/blog-categories',
  method: 'get'
});

// Lấy blog category theo ID
export const getBlogCategoryById = (id) => axios({
  url: `/blog-categories/${id}`,
  method: 'get'
});

// Tạo blog category mới (admin)
export const createBlogCategory = (data) => axios({
  url: '/blog-categories',
  method: 'post',
  data
});

// Cập nhật blog category (admin)
export const updateBlogCategory = (id, data) => axios({
  url: `/blog-categories/${id}`,
  method: 'put',
  data
});

// Xóa blog category (admin)
export const deleteBlogCategory = (id) => axios({
  url: `/blog-categories/${id}`,
  method: 'delete'
});
