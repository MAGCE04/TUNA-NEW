/**
 * Formats a number for display
 * @param value Number to format
 * @param decimals Number of decimal places
 * @returns Formatted number string
 */
export const formatNumber = (value: number, decimals = 2): string => {
  if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(decimals)}B`;
  } else if (value >= 1_000_000) {
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
  if (value >= 1_000_000_000) {
    return `${currency}${(value / 1_000_000_000).toFixed(2)}B`;
  } else if (value >= 1_000_000) {
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

/**
 * Truncates a wallet address for display
 * @param address Full wallet address
 * @param startChars Number of characters to show at start
 * @param endChars Number of characters to show at end
 * @returns Truncated address string
 */
export const truncateAddress = (address: string, startChars = 4, endChars = 4): string => {
  if (address.length <= startChars + endChars) {
    return address;
  }
  return `${address.substring(0, startChars)}...${address.substring(address.length - endChars)}`;
};

/**
 * Formats a timestamp to a readable date string
 * @param timestamp Unix timestamp in milliseconds
 * @returns Formatted date string
 */
export const formatDate = (timestamp: number): string => {
  return new Date(timestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Formats a timestamp to a readable date and time string
 * @param timestamp Unix timestamp in milliseconds
 * @returns Formatted date and time string
 */
export const formatDateTime = (timestamp: number): string => {
  return new Date(timestamp).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};