import { useState, useEffect, useCallback } from 'react';
import { employeeService } from '../api/employeeService.ts';
import { Employee, PaginationState } from '../types/index.ts';
import { useFilter } from '../context/FilterContext.tsx';
import { useDebounce } from './useDebounce.ts';

export function useEmployees() {
  const { filters } = useFilter();
  const debouncedSearch = useDebounce(filters.search, 300);

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>('name');
  const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('ASC');

  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });

  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await employeeService.getEmployees({
        department: filters.department,
        location: filters.location,
        status: filters.status,
        startDate: filters.startDate,
        endDate: filters.endDate,
        search: debouncedSearch,
        page,
        limit,
        sortBy,
        sortOrder,
      });

      setEmployees(res.data);
      setPagination(res.pagination);
    } catch (err: any) {
      console.error('Failed to load employees', err);
      setError(err.message || 'Error loading employee records.');
    } finally {
      setLoading(false);
    }
  }, [filters.department, filters.location, filters.status, filters.startDate, filters.endDate, debouncedSearch, page, limit, sortBy, sortOrder]);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  // Reset page to 1 when filters or search change
  useEffect(() => {
    setPage(1);
  }, [filters.department, filters.location, filters.status, debouncedSearch]);

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder((prev) => (prev === 'ASC' ? 'DESC' : 'ASC'));
    } else {
      setSortBy(field);
      setSortOrder('ASC');
    }
  };

  return {
    employees,
    loading,
    error,
    page,
    limit,
    sortBy,
    sortOrder,
    pagination,
    setPage,
    setLimit,
    handleSort,
    refetch: fetchEmployees,
  };
}
