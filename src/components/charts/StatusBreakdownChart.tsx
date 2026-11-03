import React from 'react';
import { Card, CardContent, Typography, Box, useTheme } from '@mui/material';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { StatusDistribution } from '../../types/index.ts';
import { ChartSkeleton } from '../common/LoadingSkeleton.tsx';
import EmptyState from '../common/EmptyState.tsx';

interface StatusBreakdownChartProps {
  data: StatusDistribution[];
  loading: boolean;
}

const COLORS: Record<string, string> = {
  Active: '#10b981',
  'On Leave': '#f59e0b',
  Probation: '#6366f1',
  Inactive: '#94a3b8',
};

export const StatusBreakdownChart: React.FC<StatusBreakdownChartProps> = ({ data, loading }) => {
  const theme = useTheme();

  if (loading) {
    return <ChartSkeleton height={260} />;
  }

  if (!data || data.length === 0) {
    return (
      <Card sx={{ height: '100%', p: 2 }}>
        <EmptyState title="No Status Data" description="No status records available." />
      </Card>
    );
  }

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ pb: '16px !important' }}>
        <Typography variant="h6" fontWeight={700}>
          Employment Status Breakdown
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Active workforce vs leaves & probationary staff
        </Typography>

        <Box sx={{ width: '100%', height: 260, mt: 1 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="count"
                nameKey="status"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={85}
                paddingAngle={4}
              >
                {data.map((entry) => (
                  <Cell
                    key={`cell-${entry.status}`}
                    fill={COLORS[entry.status] || '#3b82f6'}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(val, name, item: any) => [
                  `${val} employees (${item.payload.percentage}%)`,
                  name,
                ]}
                contentStyle={{
                  backgroundColor: theme.palette.background.paper,
                  borderColor: theme.palette.divider,
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
              <Legend verticalAlign="bottom" height={36} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatusBreakdownChart;
