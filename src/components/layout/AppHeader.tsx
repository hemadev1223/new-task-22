import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Avatar,
  Tooltip,
  Badge,
  Chip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Brightness4 as DarkIcon,
  Brightness7 as LightIcon,
  NotificationsNone as NotificationsIcon,
  Storage as StorageIcon,
  AccountCircle as AccountCircleIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { useAppTheme } from '../../context/ThemeContext.tsx';
import UserProfileDialog from './UserProfileDialog.tsx';

interface AppHeaderProps {
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ onToggleSidebar }) => {
  const { mode, toggleTheme } = useAppTheme();
  const [profileOpen, setProfileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const openProfileDialog = () => {
    handleMenuClose();
    setProfileOpen(true);
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: 'background.paper',
          color: 'text.primary',
          borderBottom: 1,
          borderColor: 'divider',
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 3 } }}>
          {/* Left: Hamburger & Brand */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="toggle navigation"
              onClick={onToggleSidebar}
              sx={{ mr: 0.5 }}
            >
              <MenuIcon />
            </IconButton>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: 2,
                  bgcolor: 'primary.main',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'primary.contrastText',
                  fontWeight: 800,
                  fontSize: '1.1rem',
                  boxShadow: '0 2px 8px rgba(59, 130, 246, 0.4)',
                }}
              >
                S
              </Box>
              <Typography variant="h6" fontWeight={800} sx={{ letterSpacing: '-0.02em', display: { xs: 'none', sm: 'block' } }}>
                Stackly<span style={{ color: '#3b82f6', fontWeight: 600 }}>.wfa</span>
              </Typography>
            </Box>

            <Chip
              icon={<StorageIcon sx={{ fontSize: '14px !important' }} />}
              label="SQLite Connected"
              size="small"
              color="success"
              variant="outlined"
              sx={{ ml: 2, display: { xs: 'none', md: 'inline-flex' }, height: 24, fontSize: '0.7rem' }}
            />
          </Box>

          {/* Right: Actions & User Profile */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            {/* Theme Toggle */}
            <Tooltip title={`Switch to ${mode === 'light' ? 'Dark' : 'Light'} Mode`}>
              <IconButton onClick={toggleTheme} color="inherit" size="small">
                {mode === 'dark' ? <LightIcon fontSize="small" /> : <DarkIcon fontSize="small" />}
              </IconButton>
            </Tooltip>

            {/* Notifications */}
            <Tooltip title="Notifications">
              <IconButton color="inherit" size="small">
                <Badge badgeContent={2} color="error">
                  <NotificationsIcon fontSize="small" />
                </Badge>
              </IconButton>
            </Tooltip>

            <Divider orientation="vertical" flexItem sx={{ my: 1.5, mx: 0.5 }} />

            {/* User Profile Pill */}
            <Box
              onClick={handleMenuOpen}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.2,
                cursor: 'pointer',
                p: '4px 8px 4px 6px',
                borderRadius: 99,
                bgcolor: 'action.hover',
                '&:hover': {
                  bgcolor: 'action.selected',
                },
                transition: 'background-color 0.2s',
              }}
            >
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  bgcolor: 'primary.main',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                }}
              >
                H
              </Avatar>
              <Box sx={{ display: { xs: 'none', sm: 'block' }, textAlign: 'left', pr: 0.5 }}>
                <Typography variant="subtitle2" fontWeight={700} sx={{ lineHeight: 1.2, fontSize: '0.825rem' }}>
                  Hemadev
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', lineHeight: 1, fontSize: '0.7rem' }}>
                  Lead Architect
                </Typography>
              </Box>
            </Box>

            {/* Profile Dropdown Menu */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              PaperProps={{
                elevation: 4,
                sx: { minWidth: 200, mt: 1, borderRadius: 2 },
              }}
            >
              <Box sx={{ px: 2, py: 1.5 }}>
                <Typography variant="subtitle2" fontWeight={700}>
                  Hemadev
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  hemadev@thestackly.com
                </Typography>
              </Box>
              <Divider />
              <MenuItem onClick={openProfileDialog}>
                <ListItemIcon>
                  <AccountCircleIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="View Profile" />
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <ListItemIcon>
                  <SettingsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Preferences" />
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleMenuClose}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" color="error" />
                </ListItemIcon>
                <ListItemText primary="Sign Out" sx={{ color: 'error.main' }} />
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* User Profile Modal */}
      <UserProfileDialog open={profileOpen} onClose={() => setProfileOpen(false)} />
    </>
  );
};

export default AppHeader;
