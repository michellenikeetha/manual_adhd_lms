import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Award, BookOpen, TrendingUp, Search, Filter, AlertCircle, CheckCircle } from "lucide-react";
import SignedInNavbar from "./SignedInNavbar";

const MyGrades = () => {
  const [selectedFilter, setSelectedFilter] = useState("All Courses");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedRow, setExpandedRow] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState("table"); // table or cards
  const [focusMode, setFocusMode] = useState(false);

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

  const filteredCourses = courses
    .filter(course => {
      if (selectedFilter === "All Courses") return true;
      return course.grade === selectedFilter || course.subject === selectedFilter;
    })
    .filter(course => 
      course.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.activity.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const stats = {
    averageProgress: Math.round(
      filteredCourses.reduce((acc, course) => acc + course.progress, 0) /
        filteredCourses.length
    ),
    completedCourses: filteredCourses.filter((course) => course.progress === 100).length,
    totalCourses: filteredCourses.length,
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

  const CourseCard = ({ course }) => (
    <div 
      className={`bg-white rounded-lg shadow-lg p-4 transition-all duration-200 
        ${expandedRow === course.id ? 'ring-2 ring-blue-400' : 'hover:shadow-xl'}`}
      onClick={() => setExpandedRow(expandedRow === course.id ? null : course.id)}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-semibold text-blue-600">{course.subject}</h3>
          <p className="text-sm text-gray-500">Beginner Level</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
          course.grade === 'A' ? 'bg-green-100 text-green-800' :
          course.grade === 'B' ? 'bg-blue-100 text-blue-800' :
          course.grade === 'C' ? 'bg-yellow-100 text-yellow-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {course.grade}
        </span>
      </div>

      <div className="mb-3">
        <p className="text-gray-700">{course.activity}</p>
        <p className="text-sm text-gray-500">{course.date}</p>
      </div>

      <div className="flex items-center">
        <div className="flex-1 mr-3">
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all duration-500 ${
                course.progress >= 80 ? 'bg-green-500' :
                course.progress >= 60 ? 'bg-blue-500' :
                course.progress >= 40 ? 'bg-yellow-500' :
                'bg-red-500'
              }`}
              style={{ width: `${course.progress}%` }}
            />
          </div>
        </div>
        <span className="text-sm font-semibold">{course.progress}%</span>
      </div>

      {expandedRow === course.id && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold mb-2">Course Details</h4>
          <ul className="space-y-2">
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              Last accessed: 2 days ago
            </li>
            <li className="flex items-center">
              <AlertCircle className="w-4 h-4 text-yellow-500 mr-2" />
              Next deadline: In 5 days
            </li>
          </ul>
        </div>
      )}
    </div>
  );

  return (
    <div className={`min-h-screen ${focusMode ? 'bg-gray-100' : 'bg-gray-50'}`}>
      <SignedInNavbar />

      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">My Grades</h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setFocusMode(!focusMode)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  focusMode ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
                }`}
              >
                Focus Mode
              </button>
              <button
                onClick={() => setViewMode(viewMode === 'table' ? 'cards' : 'table')}
                className="px-4 py-2 bg-white rounded-lg text-gray-700 hover:bg-gray-100"
              >
                {viewMode === 'table' ? 'Card View' : 'Table View'}
              </button>
            </div>
          </div>

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
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
              </div>
              
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  <Filter size={20} />
                  <span>Filters</span>
                </button>
              </div>
            </div>

            {showFilters && (
              <div className="mt-4 flex flex-wrap gap-2">
                {['All Courses', 'A', 'B', 'C', '-', 'Computer Science', 'Algebra', 'Introduction to AI'].map(filter => (
                  <button
                    key={filter}
                    onClick={() => setSelectedFilter(filter)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      selectedFilter === filter
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {filter.startsWith('Grade:') ? filter : filter === '-' ? 'No Grade' : filter}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white p-4 rounded-lg shadow mb-6">
            <h2 className="text-lg font-semibold mb-4">Progress Overview</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={filteredCourses}>
                  <XAxis dataKey="subject" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      background: 'white', 
                      border: 'none', 
                      borderRadius: '8px', 
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)' 
                    }}
                  />
                  <Bar 
                    dataKey="progress" 
                    fill="#4F46E5"
                    animationDuration={1000}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {viewMode === 'cards' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
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
          )}
        </div>
      </main>
    </div>
  );
};

export default MyGrades;