import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { userService } from '../services/user-service';
import { UserDto } from '@shared/data-objects';

const UserContext = createContext<Partial<UserDto> | undefined>(undefined);

export interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState(userService.persistedUser);

  useEffect(() => {
    userService.setHandler(setUser);

    return () => {
      userService.setHandler(null);
    };
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export function useCurrentUser() {
  return useContext(UserContext);
}
