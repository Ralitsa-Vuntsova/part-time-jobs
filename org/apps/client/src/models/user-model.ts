import { UserDto } from '@shared/data-objects';

export interface UserToken {
  user: Partial<UserDto>;
  access_token: string;
}
