// src/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "/api", // Tự động proxy qua backend (setup trong Vite/React)
  withCredentials: true, // Nếu backend có dùng cookie
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Interceptor: luôn gắn token vào header
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
