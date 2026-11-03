import React from 'react';
import { Grid, Card, CardContent, Skeleton, Box } from '@mui/material';

export const KpiSkeleton: React.FC = () => {
  return (
    <Grid container spacing={2.5}>
      {[1, 2, 3, 4, 5].map((item) => (
        <Grid item xs={12} sm={6} md={2.4} key={item}>
          <Card sx={{ height: 135 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                <Skeleton variant="text" width="60%" height={24} />
                <Skeleton variant="circular" width={40} height={40} />
              </Box>
              <Skeleton variant="text" width="40%" height={40} />
              <Skeleton variant="text" width="80%" height={20} />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export const ChartSkeleton: React.FC<{ height?: number }> = ({ height = 320 }) => {
  return (
    <Card sx={{ height: '100%', p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Skeleton variant="text" width="35%" height={28} />
        <Skeleton variant="rounded" width={80} height={28} />
      </Box>
      <Skeleton variant="rounded" width="100%" height={height} />
    </Card>
  );
};

export const TableSkeleton: React.FC = () => {
  return (
    <Card sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Skeleton variant="text" width="30%" height={32} />
        <Skeleton variant="rounded" width={180} height={36} />
      </Box>
      {[1, 2, 3, 4, 5].map((row) => (
        <Box key={row} sx={{ display: 'flex', gap: 2, py: 1.5, borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
          <Skeleton variant="circular" width={36} height={36} />
          <Skeleton variant="rounded" width="25%" height={36} />
          <Skeleton variant="rounded" width="20%" height={36} />
          <Skeleton variant="rounded" width="15%" height={36} />
          <Skeleton variant="rounded" width="15%" height={36} />
          <Skeleton variant="rounded" width="15%" height={36} />
        </Box>
      ))}
    </Card>
  );
};
