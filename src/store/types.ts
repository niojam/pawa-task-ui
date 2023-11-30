import { Task, UserInfo } from '@/api/types';

export interface DashboardState {
  tasks: Task[];
}

export interface AuthState {
  userInfo: UserInfo;
  authenticated: boolean;
}
