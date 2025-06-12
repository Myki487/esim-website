'use client'



import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';



type User = {

  id: number;

  name: string;

  email: string;

  fullName?: string;

  phoneNumber?: string;

} | null;



type UserContextType = {

  user: User;

  login: (userData: { id: number; name: string; email: string; fullName?: string; phoneNumber?: string }) => void;

  logout: () => void;

  updateUser: (newUserData: { name?: string; fullName?: string; phoneNumber?: string }) => void;

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



  const login = useCallback((userData: { id: number; name: string; email: string; fullName?: string; phoneNumber?: string }) => {

    const fullUserData: User = {

      id: userData.id,

      name: userData.name,

      email: userData.email,

      fullName: userData.fullName,

      phoneNumber: userData.phoneNumber,

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



  const updateUser = useCallback((newUserData: { name?: string; fullName?: string; phoneNumber?: string }) => {

    setUser(prevUser => {

      if (!prevUser) return null;

      const updated = { ...prevUser, ...newUserData };

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