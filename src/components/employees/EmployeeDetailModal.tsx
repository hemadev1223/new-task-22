import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Avatar,
  Typography,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Chip,
} from '@mui/material';
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  Business as DeptIcon,
  LocationOn as LocIcon,
  Event as DateIcon,
  AttachMoney as MoneyIcon,
} from '@mui/icons-material';
import { Employee, AttendanceRecord } from '../../types/index.ts';
import { employeeService } from '../../api/employeeService.ts';
import StatusChip from '../common/StatusChip.tsx';

interface EmployeeDetailModalProps {
  open: boolean;
  employee: Employee | null;
  onClose: () => void;
  onMarkAttendance: (employee: Employee) => void;
}

export const EmployeeDetailModal: React.FC<EmployeeDetailModalProps> = ({
  open,
  employee,
  onClose,
  onMarkAttendance,
}) => {
  const [attendanceLogs, setAttendanceLogs] = useState<AttendanceRecord[]>([]);
  const [loadingLogs, setLoadingLogs] = useState<boolean>(false);

  useEffect(() => {
    if (employee && open) {
      setLoadingLogs(true);
      employeeService
        .getEmployeeAttendance(employee.id, 10)
        .then((logs) => setAttendanceLogs(logs))
        .catch((err) => console.error('Failed to load employee logs', err))
        .finally(() => setLoadingLogs(false));
    }
  }, [employee, open]);

  if (!employee) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
      <DialogTitle sx={{ pb: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" fontWeight={700}>
            Employee Profile
          </Typography>
          <StatusChip status={employee.status} type="employee" />
        </Box>
      </DialogTitle>
      <Divider />

      <DialogContent sx={{ pt: 2.5 }}>
        {/* Header Profile Info */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5, mb: 3 }}>
          <Avatar
            src={employee.avatar_url}
            alt={`${employee.first_name} ${employee.last_name}`}
            sx={{ width: 68, height: 68, boxShadow: 2 }}
          >
            {employee.first_name[0]}
          </Avatar>
          <Box>
            <Typography variant="h6" fontWeight={700}>
              {employee.first_name} {employee.last_name}
            </Typography>
            <Typography variant="body2" color="primary" fontWeight={600}>
              {employee.role}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
              <Typography variant="caption" color="text.secondary">
                Today's Attendance:
              </Typography>
              <StatusChip status={employee.today_attendance || 'Absent'} type="attendance" />
            </Box>
          </Box>
        </Box>

        {/* Details Grid */}
        <Box sx={{ bgcolor: 'action.hover', p: 2, borderRadius: 2, mb: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <EmailIcon fontSize="small" color="action" />
              <Typography variant="body2">{employee.email}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PhoneIcon fontSize="small" color="action" />
              <Typography variant="body2">{employee.phone || 'N/A'}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <DeptIcon fontSize="small" color="action" />
              <Typography variant="body2">{employee.department_name || 'Engineering'}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <LocIcon fontSize="small" color="action" />
              <Typography variant="body2">{employee.location}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <DateIcon fontSize="small" color="action" />
              <Typography variant="body2">Joined: {employee.join_date}</Typography>
            </Grid>
            {employee.salary ? (
              <Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <MoneyIcon fontSize="small" color="action" />
                <Typography variant="body2">
                  Salary: ${Number(employee.salary).toLocaleString()}/yr
                </Typography>
              </Grid>
            ) : null}
          </Grid>
        </Box>

        {/* Recent Attendance Logs */}
        <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1 }}>
          Recent Attendance History (Last 10 Records)
        </Typography>

        {loadingLogs ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
            <CircularProgress size={24} />
          </Box>
        ) : attendanceLogs.length === 0 ? (
          <Typography variant="body2" color="text.secondary" sx={{ py: 1 }}>
            No recent attendance records logged yet.
          </Typography>
        ) : (
          <List dense disablePadding sx={{ maxHeight: 200, overflowY: 'auto' }}>
            {attendanceLogs.map((log) => (
              <ListItem
                key={log.id}
                sx={{
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                  py: 1,
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <ListItemText
                  primary={log.date}
                  secondary={
                    log.check_in
                      ? `In: ${log.check_in} ${log.check_out ? `• Out: ${log.check_out}` : ''} (${log.work_mode || 'Office'})`
                      : log.notes || 'No check-in recorded'
                  }
                  primaryTypographyProps={{ fontWeight: 600, fontSize: '0.85rem' }}
                  secondaryTypographyProps={{ fontSize: '0.75rem' }}
                />
                <StatusChip status={log.status} type="attendance" />
              </ListItem>
            ))}
          </List>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2.5, justifyContent: 'space-between' }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            onClose();
            onMarkAttendance(employee);
          }}
        >
          Update Attendance
        </Button>
        <Button onClick={onClose} variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EmployeeDetailModal;
