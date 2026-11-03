import React from 'react';
import { Card, CardContent, Typography, Box, LinearProgress, Chip } from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';

interface KpiCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  color: 'primary' | 'success' | 'error' | 'warning' | 'info';
  trend?: number;
  progress?: number;
}

export const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  color,
  trend,
  progress,
}) => {
  const colorMap = {
    primary: {
      bg: 'rgba(59, 130, 246, 0.1)',
      border: 'rgba(59, 130, 246, 0.2)',
      main: '#3b82f6',
    },
    success: {
      bg: 'rgba(16, 185, 129, 0.1)',
      border: 'rgba(16, 185, 129, 0.2)',
      main: '#10b981',
    },
    error: {
      bg: 'rgba(239, 68, 68, 0.1)',
      border: 'rgba(239, 68, 68, 0.2)',
      main: '#ef4444',
    },
    warning: {
      bg: 'rgba(245, 158, 11, 0.1)',
      border: 'rgba(245, 158, 11, 0.2)',
      main: '#f59e0b',
    },
    info: {
      bg: 'rgba(99, 102, 241, 0.1)',
      border: 'rgba(99, 102, 241, 0.2)',
      main: '#6366f1',
    },
  };

  const scheme = colorMap[color];

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 20px -4px rgba(0, 0, 0, 0.1)',
        },
      }}
    >
      <CardContent sx={{ pb: '16px !important' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
          <Typography variant="body2" color="text.secondary" fontWeight={600} sx={{ letterSpacing: '0.02em' }}>
            {title}
          </Typography>
          <Box
            sx={{
              width: 42,
              height: 42,
              borderRadius: 2.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: scheme.bg,
              color: scheme.main,
              border: `1px solid ${scheme.border}`,
            }}
          >
            {icon}
          </Box>
        </Box>

        <Typography variant="h4" fontWeight={800} sx={{ mb: 1, letterSpacing: '-0.03em' }}>
          {value}
        </Typography>

        {progress !== undefined && (
          <Box sx={{ my: 1.5 }}>
            <LinearProgress
              variant="determinate"
              value={Math.min(100, Math.max(0, progress))}
              sx={{
                height: 6,
                borderRadius: 3,
                bgcolor: 'action.hover',
                '& .MuiLinearProgress-bar': {
                  bgcolor: scheme.main,
                  borderRadius: 3,
                },
              }}
            />
          </Box>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
          {trend !== undefined && (
            <Chip
              size="small"
              icon={
                trend >= 0 ? (
                  <TrendingUp sx={{ fontSize: '13px !important' }} />
                ) : (
                  <TrendingDown sx={{ fontSize: '13px !important' }} />
                )
              }
              label={`${trend >= 0 ? '+' : ''}${trend}%`}
              color={trend >= 0 ? 'success' : 'error'}
              variant="filled"
              sx={{ height: 20, fontSize: '0.675rem', fontWeight: 700 }}
            />
          )}
          {subtitle && (
            <Typography variant="caption" color="text.secondary" fontWeight={500}>
              {subtitle}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default KpiCard;
