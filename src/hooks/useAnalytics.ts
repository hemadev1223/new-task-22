import { useState, useEffect, useCallback } from 'react';
import { analyticsService } from '../api/analyticsService.ts';
import { useFilter } from '../context/FilterContext.tsx';
import { 
  AnalyticsKPIs, 
  AttendanceTrendPoint, 
  DepartmentStat, 
  LocationStat, 
  StatusDistribution 
} from '../types/index.ts';

export function useAnalytics() {
  const { filters } = useFilter();

  const [kpis, setKpis] = useState<AnalyticsKPIs | null>(null);
  const [trends, setTrends] = useState<AttendanceTrendPoint[]>([]);
  const [deptStats, setDeptStats] = useState<DepartmentStat[]>([]);
  const [statusDistribution, setStatusDistribution] = useState<StatusDistribution[]>([]);
  const [locationStats, setLocationStats] = useState<LocationStat[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [kpiRes, trendRes, deptRes, statusRes, locRes] = await Promise.all([
        analyticsService.getKPIs(filters),
        analyticsService.getAttendanceTrends(filters),
        analyticsService.getDepartmentStats(filters),
        analyticsService.getStatusDistribution(filters),
        analyticsService.getLocationStats(filters),
      ]);

      setKpis(kpiRes);
      setTrends(trendRes);
      setDeptStats(deptRes);
      setStatusDistribution(statusRes);
      setLocationStats(locRes);
    } catch (err: any) {
      console.error('Failed to load analytics data', err);
      setError(err.message || 'Error loading analytics data. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  return {
    kpis,
    trends,
    deptStats,
    statusDistribution,
    locationStats,
    loading,
    error,
    refetch: fetchAnalytics,
  };
}
