import { useContext } from 'react';
import { WishlistContext } from '../contexts/WishlistContext';
import { WishlistContextType } from '../types';

const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export default useWishlist;
