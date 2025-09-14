import axios from '../axios';

export const getApiBlogs = (params) => axios({
    url: '/blog',
    method: 'GET',
    params
});