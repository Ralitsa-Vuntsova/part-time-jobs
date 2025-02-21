import { HttpService } from './http-service';
import { CreateUserDto, EditUserDto, UserProfile } from '@shared/data-objects';

export class UserService {
  private http = new HttpService();

  getById(id: string, abortSignal: AbortSignal) {
    return this.http.get<UserProfile>(`users/${id}`, {
      abortSignal,
    });
  }

  getAllUsernames(abortSignal: AbortSignal) {
    return this.http.get<string[]>('users/names', {
      abortSignal,
    });
  }

  listByIds(ids: string[], abortSignal: AbortSignal) {
    return this.http.get<UserProfile[]>('users', {
      query: { ids: ids.join(',') },
      abortSignal,
    });
  }

  createUser(user: CreateUserDto, abortSignal: AbortSignal) {
    return this.http.post('users/register', {
      body: user,
      abortSignal,
    });
  }

  editUser(id: string, user: EditUserDto, abortSignal: AbortSignal) {
    return this.http.patch(`users/${id}`, {
      body: user,
      abortSignal,
    });
  }

  deleteUser(id: string, abortSignal: AbortSignal) {
    return this.http.delete(`users/${id}`, {
      abortSignal,
    });
  }
}

export const userService = new UserService();
