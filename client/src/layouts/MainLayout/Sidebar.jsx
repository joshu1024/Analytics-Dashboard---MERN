import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../store/slices/authSlice.js";
import SidebarItem from "./SidebarItem.jsx";
import api from "../../api/api.js";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const linkClass = "block px-4 py-2 rounded hover:bg-gray-700 transition";

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout", {}, { withCredentials: true });

      dispatch(logoutUser());

      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };
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
        onClick={handleLogout}
        className="m-4 px-4 py-2 text-red-400 hover:bg-red-500 hover:text-white rounded-2xl"
      >
        Logout
      </button>
    </aside>
  );
};
export default Sidebar;
