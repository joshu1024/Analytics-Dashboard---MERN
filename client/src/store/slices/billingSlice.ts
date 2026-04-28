import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { billingOverviewResponse, BillingState } from "../../types/billing.js";
import { Rootstate } from "../index.js";
import api from "../../api/api.js";
import { AxiosError } from "axios";
import { ErrorResponse } from "../../types/billing";

export const billingPage = createAsyncThunk<billingOverviewResponse,void,{state:Rootstate,rejectValue:string}>(
  "billing/fetchKpis",
  async (_, { rejectWithValue }) => {
   try {
    const {data} = await api.get<billingOverviewResponse>("/billing/overview")
    return data
   } catch (err:unknown) {
    const error = err as AxiosError<ErrorResponse>
    return rejectWithValue(error.response?.data?.message || "error fetching KPIs")
   }
  },
);
const  initialState:BillingState = {
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
        state.error = null;
      })
      .addCase(billingPage.fulfilled, (state, action) => {
        state.loading = false;
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
