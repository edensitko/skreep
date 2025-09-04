'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserType = 'entrepreneurs' | 'business';

interface UserTypeContextType {
  userType: UserType;
  setUserType: (type: UserType) => void;
}

interface UserTypeProviderProps {
  children: ReactNode;
}

const UserTypeContext = createContext<UserTypeContextType | undefined>(undefined);

export function UserTypeProvider({ children }: UserTypeProviderProps) {
  const [userType, setUserType] = useState<UserType>('business');

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
