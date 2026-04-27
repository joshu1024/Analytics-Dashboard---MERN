import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { DashboardState, KPI } from "../../types/dashboard.js";
import api from "../../api/api.js";
import { AxiosError } from "axios";

export const fetchDashboardKPIs = createAsyncThunk<KPI, void, { rejectValue: string }>(
  "dashboard/fetchKPIs",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get<KPI>("/dashboard/kpis");
      return data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(error.response?.data?.message || "Failed to fetch dashboard KPIs");
    }
  }
);
 const initialState:DashboardState = {
    kpis: {
      totalUsers: 0,
      activeUsers: 0,
      churnRate: 0,
      mrr: 0,
      revenueChart: [],
      recentActivity: [],
      planBreakDown: [],
      userGrowthData: [],
    },
    loading: false,
    error: null,
  }

const dashboardSlice = createSlice({
  name: "dashboard",
 initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardKPIs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardKPIs.fulfilled, (state, action) => {
        state.loading = false;
        state.kpis = action.payload;
      })
      .addCase(fetchDashboardKPIs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch dashboard KPIs";
      });
  },
});

export default dashboardSlice.reducer;
