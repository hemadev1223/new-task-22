import React, { useState } from 'react';
import { Box, Container, useTheme, useMediaQuery } from '@mui/material';
import AppHeader from './AppHeader.tsx';
import AppSidebar from './AppSidebar.tsx';

interface MainLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children, activeTab, onTabChange }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Sidebar Navigation */}
      <AppSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeTab={activeTab}
        onTabChange={onTabChange}
      />

      {/* Main Body Area */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* App Header with Hemadev's profile and quick actions */}
        <AppHeader onToggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />

        {/* Dynamic Page Content */}
        <Container maxWidth="xl" sx={{ flexGrow: 1, py: { xs: 2.5, md: 3.5 }, px: { xs: 2, sm: 3 } }}>
          {children}
        </Container>
      </Box>
    </Box>
  );
};

export default MainLayout;
