import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlice.js";
import authReducer from "./slices/authSlice.js";
import dashBoardReducer from "./slices/dashboardSlice.js";
import analyticsReducer from "./slices/analyticsSlice.js";
import companiesReducer from "./slices/companiesSlice.js";
console.log("STORE CREATED by me");

const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    dashboard: dashBoardReducer,
    analytics: analyticsReducer,
    companies: companiesReducer,
  },
});

export default store;
