export interface KPI {
  activeUsers: number;
  totalUsers:number;
  churnRate: number;
  mrr:number;
  revenueChart: RevenuePoint[]
  recentActivity: RecentActivity[],
  planBreakDown: planBreakDown[],
  data: UserGrowthPoint[],
}

export interface DashboardState {
  kpis: KPI
  loading: boolean;
  error: string | null | undefined;
}
 
export interface RevenuePoint{
    month:string,
    revenue:number
}
export interface RecentActivity {//
  type: "transaction" | "user";
  message: string;
  time?: string;
}
export interface planBreakDown{
  [key: string]: string | number;
    name: string;
    value: number;
}
export interface UserGrowthPoint{
    month: string;
    users: number;
}