import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { authService } from '../services/auth-service';
import { ResultUserDto } from '@shared/data-objects';

const UserContext = createContext<ResultUserDto | undefined>(undefined);

export interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState(authService.persistedUser);

  useEffect(() => {
    authService.setHandler(setUser);

    return () => {
      authService.setHandler(null);
    };
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export function useCurrentUser() {
  return useContext(UserContext);
}
