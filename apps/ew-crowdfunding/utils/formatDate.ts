import { DateTime } from 'luxon';

export const formatDate = (date: Date): string => {
  if (!date) {
    return;
  }
  return DateTime.fromJSDate(new Date(date)).toFormat('dd LLL yy HH:MM');
};
