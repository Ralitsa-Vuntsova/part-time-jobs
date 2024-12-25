import dayjs from 'dayjs';

export enum DateFormats {
  Preview = 'D MMM YYYY',
  ISODate = 'YYYY-MM-DD',
  DateTime = 'D MMM YYYY HH:mm',
  Time = 'h:mm A',
}

export function toDateOrNull(value: string | undefined) {
  const date = dayjs(value);

  return value && date.isValid() ? date : null;
}

export function parseDate(
  value: string | undefined,
  format: string = DateFormats.Preview
) {
  const date = toDateOrNull(value);

  return date ? date.format(format) : undefined;
}
