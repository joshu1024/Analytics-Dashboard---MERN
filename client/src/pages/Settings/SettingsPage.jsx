import React, { useEffect } from "react";
import GeneralSettingsForm from "./components/GeneralSettingsForm";
import SecuritySettings from "./components/SecuritySettings";
import SMTPSettings from "./components/SMTPSettings";
import APIKeysManager from "./components/APIKeysManager";
import BrandingSettingsForm from "./components/BrandingSettingsForm.jsx";
import { useDispatch } from "react-redux";
import { fetchAllSettings } from "../../store/slices/settingsSlice.js";

const SettingsPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllSettings());
  }, [dispatch]);
  return (
    <div>
      <GeneralSettingsForm />
      <SecuritySettings />
      <SMTPSettings />
      <APIKeysManager />
      <BrandingSettingsForm />
    </div>
  );
};

export default SettingsPage;
