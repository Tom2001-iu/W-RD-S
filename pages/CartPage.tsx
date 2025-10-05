import React from 'react';
import { Link } from 'react-router-dom';
import useCart from '../hooks/useCart';
import useRazorpay from '../hooks/useRazorpay';
import useSubscription from '../hooks/useSubscription';

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const displayRazorpay = useRazorpay();
  const { activeSubscription } = useSubscription();

  const originalTotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const courseDiscount = activeSubscription?.courseDiscount || 0;
  const discountAmount = originalTotal * courseDiscount;
  const finalTotal = originalTotal - discountAmount;

  const handleCheckout = () => {
    if (finalTotal <= 0) {
      alert('Your courses are free with your current plan!');
      clearCart();
      return;
    }
    displayRazorpay({
      amount: finalTotal,
      name: 'MLearn Course Purchase',
      description: `Payment for ${cartItems.length} course(s).`,
      onSuccess: () => {
        alert('Payment successful! Your courses are now available.');
        clearCart();
      },
    });
  };

  if (cartItems.length === 0) {
    return (
      <section className="py-20 bg-brand-black">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Your Cart is Empty</h1>
          <p className="text-brand-light-gray mb-8">Looks like you haven't added any courses to your cart yet.</p>
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
        <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">Shopping Cart</h1>
        <div className="lg:grid lg:grid-cols-3 lg:gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 bg-brand-black rounded-lg p-6 mb-8 lg:mb-0">
            <h2 className="text-2xl font-semibold text-white border-b border-gray-700 pb-4 mb-4">
              {cartItems.length} {cartItems.length === 1 ? 'Course' : 'Courses'} in Cart
            </h2>
            <div className="space-y-6">
              {cartItems.map((course) => {
                const hasDiscount = courseDiscount > 0;
                const discountedPrice = course.price * (1 - courseDiscount);
                return (
                  <div key={course.id} className="flex items-start sm:items-center space-x-4">
                    <Link to={`/course/${course.id}`}>
                      <img src={course.imageUrl} alt={course.title} className="w-32 h-20 object-cover rounded-md" />
                    </Link>
                    <div className="flex-grow">
                      <Link to={`/course/${course.id}`}>
                        <h3 className="text-lg font-semibold text-white hover:underline">{course.title}</h3>
                      </Link>
                      <p className="text-sm text-brand-light-gray">By {course.instructor}</p>
                      <button onClick={() => removeFromCart(course.id)} className="text-sm text-red-500 hover:text-red-400 mt-1">
                        Remove
                      </button>
                    </div>
                    <div className="text-right">
                      {hasDiscount ? (
                        <>
                           <p className="text-lg font-bold text-white">${discountedPrice.toFixed(2)}</p>
                           <p className="text-sm text-gray-500 line-through">${course.price.toFixed(2)}</p>
                        </>
                      ) : (
                         <p className="text-lg font-bold text-white">${course.price.toFixed(2)}</p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-brand-black rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-white border-b border-gray-700 pb-4 mb-4">
                Summary
              </h2>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-brand-light-gray">
                  <span>Original Price</span>
                  <span>${originalTotal.toFixed(2)}</span>
                </div>
                {courseDiscount > 0 && (
                  <div className="flex justify-between items-center text-green-400">
                    <span>Subscription Discount ({courseDiscount * 100}%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
              </div>
              <div className="flex justify-between items-center text-white font-bold text-xl mt-4 pt-4 border-t border-gray-700">
                <span>Total</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
              <button
                onClick={handleCheckout}
                className="mt-6 block w-full text-center py-3 px-6 rounded-lg font-semibold bg-white text-brand-black hover:bg-gray-200 transition-colors duration-300"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartPage;