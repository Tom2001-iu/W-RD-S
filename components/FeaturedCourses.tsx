import React from 'react';
import { Link } from 'react-router-dom';
import { coursesData } from '../data/courses';
import CourseCard from './CourseCard';

const FeaturedCourses: React.FC = () => {
  return (
    <section id="courses" className="py-20 bg-brand-gray">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Featured Courses</h2>
          <p className="text-brand-light-gray mt-2">Hand-picked courses to kickstart your learning journey.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {coursesData.slice(0, 4).map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
        <div className="text-center mt-16">
          <Link to="/courses" className="bg-gray-700 text-white font-bold py-3 px-8 rounded-lg hover:bg-gray-600 transition-transform transform hover:scale-105 duration-300 inline-block">
            View All Courses
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;