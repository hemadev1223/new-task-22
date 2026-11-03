import React, { useState } from 'react';
import { Box, Typography, Grid, Chip } from '@mui/material';
import { ThemeProvider } from './context/ThemeContext.tsx';
import { FilterProvider } from './context/FilterContext.tsx';
import { useAnalytics } from './hooks/useAnalytics.ts';
import MainLayout from './components/layout/MainLayout.tsx';
import DashboardFilterBar from './components/filters/DashboardFilterBar.tsx';
import KpiSection from './components/kpi/KpiSection.tsx';
import AttendanceTrendChart from './components/charts/AttendanceTrendChart.tsx';
import DepartmentDistributionChart from './components/charts/DepartmentDistributionChart.tsx';
import StatusBreakdownChart from './components/charts/StatusBreakdownChart.tsx';
import LocationDistributionChart from './components/charts/LocationDistributionChart.tsx';
import EmployeeDirectory from './components/employees/EmployeeDirectory.tsx';
import ArchitectureView from './components/architecture/ArchitectureView.tsx';
import ErrorAlert from './components/common/ErrorAlert.tsx';

const DashboardContent: React.FC = () => {
  const { kpis, trends, deptStats, statusDistribution, locationStats, loading, error, refetch } = useAnalytics();

  return (
    <Box>
      {/* Welcome Banner */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
          <Typography variant="h5" fontWeight={800} sx={{ letterSpacing: '-0.02em' }}>
            Workforce Overview
          </Typography>
          <Chip label="Live Analytics" size="small" color="primary" sx={{ fontWeight: 700, height: 22, fontSize: '0.7rem' }} />
        </Box>
        <Typography variant="body2" color="text.secondary">
          Welcome back, <strong>Hemadev</strong>. Here is today's real-time employee attendance and departmental distribution.
        </Typography>
      </Box>

      {/* Global Filter Bar */}
      <DashboardFilterBar />

      {/* Error notification if any */}
      {error && <ErrorAlert message={error} onRetry={refetch} />}

      {/* KPI Metric Cards */}
      <KpiSection kpis={kpis} loading={loading} />

      {/* Row 1 Charts: Attendance Trends & Department Distribution */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} lg={7}>
          <AttendanceTrendChart data={trends} loading={loading} />
        </Grid>
        <Grid item xs={12} lg={5}>
          <DepartmentDistributionChart data={deptStats} loading={loading} />
        </Grid>
      </Grid>

      {/* Row 2 Charts: Status Breakdown & Location Breakdown */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <StatusBreakdownChart data={statusDistribution} loading={loading} />
        </Grid>
        <Grid item xs={12} md={6}>
          <LocationDistributionChart data={locationStats} loading={loading} />
        </Grid>
      </Grid>

      {/* Employee Workforce Directory Table */}
      <EmployeeDirectory onRefreshAnalytics={refetch} />
    </Box>
  );
};

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  return (
    <ThemeProvider>
      <FilterProvider>
        <MainLayout activeTab={activeTab} onTabChange={setActiveTab}>
          {activeTab === 'dashboard' && <DashboardContent />}

          {activeTab === 'employees' && (
            <Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="h5" fontWeight={800}>
                  Workforce Directory & Management
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Manage employee profiles, roles, locations, and record attendance
                </Typography>
              </Box>
              <DashboardFilterBar />
              <EmployeeDirectory />
            </Box>
          )}

          {activeTab === 'attendance' && (
            <Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="h5" fontWeight={800}>
                  Attendance Analytics & History
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Evaluate attendance trends, punctuality patterns, and leave frequencies
                </Typography>
              </Box>
              <DashboardFilterBar />
              <AttendanceAnalyticsTab />
            </Box>
          )}

          {activeTab === 'departments' && (
            <Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="h5" fontWeight={800}>
                  Department Distribution & Headcount
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Headcount distribution and attendance rates by business unit
                </Typography>
              </Box>
              <DashboardFilterBar />
              <DepartmentAnalyticsTab />
            </Box>
          )}

          {activeTab === 'architecture' && <ArchitectureView />}
        </MainLayout>
      </FilterProvider>
    </ThemeProvider>
  );
};

// Sub-component for Attendance tab
const AttendanceAnalyticsTab: React.FC = () => {
  const { trends, kpis, loading } = useAnalytics();
  return (
    <Box>
      <KpiSection kpis={kpis} loading={loading} />
      <Box sx={{ mt: 3 }}>
        <AttendanceTrendChart data={trends} loading={loading} />
      </Box>
      <Box sx={{ mt: 3 }}>
        <EmployeeDirectory />
      </Box>
    </Box>
  );
};

// Sub-component for Department tab
const DepartmentAnalyticsTab: React.FC = () => {
  const { deptStats, statusDistribution, locationStats, loading } = useAnalytics();
  return (
    <Box>
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={7}>
          <DepartmentDistributionChart data={deptStats} loading={loading} />
        </Grid>
        <Grid item xs={12} md={5}>
          <StatusBreakdownChart data={statusDistribution} loading={loading} />
        </Grid>
        <Grid item xs={12}>
          <LocationDistributionChart data={locationStats} loading={loading} />
        </Grid>
      </Grid>
      <EmployeeDirectory />
    </Box>
  );
};

export default App;
