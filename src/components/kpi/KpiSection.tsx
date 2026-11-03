import React from 'react';
import { Grid } from '@mui/material';
import {
  Groups as TotalIcon,
  CheckCircle as PresentIcon,
  Cancel as AbsentIcon,
  EventBusy as LeaveIcon,
  Speed as RateIcon,
} from '@mui/icons-material';
import { AnalyticsKPIs } from '../../types/index.ts';
import KpiCard from './KpiCard.tsx';
import { KpiSkeleton } from '../common/LoadingSkeleton.tsx';

interface KpiSectionProps {
  kpis: AnalyticsKPIs | null;
  loading: boolean;
}

export const KpiSection: React.FC<KpiSectionProps> = ({ kpis, loading }) => {
  if (loading || !kpis) {
    return <KpiSkeleton />;
  }

  const presentPercentage = kpis.totalEmployees > 0
    ? Math.round((kpis.presentCount / kpis.totalEmployees) * 100)
    : 0;

  return (
    <Grid container spacing={2.5} sx={{ mb: 3 }}>
      {/* 1. Total Employees */}
      <Grid item xs={12} sm={6} md={2.4}>
        <KpiCard
          title="TOTAL EMPLOYEES"
          value={kpis.totalEmployees.toLocaleString()}
          subtitle="Registered staff count"
          icon={<TotalIcon />}
          color="primary"
          trend={1.8}
        />
      </Grid>

      {/* 2. Present */}
      <Grid item xs={12} sm={6} md={2.4}>
        <KpiCard
          title="PRESENT TODAY"
          value={kpis.presentCount.toLocaleString()}
          subtitle={`${presentPercentage}% workforce active`}
          icon={<PresentIcon />}
          color="success"
          progress={presentPercentage}
        />
      </Grid>

      {/* 3. Absent */}
      <Grid item xs={12} sm={6} md={2.4}>
        <KpiCard
          title="ABSENT"
          value={kpis.absentCount.toLocaleString()}
          subtitle="Unplanned absences"
          icon={<AbsentIcon />}
          color="error"
        />
      </Grid>

      {/* 4. On Leave */}
      <Grid item xs={12} sm={6} md={2.4}>
        <KpiCard
          title="ON LEAVE"
          value={kpis.onLeaveCount.toLocaleString()}
          subtitle="Approved PTO & medical"
          icon={<LeaveIcon />}
          color="warning"
        />
      </Grid>

      {/* 5. Attendance Rate */}
      <Grid item xs={12} sm={6} md={2.4}>
        <KpiCard
          title="ATTENDANCE RATE"
          value={`${kpis.attendanceRate}%`}
          subtitle={`Benchmark target: 90%`}
          icon={<RateIcon />}
          color="info"
          trend={kpis.rateChange}
          progress={kpis.attendanceRate}
        />
      </Grid>
    </Grid>
  );
};

export default KpiSection;
