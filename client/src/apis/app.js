import axios from '../axios';

export const getApiCategories = ()=> axios({
  url:'/product-categories',
  method:'get'
})