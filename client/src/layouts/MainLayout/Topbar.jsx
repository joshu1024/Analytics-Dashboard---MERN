import React from "react";
import { useSelector } from "react-redux";
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
  const { user } = useSelector((state) => state.auth);

  return (
    <header className="h-16 bg-white border-b px-6 flex items-center justify-between">
      <h1 className="text-lg font-semibold">
        {pageTiles[pathname] || "Dashboard"}
      </h1>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-semibold">
            {user?.fullName || user?.email || "Guest"}
          </p>
          <p className="text-xs text-gray-500">{user?.role || "User"}</p>
        </div>

        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center font-semibold">
          {user?.email?.[0]?.toUpperCase() || "?"}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
