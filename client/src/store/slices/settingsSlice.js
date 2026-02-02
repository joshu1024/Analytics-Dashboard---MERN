import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchAllSettingsApi,
  fetchUpdatedSettingsApi,
  UpdateBrandingApi,
  UpdateSMTPSettingsApi,
} from "../../api/SettingsApi.js";

export const fetchAllSettings = createAsyncThunk(
  "settings/fetchAllSettings",
  async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    if (!token) return rejectWithValue();
    return fetchAllSettingsApi(token);
  },
);
export const fetchUpdatedSettings = createAsyncThunk(
  "settings/fetchUpdatedSettings",
  async (data, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    if (!token) return rejectWithValue();
    return fetchUpdatedSettingsApi(token, data);
  },
);
export const UpdateSMTPSettings = createAsyncThunk(
  "settings/UpdatedSettings",
  async (data, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    if (!token) return rejectWithValue();
    return UpdateSMTPSettingsApi(token, data);
  },
);
export const UpdateBrandingSettings = createAsyncThunk(
  "settings/Updatedbranding",
  async (data, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    if (!token) return rejectWithValue();
    return UpdateBrandingApi(token, data);
  },
);
export const GenerateApiKeySettings = createAsyncThunk(
  "settings/GenerateApiKey",
  async (data, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    if (!token) return rejectWithValue();
    return GenerateApiKeyApi(token, data);
  },
);

const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    settings: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllSettings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllSettings.fulfilled, (state, action) => {
        ((state.loading = false), (state.settings = action.payload.settings));
      })
      .addCase(fetchAllSettings.rejected, (state, action) => {
        ((state.loading = false), (state.error = action.payload));
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
        ((state.loading = false), (state.settings = action.payload.settings));
      })
      .addCase(UpdateSMTPSettings.rejected, (state, action) => {
        ((state.loading = false), (state.error = action.payload));
      })
      .addCase(UpdateBrandingSettings.pending, (state) => {
        state.loading = true;
      })
      .addCase(UpdateBrandingSettings.fulfilled, (state, action) => {
        ((state.loading = false), (state.settings = action.payload.settings));
      })
      .addCase(UpdateBrandingSettings.rejected, (state, action) => {
        ((state.loading = false), (state.error = action.payload));
      });
  },
});

export default settingsSlice.reducer;
