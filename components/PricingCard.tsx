import React from 'react';
import { PricingPlan } from '../types';
import useRazorpay from '../hooks/useRazorpay';
import useDiscount from '../hooks/useDiscount';
import useSubscription from '../hooks/useSubscription';

interface PricingCardProps {
  plan: PricingPlan;
}

const CheckIcon: React.FC = () => (
  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
  </svg>
);

const PricingCard: React.FC<PricingCardProps> = ({ plan }) => {
  const displayRazorpay = useRazorpay();
  const { isDiscountUnlocked } = useDiscount();
  const { setActiveSubscription } = useSubscription();
  const isNumericPrice = !isNaN(parseFloat(plan.price));

  const originalPrice = isNumericPrice ? parseFloat(plan.price) : 0;
  const discountedPrice = isDiscountUnlocked ? (originalPrice * 0.9).toFixed(2) : originalPrice.toFixed(2);


  const handlePayment = () => {
    if (!isNumericPrice) {
       if(plan.ctaText === 'Contact Sales'){
          alert('Please contact our sales team for enterprise solutions!');
       } else {
          setActiveSubscription(plan);
          alert(`You are now on the ${plan.name} plan!`);
       }
      return;
    }
    displayRazorpay({
      amount: parseFloat(discountedPrice),
      name: `MLearn - ${plan.name} Plan`,
      description: `Subscription to the ${plan.name} plan.`,
      onSuccess: () => {
        alert(`Payment successful! You are now subscribed to the ${plan.name} plan.`);
        setActiveSubscription(plan);
      }
    });
  };

  const cardClasses = plan.isPopular
    ? 'bg-brand-gray border-2 border-white transform lg:scale-110 shadow-2xl z-10'
    : 'bg-brand-gray border border-gray-700';
  
  const buttonClasses = plan.isPopular
    ? 'bg-white text-brand-black hover:bg-gray-200'
    : 'bg-gray-700 text-white hover:bg-gray-600';

  return (
    <div className={`relative p-8 rounded-xl w-full max-w-sm transition-transform duration-300 ${cardClasses}`}>
      {plan.isPopular && (
        <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
          <span className="bg-white text-brand-black text-xs font-bold px-4 py-1 rounded-full uppercase">Most Popular</span>
        </div>
      )}
       {isDiscountUnlocked && isNumericPrice && (
        <div className="absolute top-0 translate-y-2 right-0 -translate-x-2">
            <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">10% OFF</span>
        </div>
      )}
      <h3 className="text-2xl font-semibold text-white text-center mb-2">{plan.name}</h3>
      <div className="text-center mb-6 min-h-[90px] flex flex-col justify-center">
        {isNumericPrice ? (
          <>
            {isDiscountUnlocked && (
              <span className="text-2xl font-bold text-gray-500 line-through">
                ${originalPrice.toFixed(2)}
              </span>
            )}
            <p>
              <span className="text-5xl font-extrabold text-white">${discountedPrice}</span>
              <span className="text-brand-light-gray">/{plan.frequency}</span>
            </p>
          </>
        ) : (
          <>
            <p className="text-3xl font-bold text-white">{plan.price}</p>
            <p className="text-brand-light-gray text-sm">{plan.frequency}</p>
          </>
        )}
      </div>
      
      <ul className="space-y-4 mb-8">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <CheckIcon />
            <span className="ml-3 text-brand-light-gray">{feature}</span>
          </li>
        ))}
      </ul>

      <button onClick={handlePayment} className={`block w-full text-center py-3 px-6 rounded-lg font-semibold transition-colors duration-300 ${buttonClasses}`}>
        {plan.ctaText}
      </button>
    </div>
  );
};

export default PricingCard;