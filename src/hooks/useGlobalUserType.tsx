'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export type UserType = 'entrepreneurs' | 'business';

interface UserTypeContextType {
  userType: UserType;
  setUserType: (type: UserType) => void;
}

interface UserTypeProviderProps {
  children: ReactNode;
}

const UserTypeContext = createContext<UserTypeContextType | undefined>(undefined);

const getUserTypeFromStorage = (): UserType => {
  if (typeof window === 'undefined') return 'business'; // Default on server
  const stored = localStorage.getItem('userType') as UserType;
  return stored === 'entrepreneurs' || stored === 'business' ? stored : 'business';
};

export function UserTypeProvider({ children }: UserTypeProviderProps) {
  const [userType, setUserType] = useState<UserType>('business');
  const [isMounted, setIsMounted] = useState(false);

  // Set initial user type after mount
  useEffect(() => {
    setUserType(getUserTypeFromStorage());
    setIsMounted(true);
  }, []);

  // Update localStorage when user type changes
  useEffect(() => {
    if (!isMounted) return;
    localStorage.setItem('userType', userType);
  }, [userType, isMounted]);

  return (
    <UserTypeContext.Provider value={{ userType, setUserType }}>
      {children}
    </UserTypeContext.Provider>
  );
}

export function useUserType() {
  const context = useContext(UserTypeContext);
  if (context === undefined) {
    throw new Error('useUserType must be used within a UserTypeProvider');
  }
  return context;
}
