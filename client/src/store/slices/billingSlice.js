import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBillingApi } from "../../api/billinPageApi.js";

export const billingPage = createAsyncThunk(
  "billing/fetchKpis",
  async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    if (!token) return rejectWithValue();
    return await getBillingApi(token);
  },
);

const billingSlice = createSlice({
  name: "billing",
  initialState: {
    monthlyRevenue: 0,
    subscriptions: {
      active: 0,
      cancelled: 0,
      trialing: 0,
    },
    recentTransactions: [],
    failedPayments: [],
    plans: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(billingPage.pending, (state) => {
        state.loading = true;
      })
      .addCase(billingPage.fulfilled, (state, action) => {
        ((state.loading = false),
          (state.monthlyRevenue = action.payload.monthlyRevenue));
        state.subscriptions = action.payload.subscriptions;
        state.recentTransactions = action.payload.recentTransactions;
        state.plans = action.payload.plans;
        state.failedPayments = action.payload.failedPayments;
      })
      .addCase(billingPage.rejected, (state, action) => {
        ((state.loading = false), (state.error = action.payload));
      });
  },
});

export default billingSlice.reducer;
