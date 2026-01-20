import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlice.js";
import authReducer from "./slices/authSlice.js";
import dashBoardReducer from "./slices/dashboardSlice.js";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    dashboard: dashBoardReducer,
  },
});
export default store;
