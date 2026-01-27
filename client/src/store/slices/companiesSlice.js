import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchcompaniesPageApi } from "../../api/fetchcompaniesPageApi.js";

export const companiesPage = createAsyncThunk(
  "company/fetchKPI",
  async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    if (!token) return rejectWithValue("User not authenticated");
    try {
      const data = await fetchcompaniesPageApi(token);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const companySlice = createSlice({
  name: "companies",
  initialState: {
    companies: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(companiesPage.pending, (state) => {
        state.loading = true;
      })
      .addCase(companiesPage.fulfilled, (state, action) => {
        ((state.loading = false), (state.companies = action.payload));
      })
      .addCase(companiesPage.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default companySlice.reducer;
