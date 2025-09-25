import React, { useState } from "react";
import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
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
  FileText,
  FolderOpen,
  Layers,
  Image,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const AdminLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false); // Thu nhỏ sidebar
  const [mobileOpen, setMobileOpen] = useState(false); // Mobile menu
  const [expandedGroups, setExpandedGroups] = useState({
    products: true,
    content: true,
    system: false,
  });

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // Toggle group expansion
  const toggleGroup = (groupName) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupName]: !prev[groupName]
    }));
  };

  // Menu structure with groups
  const menuGroups = [
    {
      id: "dashboard",
      title: "Tổng Quan",
      icon: <LayoutDashboard size={18} />,
      items: [
        { to: "/admin/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
        { to: "/admin/analytics", label: "Thống Kê", icon: <BarChart3 size={18} /> },
      ]
    },
    {
      id: "products",
      title: "Sản Phẩm",
      icon: <Package size={18} />,
      items: [
        { to: "/admin/products", label: "Danh Sách Sản Phẩm", icon: <Package size={18} /> },
        { to: "/admin/product-categories", label: "Danh Mục Sản Phẩm", icon: <Layers size={18} /> },
      ]
    },
    {
      id: "content",
      title: "Nội Dung",
      icon: <FileText size={18} />,
      items: [
        { to: "/admin/blogs", label: "Bài Viết Blog", icon: <FileText size={18} /> },
        { to: "/admin/blog-categories", label: "Danh Mục Blog", icon: <FolderOpen size={18} /> },
        { to: "/admin/sliders", label: "Quản Lý Slider", icon: <Image size={18} /> },
      ]
    },
    {
      id: "users",
      title: "Người Dùng",
      icon: <Users size={18} />,
      items: [
        { to: "/admin/users", label: "Quản Lý Người Dùng", icon: <Users size={18} /> },
      ]
    },
    {
      id: "system",
      title: "Hệ Thống",
      icon: <Settings size={18} />,
      items: [
        { to: "/admin/settings", label: "Cài Đặt", icon: <Settings size={18} /> },
      ]
    }
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
        <nav className="flex-1 px-2 py-6 space-y-4">
          {menuGroups.map((group, index) => (
            <div key={group.id} className="space-y-1">
              {/* Divider before system group */}
              {group.id === "system" && !collapsed && (
                <div className="border-t border-gray-200 pt-4"></div>
              )}
              {/* Group Header */}
              {!collapsed && (
                <div
                  className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                    group.items.some(item => 
                      location.pathname === item.to
                    ) 
                      ? "bg-main/10 text-main" 
                      : "text-gray-700 hover:bg-gray-100 hover:text-main"
                  }`}
                  onClick={() => toggleGroup(group.id)}
                >
                  <div className="flex items-center gap-3">
                    {group.icon}
                    <span>{group.title}</span>
                  </div>
                  {group.items.length > 1 && (
                    expandedGroups[group.id] ? 
                      <ChevronUp size={16} /> : 
                      <ChevronDown size={16} />
                  )}
                </div>
              )}

              {/* Group Items */}
              {(!collapsed && (group.items.length === 1 || expandedGroups[group.id])) && (
                <div className="ml-6 space-y-1">
                  {group.items.map((item) => (
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
                      <span>{item.label}</span>
                    </NavLink>
                  ))}
                </div>
              )}

              {/* Collapsed mode - show all items as single icons */}
              {collapsed && (
                <div className="space-y-1">
                  {group.items.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      className={({ isActive }) =>
                        `flex items-center justify-center px-3 py-2 rounded-lg text-sm font-medium transition-colors group relative ${
                          isActive
                            ? "bg-main text-white shadow"
                            : "text-gray-600 hover:bg-gray-100 hover:text-main"
                        }`}
                      title={item.label}
                    >
                      <>
                        {item.icon}
                        {/* Tooltip for collapsed mode */}
                        <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                          {item.label}
                        </div>
                      </>
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
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
