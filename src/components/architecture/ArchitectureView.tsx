import React from 'react';
import { Card, CardContent, Typography, Box, Grid, Chip, Divider, Paper } from '@mui/material';
import {
  Storage as DbIcon,
  Layers as LayerIcon,
  Api as ApiIcon,
  Code as CodeIcon,
  Security as SecurityIcon,
  CheckCircle as CheckIcon,
} from '@mui/icons-material';

export const ArchitectureView: React.FC = () => {
  return (
    <Box sx={{ mt: 2 }}>
      {/* Overview Card */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2, flexWrap: 'wrap', gap: 1 }}>
            <Box>
              <Typography variant="h5" fontWeight={800} color="primary.main">
                Workforce Analytics Platform (WFA) - Task 2 Architecture
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Designed & Architected by Hemadev • Stackly Enterprise Systems
              </Typography>
            </Box>
            <Chip icon={<CheckIcon />} label="SQLite & REST Fully Integrated" color="success" />
          </Box>
          <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
            This platform fulfills all Task 2 specifications: a professional, responsive Workforce Analytics Dashboard
            built with React, TypeScript, Material UI, Vite, and backed by a robust Node.js/Express REST API. All
            data is persisted in SQLite using the <strong>Repository Pattern</strong>, following strict SOLID principles
            with no hardcoded dashboard data.
          </Typography>
        </CardContent>
      </Card>

      <Grid container spacing={3}>
        {/* Layered Architecture */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                <LayerIcon color="primary" />
                <Typography variant="h6" fontWeight={700}>
                  Modular Layered Architecture (SOLID)
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Paper variant="outlined" sx={{ p: 1.5, bgcolor: 'action.hover' }}>
                  <Typography variant="subtitle2" fontWeight={700} color="primary.main">
                    1. Presentation Layer (React.js + MUI 6)
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Reusable atomic components: KPI cards, Area charts, Bar charts, Donut charts, debounced filter bar, and employee directory table.
                  </Typography>
                </Paper>

                <Paper variant="outlined" sx={{ p: 1.5, bgcolor: 'action.hover' }}>
                  <Typography variant="subtitle2" fontWeight={700} color="info.main">
                    2. Business Logic & State Layer (Hooks & Context)
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    <code>useAnalytics</code>, <code>useEmployees</code>, <code>FilterContext</code>, and <code>ThemeContext</code> handle caching, debouncing, and parameter synchronization.
                  </Typography>
                </Paper>

                <Paper variant="outlined" sx={{ p: 1.5, bgcolor: 'action.hover' }}>
                  <Typography variant="subtitle2" fontWeight={700} color="warning.main">
                    3. API Service & Controller Layer (Express.js)
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Express REST controllers validate request parameters, serialize JSON payloads, and interface cleanly with domain repositories.
                  </Typography>
                </Paper>

                <Paper variant="outlined" sx={{ p: 1.5, bgcolor: 'action.hover' }}>
                  <Typography variant="subtitle2" fontWeight={700} color="success.main">
                    4. Data Access Layer (Repository Pattern + SQLite)
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    <code>EmployeeRepository</code>, <code>AttendanceRepository</code>, <code>AnalyticsRepository</code>, and <code>DepartmentRepository</code> encapsulate all SQL queries.
                  </Typography>
                </Paper>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* SQLite Database Schema */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                <DbIcon color="primary" />
                <Typography variant="h6" fontWeight={700}>
                  SQLite Database Schemas & Indexing
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Paper variant="outlined" sx={{ p: 1.5 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="subtitle2" fontWeight={700}>
                      Table: departments
                    </Typography>
                    <Chip label="Master Entity" size="small" variant="outlined" />
                  </Box>
                  <Typography variant="caption" color="text.secondary" component="div">
                    Columns: <code>id</code> (PK), <code>name</code> (UNIQUE), <code>code</code> (UNIQUE), <code>description</code>, <code>manager_name</code>, <code>created_at</code>
                  </Typography>
                </Paper>

                <Paper variant="outlined" sx={{ p: 1.5 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="subtitle2" fontWeight={700}>
                      Table: employees
                    </Typography>
                    <Chip label="Core Entity" size="small" color="primary" variant="outlined" />
                  </Box>
                  <Typography variant="caption" color="text.secondary" component="div">
                    Columns: <code>id</code> (PK), <code>first_name</code>, <code>last_name</code>, <code>email</code> (UNIQUE), <code>department_id</code> (FK), <code>role</code>, <code>location</code>, <code>status</code>, <code>join_date</code>, <code>salary</code>
                  </Typography>
                </Paper>

                <Paper variant="outlined" sx={{ p: 1.5 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="subtitle2" fontWeight={700}>
                      Table: attendance
                    </Typography>
                    <Chip label="Time Series" size="small" color="success" variant="outlined" />
                  </Box>
                  <Typography variant="caption" color="text.secondary" component="div">
                    Columns: <code>id</code> (PK), <code>employee_id</code> (FK), <code>date</code>, <code>status</code> ('Present'|'Absent'|'On Leave'|'Remote'), <code>check_in</code>, <code>check_out</code>, <code>work_mode</code>, <code>notes</code>. Constraint: <code>UNIQUE(employee_id, date)</code>
                  </Typography>
                </Paper>

                <Paper variant="outlined" sx={{ p: 1.5, bgcolor: 'action.hover' }}>
                  <Typography variant="subtitle2" fontWeight={700}>
                    Performance Indexes
                  </Typography>
                  <Typography variant="caption" color="text.secondary" component="div">
                    <code>idx_attendance_date</code>, <code>idx_attendance_employee</code>, <code>idx_employees_department</code>, <code>idx_employees_location</code>, <code>idx_employees_status</code>
                  </Typography>
                </Paper>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* REST API Endpoints */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                <ApiIcon color="primary" />
                <Typography variant="h6" fontWeight={700}>
                  REST API Endpoints Specification
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ p: 1.5, border: 1, borderColor: 'divider', borderRadius: 2 }}>
                    <Chip label="GET" size="small" color="primary" sx={{ mb: 1, fontWeight: 700 }} />
                    <Typography variant="body2" fontWeight={600}>/api/analytics/kpis</Typography>
                    <Typography variant="caption" color="text.secondary">
                      Computes total headcount, present, absent, on-leave, attendance %, rate change vs previous period.
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ p: 1.5, border: 1, borderColor: 'divider', borderRadius: 2 }}>
                    <Chip label="GET" size="small" color="primary" sx={{ mb: 1, fontWeight: 700 }} />
                    <Typography variant="body2" fontWeight={600}>/api/analytics/trends</Typography>
                    <Typography variant="caption" color="text.secondary">
                      Aggregates daily attendance curves (present, absent, on-leave, remote) over dynamic date ranges.
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ p: 1.5, border: 1, borderColor: 'divider', borderRadius: 2 }}>
                    <Chip label="GET" size="small" color="primary" sx={{ mb: 1, fontWeight: 700 }} />
                    <Typography variant="body2" fontWeight={600}>/api/employees</Typography>
                    <Typography variant="caption" color="text.secondary">
                      Server-side search, multi-column sorting, pagination, and joins with date-based attendance.
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ p: 1.5, border: 1, borderColor: 'divider', borderRadius: 2 }}>
                    <Chip label="POST" size="small" color="success" sx={{ mb: 1, fontWeight: 700 }} />
                    <Typography variant="body2" fontWeight={600}>/api/attendance</Typography>
                    <Typography variant="caption" color="text.secondary">
                      Upserts attendance log for any employee on any date with check-in, check-out, and work mode.
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ArchitectureView;
