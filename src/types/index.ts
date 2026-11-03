export type EmployeeStatus = 'Active' | 'On Leave' | 'Inactive' | 'Probation';
export type AttendanceStatus = 'Present' | 'Absent' | 'On Leave' | 'Remote';

export interface Department {
  id: number;
  name: string;
  code: string;
  description?: string;
  manager_name?: string;
  created_at: string;
  employee_count?: number;
}

export interface Employee {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  department_id: number;
  department_name?: string;
  role: string;
  location: string;
  status: EmployeeStatus;
  join_date: string;
  avatar_url?: string;
  salary?: number;
  today_attendance?: AttendanceStatus;
  check_in?: string;
  check_out?: string;
  work_mode?: 'Office' | 'Remote' | 'Hybrid';
}

export interface AttendanceRecord {
  id: number;
  employee_id: number;
  employee_name?: string;
  department_name?: string;
  date: string;
  status: AttendanceStatus;
  check_in?: string;
  check_out?: string;
  work_mode?: 'Office' | 'Remote' | 'Hybrid';
  notes?: string;
  created_at?: string;
}

export interface AnalyticsKPIs {
  totalEmployees: number;
  presentCount: number;
  absentCount: number;
  onLeaveCount: number;
  attendanceRate: number;
  onTimeArrivalRate: number;
  avgWorkingHours: number;
  previousAttendanceRate: number;
  rateChange: number;
}

export interface AttendanceTrendPoint {
  date: string;
  present: number;
  absent: number;
  onLeave: number;
  remote: number;
  attendanceRate: number;
}

export interface DepartmentStat {
  department: string;
  code: string;
  totalEmployees: number;
  presentCount: number;
  absentCount: number;
  onLeaveCount: number;
  attendanceRate: number;
}

export interface LocationStat {
  location: string;
  totalEmployees: number;
  presentCount: number;
}

export interface StatusDistribution {
  status: string;
  count: number;
  percentage: number;
}

export interface FilterState {
  department: string;
  location: string;
  status: string;
  startDate: string;
  endDate: string;
  datePreset: 'today' | '7days' | '14days' | '30days' | 'custom';
  search: string;
}

export interface PaginationState {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
