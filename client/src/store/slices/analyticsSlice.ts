import { createAsyncThunk, createSlice,PayloadAction } from "@reduxjs/toolkit";
import { KPI, RetentionCurvePoint, SignupByCountry, UserDemographics,Event, FetchEventsParams } from "../../types/analytics";
import { Rootstate } from "../index.js";
import {AnalyticsState} from "../../types/analytics.js"
import api from "../../api/api.js";
import { AxiosError } from "axios";
import { ErrorResponse } from "../../types/analytics";


export const fetchKPIs = createAsyncThunk<KPI,void,{rejectValue:string}>(
  "analytics/fetchKpis",
  async (_, { rejectWithValue }) => {
    
    try {
      const { data } = await api.get<KPI>("/analytics/kpis");
      return data;
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      return rejectWithValue(error.response?.data?.message || "Failed to load KPIs");
    }
  },
);  
export const fetchRetentionCurve = createAsyncThunk<RetentionCurvePoint[],void,{rejectValue:string}>(
  "analytics/fetchRetention",
  async (_, { rejectWithValue }) => {
   try {
    const {data} = await api.get<RetentionCurvePoint[]>("/analytics/retention");
   return data
   } catch (err) {
    const error = err as AxiosError<ErrorResponse>;
    return rejectWithValue(error.response?.data?.message || "Failed to load Retension curve")
   }
  },
);
export const fetchSignupsByCountry = createAsyncThunk<SignupByCountry[],void,{rejectValue:string}>(
  "analytics/fetchSignUp",
   async (_, {  rejectWithValue }) => {
   try {
    const {data} = await api.get<SignupByCountry[]>("/analytics/signup-bycountry");
   return data
   } catch (err) {
    const error = err as AxiosError<ErrorResponse>;
    return rejectWithValue(error.response?.data?.message || "Failed to load signups by country")
   }
  },
);
export const fetchUserDemographics = createAsyncThunk<UserDemographics[],void,{rejectValue:string}>(
  "analytics/fetchUserDemographics",
 async (_, { rejectWithValue }) => {
   try {
    const {data} = await api.get<UserDemographics[]>("/analytics/user-demographics");
   return data
   } catch (err) {
    const error = err as AxiosError<ErrorResponse>;
    return rejectWithValue(error.response?.data?.message || "Failed to load user demographics")
   }
  },
);
export const fetchEvents = createAsyncThunk<Event[],FetchEventsParams,{rejectValue:string}>(
  "analytics/fetchEvents",
 async ({ page, limit }, { rejectWithValue }) => {
   try {
    const {data} = await api.get<Event[]>("/analytics/events",{params:{page,limit}});
   return data
   } catch (err) {
    const error = err as AxiosError<ErrorResponse>;
    return rejectWithValue(error.response?.data?.message || "Failed to load events")
   }
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
        state.error = null;
      })
      .addCase(fetchKPIs.fulfilled, (state, action:PayloadAction<KPI>) => {
       state.loading = false, state.kpis = action.payload;
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
      })
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
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
