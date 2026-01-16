import React from "react";
import { useLocation } from "react-router-dom";
const pageTiles = {
  "/": "Dashboard",
  "/analytics": "Analytics",
  "/companies": "Companies",
  "/billing": "Billing",
  "/users": "Users",
  "/settings": "Settings",
};
const Topbar = () => {
  const { pathname } = useLocation();
  return (
    <header className="h-16 bg-white border-b px-6 flex items-center justify-between">
      <h1 className="text-lg font-semibold">
        {pageTiles[pathname] || "Dashboard"}
      </h1>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500">Admin</span>
        <div className="w-8 h-8 bg-gray-300 rounded-full" />
      </div>
    </header>
  );
};

export default Topbar;
