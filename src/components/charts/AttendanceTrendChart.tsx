import React from 'react';
import { Card, CardContent, Typography, Box, useTheme } from '@mui/material';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { AttendanceTrendPoint } from '../../types/index.ts';
import { ChartSkeleton } from '../common/LoadingSkeleton.tsx';
import EmptyState from '../common/EmptyState.tsx';

interface AttendanceTrendChartProps {
  data: AttendanceTrendPoint[];
  loading: boolean;
}

export const AttendanceTrendChart: React.FC<AttendanceTrendChartProps> = ({ data, loading }) => {
  const theme = useTheme();

  if (loading) {
    return <ChartSkeleton height={320} />;
  }

  if (!data || data.length === 0) {
    return (
      <Card sx={{ height: '100%', p: 2 }}>
        <EmptyState title="No Attendance Data" description="No attendance records available for the selected dates." />
      </Card>
    );
  }

  const formattedData = data.map((d) => ({
    ...d,
    displayDate: d.date.slice(5), // MM-DD
  }));

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ pb: '16px !important' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box>
            <Typography variant="h6" fontWeight={700}>
              Attendance Analytics & Trends
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Daily recorded presence, remote workers, and leaves over time
            </Typography>
          </Box>
        </Box>

        <Box sx={{ width: '100%', height: 320 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={formattedData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorPresent" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorAbsent" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorLeave" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme.palette.divider} />
              <XAxis
                dataKey="displayDate"
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
                contentStyle={{
                  backgroundColor: theme.palette.background.paper,
                  borderColor: theme.palette.divider,
                  borderRadius: 8,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  fontSize: 12,
                }}
              />
              <Legend verticalAlign="top" height={36} iconType="circle" />
              <Area
                type="monotone"
                dataKey="present"
                name="Present (Office + Remote)"
                stroke="#10b981"
                fillOpacity={1}
                fill="url(#colorPresent)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="absent"
                name="Absent"
                stroke="#ef4444"
                fillOpacity={1}
                fill="url(#colorAbsent)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="onLeave"
                name="On Leave"
                stroke="#f59e0b"
                fillOpacity={1}
                fill="url(#colorLeave)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AttendanceTrendChart;
