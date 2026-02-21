import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBillingApi } from "../../api/billinPageApi.js";
import { billingOverviewResponse } from "../../types/billing.js";
import { Rootstate } from "../index.js";

export const billingPage = createAsyncThunk<billingOverviewResponse,void,{state:Rootstate,rejectValue:string}>(
  "billing/fetchKpis",
  async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    if (!token) return rejectWithValue("Error loading billing page Api");
    return await getBillingApi(token);
  },
);
const  initialState:billingOverviewResponse = {
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
  }
const billingSlice = createSlice({
  name: "billing",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(billingPage.pending, (state) => {
        state.loading = true;
      })
      .addCase(billingPage.fulfilled, (state, action) => {
        state.loading = false,
        state.monthlyRevenue = action.payload.monthlyRevenue;
        state.subscriptions = action.payload.subscriptions;
        state.recentTransactions = action.payload.recentTransactions;
        state.plans = action.payload.plans;
        state.failedPayments = action.payload.failedPayments;
      })
      .addCase(billingPage.rejected, (state, action) => {
        state.loading = false; 
        state.error = action.payload ?? "Failed to fetch billing data"
      });
  },
});

export default billingSlice.reducer;
