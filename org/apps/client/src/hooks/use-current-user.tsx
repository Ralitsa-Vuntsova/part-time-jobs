import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { authService } from '../services/auth-service';
import { ResultUserDto } from '@shared/data-objects';
import { jwtDecode } from 'jwt-decode';

const UserContext = createContext<ResultUserDto | undefined>(undefined);

export interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState(authService.persistedUser);

  useEffect(() => {
    authService.changeHandler = setUser;

    return () => {
      authService.changeHandler = null;
    };
  }, []);

  if (authService.authToken) {
    const token = jwtDecode(authService.authToken);
    if (token.exp) {
      if (token.exp < Date.now() / 1000) {
        authService.logout();
      }
    }
  }

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export function useCurrentUser() {
  return useContext(UserContext);
}
