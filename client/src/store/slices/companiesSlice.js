import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchcompaniesPageApi } from "../../api/fetchcompaniesPageApi.js";

export const companiesPage = createAsyncThunk(
  "company/fetchKPI",
  async (page, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    if (!token) return rejectWithValue("User not authenticated");
    try {
      const data = await fetchcompaniesPageApi(token, page);
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
    page: 1,
    total: 0,
    totalPages: 1,
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
        ((state.loading = false),
          (state.companies = action.payload.companies),
          (state.total = action.payload.total),
          (state.totalPages = action.payload.totalPages),
          (state.page = action.payload.page));
      })
      .addCase(companiesPage.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default companySlice.reducer;
