import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Avatar,
  Typography,
  Chip,
  Divider,
  Grid,
} from '@mui/material';
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  Business as BusinessIcon,
  VerifiedUser as AdminIcon,
  LocationOn as LocationIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';

interface UserProfileDialogProps {
  open: boolean;
  onClose: () => void;
}

export const UserProfileDialog: React.FC<UserProfileDialogProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
      <DialogTitle sx={{ pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6" fontWeight={700}>
            User Profile
          </Typography>
          <Chip
            size="small"
            icon={<AdminIcon sx={{ fontSize: '14px !important' }} />}
            label="Super Admin"
            color="primary"
          />
        </Box>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ pt: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
          <Avatar
            sx={{
              width: 80,
              height: 80,
              bgcolor: 'primary.main',
              fontSize: '2rem',
              fontWeight: 700,
              mb: 1.5,
              boxShadow: '0 4px 14px rgba(59, 130, 246, 0.35)',
            }}
          >
            H
          </Avatar>
          <Typography variant="h6" fontWeight={700}>
            Hemadev
          </Typography>
          <Typography variant="body2" color="primary" fontWeight={600}>
            Lead Architect & Engineering Director
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Stackly Workforce Analytics Platform (WFA)
          </Typography>
        </Box>

        <Box sx={{ bgcolor: 'action.hover', p: 2, borderRadius: 2, mb: 2 }}>
          <Grid container spacing={1.5}>
            <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <EmailIcon fontSize="small" color="action" />
              <Typography variant="body2">hemadev@thestackly.com</Typography>
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <BusinessIcon fontSize="small" color="action" />
              <Typography variant="body2">Engineering & Tech Infrastructure</Typography>
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <LocationIcon fontSize="small" color="action" />
              <Typography variant="body2">Stackly HQ • San Francisco / Remote</Typography>
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <ScheduleIcon fontSize="small" color="action" />
              <Typography variant="body2">Access Level: Full Read/Write & Schema Control</Typography>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2.5 }}>
        <Button onClick={onClose} variant="contained" fullWidth>
          Close Profile
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserProfileDialog;
