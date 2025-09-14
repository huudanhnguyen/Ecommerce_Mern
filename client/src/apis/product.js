import axios from '../axios';

export const getAllProducts = (params) => axios({
    url: '/product',
    method: 'GET',
    params
});
export const getProductById = (pid) => axios({
    url: `/product/${pid}`,
    method: 'get'
});