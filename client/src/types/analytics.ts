// src/types/analytics.ts

export interface RetentionCurvePoint {
  day: number;
  value: number;
}
export interface ErrorResponse{
  message:string
}
export interface KPI {
  totalUsers: number;
  churn: number;
  totalRevenue: number;
  arpu: number;
  retention:number
}
export interface FetchEventsParams {
  page: number;
  limit: number;
}
export interface Event {
  _id: string;
  type: string;
  user?: {
    fullName: string;
  };
  createdAt: string;
}

export interface UserDemographics {
  name: string;
  value: number;
  [key: string]: string | number;
}

export interface AnalyticsState {
  kpis: KPI
  data: RetentionCurvePoint[];
  data2: SignupByCountry[];
  demographics: UserDemographics[];
  events: Event[];
  loading: boolean;
  error: string | null;
  mrr?: number;
}
export interface SignupByCountry {
  _id: string;  
  count: number;
}