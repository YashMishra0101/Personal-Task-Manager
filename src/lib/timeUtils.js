import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  format,
  isSameDay,
} from "date-fns";

export function getRemainingTime(deadline, includeLastDay = true) {
  if (!deadline) return "";

  const now = new Date();
  const deadlineDate = new Date(deadline);

  if (deadlineDate < now) return "Overdue";

  // Calculate total difference in minutes for accuracy
  const totalMinutes = differenceInMinutes(deadlineDate, now);

  // Calculate days based on includeLastDay preference
  let days = Math.floor(totalMinutes / (24 * 60));
  if (includeLastDay) {
    days = days + 1;
  }

  const hours = Math.floor((totalMinutes % (24 * 60)) / 60);
  const minutes = totalMinutes % 60;

  // Special case: Last Day indicator (only when includeLastDay is true)
  if (days === 1 && includeLastDay) {
    return "LAST_DAY"; // Special marker for styling
  }

  // Display logic
  if (days === 0 && hours === 0 && minutes === 0) return "Due now";
  if (days === 0 && hours === 0) return `${minutes}m left`;
  if (days === 0) return `${hours}h ${minutes}m left`;

  return `${days}d ${hours}h left`;
}

export function formatDeadlineDisplay(deadline) {
  if (!deadline) return "";
  return format(new Date(deadline), "EEE, MMM d");
}

export function isCreatedToday(dateJson) {
  if (!dateJson) return false;
  // Handle Firestore Timestamp or string
  const date = dateJson.toDate ? dateJson.toDate() : new Date(dateJson);
  return isSameDay(date, new Date());
}
