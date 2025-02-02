// components/CoursesPage.js
import React from 'react';
import SignedInNavbar from './SignedInNavbar';
import AvailableCoursesSection from './AvailableCoursesSection';
import EnrolledCoursesSection from './EnrolledCoursesSection';
import course1Image from '../assets/course1.png';
import course2Image from '../assets/course2.png';
import course3Image from '../assets/course3.png';
import course4Image from '../assets/course4.png';
import course5Image from '../assets/course5.png';
import course6Image from '../assets/course6.png';
import course7Image from '../assets/course7.png';
import course8Image from '../assets/course8.png';
import course9Image from '../assets/course9.png';

const CoursesPage = () => {
  const availableCourses = [
    { id: 1, title: 'IS4101 Final Year Project in Information Systems', semester: 'Semester I', imageUrl: course1Image }, 
    { id: 2, title: 'IS4102 Advanced Software Quality Assurance', semester: 'Semester I', imageUrl: course2Image },
    { id: 3, title: 'IS4103 Research Seminar', semester: 'Semester I', imageUrl: course3Image },
    { id: 4, title: 'IS4109 Cognitive Robotics', semester: 'Semester I', imageUrl: course4Image }
  ];

  const enrolledCourses = [
    { id: 5, title: 'IS4101 Final Year Project in Information Systems', semester: 'Semester I', progress: 66, imageUrl: course5Image },
    { id: 6, title: 'IS4102 Advanced Software Quality Assurance', semester: 'Semester I', progress: 100, imageUrl: course6Image },
    { id: 7, title: 'IS4103 Research Seminar', semester: 'Semester I', progress: 71, imageUrl: course7Image },
    { id: 8, title: 'IS4105 Advanced Concepts in Software Design', semester: 'Semester I', progress: 60, imageUrl: course8Image },
    { id: 9, title: 'IS4106 Data Analytics', semester: 'Semester I', progress: 43, imageUrl: course9Image }
  ];

  return (
    <div>
      <SignedInNavbar />
      <div className="container mx-auto px-6 py-8">
        <AvailableCoursesSection availableCourses={availableCourses} />
        <EnrolledCoursesSection enrolledCourses={enrolledCourses} />
      </div>
    </div>
  );
};

export default CoursesPage;
