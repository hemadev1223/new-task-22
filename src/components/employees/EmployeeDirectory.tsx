import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Avatar,
  IconButton,
  Button,
  Tooltip,
} from '@mui/material';
import {
  Visibility as ViewIcon,
  CheckCircleOutline as AttendanceActionIcon,
  PersonAdd as AddPersonIcon,
} from '@mui/icons-material';
import { Employee } from '../../types/index.ts';
import { useEmployees } from '../../hooks/useEmployees.ts';
import { useFilter } from '../../context/FilterContext.tsx';
import StatusChip from '../common/StatusChip.tsx';
import { TableSkeleton } from '../common/LoadingSkeleton.tsx';
import ErrorAlert from '../common/ErrorAlert.tsx';
import EmptyState from '../common/EmptyState.tsx';
import EmployeeDetailModal from './EmployeeDetailModal.tsx';
import MarkAttendanceModal from './MarkAttendanceModal.tsx';
import AddEmployeeModal from './AddEmployeeModal.tsx';

interface EmployeeDirectoryProps {
  onRefreshAnalytics?: () => void;
}

export const EmployeeDirectory: React.FC<EmployeeDirectoryProps> = ({ onRefreshAnalytics }) => {
  const {
    employees,
    loading,
    error,
    page,
    limit,
    sortBy,
    sortOrder,
    pagination,
    setPage,
    setLimit,
    handleSort,
    refetch,
  } = useEmployees();

  const { availableDepartments, resetFilters } = useFilter();

  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [attendanceModalOpen, setAttendanceModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);

  const handleOpenDetail = (emp: Employee) => {
    setSelectedEmployee(emp);
    setDetailModalOpen(true);
  };

  const handleOpenAttendance = (emp: Employee) => {
    setSelectedEmployee(emp);
    setAttendanceModalOpen(true);
  };

  const handleSuccessAction = () => {
    refetch();
    if (onRefreshAnalytics) {
      onRefreshAnalytics();
    }
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage + 1); // Material UI is 0-indexed, our API is 1-indexed
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(1);
  };

  return (
    <>
      <Card sx={{ mt: 3 }}>
        <CardContent sx={{ pb: '16px !important' }}>
          {/* Header Title & Add Employee Button */}
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 2,
              mb: 2.5,
            }}
          >
            <Box>
              <Typography variant="h6" fontWeight={700}>
                Employee Workforce Directory
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Search, sort, filter, and track attendance status in real-time
              </Typography>
            </Box>

            <Button
              variant="contained"
              startIcon={<AddPersonIcon />}
              onClick={() => setAddModalOpen(true)}
              size="small"
              sx={{ fontWeight: 600 }}
            >
              Add Employee
            </Button>
          </Box>

          {/* Loading, Error, Empty & Table States */}
          {error ? (
            <ErrorAlert message={error} onRetry={refetch} />
          ) : loading ? (
            <TableSkeleton />
          ) : employees.length === 0 ? (
            <EmptyState
              title="No Employees Found"
              description="No employee records match the active search query and filter criteria."
              onReset={resetFilters}
            />
          ) : (
            <>
              <TableContainer sx={{ borderRadius: 2, border: 1, borderColor: 'divider' }}>
                <Table size="medium">
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <TableSortLabel
                          active={sortBy === 'name'}
                          direction={sortBy === 'name' ? (sortOrder.toLowerCase() as 'asc' | 'desc') : 'asc'}
                          onClick={() => handleSort('name')}
                        >
                          Employee Name
                        </TableSortLabel>
                      </TableCell>
                      <TableCell>
                        <TableSortLabel
                          active={sortBy === 'department'}
                          direction={sortBy === 'department' ? (sortOrder.toLowerCase() as 'asc' | 'desc') : 'asc'}
                          onClick={() => handleSort('department')}
                        >
                          Department
                        </TableSortLabel>
                      </TableCell>
                      <TableCell>
                        <TableSortLabel
                          active={sortBy === 'role'}
                          direction={sortBy === 'role' ? (sortOrder.toLowerCase() as 'asc' | 'desc') : 'asc'}
                          onClick={() => handleSort('role')}
                        >
                          Role
                        </TableSortLabel>
                      </TableCell>
                      <TableCell>
                        <TableSortLabel
                          active={sortBy === 'location'}
                          direction={sortBy === 'location' ? (sortOrder.toLowerCase() as 'asc' | 'desc') : 'asc'}
                          onClick={() => handleSort('location')}
                        >
                          Location
                        </TableSortLabel>
                      </TableCell>
                      <TableCell>
                        <TableSortLabel
                          active={sortBy === 'status'}
                          direction={sortBy === 'status' ? (sortOrder.toLowerCase() as 'asc' | 'desc') : 'asc'}
                          onClick={() => handleSort('status')}
                        >
                          Employment
                        </TableSortLabel>
                      </TableCell>
                      <TableCell>
                        <TableSortLabel
                          active={sortBy === 'attendance'}
                          direction={sortBy === 'attendance' ? (sortOrder.toLowerCase() as 'asc' | 'desc') : 'asc'}
                          onClick={() => handleSort('attendance')}
                        >
                          Attendance
                        </TableSortLabel>
                      </TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {employees.map((emp) => (
                      <TableRow key={emp.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        {/* Name + Avatar */}
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <Avatar
                              src={emp.avatar_url}
                              alt={emp.first_name}
                              sx={{ width: 34, height: 34, fontSize: '0.875rem', bgcolor: 'primary.light' }}
                            >
                              {emp.first_name[0]}
                            </Avatar>
                            <Box>
                              <Typography variant="body2" fontWeight={700}>
                                {emp.first_name} {emp.last_name}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {emp.email}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>

                        {/* Department */}
                        <TableCell>
                          <Typography variant="body2" fontWeight={500}>
                            {emp.department_name}
                          </Typography>
                        </TableCell>

                        {/* Role */}
                        <TableCell>
                          <Typography variant="body2">{emp.role}</Typography>
                        </TableCell>

                        {/* Location */}
                        <TableCell>
                          <Typography variant="body2">{emp.location}</Typography>
                        </TableCell>

                        {/* Employment Status */}
                        <TableCell>
                          <StatusChip status={emp.status} type="employee" />
                        </TableCell>

                        {/* Attendance Status on Query Date */}
                        <TableCell>
                          <StatusChip status={emp.today_attendance || 'Absent'} type="attendance" />
                        </TableCell>

                        {/* Actions */}
                        <TableCell align="right">
                          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 0.5 }}>
                            <Tooltip title="View Profile & Attendance History">
                              <IconButton size="small" color="primary" onClick={() => handleOpenDetail(emp)}>
                                <ViewIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Log / Update Attendance">
                              <IconButton size="small" color="success" onClick={() => handleOpenAttendance(emp)}>
                                <AttendanceActionIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Server-side Pagination */}
              <TablePagination
                rowsPerPageOptions={[5, 10, 20, 50]}
                component="div"
                count={pagination.total}
                rowsPerPage={limit}
                page={page - 1}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </>
          )}
        </CardContent>
      </Card>

      {/* Modals */}
      <EmployeeDetailModal
        open={detailModalOpen}
        employee={selectedEmployee}
        onClose={() => setDetailModalOpen(false)}
        onMarkAttendance={handleOpenAttendance}
      />

      <MarkAttendanceModal
        open={attendanceModalOpen}
        employee={selectedEmployee}
        onClose={() => setAttendanceModalOpen(false)}
        onSuccess={handleSuccessAction}
      />

      <AddEmployeeModal
        open={addModalOpen}
        departments={availableDepartments}
        onClose={() => setAddModalOpen(false)}
        onSuccess={handleSuccessAction}
      />
    </>
  );
};

export default EmployeeDirectory;
