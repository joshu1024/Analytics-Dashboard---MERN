import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const BrandingSettingsForm = () => {
  const dispatch = useDispatch();
  const { settings, loading } = useSelector((state) => state.settings);
  const [companyName, setCompanyName] = useState("");

  useEffect(() => {
    if (settings?.branding?.companyName) {
      setCompanyName(settings.branding.companyName);
    }
  }, [settings]);

  const handleSave = () => {
    dispatch(UpdateBrandingSettings({ companyName }));
  };

  return (
    <div className="bg-white p-4 shadow rounded">
      <h3 className="font-semibold mb-3">Branding</h3>

      <input
        className="w-full border p-2 rounded mb-3"
        placeholder="Company name"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
      />

      <button
        onClick={handleSave}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Saving..." : "Save"}
      </button>
    </div>
  );
};

export default BrandingSettingsForm;
