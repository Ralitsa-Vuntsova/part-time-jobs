import { Query } from 'mongoose';

interface Constructable<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new (...args: any): T;
}

// TODO: Fix
export async function dbToInstance<T extends object, D, G>(
  constructor: Constructable<T>,
  document: Query<D, G> | Promise<D>
) {
  const doc = await document;
  const ret = new constructor();

  return Object.assign(ret, doc);
}
