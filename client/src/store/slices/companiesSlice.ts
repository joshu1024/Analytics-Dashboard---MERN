import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchcompaniesPageApi } from "../../api/fetchcompaniesPageApi.js";
import { Company, CompanyResponse } from "../../types/companies.js";
import { Rootstate } from "../index.js";

export const companiesPage = createAsyncThunk<CompanyResponse,number | undefined,{state:Rootstate,rejectValue:string}>(
  "company/fetchKPI",
  async (page = 1, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    if (!token) return rejectWithValue("User not authenticated");
    try {
      const data = await fetchcompaniesPageApi(token, page);
      return data;
    } catch (error:unknown) {
     if(error instanceof Error) return rejectWithValue(error.message)
      return rejectWithValue("Failed to fetch company data");
    }
  },
);
interface CompaniesState{
    companies: Company[],
    page: number,
    total: number,
    totalPages: number,
    loading: boolean,
    error: null | string | undefined,
}
  const initialState:CompaniesState =  {
    companies: [],
    page: 1,
    total: 0,
    totalPages: 1,
    loading: false,
    error: null,
  }
const companySlice = createSlice({
  name: "companies",
  initialState, 
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(companiesPage.pending, (state) => {
        state.loading = true;
      })
      .addCase(companiesPage.fulfilled, (state, action:PayloadAction<CompanyResponse>) => {
        ((state.loading = false),
          (state.companies = action.payload.companies),
          (state.total = action.payload.total),
          (state.totalPages = action.payload.totalPages),
          (state.page = action.payload.page));
      })
      .addCase(companiesPage.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload ?? "Something went wrong";
      });
  },
});

export default companySlice.reducer;
