import React from 'react';
import Hero from '../components/Hero';
import FeaturedCourses from '../components/FeaturedCourses';

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <FeaturedCourses />
    </>
  );
};

export default HomePage;