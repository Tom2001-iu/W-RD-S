import React from 'react';
import { coursesData } from '../data/courses';
import CourseCard from '../components/CourseCard';
import useSearch from '../hooks/useSearch';

const CoursesPage: React.FC = () => {
  const { searchQuery } = useSearch();

  const filteredCourses = coursesData.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="courses" className="py-20 bg-brand-gray">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white">All Courses</h1>
          <p className="text-brand-light-gray mt-2">Browse our full catalog of expert-led courses.</p>
        </div>

        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold text-white">No Courses Found</h2>
            <p className="text-brand-light-gray mt-2">Try adjusting your search terms.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CoursesPage;