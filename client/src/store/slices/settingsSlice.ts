import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ApiKey,Settings,SettingsResponse, SettingsState, UpdateBrandingPayload, UpdateGeneralPayload, UpdateSMTPPayload } from "../../types/settings.js";
import { Rootstate } from "../index.js";
import { AxiosError } from "axios";
import { ErrorResponse } from "../../types/settings";
import api from "../../api/api.js";

export const fetchAllSettings = createAsyncThunk<SettingsResponse,void,{rejectValue:string}>(
  "settings/fetchAllSettings",
  async (_, { rejectWithValue }) => {
   try {
    const {data} = await api.get<SettingsResponse>("/settings");
    return data;
   } catch (err:unknown) {
    const error = err as AxiosError<ErrorResponse>
    return rejectWithValue(error.response?.data?.message || "Failed to fetch settings")
   }
  },
);
export const fetchUpdatedSettings = createAsyncThunk<SettingsResponse,UpdateGeneralPayload,{rejectValue:string}>(
  "settings/fetchUpdatedSettings",
  async (data, { rejectWithValue }) => {
   try {
    const {data:response} = await api.put<SettingsResponse>("/settings/general",data);
    return response;
   } catch (err:unknown) {
    const error = err as AxiosError<ErrorResponse>
    return rejectWithValue(error.response?.data?.message || "Failed to update settings")
   }
  },
);
export const UpdateSMTPSettings = createAsyncThunk<SettingsResponse,UpdateSMTPPayload,{rejectValue:string}>(
  "settings/UpdatedSettings",
  async (data, { rejectWithValue }) => {
    try {
      const {data:response} = await api.put<SettingsResponse>("/settings/smtp",data);
      return response
    } catch (err:unknown) {
      const error = err as AxiosError<ErrorResponse>
      return rejectWithValue(error.response?.data?.message || "Failed to update smtp settings")
      }
  },
);
export const UpdateBrandingSettings = createAsyncThunk<Settings,UpdateBrandingPayload,{rejectValue:string}>(
  "settings/Updatedbranding",
  async (data, { rejectWithValue }) => {
    try {
      const {data:response} = await api.put<Settings>("/settings/branding",data);
      return response
    } catch (err:unknown) {
      const error = err as AxiosError<ErrorResponse>
      return rejectWithValue(error.response?.data?.message || "Failed to fetch settings")
      }
  },
);
export const GenerateApiKeySettings = createAsyncThunk<
  ApiKey,
  void,
  { state: Rootstate; rejectValue: string }
  >(
  "settings/GenerateApiKey",
  async (_, { getState, rejectWithValue }) => {
  try {
     const{data} = await api.post<ApiKey>("/settings/api-keys");
   return data;
  } catch (err:unknown) {
      const error = err as AxiosError<ErrorResponse>
      return rejectWithValue(error.response?.data?.message || "Failed to fetch settings")
      }
  },
);
export const sendResetPasswordEmail = createAsyncThunk<{ message: string }, void, { rejectValue: string }>(
  "settings/resetPassword",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.post<{ message: string }>("/auth/forgot-password");
      return data;
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      return rejectWithValue(error.response?.data?.message || "Failed to send reset email");
    }
  }
);
const initialState:SettingsState = {
    settings: null,
    loading: false,
    error: null,
    message:null
  }
const settingsSlice = createSlice({
  name: "settings",
  initialState ,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllSettings.fulfilled, (state, action) => {
        state.loading = false; 
        state.settings = action.payload.settings;
      })
      .addCase(fetchAllSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUpdatedSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUpdatedSettings.fulfilled, (state, action) => {
        state.loading = false; state.settings = action.payload.settings;
      })
      .addCase(fetchUpdatedSettings.rejected, (state, action) => {
        state.loading = false; state.error = action.payload;
      })
      .addCase(UpdateSMTPSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdateSMTPSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.settings = action.payload.settings;
      })
      .addCase(UpdateSMTPSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(UpdateBrandingSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdateBrandingSettings.fulfilled, (state, action) => {
        state.loading = false,
        state.settings = action.payload;
      })
      .addCase(UpdateBrandingSettings.rejected, (state, action) => {
        state.loading = false,
        state.error = action.payload;
      }).addCase(GenerateApiKeySettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GenerateApiKeySettings.fulfilled, (state, action) => {
        state.loading = false;
        if (state.settings) {
          state.settings.apiKeys = [...(state.settings.apiKeys ?? []), action.payload];
        }
      })
      .addCase(GenerateApiKeySettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to generate API key";
      }).addCase(sendResetPasswordEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(sendResetPasswordEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to send reset email";
      })
        },
      });

export default settingsSlice.reducer;
