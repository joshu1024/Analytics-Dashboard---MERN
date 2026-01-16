import React from "react";

const SMTPSettings = () => {
  return (
    <div className="bg-white p-2 rounded shadow">
      <h3 className="font-semibold mb-2">SMTP Settings</h3>
      <input
        type="text"
        className="border w-full px-4 py-2 rounded outline-none"
        placeholder="SMTP Host"
      />
    </div>
  );
};

export default SMTPSettings;
