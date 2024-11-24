import { ResultUserDto } from '@shared/data-objects';

export interface UserToken {
  user: ResultUserDto;
  access_token: string;
}
