import { HttpService } from './http-service';
import { CreateUserDto, UserDto } from '@shared/data-objects';

export class UserService {
  private http = new HttpService();

  createUser(user: CreateUserDto, abortSignal: AbortSignal) {
    return this.http.post<Partial<UserDto>>('users/register', {
      body: user,
      abortSignal,
    });
  }
}

export const userService = new UserService();
