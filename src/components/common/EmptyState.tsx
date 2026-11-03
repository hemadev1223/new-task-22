import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { FilterListOff as FilterOffIcon } from '@mui/icons-material';

interface EmptyStateProps {
  title?: string;
  description?: string;
  onReset?: () => void;
  actionText?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No Records Found',
  description = 'No matching employees or attendance entries match your active filter criteria.',
  onReset,
  actionText = 'Reset Filters',
}) => {
  return (
    <Box
      sx={{
        py: 6,
        px: 3,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          width: 64,
          height: 64,
          borderRadius: '50%',
          bgcolor: 'action.hover',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 2,
          color: 'text.secondary',
        }}
      >
        <FilterOffIcon sx={{ fontSize: 32 }} />
      </Box>
      <Typography variant="h6" fontWeight={700} gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 420, mb: 3 }}>
        {description}
      </Typography>
      {onReset && (
        <Button variant="outlined" color="primary" onClick={onReset}>
          {actionText}
        </Button>
      )}
    </Box>
  );
};

export default EmptyState;
