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
} from 'recharts';
import { LocationStat } from '../../types/index.ts';
import { ChartSkeleton } from '../common/LoadingSkeleton.tsx';
import EmptyState from '../common/EmptyState.tsx';

interface LocationDistributionChartProps {
  data: LocationStat[];
  loading: boolean;
}

export const LocationDistributionChart: React.FC<LocationDistributionChartProps> = ({
  data,
  loading,
}) => {
  const theme = useTheme();

  if (loading) {
    return <ChartSkeleton height={260} />;
  }

  if (!data || data.length === 0) {
    return (
      <Card sx={{ height: '100%', p: 2 }}>
        <EmptyState title="No Location Data" description="No location data for current filters." />
      </Card>
    );
  }

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ pb: '16px !important' }}>
        <Typography variant="h6" fontWeight={700}>
          Workforce by Location
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Global distribution across regional hubs & remote nodes
        </Typography>

        <Box sx={{ width: '100%', height: 260, mt: 1 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={data}
              margin={{ top: 10, right: 20, left: 20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={theme.palette.divider} />
              <XAxis type="number" stroke={theme.palette.text.secondary} fontSize={12} tickLine={false} />
              <YAxis
                type="category"
                dataKey="location"
                stroke={theme.palette.text.secondary}
                fontSize={12}
                tickLine={false}
                axisLine={false}
                width={85}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme.palette.background.paper,
                  borderColor: theme.palette.divider,
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
              <Bar dataKey="totalEmployees" name="Total Staff" fill="#6366f1" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default LocationDistributionChart;
