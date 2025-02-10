import { isPlainObject } from 'lodash';
import { Document } from 'mongoose';

interface Constructable<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new (...args: any): T;
}

export async function dbToInstance<
  T extends object,
  D extends (Document & T) | null
>(constructor: Constructable<T>, document: Promise<D>) {
  const doc = await document;
  const ret = new constructor();

  const obj =
    isPlainObject(doc) || doc === null
      ? doc
      : doc.toObject({ flattenObjectIds: true, versionKey: false });

  Object.assign(ret, obj);

  return obj;
}
