import React from 'react';
import { pricingPlansData } from '../data/pricing';
import PricingCard from '../components/PricingCard';

const PricingPage: React.FC = () => {
  return (
    <section id="pricing" className="py-20 bg-brand-black">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white">Find the Perfect Plan</h1>
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

export default PricingPage;
