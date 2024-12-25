import { DateTimeDto } from '@shared/data-objects';
import dayjs from 'dayjs';

export function formatDateTime(dateTime: DateTimeDto[]) {
  return dateTime.map((dT) => ({
    date: dayjs(dT.date),
    time: dayjs(dT.time),
  }));
}
