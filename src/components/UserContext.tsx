'use client'

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

type User = {
  id: number;
  name: string;
  email: string;
  fullName?: string | null;
  phoneNumber?: string | null;
} | null;

type UserContextType = {
  user: User;
  login: (userData: { id: number; name: string; email: string; fullName?: string | null; phoneNumber?: string | null }) => void;
  logout: () => void;
  updateUser: (newUserData: { name?: string; fullName?: string | null; phoneNumber?: string | null }) => void;
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

  const login = useCallback((userData: { id: number; name: string; email: string; fullName?: string | null; phoneNumber?: string | null }) => {
    const fullUserData: User = {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      fullName: userData.fullName === undefined ? null : userData.fullName,
      phoneNumber: userData.phoneNumber === undefined ? null : userData.phoneNumber,
    };
    setUser(fullUserData);
    if (typeof window !== 'undefined') {
      localStorage.setItem(userStorageKey, JSON.stringify(fullUserData));
    }
    console.log('User logged in and saved to local storage:', fullUserData);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(userStorageKey);
    }
    console.log('User logged out and removed from local storage.');
  }, []);

  const updateUser = useCallback((newUserData: { name?: string; fullName?: string | null; phoneNumber?: string | null }) => {
    setUser(prevUser => {
      if (!prevUser) return null;

      const updated = {
        ...prevUser,
        name: newUserData.name !== undefined ? newUserData.name : prevUser.name,
        fullName: newUserData.fullName !== undefined ? newUserData.fullName : prevUser.fullName,
        phoneNumber: newUserData.phoneNumber !== undefined ? newUserData.phoneNumber : prevUser.phoneNumber,
      };

      if (typeof window !== 'undefined') {
        localStorage.setItem(userStorageKey, JSON.stringify(updated));
      }
      console.log('User data updated in context and local storage:', updated);
      return updated;
    });
  }, []);

  return (
    <UserContext.Provider value={{ user, login, logout, updateUser }}>
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