import { AxiosError } from "axios";
import {  ApiKey, Settings, SettingsResponse, UpdateBrandingPayload, UpdateGeneralPayload, UpdateSMTPPayload } from "../types/settings.js";
import api from "./api.js";

export const fetchAllSettingsApi = async (token:string):Promise<SettingsResponse> => {
  try {
    const response = await api.get<SettingsResponse>("/settings", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error:unknown) {
    const err = error as AxiosError<{message:string}>
    throw err.response?.data?.message || "failed to fetch General settings";
  }
};
export const fetchUpdatedSettingsApi = async (token:string, data:UpdateGeneralPayload):Promise<SettingsResponse> => {
  try {
    const response = await api.put("/settings/general", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }catch (error:unknown) {
    const err = error as AxiosError<{message:string}>
    throw err.response?.data?.message || "failed to fetch updated settings";
  }
};
export const UpdateSMTPSettingsApi = async (token:string, data:UpdateSMTPPayload):Promise<SettingsResponse> => {
  try {
    const response = await api.put<SettingsResponse>("/settings/smtp", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error:unknown) {
    const err = error as AxiosError<{message:string}>
    throw err.response?.data?.message || "failed to fetch updated settings";
  }
};
export const UpdateBrandingApi = async (token:string, data:UpdateBrandingPayload):Promise<Settings> => {
  try {
    const response = await api.put<Settings>("/settings/branding", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error:unknown) {
    const err = error as AxiosError<{message:string}>
    throw err.response?.data?.message || "failed to update Branding settings";
  }
};
export const GenerateApiKeyApi = async (token:string, ):Promise<ApiKey> => {
  try {
    const response = await api.post("/settings/api-keys", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error:unknown) {
    const err = error as AxiosError<{message:string}>
    throw err.response?.data?.message || "failed to generate Api key";
  }
};
