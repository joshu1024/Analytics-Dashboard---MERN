import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../../store/slices/authSlice.js";
import SidebarItem from "./SidebarItem.jsx";

const Sidebar = () => {
  const dispatch = useDispatch();
  const linkClass = "block px-4 py-2 rounded hover:bg-gray-700 transition";
  return (
    <aside className="bg-slate-900 text-white flex flex-col w-64">
      <div className="px-6 py-4 text-xl border-slate-700 font-bold border-b">
        Dashboard
      </div>

      <SidebarItem to="/" label="Dashboard" />
      <SidebarItem to="/analytics" label="Analytics" />
      <SidebarItem to="/companies" label="Companies" />
      <SidebarItem to="/billing" label="Billing" />
      <SidebarItem to="/users" label="Users" />
      <SidebarItem to="/settings" label="Settings" />

      <button
        onClick={() => dispatch(logOut())}
        className="m-4 px-4 py-2 text-red-400 hover:bg-red-500 hover:text-white rounded-2xl"
      >
        Logout
      </button>
    </aside>
  );
};
export default Sidebar;
