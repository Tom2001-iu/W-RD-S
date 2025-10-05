
import React from 'react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <section className="bg-brand-black py-20 sm:py-28">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4">
          Unlock Your Potential.
          <br />
          <span className="text-brand-light-gray">Learn Without Limits.</span>
        </h1>
        <p className="text-lg md:text-xl text-brand-light-gray max-w-3xl mx-auto mb-8">
          Join thousands of learners and gain new skills with our expert-led online courses. Start your journey today with a platform designed for clarity and focus.
        </p>
        <Link to="/courses" className="bg-white text-brand-black font-bold py-3 px-8 rounded-lg hover:bg-gray-200 transition-transform transform hover:scale-105 duration-300 inline-block">
          Explore Courses
        </Link>
      </div>
    </section>
  );
};

export default Hero;