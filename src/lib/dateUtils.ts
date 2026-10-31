/**
 * Utility functions for consistent date formatting across server and client
 */

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
