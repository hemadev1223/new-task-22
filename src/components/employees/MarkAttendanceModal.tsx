import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Alert,
} from '@mui/material';
import { Employee } from '../../types/index.ts';
import { employeeService } from '../../api/employeeService.ts';

interface MarkAttendanceModalProps {
  open: boolean;
  employee: Employee | null;
  onClose: () => void;
  onSuccess: () => void;
}

export const MarkAttendanceModal: React.FC<MarkAttendanceModalProps> = ({
  open,
  employee,
  onClose,
  onSuccess,
}) => {
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [status, setStatus] = useState<string>('Present');
  const [workMode, setWorkMode] = useState<string>('Office');
  const [checkIn, setCheckIn] = useState<string>('09:00:00');
  const [checkOut, setCheckOut] = useState<string>('17:30:00');
  const [notes, setNotes] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (employee) {
      setDate(new Date().toISOString().split('T')[0]);
      setStatus(employee.today_attendance || 'Present');
      setWorkMode(employee.location === 'Remote' ? 'Remote' : 'Office');
      setCheckIn('09:00:00');
      setCheckOut('17:30:00');
      setNotes('');
      setError(null);
    }
  }, [employee, open]);

  if (!employee) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await employeeService.markAttendance({
        employee_id: employee.id,
        date,
        status,
        check_in: status === 'Present' || status === 'Remote' ? checkIn : undefined,
        check_out: status === 'Present' || status === 'Remote' ? checkOut : undefined,
        work_mode: workMode,
        notes,
      });

      onSuccess();
      onClose();
    } catch (err: any) {
      console.error('Failed to record attendance', err);
      setError(err.message || 'Failed to update attendance record.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
      <form onSubmit={handleSubmit}>
        <DialogTitle sx={{ pb: 1 }}>
          <Typography variant="h6" fontWeight={700}>
            Record Attendance
          </Typography>
          <Typography variant="caption" color="text.secondary">
            For {employee.first_name} {employee.last_name} ({employee.role})
          </Typography>
        </DialogTitle>

        <DialogContent sx={{ pt: 2 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
              {error}
            </Alert>
          )}

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField
              size="small"
              type="date"
              label="Date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              required
              fullWidth
            />

            <FormControl fullWidth size="small">
              <InputLabel id="mark-status-label">Attendance Status</InputLabel>
              <Select
                labelId="mark-status-label"
                value={status}
                label="Attendance Status"
                onChange={(e) => setStatus(e.target.value)}
              >
                <MenuItem value="Present">Present (In-Person / Office)</MenuItem>
                <MenuItem value="Remote">Remote (Work From Home)</MenuItem>
                <MenuItem value="On Leave">On Leave (PTO / Sick)</MenuItem>
                <MenuItem value="Absent">Absent (Unexcused)</MenuItem>
              </Select>
            </FormControl>

            {(status === 'Present' || status === 'Remote') && (
              <>
                <FormControl fullWidth size="small">
                  <InputLabel id="mark-mode-label">Work Mode</InputLabel>
                  <Select
                    labelId="mark-mode-label"
                    value={workMode}
                    label="Work Mode"
                    onChange={(e) => setWorkMode(e.target.value)}
                  >
                    <MenuItem value="Office">Office</MenuItem>
                    <MenuItem value="Remote">Remote</MenuItem>
                    <MenuItem value="Hybrid">Hybrid</MenuItem>
                  </Select>
                </FormControl>

                <Box sx={{ display: 'flex', gap: 1.5 }}>
                  <TextField
                    size="small"
                    label="Check-In"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    placeholder="09:00:00"
                    fullWidth
                  />
                  <TextField
                    size="small"
                    label="Check-Out"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    placeholder="17:30:00"
                    fullWidth
                  />
                </Box>
              </>
            )}

            <TextField
              size="small"
              label="Notes (Optional)"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g., Client meeting offsite, doctor appointment"
              multiline
              rows={2}
              fullWidth
            />
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button onClick={onClose} disabled={submitting}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={submitting}>
            {submitting ? 'Saving...' : 'Save Attendance'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default MarkAttendanceModal;
