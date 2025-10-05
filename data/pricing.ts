import { PricingPlan } from '../types';

export const pricingPlansData: PricingPlan[] = [
  {
    name: 'Free',
    price: '0',
    frequency: 'forever',
    features: [
      'Access to select free courses',
      'Community support',
      'Certificate of completion',
      'Contains Ads',
    ],
    isPopular: false,
    ctaText: 'Sign Up for Free',
    courseDiscount: 0,
  },
  {
    name: 'Basic',
    price: '19',
    frequency: 'month',
    features: [
      'Access to 20 courses',
      'Basic support',
      'Downloadable resources',
      'Contains a Few Ads',
    ],
    isPopular: false,
    ctaText: 'Choose Basic',
    courseDiscount: 0,
  },
  {
    name: 'Gold',
    price: '49',
    frequency: 'month',
    features: [
      'Access to all courses',
      '80% discount on all courses',
      'Priority support',
      'Source files & projects',
      'No Ads',
      'Offline viewing',
    ],
    isPopular: true,
    ctaText: 'Choose Gold',
    courseDiscount: 0.8,
  },
  {
    name: 'Diamond',
    price: 'Contact Us',
    frequency: 'for enterprise',
    features: [
      'All Gold features',
      '80% discount on all courses',
      'Team management dashboard',
      'No Ads',
      'Dedicated account manager',
    ],
    isPopular: false,
    ctaText: 'Contact Sales',
    courseDiscount: 0.8,
  },
];