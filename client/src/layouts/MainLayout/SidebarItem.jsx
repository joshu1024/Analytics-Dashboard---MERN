import { NavLink } from "react-router-dom";

const SidebarItem = ({ to, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `block px-4 py-2 transition
         ${
           isActive
             ? "text-white border-white bg-slate-800"
             : "border-transparent text-gray-300 hover:text-white"
         }`
      }
    >
      {label}
    </NavLink>
  );
};

export default SidebarItem;
