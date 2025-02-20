import dayjs from 'dayjs';

export enum TimeType {
  Days = 'days',
  Hours = 'hours',
  Minutes = 'minutes',
}

export interface Time {
  value: number;
  type: TimeType;
}

export function parseDate(date: string) {
  return dayjs(date);
}

export function getTimeFromNow(date: string) {
  const date1 = parseDate(date);
  const date2 = dayjs();

  const minutes = date2.diff(date1, 'minutes');
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 60);

  if (days > 0) {
    return {
      value: days,
      type: TimeType.Days,
    };
  }

  if (hours > 0) {
    return {
      value: hours,
      type: TimeType.Hours,
    };
  }

  return {
    value: minutes,
    type: TimeType.Minutes,
  };
}
