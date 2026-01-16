import React from "react";

const GeneralSettingsForm = () => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold p-2">General Settings</h3>
      <input
        type="text"
        className="border p-2 w-full rounded outline-none"
        placeholder="Company name"
      />
    </div>
  );
};

export default GeneralSettingsForm;
