import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchUserApi,
  UpdateUserRoleApi,
  UpdateUserStatusApi,
} from "../../api/usersApi.js";
import { UpdateRolePayload, User, UserResponse, UserState } from "../../types/user.js";
import { Rootstate } from "../index.js";
export const fetchUser = createAsyncThunk<UserResponse,number | undefined,{state:Rootstate,rejectValue:string}>(
  "user/kpi",
  async (page = 1, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    if (!token) return rejectWithValue("User not authenticated");

    try {
      const data = await fetchUserApi(token, page);
      return data;
    } catch (error:unknown) {
     if(error instanceof Error) return rejectWithValue(error.message)
      return rejectWithValue("Failed to fetch company data");
    }
  },
);
export const UpdateUserRole = createAsyncThunk<User,{userId:string,role:string},{state:Rootstate,rejectValue:string}>(
  "user/UserRole",
  async ({ userId, role }, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    if (!token) return rejectWithValue("Error updating user role");
    return UpdateUserRoleApi({ token, userId, role });
  },
);
export const UpdateUserStatus = createAsyncThunk<User, string, { state: Rootstate,rejectValue:string }>(
  "user/UserStatus",
  async (userId, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    if (!token) return rejectWithValue("Error updating user status");
    return UpdateUserStatusApi({ token, userId });
  },
);
const initialState:UserState =  {
    users: [],
    totalPages: 1,
    page: 1,
    total: 0,
    user: null,
    loading: false,
    error: null,
  }
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        ((state.loading = false), (state.users = action.payload.users));
        state.totalPages = action.payload.totalPages;
        state.page = action.payload.page;
        state.total = action.payload.total;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        ((state.loading = false), (state.error = action.payload));
      })
      .addCase(UpdateUserRole.pending, (state, action) => {
        const { userId, role } = action.meta.arg;
        const user = state.users.find((u) => u._id === userId);
        if (user) {
          user.role = role;
        }
      })
      .addCase(UpdateUserRole.fulfilled, (state, action:PayloadAction<User>) => {
        const index = state.users.findIndex(
          (u) => u._id === action.payload._id,
        );
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(UpdateUserStatus.pending, (state, action) => {
        const userId = action.meta.arg;
        const user = state.users.find((u) => u._id === userId);
        if (user) {
          user.isActive = !user.isActive;
        }
      })
      .addCase(UpdateUserStatus.fulfilled, (state, action) => {
        console.log("STATUS UPDATED:", action.payload.isActive);
        const index = state.users.findIndex(
          (u) => u._id === action.payload._id,
        );
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      });
  },
});

export default userSlice.reducer;
