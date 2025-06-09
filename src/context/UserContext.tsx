'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type User = {
  id: number;
  name: string;
  email: string;
} | null;

type UserContextType = {
  user: User;
  login: (userData: { id: number; name: string; email: string }) => void;
  logout: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const userStorageKey = 'user';

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem(userStorageKey);
      if (storedUser) {
        try {
          const parsedUser: User = JSON.parse(storedUser);
          if (parsedUser && parsedUser.id && parsedUser.name && parsedUser.email) {
            setUser(parsedUser);
            console.log('User loaded from local storage:', parsedUser);
          } else {
            console.warn('Invalid user data in local storage, clearing:', parsedUser);
            localStorage.removeItem(userStorageKey);
          }
        } catch (e) {
          console.error('Failed to parse user from local storage:', e);
          localStorage.removeItem(userStorageKey);
        }
      }
    }
  }, []);

  const login = (userData: { id: number; name: string; email: string }) => {
    const fullUserData: User = { id: userData.id, name: userData.name, email: userData.email };
    setUser(fullUserData);
    if (typeof window !== 'undefined') {
      localStorage.setItem(userStorageKey, JSON.stringify(fullUserData));
    }
    console.log('User logged in and saved to local storage:', fullUserData);
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(userStorageKey);
    }
    console.log('User logged out and removed from local storage.');
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};