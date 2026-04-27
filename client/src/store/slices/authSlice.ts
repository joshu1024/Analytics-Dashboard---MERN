import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api.js";
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, User } from "../../types/auth.js";
import { AxiosError } from "axios";

interface AuthState {
  user: User | null;
  loading: boolean,
  error: string | null;
  message:string | null
}
interface ResetPasswordArgs{
token:string,
password:string
}
interface ErrorResponse{
  message:string
}
export const loginUser = createAsyncThunk<User, LoginRequest, { rejectValue: string }>(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await api.post<LoginResponse>("/auth/login", credentials);
      
      return {
        fullName: data.fullName,
        email: data.email,
        role: data.role,
      };

    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);
export const registerUser = createAsyncThunk<User, RegisterRequest, { rejectValue: string }>(
  "auth/register",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await api.post<RegisterResponse>("/auth/register", credentials);
       return {
        fullName: data.fullName,
        email: data.email,
        role: data.role,
      };
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      return rejectWithValue(error.response?.data?.message || "Register failed");
    }
  }
);
export const logoutUser = createAsyncThunk<void, void, { rejectValue: string }>(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await api.post("/auth/logout");
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
  }
);
export const fetchCurrentUser = createAsyncThunk<User, void, { rejectValue: string }>(
  "auth/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get<{ user: User }>("/auth/me");
      return data.user;
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      return rejectWithValue(error.response?.data?.message || "Failed to fetch user");
    }
  }
);
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
const initialState: AuthState = {
  user: null,
  loading: true,
  error: null,
  message:null
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
      extraReducers: (builder) => {
        builder
        .addCase(fetchCurrentUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchCurrentUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    })
    .addCase(fetchCurrentUser.rejected, (state) => {
      state.loading = false;
      state.user = null; 
      })
    .addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    })
      .addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = typeof action.payload === "string"
        ? action.payload
        : action.error.message ?? "Login failed";
    }).addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
         state.error = typeof action.payload === "string"
        ? action.payload
        : action.error.message ?? "Registration failed failed";
    }).addCase(forgotPassword.pending, (state) => {
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
        state.error = action.payload || "Something went wrong";
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
        state.error = action.payload || "Something went wrong";
      }).addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
        state.error = null;
        state.message = null;
      }).addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload || "Logout failed";
      })
        },
});


export default authSlice.reducer;
