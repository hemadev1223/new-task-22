import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
} from '@mui/material';
import { Department } from '../../types/index.ts';
import { employeeService } from '../../api/employeeService.ts';

interface AddEmployeeModalProps {
  open: boolean;
  departments: Department[];
  onClose: () => void;
  onSuccess: () => void;
}

export const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({
  open,
  departments,
  onClose,
  onSuccess,
}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [departmentId, setDepartmentId] = useState<number | ''>('');
  const [role, setRole] = useState('');
  const [location, setLocation] = useState('San Francisco');
  const [status, setStatus] = useState('Active');
  const [salary, setSalary] = useState('');
  const [joinDate, setJoinDate] = useState(new Date().toISOString().split('T')[0]);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !departmentId || !role || !location) {
      setError('Please fill in all mandatory fields.');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      await employeeService.createEmployee({
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        department_id: Number(departmentId),
        role,
        location,
        status: status as any,
        join_date: joinDate,
        salary: salary ? Number(salary) : undefined,
      });

      // Reset
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhone('');
      setDepartmentId('');
      setRole('');
      onSuccess();
      onClose();
    } catch (err: any) {
      console.error('Failed to create employee', err);
      setError(err.message || 'Failed to create employee record.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
      <form onSubmit={handleSubmit}>
        <DialogTitle sx={{ pb: 1, fontWeight: 700 }}>
          Add New Employee
        </DialogTitle>

        <DialogContent sx={{ pt: 2 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
              {error}
            </Alert>
          )}

          <Grid container spacing={2} sx={{ mt: 0.5 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                size="small"
                label="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                size="small"
                label="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                size="small"
                type="email"
                label="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                size="small"
                label="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small" required>
                <InputLabel id="add-dept-label">Department</InputLabel>
                <Select
                  labelId="add-dept-label"
                  value={departmentId}
                  label="Department"
                  onChange={(e) => setDepartmentId(e.target.value as number)}
                >
                  {departments.map((d) => (
                    <MenuItem key={d.id} value={d.id}>
                      {d.name} ({d.code})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                size="small"
                label="Role / Title"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Senior Frontend Engineer"
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small" required>
                <InputLabel id="add-loc-label">Location</InputLabel>
                <Select
                  labelId="add-loc-label"
                  value={location}
                  label="Location"
                  onChange={(e) => setLocation(e.target.value)}
                >
                  <MenuItem value="San Francisco">San Francisco</MenuItem>
                  <MenuItem value="New York">New York</MenuItem>
                  <MenuItem value="London">London</MenuItem>
                  <MenuItem value="Bangalore">Bangalore</MenuItem>
                  <MenuItem value="Remote">Remote</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small">
                <InputLabel id="add-status-label">Employment Status</InputLabel>
                <Select
                  labelId="add-status-label"
                  value={status}
                  label="Employment Status"
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Probation">Probation</MenuItem>
                  <MenuItem value="On Leave">On Leave</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                size="small"
                type="number"
                label="Salary (USD/yr)"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                size="small"
                type="date"
                label="Join Date"
                value={joinDate}
                onChange={(e) => setJoinDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button onClick={onClose} disabled={submitting}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={submitting}>
            {submitting ? 'Creating...' : 'Create Employee'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddEmployeeModal;
