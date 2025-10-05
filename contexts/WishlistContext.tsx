import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Course, WishlistContextType } from '../types';

export const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

interface WishlistProviderProps {
  children: ReactNode;
}

const WISHLIST_STORAGE_KEY = 'mlearn-wishlist';

const getWishlistFromStorage = (): Course[] => {
  try {
    const storedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
    return storedWishlist ? JSON.parse(storedWishlist) : [];
  } catch (error) {
    console.error("Could not load wishlist from localStorage", error);
    return [];
  }
};

export const WishlistProvider: React.FC<WishlistProviderProps> = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState<Course[]>(getWishlistFromStorage);

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistItems));
    } catch (error) {
      console.error("Could not save wishlist to localStorage", error);
    }
  }, [wishlistItems]);

  const addToWishlist = useCallback((course: Course) => {
    setWishlistItems(prevItems => {
      if (prevItems.some(item => item.id === course.id)) {
        return prevItems;
      }
      return [...prevItems, course];
    });
  }, []);

  const removeFromWishlist = useCallback((courseId: number) => {
    setWishlistItems(prevItems => prevItems.filter(item => item.id !== courseId));
  }, []);

  const isCourseInWishlist = useCallback((courseId: number) => {
    return wishlistItems.some(item => item.id === courseId);
  }, [wishlistItems]);

  const value = { wishlistItems, addToWishlist, removeFromWishlist, isCourseInWishlist };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};
