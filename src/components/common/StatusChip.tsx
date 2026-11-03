import React from 'react';
import { Chip, ChipProps } from '@mui/material';
import { 
  CheckCircle as PresentIcon, 
  Cancel as AbsentIcon, 
  EventBusy as LeaveIcon, 
  HomeWork as RemoteIcon, 
  HourglassEmpty as ProbationIcon,
  Block as InactiveIcon
} from '@mui/icons-material';

interface StatusChipProps {
  status: string;
  type?: 'attendance' | 'employee';
  size?: ChipProps['size'];
}

export const StatusChip: React.FC<StatusChipProps> = ({ status, type = 'attendance', size = 'small' }) => {
  const normalized = status?.toLowerCase() || '';

  if (type === 'attendance') {
    switch (normalized) {
      case 'present':
        return (
          <Chip
            size={size}
            icon={<PresentIcon sx={{ fontSize: '15px !important' }} />}
            label="Present"
            color="success"
            variant="filled"
            sx={{ fontWeight: 600, fontSize: '0.75rem' }}
          />
        );
      case 'remote':
        return (
          <Chip
            size={size}
            icon={<RemoteIcon sx={{ fontSize: '15px !important' }} />}
            label="Remote"
            color="info"
            variant="filled"
            sx={{ fontWeight: 600, fontSize: '0.75rem' }}
          />
        );
      case 'on leave':
        return (
          <Chip
            size={size}
            icon={<LeaveIcon sx={{ fontSize: '15px !important' }} />}
            label="On Leave"
            color="warning"
            variant="filled"
            sx={{ fontWeight: 600, fontSize: '0.75rem' }}
          />
        );
      case 'absent':
      default:
        return (
          <Chip
            size={size}
            icon={<AbsentIcon sx={{ fontSize: '15px !important' }} />}
            label="Absent"
            color="error"
            variant="filled"
            sx={{ fontWeight: 600, fontSize: '0.75rem' }}
          />
        );
    }
  }

  // Employee employment status
  switch (normalized) {
    case 'active':
      return (
        <Chip
          size={size}
          label="Active"
          color="success"
          variant="outlined"
          sx={{ fontWeight: 600, fontSize: '0.75rem', borderColor: 'success.main' }}
        />
      );
    case 'probation':
      return (
        <Chip
          size={size}
          icon={<ProbationIcon sx={{ fontSize: '15px !important' }} />}
          label="Probation"
          color="info"
          variant="outlined"
          sx={{ fontWeight: 600, fontSize: '0.75rem' }}
        />
      );
    case 'on leave':
      return (
        <Chip
          size={size}
          icon={<LeaveIcon sx={{ fontSize: '15px !important' }} />}
          label="On Leave"
          color="warning"
          variant="outlined"
          sx={{ fontWeight: 600, fontSize: '0.75rem' }}
        />
      );
    case 'inactive':
    default:
      return (
        <Chip
          size={size}
          icon={<InactiveIcon sx={{ fontSize: '15px !important' }} />}
          label="Inactive"
          color="default"
          variant="outlined"
          sx={{ fontWeight: 600, fontSize: '0.75rem' }}
        />
      );
  }
};

export default StatusChip;
