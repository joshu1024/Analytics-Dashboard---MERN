import React from "react";
import GeneralSettingsForm from "./components/GeneralSettingsForm";
import SecuritySettings from "./components/SecuritySettings";
import SMTPSettings from "./components/SMTPSettings";
import APIKeysManager from "./components/APIKeysManager";
import BrandingSettingsForm from "./components/BrandingSettingsForm";

const SettingsPage = () => {
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
