import apiClient from './apiClient.ts';
import { 
  AnalyticsKPIs, 
  AttendanceTrendPoint, 
  DepartmentStat, 
  LocationStat, 
  StatusDistribution, 
  FilterState 
} from '../types/index.ts';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export const analyticsService = {
  getKPIs: async (filters: Partial<FilterState>): Promise<AnalyticsKPIs> => {
    const res = await apiClient.get<any, ApiResponse<AnalyticsKPIs>>('/analytics/kpis', {
      params: {
        department: filters.department,
        location: filters.location,
        status: filters.status,
        startDate: filters.startDate,
        endDate: filters.endDate,
      },
    });
    return res.data;
  },

  getAttendanceTrends: async (filters: Partial<FilterState>): Promise<AttendanceTrendPoint[]> => {
    const res = await apiClient.get<any, ApiResponse<AttendanceTrendPoint[]>>('/analytics/trends', {
      params: {
        department: filters.department,
        location: filters.location,
        status: filters.status,
        startDate: filters.startDate,
        endDate: filters.endDate,
      },
    });
    return res.data;
  },

  getDepartmentStats: async (filters: Partial<FilterState>): Promise<DepartmentStat[]> => {
    const res = await apiClient.get<any, ApiResponse<DepartmentStat[]>>('/analytics/department-stats', {
      params: {
        department: filters.department,
        location: filters.location,
        status: filters.status,
        startDate: filters.startDate,
        endDate: filters.endDate,
      },
    });
    return res.data;
  },

  getStatusDistribution: async (filters: Partial<FilterState>): Promise<StatusDistribution[]> => {
    const res = await apiClient.get<any, ApiResponse<StatusDistribution[]>>('/analytics/status-distribution', {
      params: {
        department: filters.department,
        location: filters.location,
        status: filters.status,
      },
    });
    return res.data;
  },

  getLocationStats: async (filters: Partial<FilterState>): Promise<LocationStat[]> => {
    const res = await apiClient.get<any, ApiResponse<LocationStat[]>>('/analytics/location-stats', {
      params: {
        department: filters.department,
        location: filters.location,
        status: filters.status,
        startDate: filters.startDate,
        endDate: filters.endDate,
      },
    });
    return res.data;
  },
};
