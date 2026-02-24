import { AxiosError } from "axios";
import { UpdateRolePayload, UpdateSTatusPayload, User, UserResponse } from "../types/user.js";
import api from "./api.js";
export const fetchUserApi = async (token:string, page = 1):Promise<UserResponse> => {

  try {
    const response = await api.get<UserResponse>(`/user?page=${page}&limit=5`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error:unknown) {
    const err = error as AxiosError<{message:string}>
    throw err.response?.data?.message || "Unable to fetch user api";
  }
};
export const UpdateUserRoleApi = async ({ token, userId, role }:UpdateRolePayload):Promise<User> => {
  try {
    const response = await api.patch<User>(
      `/user/${userId}/role`,
      { role },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return response.data;
  } catch (error:unknown) {
    const err = error as AxiosError<{message:string}>
    throw err.response?.data?.message || "Unable to fetch user api";
} 
}
export const UpdateUserStatusApi = async ({ token, userId }:UpdateSTatusPayload):Promise<User> => {
  try {
    const response = await api.patch<User>(
      `/user/${userId}/status`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return response.data;
  } catch (error:unknown) {
    const err = error as AxiosError<{message:string}>
    throw err.response?.data?.message || "Unable to fetch user api";
}
};
