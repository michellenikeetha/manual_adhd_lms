// components/CoursesPage.js
import React from 'react';
import SignedInNavbar from './SignedInNavbar';
import AvailableCoursesSection from './AvailableCoursesSection';
import EnrolledCoursesSection from './EnrolledCoursesSection';
import course1Image from '../assets/c1.jfif';
import course2Image from '../assets/c2.jfif';
import course3Image from '../assets/c3.jfif';
import course4Image from '../assets/c4.jfif';
import course5Image from '../assets/c5.jpg';
import course6Image from '../assets/c6.jfif';
import course7Image from '../assets/c7.jfif';
import course8Image from '../assets/c8.jfif';
import course9Image from '../assets/c9.jfif';

const CoursesPage = () => {
  const availableCourses = [
    { id: 1, title: 'IS4101 Final Year Project in Information Systems', semester: 'Semester I', imageUrl: course1Image }, 
    { id: 2, title: 'IS4102 Advanced Software Quality Assurance', semester: 'Semester I', imageUrl: course2Image },
    { id: 3, title: 'IS4103 Research Seminar', semester: 'Semester I', imageUrl: course3Image },
    { id: 4, title: 'IS4109 Cognitive Robotics', semester: 'Semester I', imageUrl: course9Image }
  ];

  const enrolledCourses = [
    { id: 5, title: 'IS4104 Natural Language Processing', semester: 'Semester I', progress: 66, imageUrl: course4Image },
    { id: 6, title: 'IS4107 Computational Biology', semester: 'Semester I', progress: 100, imageUrl: course7Image },
    { id: 7, title: 'IS4108 Business Information Systems', semester: 'Semester I', progress: 71, imageUrl: course8Image },
    { id: 8, title: 'IS4105 Advanced Concepts in Software Design', semester: 'Semester I', progress: 60, imageUrl: course5Image },
    { id: 9, title: 'IS4106 Data Analytics', semester: 'Semester I', progress: 43, imageUrl: course6Image }
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
