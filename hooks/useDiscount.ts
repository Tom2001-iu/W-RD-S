import { useContext } from 'react';
import { DiscountContext } from '../contexts/DiscountContext';

const useDiscount = () => {
  const context = useContext(DiscountContext);
  if (context === undefined) {
    throw new Error('useDiscount must be used within a DiscountProvider');
  }
  return context;
};

export default useDiscount;