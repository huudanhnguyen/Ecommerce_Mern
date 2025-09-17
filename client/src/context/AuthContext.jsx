// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Khởi tạo trạng thái từ localStorage. !!localStorage.getItem("token") sẽ trả về true/false
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const initialLoggedIn = !!localStorage.getItem("token");
    return initialLoggedIn;
  });
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null); // Bạn sẽ cần logic để lấy thông tin người dùng từ token

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    // Nếu có token trong localStorage nhưng trạng thái isLoggedIn lại là false
    if (storedToken && !isLoggedIn) {
      setIsLoggedIn(true);
      setToken(storedToken);
      // Logic để lấy thông tin user từ token hoặc API
      setUser({ name: "Demo User", email: "demo@example.com" }); 
    } 
    // Nếu không có token trong localStorage nhưng trạng thái isLoggedIn lại là true
    else if (!storedToken && isLoggedIn) {
      setIsLoggedIn(false);
      setToken(null);
      setUser(null);
    }
    // else {
    //   console.log("AuthContext useEffect: State already consistent with localStorage.");
    // }
  }, [isLoggedIn, token]); // Theo dõi cả isLoggedIn và token để đảm bảo đồng bộ

  const login = (authToken, userData) => {
    localStorage.setItem("token", authToken);
    setToken(authToken);
    setUser(userData);
    setIsLoggedIn(true); // ✅ Đảm bảo set thành true
    toast.success("Login successful!");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setIsLoggedIn(false); // ✅ Đảm bảo set thành false
    toast.info("Logged out.");
  };

  const value = {
    isLoggedIn,
    token,
    user,
    login,
    logout,
  };

  // console.log("AuthContext Render: Current isLoggedIn =", isLoggedIn); // Log mỗi khi AuthProvider re-render

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};