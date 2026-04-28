import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {  User, UserResponse, UserState } from "../../types/user.js";
import api from "../../api/api.js";
import { AxiosError } from "axios";
import { ErrorResponse } from "../../types/user";
export const fetchUser = createAsyncThunk<UserResponse,{page:number,limit:number},{rejectValue:string}>(
  "user/kpi",
  async ({page,limit}, { getState, rejectWithValue }) => {
   try {
    const {data} = await api.get<UserResponse>("/user",{params:{ page,limit}})
    return data
   } catch (err) {
    const error = err as AxiosError<ErrorResponse>
    return rejectWithValue(error.response?.data?.message || "Unable to fetch user api")
   }
  },
);
export const UpdateUserRole = createAsyncThunk<User,{userId:string,role:string},{rejectValue:string}>(
  "user/UserRole",
  async ({ userId, role }, { rejectWithValue }) => {
    try {
      const {data} = await api.patch<User>(`/user/${userId}/role`,{role});
      return data
    } catch (err:unknown) {
      const error = err as AxiosError<ErrorResponse>;
      return rejectWithValue(error.response?.data?.message || "failed to update user")
    }
  },
);
export const UpdateUserStatus = createAsyncThunk<User, string, { rejectValue:string }>(
  "user/UserStatus",
  async (userId, { rejectWithValue }) => {try {
    const {data} = await api.patch<User>(`/user/${userId}/status`);
    return data;
  } catch (err:unknown) {
    const error = err as AxiosError<ErrorResponse>;
    return rejectWithValue(error.response?.data?.message || "failed to update user status" )
  }
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
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false, state.users = action.payload.users;
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
        state.error = null;
      })
      .addCase(UpdateUserRole.fulfilled, (state, action:PayloadAction<User>) => {
        const index = state.users.findIndex(
          (u) => u._id === action.payload._id,
        );
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      }).addCase(UpdateUserRole.rejected, (state, action) => {
        state.error = action.payload ?? "Failed to update role";
      })
      .addCase(UpdateUserStatus.pending, (state, action) => {
        const userId = action.meta.arg;
        const user = state.users.find((u) => u._id === userId);
        if (user) {
          user.isActive = !user.isActive;
        }
      })
      .addCase(UpdateUserStatus.fulfilled, (state, action) => {
        const index = state.users.findIndex(
          (u) => u._id === action.payload._id,
        )
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      }).addCase(UpdateUserStatus.rejected, (state, action) => {
      state.error = action.payload ?? "Failed to toggle status";
})
  },
});

export default userSlice.reducer;
