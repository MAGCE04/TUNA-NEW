/**
 * Formats a number for display
 * @param value Number to format
 * @param decimals Number of decimal places
 * @returns Formatted number string
 */
export const formatNumber = (value: number, decimals = 2): string => {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(decimals)}M`;
  } else if (value >= 1_000) {
    return `${(value / 1_000).toFixed(decimals)}K`;
  }
  return value.toFixed(decimals);
};

/**
 * Formats a currency value for display
 * @param value Number to format as currency
 * @param currency Currency symbol
 * @returns Formatted currency string
 */
export const formatCurrency = (value: number, currency = '$'): string => {
  if (value >= 1_000_000) {
    return `${currency}${(value / 1_000_000).toFixed(2)}M`;
  } else if (value >= 1_000) {
    return `${currency}${(value / 1_000).toFixed(2)}K`;
  }
  return `${currency}${value.toFixed(2)}`;
};

/**
 * Formats a percentage value for display
 * @param value Number to format as percentage
 * @returns Formatted percentage string
 */
export const formatPercentage = (value: number): string => {
  return `${value.toFixed(2)}%`;
};
