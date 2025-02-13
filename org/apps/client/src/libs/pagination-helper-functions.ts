export function getDisplayedData<T>(data: T[], page: number, pageSize: number) {
  return data.slice(page * pageSize, (page + 1) * pageSize);
}

export function getPageElementsCount<T>(data: T[], pageSize: number) {
  return Math.ceil(data.length / pageSize);
}
