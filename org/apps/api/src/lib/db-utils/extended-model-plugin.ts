import { UserDto } from '@shared/data-objects';
import { CallbackError, Schema } from 'mongoose';
import { isArray } from 'lodash';

export const extendedModelPlugin = (schema: Schema) => {
  schema.pre(
    ['findOneAndReplace', 'findOneAndUpdate'],
    function fn(this, next: (err?: CallbackError) => void) {
      this.setUpdate({
        ...this.getUpdate(),
        updatedBy: this.getOptions().user,
        updatedAt: new Date().toISOString(),
      });

      next();
    }
  );

  schema.static(
    'createExtended',
    function fn(doc: object | object[], user: UserDto['_id']) {
      const objectWithCreatedBy = (object: object) => ({
        ...object,
        createdBy: user,
      });

      return this.create(
        isArray(doc) ? doc.map(objectWithCreatedBy) : objectWithCreatedBy(doc)
      );
    }
  );
};
