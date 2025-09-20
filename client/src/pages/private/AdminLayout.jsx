import React, { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/userSlice";
import {
  LayoutDashboard,
  Users,
  Package,
  Settings,
  BarChart3,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const AdminLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false); // Thu nhỏ sidebar
  const [mobileOpen, setMobileOpen] = useState(false); // Mobile menu

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const navItems = [
    { to: "/admin/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { to: "/admin/users", label: "Users", icon: <Users size={18} /> },
    { to: "/admin/products", label: "Products", icon: <Package size={18} /> },
    { to: "/admin/settings", label: "Settings", icon: <Settings size={18} /> },
    { to: "/admin/analytics", label: "Analytics", icon: <BarChart3 size={18} /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${
          mobileOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        } ${collapsed ? "w-20" : "w-64"}
          bg-white border-r shadow-sm flex flex-col transition-all duration-300
          fixed md:static z-40 h-full`}
      >
        {/* Logo / Header */}
        <div className="h-16 flex items-center justify-between border-b px-4">
          {!collapsed && <h1 className="text-xl font-bold text-main">Admin Panel</h1>}
          {/* Collapse button */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg hover:bg-gray-100 hidden md:block"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>

          {/* Mobile close */}
          <button
            onClick={() => setMobileOpen(false)}
            className="p-2 rounded-lg hover:bg-gray-100 md:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-6 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-main text-white shadow"
                    : "text-gray-600 hover:bg-gray-100 hover:text-main"
                }`
              }
            >
              {item.icon}
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Logout button */}
        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 px-3 py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition"
          >
            <LogOut size={18} /> {!collapsed && "Logout"}
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar (chỉ hiện trên mobile) */}
        <header className="h-16 bg-white shadow flex items-center px-4 md:hidden">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <Menu size={22} />
          </button>
          <h1 className="ml-3 text-lg font-bold text-main">Admin Panel</h1>
        </header>

        <main className="flex-1 p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
