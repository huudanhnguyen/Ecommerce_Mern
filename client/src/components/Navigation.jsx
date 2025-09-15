import React from "react";
import { navigation } from "../utils/contants";
import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar"; // import component mới

const Navigation = () => {
  return (
    <div className="w-main h-[48px] py-[10px] text-sm flex items-center justify-between">
      {/* menu */}
      <div className="flex items-center">
        {navigation.map((el) => (
          <NavLink
            to={el.path}
            key={el.id}
            className={({ isActive }) =>
              `pr-12 hover:text-red-500 ${
                isActive ? "text-red-500 font-semibold" : ""
              }`
            }
          >
            {el.value}
          </NavLink>
        ))}
      </div>

      {/* search bar */}
      <SearchBar />
    </div>
  );
};

export default Navigation;
