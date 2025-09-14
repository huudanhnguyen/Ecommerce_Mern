import axios from '../axios'; // Import instance axios đã cấu hình

// Hàm này nhận vào data là { email, password }
export const apiLogin = (data) => axios({
    url: '/user/login',
    method: 'post',
    data // Gửi email và password trong body của request
});

export const apiRegister = (data) => axios({
    url: '/user/register',
    method: 'post',
    data
});

export const apiVerifyEmail = (token) => axios({
    url: `/user/finalRegister/${token}`, 
    method: 'get'
});
export const apiForgotPassword = (email) =>
  axios.get(`/user/forgot-password?email=${email}`);

export const apiResetPassword = (token, password) =>
  axios.put(`/user/reset-password/${token}`, { password });