import React, { useState } from "react";
import SignedInNavbar from "./SignedInNavbar";

const MyGrades = () => {
  const courses = [
    {
      id: 1,
      subject: "Computer Science",
      activity: "Understand: Introduction to Programming",
      date: "Aug 31, 2024",
      grade: "-",
      progress: 32,
    },
    {
      id: 2,
      subject: "Computer Science",
      activity: "Understand: Fundamentals of C",
      date: "Aug 31, 2024",
      grade: "-",
      progress: 45,
    },
    {
      id: 3,
      subject: "Computer Science",
      activity: "Understand: Rapid Application Development",
      date: "Aug 31, 2024",
      grade: "C",
      progress: 58,
    },
    {
      id: 4,
      subject: "Algebra",
      activity: "Understand: Introduction to Algebra",
      date: "Aug 31, 2024",
      grade: "A",
      progress: 100,
    },
    {
      id: 5,
      subject: "Introduction to AI",
      activity: "Understand: Basics of AI",
      date: "Aug 31, 2024",
      grade: "B",
      progress: 88,
    },
  ];

  const [selectedFilter, setSelectedFilter] = useState("All Courses");
  const [filteredCourses, setFilteredCourses] = useState(courses);

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);

    if (filter === "All Courses") {
      setFilteredCourses(courses);
    } else {
      setFilteredCourses(
        courses.filter(
          (course) =>
            course.grade === filter ||
            course.subject === filter 
        )
      );
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
        <SignedInNavbar />

        <main className="container mx-auto px-4 py-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">My Grades</h1>
                <select
                value={selectedFilter}
                onChange={(e) => handleFilterChange(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 bg-white shadow-sm text-gray-700"
                >
                <option value="All Courses">All Courses</option>
                <option value="A">Grade: A</option>
                <option value="B">Grade: B</option>
                <option value="C">Grade: C</option>
                <option value="-">No Grade</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Algebra">Algebra</option>
                <option value="Introduction to AI">Introduction to AI</option>
                <option value="Computer Ethics">Computer Ethics</option>
                </select>
            </div>

            <div className="bg-white shadow-lg rounded-lg">
                <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-200">
                    <th className="px-4 py-2 border-b">Course</th>
                    <th className="px-4 py-2 border-b">Activity</th>
                    <th className="px-4 py-2 border-b">Date</th>
                    <th className="px-4 py-2 border-b">Grade</th>
                    <th className="px-4 py-2 border-b">Progress</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCourses.map((course) => (
                    <tr key={course.id} className="hover:bg-gray-100">
                        <td className="px-4 py-2 border-b">
                        <div>
                            <h2 className="text-blue-600 font-semibold">
                            {course.subject}
                            </h2>
                            <p className="text-gray-500 text-sm">Beginner Level</p>
                        </div>
                        </td>
                        <td className="px-4 py-2 border-b">{course.activity}</td>
                        <td className="px-4 py-2 border-b">{course.date}</td>
                        <td className="px-4 py-2 border-b">{course.grade}</td>
                        <td className="px-4 py-2 border-b">{course.progress}%</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </main>
    </div>
  );
};

export default MyGrades;
