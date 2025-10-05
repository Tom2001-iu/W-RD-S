
import React from 'react';
import { PricingPlan } from '../types';
import PricingCard from './PricingCard';

const pricingPlansData: PricingPlan[] = [
  {
    name: 'Basic',
    price: '29',
    frequency: 'month',
    features: [
      'Access to 10 courses',
      'Basic support',
      'Downloadable resources',
      'Certificate of completion',
    ],
    isPopular: false,
    ctaText: 'Choose Basic',
  },
  {
    name: 'Pro',
    price: '49',
    frequency: 'month',
    features: [
      'Access to all courses',
      'Priority support',
      'Source files & projects',
      'Exclusive community access',
      'Offline viewing',
    ],
    isPopular: true,
    ctaText: 'Choose Pro',
  },
  {
    name: 'Team',
    price: 'Contact Us',
    frequency: 'for custom pricing',
    features: [
      'All Pro features',
      'Team management dashboard',
      'Personalized onboarding',
      'Dedicated account manager',
    ],
    isPopular: false,
    ctaText: 'Contact Sales',
  },
];

const PricingSection: React.FC = () => {
  return (
    <section id="pricing" className="py-20 bg-brand-black">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Find the Perfect Plan</h2>
          <p className="text-brand-light-gray mt-2 max-w-2xl mx-auto">
            Whether you're an individual or a large team, we have a plan that fits your needs.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-8">
          {pricingPlansData.map((plan) => (
            <PricingCard key={plan.name} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
