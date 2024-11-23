import { LocalStorage } from '../libs/local-storage';
import { UserToken } from '../models/user-model';
import { HttpService } from './http-service';
import { CreateUserDto, LoginUserDto, UserDto } from '@shared/data-objects';

type ChangeUserHandler = (user: Partial<UserDto> | undefined) => void;

export class UserService {
  private http = new HttpService();
  private handler: ChangeUserHandler | null = null;

  private readonly storage = new LocalStorage<UserToken>('currentUser');

  setHandler(handler: ChangeUserHandler | null) {
    this.handler = handler;
  }

  get persistedUser(): Partial<UserDto> | undefined {
    return this.storage.get()?.user;
  }

  get authToken(): string | undefined {
    return this.storage.get()?.access_token;
  }

  getAllUsernames(abortSignal: AbortSignal) {
    return this.http.get<string[]>('users/names', {
      abortSignal,
    });
  }

  createUser(user: CreateUserDto, abortSignal: AbortSignal) {
    return this.http.post<Partial<UserDto>>('users/register', {
      body: user,
      abortSignal,
    });
  }

  async login(user: LoginUserDto, abortSignal: AbortSignal) {
    const { user: result, access_token } = await this.http.post<UserToken>('auth/login', {
      body: user,
      abortSignal,
    });

    this.storage.set({ user: result, access_token });
    this.handler?.(result);
  }

  logout() {
    this.storage.clear();
    this.handler?.(undefined);
  }
}

export const userService = new UserService();
