import {
  differenceInDays,
  differenceInHours,
  format,
  isSameDay,
} from "date-fns";

export function getRemainingTime(deadline) {
  if (!deadline) return "";

  const now = new Date();
  const deadlineDate = new Date(deadline);

  if (deadlineDate < now) return "Overdue";

  const days = differenceInDays(deadlineDate, now);
  const hours = differenceInHours(deadlineDate, now) % 24;

  if (days === 0 && hours === 0) return "Due now";
  if (days === 0) return `${hours}h left`;

  return `${days}d ${hours}h left`;
}

export function formatDeadlineDisplay(deadline) {
  if (!deadline) return "";
  return format(new Date(deadline), "EEE, MMM d, h:mm a");
}

export function isCreatedToday(dateJson) {
  if (!dateJson) return false;
  // Handle Firestore Timestamp or string
  const date = dateJson.toDate ? dateJson.toDate() : new Date(dateJson);
  return isSameDay(date, new Date());
}
