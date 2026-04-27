export interface User {
  fullName: string;
  username?: string;
  email: string;
  role: "admin" | "user";
  country?: string;
  gender?: "male" | "female";
   _id?: string;
  isActive?: boolean;
  lastLogin?: Date | null;
}


export interface RegisterRequest {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  country: string;
  gender?: "male" | "female" 
}

export interface LoginRequest {
  email: string;
  password: string;
}

interface BaseAuthResponse {
  success: boolean;
  email: string;
  role: "admin" | "user";
  fullName: string;
  message: string;
}

export interface LoginResponse extends BaseAuthResponse {}

export interface RegisterResponse extends BaseAuthResponse {
  _id: string;
  username: string;
  country: string;
  gender: "male" | "female";
}


