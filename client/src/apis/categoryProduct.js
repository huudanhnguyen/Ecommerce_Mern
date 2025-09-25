import axios from '../axios'; // Import axios instance của bạn

export const getApiCategories = () => axios({
    url: '/product-categories', // Endpoint để lấy danh mục
    method: 'get'
});
