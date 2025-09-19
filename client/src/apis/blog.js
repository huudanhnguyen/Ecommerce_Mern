import axios from '../axios';

// Lấy blogs có phân trang
export const getApiBlogs = (page = 1, limit = 6) =>
  axios({
    url: '/blog',
    method: 'GET',
    params: { page, limit },
  });
// Lấy chi tiết blog theo id
export const getApiBlogDetail = (id) =>
  axios({
    url: `/blog/${id}`,
    method: "GET",
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