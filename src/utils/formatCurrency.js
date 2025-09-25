/**
 * Formats a number as USD currency
 * @param {number|string} value - The value to format
 * @returns {string} - Formatted currency string (e.g., "$1,234.56")
 */
export function formatCurrency(value) {
  // Handle edge cases
  if (value === null || value === undefined || value === '') {
    return '$0.00';
  }

  // Convert to number if string
  const numValue = typeof value === 'string' ? parseFloat(value) : value;

  // Handle invalid numbers
  if (isNaN(numValue)) {
    return '$0.00';
  }

  // Format with USD currency
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numValue);
}