import { DateTime } from 'luxon';

export const formatUTCTimestamp = (date: number): Date => {
  if (!date) {
    return;
  }
  const formattedDate = DateTime.fromSeconds(date).toISO({
    includeOffset: false,
  });
  return DateTime.fromISO(formattedDate, { zone: 'utc' }).toLocal().toJSDate();
};
