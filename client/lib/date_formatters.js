import { DateTime } from "luxon";

export const difference_in_days = (start_date, end_date) => {
  if (!start_date || !end_date) return null;

  const start = DateTime.fromISO(start_date);
  const end = DateTime.fromISO(end_date);

  const diffInDays = end.diff(start, "days");
  return diffInDays?.values?.days;
};

export const formatDate = (date) => {
  return DateTime.fromISO(date).toLocaleString(DateTime.DATE_SHORT);
};

export const sortDatesAsc = (array) => {
  return array.sort((a, b) => {
    const dateA = DateTime.fromISO(a.createdAt);
    const dateB = DateTime.fromISO(b.createdAt);

    return dateA - dateB;
  });
};

export const sortDatesDesc = (array) => {
  return array.sort((a, b) => {
    const dateA = DateTime.fromISO(a.createdAt);
    const dateB = DateTime.fromISO(b.createdAt);

    return dateB - dateA;
  });
};
