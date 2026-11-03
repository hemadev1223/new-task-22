import React from 'react';
import { Card, CardContent, Typography, Box, useTheme } from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { DepartmentStat } from '../../types/index.ts';
import { ChartSkeleton } from '../common/LoadingSkeleton.tsx';
import EmptyState from '../common/EmptyState.tsx';

interface DepartmentDistributionChartProps {
  data: DepartmentStat[];
  loading: boolean;
}

export const DepartmentDistributionChart: React.FC<DepartmentDistributionChartProps> = ({
  data,
  loading,
}) => {
  const theme = useTheme();

  if (loading) {
    return <ChartSkeleton height={320} />;
  }

  if (!data || data.length === 0) {
    return (
      <Card sx={{ height: '100%', p: 2 }}>
        <EmptyState title="No Department Data" description="No department statistics found for the selected filter." />
      </Card>
    );
  }

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ pb: '16px !important' }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" fontWeight={700}>
            Department Distribution
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Total staff headcount vs present members per business unit
          </Typography>
        </Box>

        <Box sx={{ width: '100%', height: 320 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 10, right: 10, left: -20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme.palette.divider} />
              <XAxis
                dataKey="code"
                stroke={theme.palette.text.secondary}
                fontSize={12}
                tickLine={false}
              />
              <YAxis
                stroke={theme.palette.text.secondary}
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const d = payload[0].payload as DepartmentStat;
                    return (
                      <Box
                        sx={{
                          bgcolor: 'background.paper',
                          p: 1.5,
                          borderRadius: 2,
                          boxShadow: 3,
                          border: 1,
                          borderColor: 'divider',
                        }}
                      >
                        <Typography variant="subtitle2" fontWeight={700}>
                          {d.department} ({d.code})
                        </Typography>
                        <Typography variant="body2" color="primary.main">
                          Total Employees: {d.totalEmployees}
                        </Typography>
                        <Typography variant="body2" color="success.main">
                          Present Today: {d.presentCount}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Attendance Rate: {d.attendanceRate}%
                        </Typography>
                      </Box>
                    );
                  }
                  return null;
                }}
              />
              <Legend verticalAlign="top" height={36} iconType="circle" />
              <Bar dataKey="totalEmployees" name="Total Staff" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="presentCount" name="Present Today" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default DepartmentDistributionChart;
