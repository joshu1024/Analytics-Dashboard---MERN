import React from "react";

const SecuritySettings = () => {
  return (
    <div className="bg-white p-2 rounded shadow">
      <h3 className="font-semibold mb-2">Settings</h3>
      <button className="bg-red-500  text-white px-4 py-2 rounded">
        Reset password
      </button>
    </div>
  );
};

export default SecuritySettings;
