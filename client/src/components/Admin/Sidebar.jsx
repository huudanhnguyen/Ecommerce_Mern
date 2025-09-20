import React from "react";
import { X, Home, BarChart2, ShoppingBag, Users, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  { name: "Dashboard", icon: <Home size={20} />, path: "/" },
  { name: "Analytics", icon: <BarChart2 size={20} />, path: "/analytics" },
  { name: "Products", icon: <ShoppingBag size={20} />, path: "/products" },
  { name: "Users", icon: <Users size={20} />, path: "/users" },
  { name: "Settings", icon: <Settings size={20} />, path: "/settings" },
];

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <div
      className={`fixed inset-y-0 left-0 transform ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } w-64 bg-red-600 text-white transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static`}
    >
      <div className="flex items-center justify-between px-4 py-4 border-b border-red-500">
        <h1 className="text-2xl font-bold">MyAdmin</h1>
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden text-white"
        >
          <X size={24} />
        </button>
      </div>
      <nav className="mt-6">
        {navItems.map((item, i) => (
          <NavLink
            key={i}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-3 hover:bg-red-500 transition ${
                isActive ? "bg-red-700" : ""
              }`
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
