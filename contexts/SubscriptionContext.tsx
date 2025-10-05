import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { ActiveSubscription, SubscriptionContextType, PricingPlan } from '../types';

export const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

interface SubscriptionProviderProps {
  children: ReactNode;
}

const SUBSCRIPTION_STORAGE_KEY = 'mlearn-active-subscription';

const getSubscriptionFromStorage = (): ActiveSubscription => {
  try {
    const storedSub = localStorage.getItem(SUBSCRIPTION_STORAGE_KEY);
    return storedSub ? JSON.parse(storedSub) : null;
  } catch (error) {
    console.error("Could not load subscription from localStorage", error);
    return null;
  }
};

export const SubscriptionProvider: React.FC<SubscriptionProviderProps> = ({ children }) => {
  const [activeSubscription, _setActiveSubscription] = useState<ActiveSubscription>(getSubscriptionFromStorage);

  const setActiveSubscription = useCallback((plan: PricingPlan | null) => {
    if (plan) {
      const newSubscription: ActiveSubscription = {
        planName: plan.name,
        courseDiscount: plan.courseDiscount || 0,
      };
      _setActiveSubscription(newSubscription);
      try {
        localStorage.setItem(SUBSCRIPTION_STORAGE_KEY, JSON.stringify(newSubscription));
      } catch (error) {
         console.error("Could not save subscription to localStorage", error);
      }
    } else {
      _setActiveSubscription(null);
      try {
        localStorage.removeItem(SUBSCRIPTION_STORAGE_KEY);
      } catch (error) {
        console.error("Could not remove subscription from localStorage", error);
      }
    }
  }, []);

  const value = { activeSubscription, setActiveSubscription };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
};
