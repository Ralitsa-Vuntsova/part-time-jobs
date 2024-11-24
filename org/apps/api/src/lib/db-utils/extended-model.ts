import { Model } from 'mongoose';
import { UserDto } from '@shared/data-objects';

export interface ExtendedModel<T> extends Model<T> {
  createExtended(
    doc: Partial<T> | Partial<T>[],
    user: UserDto['_id']
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<any>;
}
