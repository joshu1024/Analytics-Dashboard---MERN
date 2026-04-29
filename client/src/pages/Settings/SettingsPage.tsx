import React, { useEffect } from "react";
import GeneralSettingsForm from "./components/GeneralSettingsForm";
import SecuritySettings from "./components/SecuritySettings";
import SMTPSettings from "./components/SMTPSettings";
import APIKeysManager from "./components/APIKeysManager";
import BrandingSettingsForm from "./components/BrandingSettingsForm.jsx";
import { fetchAllSettings } from "../../store/slices/settingsSlice.js";
import { useAppDispatch } from "../../store/hooks";
import { useAppSelector } from "../../store";

const SettingsPage = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.settings);
  if (loading) return <div>Loading settings...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  useEffect(() => {
    dispatch(fetchAllSettings());
  }, []);
  return (
    <div className="space-y-6">
      <GeneralSettingsForm />
      <SecuritySettings />
      <SMTPSettings />
      <APIKeysManager />
      <BrandingSettingsForm />
    </div>
  );
};

export default SettingsPage;
