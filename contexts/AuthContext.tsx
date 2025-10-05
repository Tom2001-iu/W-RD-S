import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { User, AuthContextType } from '../types';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const USER_STORAGE_KEY = 'mlearn-current-user';
const ACCOUNTS_STORAGE_KEY = 'mlearn-user-accounts';

// Simple "hashing" for demonstration purposes. Do NOT use this in production.
const hashPassword = (password: string) => btoa(password + '-mlearn-salt');

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(USER_STORAGE_KEY);
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Could not load user from localStorage", error);
    } finally {
        setLoading(false);
    }
  }, []);
  
  const signup = useCallback(async (email: string, password: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        try {
            const storedAccounts = localStorage.getItem(ACCOUNTS_STORAGE_KEY);
            const accounts = storedAccounts ? JSON.parse(storedAccounts) : {};

            if (accounts[email]) {
                return reject(new Error('An account with this email already exists.'));
            }

            accounts[email] = { passwordHash: hashPassword(password) };
            localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(accounts));

            const newUser = { email };
            localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
            setCurrentUser(newUser);
            resolve();
        } catch (error) {
            console.error("Signup failed", error);
            reject(new Error('An unexpected error occurred during signup.'));
        }
    });
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<void> => {
     return new Promise((resolve, reject) => {
        try {
            const storedAccounts = localStorage.getItem(ACCOUNTS_STORAGE_KEY);
            const accounts = storedAccounts ? JSON.parse(storedAccounts) : {};
            
            const userAccount = accounts[email];
            if (!userAccount || userAccount.passwordHash !== hashPassword(password)) {
                 return reject(new Error('Invalid email or password.'));
            }

            const user = { email };
            localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
            setCurrentUser(user);
            resolve();
        } catch (error) {
            console.error("Login failed", error);
            reject(new Error('An unexpected error occurred during login.'));
        }
    });
  }, []);

  const logout = useCallback(() => {
    setCurrentUser(null);
    try {
        localStorage.removeItem(USER_STORAGE_KEY);
    } catch(error) {
        console.error("Could not remove user from localStorage", error);
    }
  }, []);


  const value = { currentUser, loading, login, signup, logout };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
