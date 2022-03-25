import { DateTime } from 'luxon';

export const formatUTCTimestamp = (date: number): DateTime => {
  if (!date) {
    return;
  }
  const formattedDate = DateTime.fromSeconds(date, {
    zone: 'utc',
  })
    .toFormat('yyyy-MM-dd HH:mm')
    .replace(' ', 'T');
  return DateTime.fromISO(formattedDate, { zone: 'utc' }).toLocal();
};
