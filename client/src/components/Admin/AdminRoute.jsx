import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import path from "../../utils/path";

const AdminRoute = () => {
  const { isLoggedIn, currentUser } = useSelector((state) => state.user);

  // Nếu chưa đăng nhập
  if (!isLoggedIn || !currentUser) {
    return <Navigate to={path.LOGIN} replace />;
  }

  // Nếu không phải admin
  if (currentUser.role !== "admin") {
    return <Navigate to={path.PUBLIC} replace />;
  }

  // Là admin => render route con
  return <Outlet />;
};

export default AdminRoute;
