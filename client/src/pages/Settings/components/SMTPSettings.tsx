import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { UpdateSMTPSettings } from "../../../store/slices/settingsSlice.js";
import { Rootstate } from "../../../store/index.js";
import { useAppDispatch } from "../../../store/hooks.js";

const SMTPSettings = () => {
  const dispatch = useAppDispatch();

  const { settings, loading } = useSelector((state:Rootstate) => state.settings);

  const [host, setHost] = useState("");

  // preload existing value
  useEffect(() => {
    if (settings?.smtp?.host) {
      setHost(settings.smtp.host);
    }
  }, [settings]);

  const handleSubmit = (e:React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(UpdateSMTPSettings({ host }));
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-3">SMTP Settings</h3>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="border w-full px-4 py-2 rounded outline-none"
          placeholder="SMTP Host (e.g. smtp.gmail.com)"
          value={host}
          onChange={(e) => setHost(e.target.value)}
        />

        <button
          type="submit"
          className="mt-3 bg-blue-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save SMTP"}
        </button>
      </form>
    </div>
  );
};

export default SMTPSettings;
