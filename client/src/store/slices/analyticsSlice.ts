import { createAsyncThunk, createSlice,PayloadAction } from "@reduxjs/toolkit";
import {
  fetchAnalyticsKPIsApi,
  fetchEventsApi,
  fetchRetentionCurveApi,
  fetchSignupsByCountryApi,
  fetchUserDemographicsApi,
} from "../../api/analyticsApi.js";
import { KPI, RetentionCurvePoint, SignupByCountry, UserDemographics,Event } from "../../types/analytics";
import { Rootstate } from "../index.js";
import {AnalyticsState} from "../../types/analytics.js"


export const fetchKPIs = createAsyncThunk<KPI,void,{rejectValue:string}>(
  "analytics/fetchKpis",
  async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    if (!token) return rejectWithValue("Failed to load KPIs data");
    return await fetchAnalyticsKPIsApi(token);
  },
);
export const fetchRetentionCurve = createAsyncThunk<RetentionCurvePoint[],void,{state:Rootstate,rejectValue:string}>(
  "analytics/fetchRetention",
  async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    if (!token) return rejectWithValue("No auth token found");
    return await fetchRetentionCurveApi(token);
  },
);
export const fetchSignupsByCountry = createAsyncThunk<SignupByCountry[],void,{state:Rootstate,rejectValue:string}>(
  "analytics/fetchSignUp",
  async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    if (!token) return rejectWithValue("Failed to fetch signups by country data");

    return await fetchSignupsByCountryApi(token);
  },
);
export const fetchUserDemographics = createAsyncThunk<UserDemographics[],void,{state:Rootstate,rejectValue:string}>(
  "analytics/fetchUserDemographics",
  async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    if (!token) return rejectWithValue("Failed to fetch user demographics data");

    return await fetchUserDemographicsApi(token);
  },
);
export const fetchEvents = createAsyncThunk<Event[],void,{state:Rootstate,rejectValue:string}>(
  "analytics/fetchEvents",
  async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    if (!token) return rejectWithValue("Failed to load Events data") as any;

    return await fetchEventsApi(token);
  },
);
 const initialState:AnalyticsState ={
   kpis: {
  totalUsers: 0,
  churn: 0,
  totalRevenue: 0,
  arpu: 0,
  retention: 0,
},
    data: [] as RetentionCurvePoint[],
    data2: [],
    demographics: [],
    events: [],
    loading: false,
    error: null,
  }
const analyticsSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchKPIs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchKPIs.fulfilled, (state, action:PayloadAction<KPI>) => {
        ((state.loading = false), (state.kpis = action.payload));
      })
      .addCase(fetchKPIs.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchRetentionCurve.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRetentionCurve.fulfilled, (state, action:PayloadAction<RetentionCurvePoint[]>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchRetentionCurve.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? null;
      })
      .addCase(fetchSignupsByCountry.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSignupsByCountry.fulfilled, (state, action:PayloadAction<SignupByCountry[]>) => {
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
      .addCase(fetchUserDemographics.fulfilled, (state, action:PayloadAction<UserDemographics[]>) => {
        state.loading = false;
        state.demographics = action.payload;
      })
      .addCase(fetchUserDemographics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEvents.fulfilled, (state, action:PayloadAction<Event[]>) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default analyticsSlice.reducer;
