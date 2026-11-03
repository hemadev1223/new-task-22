import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { FilterState, Department } from '../types/index.ts';
import { departmentService } from '../api/departmentService.ts';
import { employeeService } from '../api/employeeService.ts';

interface FilterContextType {
  filters: FilterState;
  setDepartment: (dept: string) => void;
  setLocation: (loc: string) => void;
  setStatus: (status: string) => void;
  setDatePreset: (preset: FilterState['datePreset']) => void;
  setCustomDateRange: (start: string, end: string) => void;
  setSearch: (search: string) => void;
  resetFilters: () => void;
  activeFilterCount: number;
  availableDepartments: Department[];
  availableLocations: string[];
}

const getInitialDates = (preset: FilterState['datePreset'] = '14days') => {
  const today = new Date();
  const endDate = today.toISOString().split('T')[0];
  const startDateObj = new Date(today);

  switch (preset) {
    case 'today':
      return { startDate: endDate, endDate };
    case '7days':
      startDateObj.setDate(today.getDate() - 6);
      return { startDate: startDateObj.toISOString().split('T')[0], endDate };
    case '30days':
      startDateObj.setDate(today.getDate() - 29);
      return { startDate: startDateObj.toISOString().split('T')[0], endDate };
    case '14days':
    default:
      startDateObj.setDate(today.getDate() - 13);
      return { startDate: startDateObj.toISOString().split('T')[0], endDate };
  }
};

const defaultDates = getInitialDates('14days');

const initialFilters: FilterState = {
  department: 'All',
  location: 'All',
  status: 'All',
  startDate: defaultDates.startDate,
  endDate: defaultDates.endDate,
  datePreset: '14days',
  search: '',
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [availableDepartments, setAvailableDepartments] = useState<Department[]>([]);
  const [availableLocations, setAvailableLocations] = useState<string[]>([]);

  useEffect(() => {
    departmentService.getDepartments()
      .then(setAvailableDepartments)
      .catch((err) => console.error('Failed to load departments', err));

    employeeService.getLocations()
      .then(setAvailableLocations)
      .catch((err) => console.error('Failed to load locations', err));
  }, []);

  const setDepartment = useCallback((dept: string) => {
    setFilters((prev) => ({ ...prev, department: dept }));
  }, []);

  const setLocation = useCallback((loc: string) => {
    setFilters((prev) => ({ ...prev, location: loc }));
  }, []);

  const setStatus = useCallback((status: string) => {
    setFilters((prev) => ({ ...prev, status }));
  }, []);

  const setDatePreset = useCallback((preset: FilterState['datePreset']) => {
    if (preset === 'custom') {
      setFilters((prev) => ({ ...prev, datePreset: 'custom' }));
    } else {
      const dates = getInitialDates(preset);
      setFilters((prev) => ({
        ...prev,
        datePreset: preset,
        startDate: dates.startDate,
        endDate: dates.endDate,
      }));
    }
  }, []);

  const setCustomDateRange = useCallback((startDate: string, endDate: string) => {
    setFilters((prev) => ({
      ...prev,
      datePreset: 'custom',
      startDate,
      endDate,
    }));
  }, []);

  const setSearch = useCallback((search: string) => {
    setFilters((prev) => ({ ...prev, search }));
  }, []);

  const resetFilters = useCallback(() => {
    const dates = getInitialDates('14days');
    setFilters({
      ...initialFilters,
      startDate: dates.startDate,
      endDate: dates.endDate,
    });
  }, []);

  // Calculate number of non-default filters active
  const activeFilterCount =
    (filters.department !== 'All' ? 1 : 0) +
    (filters.location !== 'All' ? 1 : 0) +
    (filters.status !== 'All' ? 1 : 0) +
    (filters.datePreset !== '14days' ? 1 : 0) +
    (filters.search.trim() ? 1 : 0);

  return (
    <FilterContext.Provider
      value={{
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
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = (): FilterContextType => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
};
