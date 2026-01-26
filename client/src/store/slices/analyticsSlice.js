import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchAnalyticsKPIsApi,
  fetchRetentionCurveApi,
  fetchSignupsByCountryApi,
  fetchUserDemographicsApi,
} from "../../api/analyticsApi.js";

export const fetchKPIs = createAsyncThunk(
  "analytics/fetchKpis",
  async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    console.log("TOKEN IN THUNK:", token);
    if (!token) return rejectWithValue();
    return await fetchAnalyticsKPIsApi(token);
  },
);
export const fetchRetentionCurve = createAsyncThunk(
  "analytics/fetchRetention",
  async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    console.log("TOKEN IN THUNK:", token);
    if (!token) return rejectWithValue();
    return await fetchRetentionCurveApi(token);
  },
);

export const fetchSignupsByCountry = createAsyncThunk(
  "analytics/fetchSignUp",
  async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    if (!token) return rejectWithValue();

    return await fetchSignupsByCountryApi(token);
  },
);
export const fetchUserDemographics = createAsyncThunk(
  "analytics/fetchUserDemographics",
  async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    if (!token) return rejectWithValue();

    return await fetchUserDemographicsApi(token);
  },
);
const analyticsSlice = createSlice({
  name: "analytics",
  initialState: {
    kpis: {
      totalUsers: 0,
      churn: 0,
      totalRevenue: 0,
      arpu: 0,
    },
    data: [],
    data2: [],
    demographics: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchKPIs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchKPIs.fulfilled, (state, action) => {
        ((state.loading = false), (state.kpis = action.payload));
      })
      .addCase(fetchKPIs.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchRetentionCurve.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRetentionCurve.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchRetentionCurve.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchSignupsByCountry.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSignupsByCountry.fulfilled, (state, action) => {
        state.loading = false;
        state.data2 = action.payload;
      })
      .addCase(fetchSignupsByCountry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserDemographics.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserDemographics.fulfilled, (state, action) => {
        state.loading = false;
        state.demographics = action.payload;
      })
      .addCase(fetchUserDemographics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
// fetchSignupsByCountry;
// fetchRetentionCurve;
export default analyticsSlice.reducer;
