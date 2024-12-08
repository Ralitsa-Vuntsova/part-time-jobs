import { LocalStorage } from '../libs/local-storage';
import { UserToken } from '../models/user-model';
import { HttpService } from './http-service';
import { LoginUserDto, ResultUserDto } from '@shared/data-objects';

type ChangeUserHandler = (user: ResultUserDto | undefined) => void;

export class AuthService {
  private http = new HttpService();
  private handler: ChangeUserHandler | null = null;

  private readonly storage = new LocalStorage<UserToken>('currentUser');

  set changeHandler(handler: ChangeUserHandler | null) {
    this.handler = handler;
  }

  private setCurrentUser(user: ResultUserDto | undefined) {
    this.handler?.(user);
  }

  get persistedUser(): ResultUserDto | undefined {
    return this.storage.get()?.user;
  }

  get authToken(): string | undefined {
    return this.storage.get()?.access_token;
  }

  async login(user: LoginUserDto, abortSignal: AbortSignal) {
    const { user: result, access_token } = await this.http.post<UserToken>(
      'auth/login',
      {
        body: user,
        abortSignal,
      }
    );

    if (!result) {
      throw new Error('Wrong username or password');
    }

    this.storage.set({ user: result, access_token });
    this.setCurrentUser(result);
  }

  logout() {
    this.storage.clear();
    this.setCurrentUser(undefined);
  }
}

export const authService = new AuthService();
