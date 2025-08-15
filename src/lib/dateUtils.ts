/**
 * Utility functions for consistent date formatting across server and client
 */

export function formatDateConsistent(dateString: string): string {
  const date = new Date(dateString);

  // Use a consistent format that doesn't depend on locale
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${month}/${day}/${year}`;
}

export function formatDateForDisplay(dateString: string): string {
  const date = new Date(dateString);

  // Use month names for better readability
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
}

export function isValidDate(dateString: string): boolean {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}
