import React from "react";
import { Menu } from "lucide-react";

const Navbar = ({ setSidebarOpen }) => {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow">
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden text-red-600"
      >
        <Menu size={24} />
      </button>
      <h2 className="text-xl font-semibold text-red-600">Dashboard</h2>
      <div className="flex items-center gap-4">
        <span className="font-medium">Admin</span>
        <img
          src="https://i.pravatar.cc/40"
          alt="avatar"
          className="w-10 h-10 rounded-full border-2 border-red-600"
        />
      </div>
    </header>
  );
};

export default Navbar;
