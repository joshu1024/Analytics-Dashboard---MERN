import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "../../api/api.js";
import { User } from "../../types/auth.js";
import { AxiosError } from "axios";

interface AuthState{
  user:User | null,
  token:string | null,
  loading:boolean,
  error:string | null,
  message?:string | null
}
interface ResetPasswordArgs{
token:string,
password:string
}
interface ErrorResponse{
  message:string
}
export const forgotPassword = createAsyncThunk<string,string,{rejectValue:string}>(
  "auth/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const { data } = await api.post<{message:string}>("/auth/forgot-password", { email });
      return data.message;
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>
      return rejectWithValue(error.response?.data?.message || "Forgot password failed");
    }
  },
);
export const resetPassword = createAsyncThunk<string,ResetPasswordArgs,{rejectValue:string}>(
  "auth/resetPassword",
  async ({ token, password }, { rejectWithValue }) => {
    try {
      const { data } = await api.post<{message:string}>(`/auth/reset-password/${token}`, {
        password,
      });
      return data.message;
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>
      return rejectWithValue(
        error.response?.data?.message || "Password reset failed",
      );
    }
  },
);
const initialState:AuthState = {
  user: JSON.parse(localStorage.getItem("user") || "null") ,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    authSuccess: (state, action:PayloadAction<{user:User,token:string}>) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;

      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
    },

    authFail: (state, action:PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    logOut: (state) => {
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;

      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";;
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";;
      });
  },
});

export const { authStart, authSuccess, authFail, logOut } = authSlice.actions;

export default authSlice.reducer;
