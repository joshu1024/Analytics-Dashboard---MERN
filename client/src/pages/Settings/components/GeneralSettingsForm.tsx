import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUpdatedSettings } from "../../../store/slices/settingsSlice.js";
import { Rootstate } from "../../../store/index.js";
import { useAppDispatch } from "../../../store/hooks.js";

const GeneralSettingsForm = () => {
  const [companyName, setCompanyName] = useState("");
  const dispatch = useAppDispatch();

  const { settings, loading, error } = useSelector((state:Rootstate) => state.settings);

  useEffect(() => {
    if (settings) {
      setCompanyName(settings.companyName ?? "");
    }
  }, [settings]);

  function handleSubmit(e:React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(fetchUpdatedSettings({ companyName }));
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error</div>;

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold p-2">General Settings</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="border p-2 w-full rounded outline-none"
          placeholder="Company name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <button
          type="submit"
          className="mt-3 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default GeneralSettingsForm;
