import { TimeRange } from '../types';
import { subDays, startOfDay } from 'date-fns';

/**
 * Filters data based on the selected time range
 * @param data Array of data with timestamp property
 * @param timeRange Selected time range
 * @returns Filtered data
 */
export const filterDataByTimeRange = <T extends { timestamp: number }>(
  data: T[],
  timeRange: TimeRange
): T[] => {
  if (timeRange === 'all') return data;
  
  const now = new Date();
  let cutoffTime: number;
  
  switch (timeRange) {
    case '7d':
      cutoffTime = subDays(startOfDay(now), 7).getTime();
      break;
    case '30d':
      cutoffTime = subDays(startOfDay(now), 30).getTime();
      break;
    case '90d':
      cutoffTime = subDays(startOfDay(now), 90).getTime();
      break;
    case 'day':
      cutoffTime = startOfDay(now).getTime();
      break;
    case 'week':
      cutoffTime = subDays(startOfDay(now), 7).getTime();
      break;
    case 'month':
      cutoffTime = subDays(startOfDay(now), 30).getTime();
      break;
    case 'year':
      cutoffTime = subDays(startOfDay(now), 365).getTime();
      break;
    default:
      cutoffTime = subDays(startOfDay(now), 30).getTime();
  }
  
  return data.filter(item => item.timestamp >= cutoffTime);
};

/**
 * Calculates growth percentage compared to previous period
 * @param currentValue Current period value
 * @param previousValue Previous period value
 * @returns Growth percentage
 */
export const calculateGrowth = (currentValue: number, previousValue: number): number => {
  if (previousValue === 0) return 0;
  return ((currentValue - previousValue) / previousValue) * 100;
};

/**
 * Get the start date based on the selected time range
 */
export function getStartDateFromTimeRange(timeRange: TimeRange): Date {
  const now = new Date();
  
  switch (timeRange) {
    case '7d':
      return subDays(startOfDay(now), 7);
    case '30d':
      return subDays(startOfDay(now), 30);
    case '90d':
      return subDays(startOfDay(now), 90);
    case 'all':
      return subDays(startOfDay(now), 365); // Default to 1 year for "all"
    default:
      return subDays(startOfDay(now), 30); // Default to 30 days
  }
}

/**
 * Format a date range for display
 */
export function formatDateRange(timeRange: TimeRange): string {
  const now = new Date();
  
  switch (timeRange) {
    case '7d':
      return 'Last 7 days';
    case '30d':
      return 'Last 30 days';
    case '90d':
      return 'Last 90 days';
    case 'all':
      return 'All time';
    default:
      return 'Last 30 days';
  }
}