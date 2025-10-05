import React from 'react';
import { Link } from 'react-router-dom';
import useWishlist from '../hooks/useWishlist';
import CourseCard from '../components/CourseCard';

const WishlistPage: React.FC = () => {
  const { wishlistItems } = useWishlist();

  if (wishlistItems.length === 0) {
    return (
      <section className="py-20 bg-brand-black">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Your Wishlist is Empty</h1>
          <p className="text-brand-light-gray mb-8">Courses you add to your wishlist will appear here.</p>
          <Link to="/courses" className="bg-white text-brand-black font-bold py-3 px-8 rounded-lg hover:bg-gray-200 transition-transform transform hover:scale-105 duration-300 inline-block">
            Explore Courses
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-brand-gray">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white">My Wishlist</h1>
          <p className="text-brand-light-gray mt-2">Your saved courses for later.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {wishlistItems.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WishlistPage;
