import { createContext, ReactNode, useContext, useState } from 'react';
import { LocalStorage } from '../libs/local-storage';
import { AdType } from '../libs/ad-helper-functions';
import { Language, Theme } from '@shared/enums';

export interface UserPreferences {
  isGrid: boolean;
  isAsc: boolean;
  type: AdType;
  language: Language;
  theme: Theme;
}

export interface UserPreferencesContextData extends UserPreferences {
  setPreferences: (preferences: Partial<UserPreferences>) => void;
}

const UserPreferencesContext = createContext<
  UserPreferencesContextData | undefined
>(undefined);

const localStorage = new LocalStorage<UserPreferences>('preferences');

export function UserPreferencesProvider({ children }: { children: ReactNode }) {
  const [preferences, _setPreferences] = useState(
    localStorage.get() ?? {
      isGrid: false,
      isAsc: false,
      type: AdType.Job,
      language: Language.English,
      theme: Theme.Light,
    }
  );

  function setPreferences(newPreferences: Partial<UserPreferences>) {
    localStorage.set({ ...preferences, ...newPreferences });
    _setPreferences({ ...preferences, ...newPreferences });
  }

  return (
    <UserPreferencesContext.Provider value={{ ...preferences, setPreferences }}>
      {children}
    </UserPreferencesContext.Provider>
  );
}

export function useUserPreferences() {
  const context = useContext(UserPreferencesContext);

  if (!context) {
    throw new Error(
      'Cannot use useUserPreferences without UserPreferencesProvider'
    );
  }

  return context;
}
