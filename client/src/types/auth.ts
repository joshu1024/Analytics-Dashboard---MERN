export interface User {
  fullName: string;
  username?: string;
  email: string;
  role: string;
  country?: string;
  gender?: "male" | "female";
}


export interface RegisterRequest {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  country: string;
  gender: "male" | "female" | "";
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterResponse {
  _id: string;
  username: string;
  email: string;
  country: string;
  gender: "male" | "female";
  token: string;
  success: boolean;
  message: string;
  fullName:string,
  role:string
}
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  email: string;
  role: string;
  token: string;
  fullName: string;
  message?: string; 
}


export interface LogoutResponse {
  message: string;
}



