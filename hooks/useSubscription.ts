import { useContext } from 'react';
import { SubscriptionContext } from '../contexts/SubscriptionContext';
import { SubscriptionContextType } from '../types';

const useSubscription = (): SubscriptionContextType => {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};

export default useSubscription;
