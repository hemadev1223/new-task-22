import React from 'react';
import { Alert, AlertTitle, Button, Box } from '@mui/material';
import { Refresh as RefreshIcon } from '@mui/icons-material';

interface ErrorAlertProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({
  title = 'Data Fetch Error',
  message,
  onRetry,
}) => {
  return (
    <Alert
      severity="error"
      sx={{
        borderRadius: 2,
        my: 2,
        alignItems: 'center',
      }}
      action={
        onRetry && (
          <Button
            color="inherit"
            size="small"
            startIcon={<RefreshIcon />}
            onClick={onRetry}
            sx={{ fontWeight: 600 }}
          >
            Retry
          </Button>
        )
      }
    >
      <AlertTitle sx={{ fontWeight: 700 }}>{title}</AlertTitle>
      <Box sx={{ fontSize: '0.875rem' }}>{message}</Box>
    </Alert>
  );
};

export default ErrorAlert;
