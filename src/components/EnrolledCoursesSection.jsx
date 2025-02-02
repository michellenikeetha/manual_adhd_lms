// components/EnrolledCoursesSection.js
import React from 'react';
import CourseCard from './CourseCard';

const EnrolledCoursesSection = ({ enrolledCourses }) => {
  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold mb-6">Enrolled Courses</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {enrolledCourses.map((course) => (
          <CourseCard key={course.id} course={course} isEnrolled={true} />
        ))}
      </div>
    </section>
  );
};

export default EnrolledCoursesSection;
