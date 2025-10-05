import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Course, CartContextType } from '../types';

export const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

const CART_STORAGE_KEY = 'mlearn-cart';

const getCartFromStorage = (): Course[] => {
  try {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    return storedCart ? JSON.parse(storedCart) : [];
  } catch (error) {
    console.error("Could not load cart from localStorage", error);
    return [];
  }
};

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<Course[]>(getCartFromStorage);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (error) {
      console.error("Could not save cart to localStorage", error);
    }
  }, [cartItems]);

  const addToCart = useCallback((course: Course) => {
    setCartItems(prevItems => {
      // Prevent adding duplicates
      if (prevItems.some(item => item.id === course.id)) {
        return prevItems;
      }
      return [...prevItems, course];
    });
  }, []);

  const removeFromCart = useCallback((courseId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== courseId));
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const isCourseInCart = useCallback((courseId: number) => {
    return cartItems.some(item => item.id === courseId);
  }, [cartItems]);

  const value = { cartItems, addToCart, removeFromCart, clearCart, isCourseInCart };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
