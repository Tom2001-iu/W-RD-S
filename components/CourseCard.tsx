import React from 'react';
import { Link } from 'react-router-dom';
import { Course } from '../types';
import useCart from '../hooks/useCart';
import useWishlist from '../hooks/useWishlist';
import useSubscription from '../hooks/useSubscription';

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const { addToCart, isCourseInCart } = useCart();
  const { addToWishlist, removeFromWishlist, isCourseInWishlist } = useWishlist();
  const { activeSubscription } = useSubscription();

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(course);
  };

  const inCart = isCourseInCart(course.id);
  const inWishlist = isCourseInWishlist(course.id);

  const handleWishlistToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(course.id);
    } else {
      addToWishlist(course);
    }
  };
  
  const courseDiscount = activeSubscription?.courseDiscount || 0;
  const hasDiscount = courseDiscount > 0;
  const discountedPrice = course.price * (1 - courseDiscount);

  return (
    <div className="bg-brand-black rounded-lg overflow-hidden group transform hover:-translate-y-2 transition-transform duration-300 shadow-lg hover:shadow-2xl flex flex-col">
      <div className="relative">
        <Link to={`/course/${course.id}`} className="block">
          <img src={course.imageUrl} alt={course.title} className="w-full h-48 object-cover group-hover:opacity-90 transition-opacity duration-300" />
        </Link>
        <button
          onClick={handleWishlistToggle}
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          className="absolute top-3 left-3 bg-brand-black/50 p-2 rounded-full text-white hover:bg-brand-black/80 hover:scale-110 transition-all duration-200 z-10"
        >
          <svg className={`w-5 h-5 transition-colors ${inWishlist ? 'text-red-500' : 'text-white'}`} fill={inWishlist ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
          </svg>
        </button>
        {hasDiscount && (
           <div className="absolute top-3 right-3 bg-yellow-400 text-brand-black text-xs font-bold px-2 py-1 rounded-full uppercase">
            {courseDiscount * 100}% OFF
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <Link to={`/course/${course.id}`} className="block flex-grow">
          <h3 className="text-xl font-semibold text-white mb-2 h-14">{course.title}</h3>
          <p className="text-brand-light-gray mb-4">By {course.instructor}</p>
        </Link>
        <div className="flex justify-between items-center mt-auto pt-4">
           <div className="flex flex-col">
            {hasDiscount ? (
              <>
                <span className="text-gray-500 line-through text-lg">${course.price.toFixed(2)}</span>
                <span className="text-2xl font-bold text-white">${discountedPrice.toFixed(2)}</span>
              </>
            ) : (
              <span className="text-2xl font-bold text-white">${course.price.toFixed(2)}</span>
            )}
          </div>
          <button 
            onClick={handleAddToCart} 
            disabled={inCart}
            className={`py-2 px-4 rounded-md text-sm font-semibold transition-colors duration-300 ${
              inCart 
                ? 'bg-gray-500 text-gray-300 cursor-not-allowed' 
                : 'bg-gray-700 text-white hover:bg-gray-600'
            }`}
          >
            {inCart ? 'In Cart' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
