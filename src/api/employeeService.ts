import apiClient from './apiClient.ts';
import { Employee, FilterState, AttendanceRecord } from '../types/index.ts';

interface PaginatedResponse {
  success: boolean;
  data: Employee[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export const employeeService = {
  getEmployees: async (params: Partial<FilterState> & {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'ASC' | 'DESC';
  }): Promise<PaginatedResponse> => {
    return apiClient.get<any, PaginatedResponse>('/employees', { params });
  },

  getEmployeeById: async (id: number): Promise<Employee> => {
    const res = await apiClient.get<any, ApiResponse<Employee>>(`/employees/${id}`);
    return res.data;
  },

  getEmployeeAttendance: async (id: number, limit = 15): Promise<AttendanceRecord[]> => {
    const res = await apiClient.get<any, ApiResponse<AttendanceRecord[]>>(`/attendance/employee/${id}`, {
      params: { limit },
    });
    return res.data;
  },

  createEmployee: async (data: Partial<Employee>): Promise<Employee> => {
    const res = await apiClient.post<any, ApiResponse<Employee>>('/employees', data);
    return res.data;
  },

  updateEmployee: async (id: number, data: Partial<Employee>): Promise<Employee> => {
    const res = await apiClient.put<any, ApiResponse<Employee>>(`/employees/${id}`, data);
    return res.data;
  },

  deleteEmployee: async (id: number): Promise<void> => {
    await apiClient.delete(`/employees/${id}`);
  },

  getLocations: async (): Promise<string[]> => {
    const res = await apiClient.get<any, ApiResponse<string[]>>('/employees/locations');
    return res.data;
  },

  markAttendance: async (data: {
    employee_id: number;
    date: string;
    status: string;
    check_in?: string;
    check_out?: string;
    work_mode?: string;
    notes?: string;
  }): Promise<AttendanceRecord> => {
    const res = await apiClient.post<any, ApiResponse<AttendanceRecord>>('/attendance', data);
    return res.data;
  },
};
