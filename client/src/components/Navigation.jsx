import React from "react";
import { navigation } from "../utils/contants";
import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar"; // import component mới

const Navigation = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between py-3 lg:py-2 gap-4 lg:gap-0">
        {/* menu */}
        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 lg:gap-8">
          {navigation.map((el) => (
            <NavLink
              to={el.path}
              key={el.id}
              className={({ isActive }) =>
                `text-sm lg:text-base hover:text-red-500 transition-colors px-2 py-1 rounded ${
                  isActive ? "text-red-500 font-semibold bg-red-50" : "text-gray-700"
                }`
              }
            >
              {el.value}
            </NavLink>
          ))}
        </div>

        {/* search bar */}
        <div className="w-full lg:w-auto">
          <SearchBar />
        </div>
      </div>
    </div>
  );
};

export default Navigation;
