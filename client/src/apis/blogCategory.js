export const getApiBlogCategories = () => axios({
  url: '/blog-categories',
  method: 'get'
});
