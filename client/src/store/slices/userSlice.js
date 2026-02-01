import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import usersApi from "../../api/usersApi.js";
export const fetchUser = createAsyncThunk(
  "user/kpi",
  async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    if (!token) return rejectWithValue();
    return usersApi(token);
  },
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        ((state.loading = false), (state.users = action.payload));
      })
      .addCase(fetchUser.rejected, (state, action) => {
        ((state.loading = false), (state.error = action.payload));
      });
  },
});

export default userSlice.reducer;
