import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlice.js";
import authReducer from "./slices/authSlice.js";
import dashBoardReducer from "./slices/dashboardSlice.js";
import analyticsReducer from "./slices/analyticsSlice.js";
import companiesReducer from "./slices/companiesSlice.js";
import billingReducer from "./slices/billingSlice.js";
import userReducer from "./slices/userSlice.js";
import settingReducer from "./slices/settingsSlice.js";
import {TypedUseSelectorHook, useSelector} from "react-redux"

const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    dashboard: dashBoardReducer,
    analytics: analyticsReducer,
    companies: companiesReducer,
    billing: billingReducer,
    user: userReducer,
    settings: settingReducer,
  },

});
export type Rootstate = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<Rootstate> = useSelector;
export default store;
