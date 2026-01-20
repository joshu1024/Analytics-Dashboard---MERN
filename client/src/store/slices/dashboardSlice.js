import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchDashboardKPIsApi } from "../../api/dashboardApi";

export const fetchDashboardKPIs = createAsyncThunk(
  "dashboard/fetchKPIs",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.user.token;
      return fetchDashboardKPIsApi(token);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load dashboard KPI",
      );
    }
  },
);

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    kpis: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardKPIs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDashboardKPIs.fulfilled, (state, action) => {
        state.loading = false;
        state.kpis = action.payload;
      })
      .addCase(fetchDashboardKPIs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default dashboardSlice.reducer;
