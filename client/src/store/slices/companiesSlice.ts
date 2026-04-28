import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Company, CompanyResponse, ErrorResponse } from "../../types/companies.js";
import { Rootstate } from "../index.js";
import api from "../../api/api.js";
import { AxiosError } from "axios";

export const companiesPage = createAsyncThunk<CompanyResponse,number | undefined,{state:Rootstate,rejectValue:string}>(
  "company/fetchKPI",
 async (page = 1, { rejectWithValue }) => {
   try {
    const {data} = await api.get<CompanyResponse>(`/companies`,{params:{page}})
    return data
   } catch (err:unknown) {
    const error = err as AxiosError<ErrorResponse>
    return rejectWithValue(error.response?.data?.message || "error fetching companies")
   }
  },
);
interface CompaniesState{
    companies: Company[],
    page: number,
    total: number,
    totalPages: number,
    loading: boolean,
    error: null | string,
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
        state.error = null;
      })
      .addCase(companiesPage.fulfilled, (state, action) => {
        state.loading = false;
          state.companies = action.payload.companies;
          state.total = action.payload.total;
          state.totalPages = action.payload.totalPages;
          state.page = action.payload.page;
      })
      .addCase(companiesPage.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload ?? "Something went wrong";
      });
  },
});

export default companySlice.reducer;
