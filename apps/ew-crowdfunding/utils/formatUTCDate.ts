import { DateTime } from 'luxon';

export const formatUTCDate = (date: string): Date => {
  if (!date) {
    return;
  }
  return new Date(DateTime.fromISO(date, { zone: 'utc' }).toLocal().toFormat('yyyy-MM-dd HH:mm'));
};
