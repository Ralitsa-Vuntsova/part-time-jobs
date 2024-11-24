import { HttpService } from './http-service';
import { CreateUserDto } from '@shared/data-objects';

export class UserService {
  private http = new HttpService();

  getAllUsernames(abortSignal: AbortSignal) {
    return this.http.get<string[]>('users/names', {
      abortSignal,
    });
  }

  createUser(user: CreateUserDto, abortSignal: AbortSignal) {
    return this.http.post('users/register', {
      body: user,
      abortSignal,
    });
  }
}

export const userService = new UserService();
