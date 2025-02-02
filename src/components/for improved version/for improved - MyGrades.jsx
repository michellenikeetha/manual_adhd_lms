import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Award, BookOpen, TrendingUp } from "lucide-react";
import SignedInNavbar from "../SignedInNavbar";

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
          (course) => course.grade === filter || course.subject === filter
        )
      );
    }
  };

  const getGradeColor = (grade) => {
    const colors = {
      A: "text-green-600",
      B: "text-blue-600",
      C: "text-yellow-600",
      "-": "text-gray-600",
    };
    return colors[grade] || "text-gray-600";
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return "bg-green-500";
    if (progress >= 60) return "bg-blue-500";
    if (progress >= 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  const stats = {
    averageProgress: Math.round(
      filteredCourses.reduce((acc, course) => acc + course.progress, 0) /
        filteredCourses.length
    ),
    completedCourses: filteredCourses.filter((course) => course.progress === 100)
      .length,
    totalCourses: filteredCourses.length,
  };

  return (
    <div className="bg-gray-50 min-h-screen">
        <SignedInNavbar />

        <main className="container mx-auto px-4 py-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">My Grades</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg shadow flex items-center">
                    <div className="rounded-full bg-blue-100 p-3 mr-4">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                    <p className="text-sm text-gray-600">Total Courses</p>
                    <p className="text-xl font-bold">{stats.totalCourses}</p>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow flex items-center">
                    <div className="rounded-full bg-green-100 p-3 mr-4">
                    <Award className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                    <p className="text-sm text-gray-600">Completed Courses</p>
                    <p className="text-xl font-bold">{stats.completedCourses}</p>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow flex items-center">
                    <div className="rounded-full bg-purple-100 p-3 mr-4">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                    <p className="text-sm text-gray-600">Average Progress</p>
                    <p className="text-xl font-bold">{stats.averageProgress}%</p>
                    </div>
                </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow mb-6">
                <h2 className="text-lg font-semibold mb-4">Progress Overview</h2>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={filteredCourses}>
                        <XAxis dataKey="subject" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="progress" fill="#4F46E5" />
                    </BarChart>
                    </ResponsiveContainer>
                </div>
                </div>

                <div className="flex justify-end mb-4">
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

                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
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
                        <tr key={course.id} className="hover:bg-gray-50">
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
                        <td className="px-4 py-2 border-b">
                            <span className={`font-semibold ${getGradeColor(course.grade)}`}>
                            {course.grade}
                            </span>
                        </td>
                        <td className="px-4 py-2 border-b">
                            <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                                <div
                                className={`${getProgressColor(
                                    course.progress
                                )} h-2 rounded-full`}
                                style={{ width: `${course.progress}%` }}
                                ></div>
                            </div>
                            <span className="text-sm text-gray-600">
                                {course.progress}%
                            </span>
                            </div>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
            </div>
        </main>
    </div>
  );
};

export default MyGrades;