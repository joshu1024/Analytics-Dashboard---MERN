
export interface UserActivity {
  action: string;
  date: string;
}
export interface UserFiltersProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  role: string;
  setRole: React.Dispatch<React.SetStateAction<string>>;
}
export interface ErrorResponse{
  message:string
}
export interface User{
    _id:string,
    id?:string,
    fullName:string,
    email:string,
    role: string,
    isActive:boolean,
    country?:string
    lastLogin:Date | null
}
export interface UserState{
    users: User[],
    totalPages: number,
    page: number,
    total: number,
    user: User | null,
    loading: boolean,
    error:string | null | undefined,
}
export interface UpdateRolePayload{
    token:string, 
    userId:string,
    role:string 
}
export interface UpdateSTatusPayload{
    token:string, 
    userId:string,
}
export interface UserResponse{
    users: User[],
    totalPages: number,
    page: number,
    total: number,
}