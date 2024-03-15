import { DateTime } from "luxon";

export const difference_in_seconds = (time) => {
  const diffInSeconds = DateTime.now().diff(time, "seconds");
  return diffInSeconds?.values?.seconds;
};
