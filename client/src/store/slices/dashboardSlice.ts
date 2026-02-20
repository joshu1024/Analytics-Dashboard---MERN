import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchDashboardKPIsApi } from "../../api/dashboardApi.js";
import { DashboardState, KPI } from "../../types/dashboard.js";
import { Rootstate } from "../index.js";

export const fetchDashboardKPIs = createAsyncThunk<KPI,void,{state:Rootstate,rejectValue:string}>(
  "dashboard/fetchKPIs",
  async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    if (!token) {
      return rejectWithValue("User not authenticated");
    }
    try {
      const data = await fetchDashboardKPIsApi(token);

      return data;
    } catch (error:unknown) {
      if(error instanceof Error) return rejectWithValue(error.message)
     return rejectWithValue("Failed to fetch dashboard KPIs");
    }
  },
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
      data: [],
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
      .addCase(fetchDashboardKPIs.fulfilled, (state, action:PayloadAction<KPI>) => {
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
