import { createSlice } from "@reduxjs/toolkit";

const userFromStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;
const tokenFromStorage = localStorage.getItem("token") || null;

const initialState = {
  user: userFromStorage,
  token: tokenFromStorage,
  loading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;

      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      state.loading = false;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

export const { loginStart, loginSuccess, logOut } = authSlice.actions;

export default authSlice.reducer;
