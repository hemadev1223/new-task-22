import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Divider,
  useTheme,
  useMediaQuery,
  Chip,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  PeopleAlt as PeopleIcon,
  EventAvailable as AttendanceIcon,
  BarChart as AnalyticsIcon,
  Business as DepartmentsIcon,
  AdminPanelSettings as ArchitectureIcon,
} from '@mui/icons-material';

interface AppSidebarProps {
  open: boolean;
  onClose: () => void;
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Analytics Dashboard', icon: <DashboardIcon /> },
  { id: 'employees', label: 'Employee Directory', icon: <PeopleIcon /> },
  { id: 'attendance', label: 'Attendance Trends', icon: <AttendanceIcon /> },
  { id: 'departments', label: 'Department Analytics', icon: <DepartmentsIcon /> },
  { id: 'architecture', label: 'Architecture & SQLite', icon: <ArchitectureIcon /> },
];

export const AppSidebar: React.FC<AppSidebarProps> = ({
  open,
  onClose,
  activeTab,
  onTabChange,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const drawerWidth = 260;

  const content = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', pt: 2 }}>
      {/* Platform Title */}
      <Box sx={{ px: 3, pb: 2 }}>
        <Typography variant="overline" color="text.secondary" fontWeight={700} sx={{ letterSpacing: '0.08em' }}>
          WORKFORCE PLATFORM
        </Typography>
        <Typography variant="h6" fontWeight={800} sx={{ color: 'primary.main', fontSize: '1.05rem' }}>
          Task 2 Analytics
        </Typography>
      </Box>

      <Divider sx={{ mb: 1.5 }} />

      {/* Nav List */}
      <List sx={{ px: 1.5, flexGrow: 1 }}>
        {navItems.map((item) => {
          const isSelected = activeTab === item.id;
          return (
            <ListItem key={item.id} disablePadding sx={{ mb: 0.8 }}>
              <ListItemButton
                selected={isSelected}
                onClick={() => {
                  onTabChange(item.id);
                  if (isMobile) onClose();
                }}
                sx={{
                  borderRadius: 2,
                  py: 1.1,
                  px: 2,
                  '&.Mui-selected': {
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    '&:hover': {
                      bgcolor: 'primary.dark',
                    },
                    '& .MuiListItemIcon-root': {
                      color: 'primary.contrastText',
                    },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 40,
                    color: isSelected ? 'inherit' : 'text.secondary',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: '0.875rem',
                    fontWeight: isSelected ? 700 : 500,
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Divider />

      {/* Database & Architecture Info Footer */}
      <Box sx={{ p: 2, m: 2, borderRadius: 2, bgcolor: 'action.hover' }}>
        <Typography variant="caption" color="text.secondary" fontWeight={700} sx={{ display: 'block', mb: 0.5 }}>
          STORAGE ENGINE
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2" fontWeight={600}>
            SQLite 3 (WAL)
          </Typography>
          <Chip label="v2.0" size="small" color="primary" sx={{ height: 20, fontSize: '0.65rem' }} />
        </Box>
        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.725rem', display: 'block' }}>
          Repository Pattern • SOLID • Node.js REST API
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { md: open ? drawerWidth : 0 }, flexShrink: { md: 0 }, transition: 'width 0.2s ease' }}
    >
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={isMobile && open}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {content}
      </Drawer>

      {/* Desktop Drawer */}
      <Drawer
        variant="persistent"
        open={open}
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            borderRight: 1,
            borderColor: 'divider',
            top: 64, // below header
            height: 'calc(100% - 64px)',
          },
        }}
      >
        {content}
      </Drawer>
    </Box>
  );
};

export default AppSidebar;
