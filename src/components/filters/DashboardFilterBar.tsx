import React from 'react';
import {
  Card,
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Chip,
  InputAdornment,
  ButtonGroup,
} from '@mui/material';
import {
  Search as SearchIcon,
  RestartAlt as ResetIcon,
  FilterList as FilterIcon,
  DateRange as DateRangeIcon,
} from '@mui/icons-material';
import { useFilter } from '../../context/FilterContext.tsx';

export const DashboardFilterBar: React.FC = () => {
  const {
    filters,
    setDepartment,
    setLocation,
    setStatus,
    setDatePreset,
    setCustomDateRange,
    setSearch,
    resetFilters,
    activeFilterCount,
    availableDepartments,
    availableLocations,
  } = useFilter();

  return (
    <Card sx={{ p: 2.5, mb: 3 }}>
      {/* Top row: Search & Quick Presets & Reset */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          mb: 2,
        }}
      >
        {/* Search */}
        <Box sx={{ flexGrow: 1, minWidth: { xs: '100%', sm: 260 } }}>
          <TextField
            size="small"
            fullWidth
            placeholder="Search by employee name, role, email..."
            value={filters.search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Date Presets Button Group */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
          <ButtonGroup size="small" variant="outlined" aria-label="date presets">
            <Button
              variant={filters.datePreset === 'today' ? 'contained' : 'outlined'}
              onClick={() => setDatePreset('today')}
            >
              Today
            </Button>
            <Button
              variant={filters.datePreset === '7days' ? 'contained' : 'outlined'}
              onClick={() => setDatePreset('7days')}
            >
              7 Days
            </Button>
            <Button
              variant={filters.datePreset === '14days' ? 'contained' : 'outlined'}
              onClick={() => setDatePreset('14days')}
            >
              14 Days
            </Button>
            <Button
              variant={filters.datePreset === '30days' ? 'contained' : 'outlined'}
              onClick={() => setDatePreset('30days')}
            >
              30 Days
            </Button>
            <Button
              variant={filters.datePreset === 'custom' ? 'contained' : 'outlined'}
              onClick={() => setDatePreset('custom')}
              startIcon={<DateRangeIcon fontSize="small" />}
            >
              Custom
            </Button>
          </ButtonGroup>

          {/* Reset Filters button */}
          {activeFilterCount > 0 && (
            <Button
              size="small"
              variant="text"
              color="error"
              startIcon={<ResetIcon />}
              onClick={resetFilters}
              sx={{ fontWeight: 600 }}
            >
              Reset ({activeFilterCount})
            </Button>
          )}
        </Box>
      </Box>

      {/* Bottom row: Filter Dropdowns */}
      <Grid container spacing={2} alignItems="center">
        {/* Department Filter */}
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth size="small">
            <InputLabel id="department-select-label">Department</InputLabel>
            <Select
              labelId="department-select-label"
              id="department-select"
              value={filters.department}
              label="Department"
              onChange={(e) => setDepartment(e.target.value)}
            >
              <MenuItem value="All">All Departments</MenuItem>
              {availableDepartments.map((dept) => (
                <MenuItem key={dept.id} value={dept.name}>
                  {dept.name} ({dept.code})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Location Filter */}
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth size="small">
            <InputLabel id="location-select-label">Location</InputLabel>
            <Select
              labelId="location-select-label"
              id="location-select"
              value={filters.location}
              label="Location"
              onChange={(e) => setLocation(e.target.value)}
            >
              <MenuItem value="All">All Locations</MenuItem>
              {availableLocations.map((loc) => (
                <MenuItem key={loc} value={loc}>
                  {loc}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Employee Status Filter */}
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth size="small">
            <InputLabel id="status-select-label">Employee Status</InputLabel>
            <Select
              labelId="status-select-label"
              id="status-select"
              value={filters.status}
              label="Employee Status"
              onChange={(e) => setStatus(e.target.value)}
            >
              <MenuItem value="All">All Statuses</MenuItem>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="On Leave">On Leave</MenuItem>
              <MenuItem value="Probation">Probation</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Custom Date Pickers (if Custom selected) or Range Indicator */}
        <Grid item xs={12} sm={6} md={3}>
          {filters.datePreset === 'custom' ? (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                size="small"
                type="date"
                label="Start"
                value={filters.startDate}
                onChange={(e) => setCustomDateRange(e.target.value, filters.endDate)}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
              <TextField
                size="small"
                type="date"
                label="End"
                value={filters.endDate}
                onChange={(e) => setCustomDateRange(filters.startDate, e.target.value)}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Box>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chip
                icon={<FilterIcon sx={{ fontSize: '14px !important' }} />}
                label={`Range: ${filters.startDate} to ${filters.endDate}`}
                variant="outlined"
                size="small"
                sx={{ width: '100%', py: 1.8, fontSize: '0.75rem', justifyContent: 'flex-start' }}
              />
            </Box>
          )}
        </Grid>
      </Grid>
    </Card>
  );
};

export default DashboardFilterBar;
