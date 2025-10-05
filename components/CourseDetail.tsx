import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { coursesData } from '../data/courses';
import useCourseProgress from '../hooks/useCourseProgress';
import useDiscount from '../hooks/useDiscount';
import useCart from '../hooks/useCart';
import useWishlist from '../hooks/useWishlist';
import useSubscription from '../hooks/useSubscription';

const DiscountNotification: React.FC<{ onClose: () => void }> = ({ onClose }) => (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 w-11/12 max-w-2xl bg-white text-brand-black p-4 rounded-lg shadow-2xl z-50 flex items-center justify-between">
        <div className="flex items-center">
            <svg className="w-8 h-8 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <p className="font-semibold">Congratulations! You've unlocked a 10% discount on all plans for completing 50% of this course!</p>
        </div>
        <button onClick={onClose} className="text-gray-500 hover:text-black">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
    </div>
);


const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const course = coursesData.find((c) => c.id === parseInt(id || ''));
  const { completionPercentage, toggleLessonCompletion, isLessonCompleted } = useCourseProgress(course);
  const { isDiscountUnlocked, unlockDiscount } = useDiscount();
  const { addToCart, isCourseInCart } = useCart();
  const { addToWishlist, removeFromWishlist, isCourseInWishlist } = useWishlist();
  const { activeSubscription } = useSubscription();
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate();

  const DISCOUNT_UNLOCK_THRESHOLD = 50;

  useEffect(() => {
    if (completionPercentage >= DISCOUNT_UNLOCK_THRESHOLD && !isDiscountUnlocked) {
        unlockDiscount();
        setShowNotification(true);
    }
  }, [completionPercentage, isDiscountUnlocked, unlockDiscount]);


  const handleAddToCart = () => {
    if (!course) return;
    addToCart(course);
  };

  const handleWishlistToggle = () => {
    if (!course) return;
    if (inWishlist) {
      removeFromWishlist(course.id);
    } else {
      addToWishlist(course);
    }
  };

  if (!course) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl font-bold">Course Not Found</h1>
        <p className="text-brand-light-gray mt-4">Sorry, we couldn't find the course you're looking for.</p>
        <Link to="/" className="mt-8 inline-block bg-white text-brand-black font-bold py-3 px-8 rounded-lg hover:bg-gray-200 transition-colors duration-300">
          Back to Courses
        </Link>
      </div>
    );
  }

  const inCart = isCourseInCart(course.id);
  const inWishlist = isCourseInWishlist(course.id);
  
  const courseDiscount = activeSubscription?.courseDiscount || 0;
  const hasDiscount = courseDiscount > 0;
  const discountedPrice = course.price * (1 - courseDiscount);

  return (
    <>
    {showNotification && <DiscountNotification onClose={() => setShowNotification(false)} />}
    <div className="bg-brand-gray">
        {/* Course Header */}
        <section className="bg-brand-black pt-16 pb-12">
            <div className="container mx-auto px-6">
                <Link to="/courses" className="text-brand-light-gray hover:text-white transition-colors duration-300 inline-flex items-center mb-6">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                    Back to all courses
                </Link>
                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2">{course.title}</h1>
                <p className="text-xl text-brand-light-gray">{course.description}</p>
            </div>
        </section>
        
        {/* Main Content */}
        <section className="container mx-auto px-6 py-12">
            <div className="lg:grid lg:grid-cols-3 lg:gap-12">
                {/* Left Column */}
                <div className="lg:col-span-2">
                    <div className="mb-10 bg-brand-black rounded-lg overflow-hidden shadow-lg">
                         <video
                            key={course.id}
                            className="w-full h-auto"
                            poster={course.imageUrl}
                            controls
                        >
                            <source src={course.videoUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>

                    {/* Progress Tracker */}
                    <div className="mb-10 bg-brand-black rounded-lg p-6">
                        <div className="flex justify-between items-center mb-2">
                             <h2 className="text-2xl font-bold text-white">Your Progress</h2>
                             <span className="text-lg font-semibold text-white">{completionPercentage}%</span>
                        </div>
                        <div className="bg-gray-700 rounded-full h-3 w-full overflow-hidden">
                            <div
                                className="bg-white h-full rounded-full transition-all duration-500 ease-in-out"
                                style={{ width: `${completionPercentage}%` }}
                            ></div>
                        </div>
                    </div>

                    <div className="mb-10">
                        <h2 className="text-3xl font-bold text-white mb-6">Course Curriculum</h2>
                        <div className="space-y-4">
                            {course.curriculum.map((item, moduleIndex) => (
                                <div key={moduleIndex} className="bg-brand-black rounded-lg p-5">
                                    <h3 className="text-xl font-semibold text-white mb-4">{item.module}</h3>
                                    <ul className="space-y-3">
                                        {item.lessons.map((lesson, lessonIndex) => {
                                            const lessonId = `${moduleIndex}-${lessonIndex}`;
                                            const isCompleted = isLessonCompleted(lessonId);
                                            return (
                                                <li key={lessonId}>
                                                    <label htmlFor={lessonId} className="flex justify-between items-center cursor-pointer group p-2 -m-2 rounded-md hover:bg-gray-800/50 transition-colors">
                                                        <div className="flex items-center">
                                                            <input
                                                                id={lessonId}
                                                                type="checkbox"
                                                                className="sr-only"
                                                                checked={isCompleted}
                                                                onChange={() => toggleLessonCompletion(lessonId)}
                                                            />
                                                            <div className={`w-5 h-5 mr-4 border-2 rounded-sm flex-shrink-0 flex items-center justify-center transition-all duration-200 ${isCompleted ? 'bg-white border-white' : 'border-gray-500 group-hover:border-white'}`}>
                                                                {isCompleted && <svg className="w-3 h-3 text-brand-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>}
                                                            </div>
                                                            <span className={`text-brand-light-gray transition-colors ${isCompleted ? 'line-through text-gray-500' : 'group-hover:text-white'}`}>
                                                                {lesson.title}
                                                            </span>
                                                        </div>
                                                        <span className="text-gray-500 text-sm font-mono">{lesson.duration}</span>
                                                    </label>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <div className="mb-10">
                         <h2 className="text-3xl font-bold text-white mb-6">About the Instructor</h2>
                         <div className="bg-brand-black rounded-lg p-6 flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
                            <img src={course.instructorImage} alt={course.instructor} className="w-24 h-24 rounded-full object-cover flex-shrink-0" />
                            <div>
                                <h3 className="text-2xl font-bold text-white">{course.instructor}</h3>
                                <p className="text-brand-light-gray mt-2">{course.instructorBio}</p>
                            </div>
                         </div>
                    </div>
                </div>

                {/* Right Column (Sidebar) */}
                <div className="lg:col-span-1">
                    <div className="sticky top-28 bg-brand-black rounded-lg shadow-lg p-6">
                        <img src={course.imageUrl} alt={course.title} className="w-full h-auto object-cover rounded-lg mb-6" />
                        
                        <div className="mb-6">
                          {hasDiscount ? (
                            <div className="flex items-baseline space-x-2">
                              <span className="text-4xl font-extrabold text-white">${discountedPrice.toFixed(2)}</span>
                               <span className="text-2xl text-gray-500 line-through">${course.price.toFixed(2)}</span>
                            </div>
                          ) : (
                            <span className="text-4xl font-extrabold text-white">${course.price.toFixed(2)}</span>
                          )}
                        </div>

                        <div className="flex items-center space-x-3">
                            {inCart ? (
                                <Link to="/cart" className="flex-grow w-full text-center py-3 px-6 rounded-lg font-semibold bg-gray-600 text-white hover:bg-gray-500 transition-colors duration-300">
                                    Go to Cart
                                </Link>
                            ) : (
                                <button onClick={handleAddToCart} className="flex-grow w-full text-center py-3 px-6 rounded-lg font-semibold bg-white text-brand-black hover:bg-gray-200 transition-colors duration-300">
                                    Add to Cart
                                </button>
                            )}
                            <button 
                              onClick={handleWishlistToggle}
                              aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                              className={`p-3 rounded-lg font-semibold transition-colors duration-300 ${inWishlist ? 'bg-red-500/20 text-red-400' : 'bg-gray-700 text-white hover:bg-gray-600'}`}
                            >
                              <svg className="w-6 h-6" fill={inWishlist ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                              </svg>
                            </button>
                        </div>
                        <div className="text-sm text-brand-light-gray mt-4 text-center">30-Day Money-Back Guarantee</div>
                    </div>
                </div>
            </div>
        </section>
    </div>
    </>
  );
};

export default CourseDetail;
