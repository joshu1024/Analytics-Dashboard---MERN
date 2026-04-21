import api from "./api.js";
import { LoginRequest, LoginResponse, LogoutResponse, RegisterRequest, RegisterResponse } from "../types/auth.js";
import { AxiosError } from "axios";

export const registerApi = async (formData:RegisterRequest):Promise<RegisterResponse> => {
  try {
    const { data } = await api.post<RegisterResponse>("/auth/register", formData);
    return data;
  } catch (error:unknown) {
    const err = error as AxiosError<{ message: string }>;
  throw err.response?.data?.message || "Registration failed";
  }
};

export const loginApi = async (formData:LoginRequest):Promise<LoginResponse> => {
  try {
    const { data } = await api.post<LoginResponse>("/auth/login", formData);
    return data;
  } catch (error) {
    const err = error as AxiosError<{message:string}>
    throw err.response?.data?.message || "Registration failed";
  }
};
export const logOut = async ():Promise<LogoutResponse> => {
  try {
    const { data } = await api.post<LogoutResponse>("/auth/logout");
    return data;
  } catch (error) {
    const err = error as AxiosError<{message:string}>
    throw err.response?.data?.message || "Logout failed";
  }
};
