import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';

interface DiscountContextType {
  isDiscountUnlocked: boolean;
  unlockDiscount: () => void;
}

export const DiscountContext = createContext<DiscountContextType | undefined>(undefined);

interface DiscountProviderProps {
  children: ReactNode;
}

const DISCOUNT_STORAGE_KEY = 'mlearn-discount-unlocked';

export const DiscountProvider: React.FC<DiscountProviderProps> = ({ children }) => {
  const [isDiscountUnlocked, setIsDiscountUnlocked] = useState<boolean>(false);

  useEffect(() => {
    try {
      const storedValue = localStorage.getItem(DISCOUNT_STORAGE_KEY);
      if (storedValue === 'true') {
        setIsDiscountUnlocked(true);
      }
    } catch (error) {
      console.error('Could not read discount status from localStorage', error);
    }
  }, []);

  const unlockDiscount = useCallback(() => {
    try {
      localStorage.setItem(DISCOUNT_STORAGE_KEY, 'true');
      setIsDiscountUnlocked(true);
    } catch (error) {
      console.error('Could not save discount status to localStorage', error);
    }
  }, []);

  const value = { isDiscountUnlocked, unlockDiscount };

  return (
    <DiscountContext.Provider value={value}>
      {children}
    </DiscountContext.Provider>
  );
};