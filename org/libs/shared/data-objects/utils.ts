export const transformDate = (value: Date) =>
  value instanceof Date ? value.toISOString().slice(0, 10) : undefined;
