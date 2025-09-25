import axios from '../axios';

// Lấy blogs có phân trang
export const getApiBlogs = (page = 1, limit = 6) =>
  axios({
    url: '/blog',
    method: 'GET',
    params: { page, limit },
  });

// Lấy tất cả blogs (cho admin)
export const getAllBlogs = (params = {}) =>
  axios({
    url: '/blog',
    method: 'GET',
    params,
  });

// Lấy chi tiết blog theo id
export const getApiBlogDetail = (id) =>
  axios({
    url: `/blog/${id}`,
    method: "GET",
  });

// Lấy blog theo id (cho admin)
export const getBlogById = (id) =>
  axios({
    url: `/blog/${id}`,
    method: "GET",
  });

// Tạo blog mới
export const createBlog = (data, config = {}) =>
  axios({
    url: '/blog',
    method: 'POST',
    data,
    ...config,
  });

// Cập nhật blog
export const updateBlog = (id, data, config = {}) =>
  axios({
    url: `/blog/${id}`,
    method: 'PUT',
    data,
    ...config,
  });

// Xóa blog
export const deleteBlog = (id) =>
  axios({
    url: `/blog/${id}`,
    method: 'DELETE',
  });

// Toggle like
export const likeBlog = (id) =>
  axios({
    url: `/blog/like/${id}`,
    method: "PUT",
  });

// Toggle dislike
export const dislikeBlog = (id) =>
  axios({
    url: `/blog/dislike/${id}`,
    method: "PUT",
  });