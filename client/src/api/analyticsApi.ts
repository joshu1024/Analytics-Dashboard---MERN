import { AxiosError } from "axios";
import api from "./api.js";
import { RetentionCurvePoint,KPI, SignupByCountry, UserDemographics } from "../types/analytics.js";
export const fetchRetentionCurveApi = async (token:string):Promise<RetentionCurvePoint[]> => {
  try {
    const response = await api.get<RetentionCurvePoint[]>("/analytics/retention", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error:unknown) {
    const err = error as AxiosError<{message:string}>
   throw err.response?.data?.message || "Failed to fetch retention data";
  }
};
export const fetchAnalyticsKPIsApi = async (token:string):Promise<KPI> => {
  try {
    const response = await api.get("/analytics/kpis", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error:unknown) {
    const err = error as AxiosError<{message:string}>
    throw err.response?.data?.message || "Failed to fetch kpi data";
  }
};
export const fetchUserDemographicsApi = async (token:string):Promise<UserDemographics[]> => {
  try {
    const response = await api.get<UserDemographics[]>("/analytics/user-demographics", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    const err = error as AxiosError<{message:string}>
    throw err.response?.data?.message || "Failed to fetch user demographics data";
  }
};
export const fetchSignupsByCountryApi = async (token:string):Promise<SignupByCountry[]> => {
  try {
    const response = await api.get<SignupByCountry[]>("/analytics/signup-bycountry", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error:unknown) {
    const err = error as AxiosError<{message:string}>
   throw err.response?.data?.message || "Failed to fetch retention data";
  }
};
export const fetchEventsApi = async (token:string):Promise<Event[]> => {
  try {
    const response = await api.get<Event[]>(
      "/analytics/events",
     {
       params: { type: "USER_LOGIN" },
       headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error:unknown) {
     const err = error as AxiosError<{message:string}>
    throw err.response?.data?.message || "Failed to fetch recent events data";
  }
};
