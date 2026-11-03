import apiClient from './apiClient.ts';
import { Department } from '../types/index.ts';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export const departmentService = {
  getDepartments: async (): Promise<Department[]> => {
    const res = await apiClient.get<any, ApiResponse<Department[]>>('/departments');
    return res.data;
  },
};
