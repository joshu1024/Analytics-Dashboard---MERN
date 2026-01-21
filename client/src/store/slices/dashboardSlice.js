import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchDashboardKPIsApi } from "../../api/dashboardApi.js";

// AsyncThunk for fetching KPIs
export const fetchDashboardKPIs = createAsyncThunk(
  "dashboard/fetchKPIs",
  async (_, { getState, rejectWithValue }) => {
    console.log("THUNK STARTED"); // very first line
    const token = getState().auth.token;
    console.log("TOKEN IN THUNK:", token);

    if (!token) {
      return rejectWithValue("User not authenticated");
    }

    try {
      const data = await fetchDashboardKPIsApi(token);

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

// Redux slice
const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    kpis: {
      totalUsers: 0,
      activeUsers: 0,
      churnRate: 0,
      mrr: 0,
    },
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardKPIs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardKPIs.fulfilled, (state, action) => {
        console.log("KPI PAYLOAD:", action.payload);
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
