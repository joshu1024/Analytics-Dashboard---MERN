import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchAllSettingsApi,
  fetchUpdatedSettingsApi,
  GenerateApiKeyApi,
  UpdateBrandingApi,
  UpdateSMTPSettingsApi,
} from "../../api/SettingsApi.js";
import { ApiKey,Settings,SettingsResponse, SettingsState, UpdateBrandingPayload, UpdateGeneralPayload, UpdateSMTPPayload } from "../../types/settings.js";
import { Rootstate } from "../index.js";

export const fetchAllSettings = createAsyncThunk<SettingsResponse,void,{state:Rootstate,rejectValue:string}>(
  "settings/fetchAllSettings",
  async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    if (!token) return rejectWithValue("failed to fetch settings");
    return await fetchAllSettingsApi(token);
  },
);
export const fetchUpdatedSettings = createAsyncThunk<SettingsResponse,UpdateGeneralPayload,{state:Rootstate,rejectValue:string}>(
  "settings/fetchUpdatedSettings",
  async (data, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    if (!token) return rejectWithValue("Failed to etch updated settings");
    return fetchUpdatedSettingsApi(token, data);
  },
);
export const UpdateSMTPSettings = createAsyncThunk<SettingsResponse,UpdateSMTPPayload,{state:Rootstate,rejectValue:string}>(
  "settings/UpdatedSettings",
  async (data, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    if (!token) return rejectWithValue("failed to update smtp settings");
    return UpdateSMTPSettingsApi(token, data);
  },
);
export const UpdateBrandingSettings = createAsyncThunk<Settings,UpdateBrandingPayload,{state:Rootstate,rejectValue:string}>(
  "settings/Updatedbranding",
  async (data, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    if (!token) return rejectWithValue("failed to update branding settings");
    return UpdateBrandingApi(token, data);
  },
);
export const GenerateApiKeySettings = createAsyncThunk<
  ApiKey,
  void,
  { state: Rootstate; rejectValue: string }
>(
  "settings/GenerateApiKey",
  async (data, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    if (!token) return rejectWithValue("no token");
    return await GenerateApiKeyApi(token);
  },
);
const initialState:SettingsState = {
    settings: null,
    loading: false,
    error: null,
  }
const settingsSlice = createSlice({
  name: "settings",
  initialState ,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllSettings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllSettings.fulfilled, (state, action:PayloadAction<SettingsResponse>) => {
        state.loading = false, 
        state.settings = action.payload.settings;
      })
      .addCase(fetchAllSettings.rejected, (state, action) => {
        state.loading = false,
        state.error = action.payload;
      })
      .addCase(fetchUpdatedSettings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUpdatedSettings.fulfilled, (state, action) => {
        ((state.loading = false), (state.settings = action.payload.settings));
      })
      .addCase(fetchUpdatedSettings.rejected, (state, action) => {
        ((state.loading = false), (state.error = action.payload));
      })
      .addCase(UpdateSMTPSettings.pending, (state) => {
        state.loading = true;
      })
      .addCase(UpdateSMTPSettings.fulfilled, (state, action) => {
        state.loading = false,
        state.settings = action.payload.settings;
      })
      .addCase(UpdateSMTPSettings.rejected, (state, action) => {
        state.loading = false,
        state.error = action.payload;
      })
      .addCase(UpdateBrandingSettings.pending, (state) => {
        state.loading = true;
      })
      .addCase(UpdateBrandingSettings.fulfilled, (state, action) => {
        state.loading = false,
        state.settings = action.payload;
      })
      .addCase(UpdateBrandingSettings.rejected, (state, action) => {
        state.loading = false,
        state.error = action.payload;
      });
  },
});

export default settingsSlice.reducer;
