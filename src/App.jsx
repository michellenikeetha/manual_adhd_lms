// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from "./components/LandingPage";
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import ForgotPassword from './components/ForgotPassword';
import CoursesPage from './components/CoursesPage';
import ProfilePage from './components/ProfilePage';
import AssignmentsPage from './components/AssignmentsPage';
import SubmittedAssignments from './components/SubmittedAssignments';
import EditAssignment from './components/EditAssignment';
import SubmitAssignment from './components/SubmitAssignment';
import AnnouncementsPage from './components/AnnouncementsPage';
import AnnouncementDetail from './components/AnnouncementDetail';
import MaintenanceDetail from "./components/AnnouncementDetail2.jsx";
import WebinarDetail from "./components/AnnouncementDetails3.jsx";
import MyLearning from './components/MyLearningPage';
import MyCoursePage from './components/MyCoursePage.jsx';
import MyGrades from "./components/MyGrades.jsx";
import CalendarPage from "./components/CalendarPage.jsx";
import CourseContent from "./components/CourseContent.jsx";
import ProgrammingQuiz from "./components/Quiz.jsx";
import ViewCertificate from "./components/ViewCertificate.jsx";
import OlderAnnouncementsPage from "./components/OlderAnnouncements.jsx";
import Clarity from '@microsoft/clarity';

function App() {
  const projectId = "qiw91emtrr"
  Clarity.init(projectId);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/assignments" element={<AssignmentsPage />} />
        <Route path="/submitted-assignments" element={<SubmittedAssignments />} />
        <Route path="/submitted-assignments/edit-assignment" element={<EditAssignment />} />
        <Route path="/assignments/submit-assignment" element={<SubmitAssignment />} />
        <Route path="/announcements" element={<AnnouncementsPage />} />
        <Route path="/announcements/new-course:-ai-for-everyone" element={<AnnouncementDetail />} />
        <Route path="/announcements/platform-maintenance" element={<MaintenanceDetail />} />
        <Route path="/announcements/webinar:-future-of-tech" element={<WebinarDetail />} />
        <Route path="/announcements/older-announcements" element={<OlderAnnouncementsPage />} />
        <Route path="/my-learning" element={<MyLearning />} />
        <Route path="/my-learning/my-course" element={<MyCoursePage />} />
        <Route path="/my-learning/grades" element={<MyGrades />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/my-learning/my-course/course-content" element={<CourseContent />} />
        <Route path="/quiz" element={<ProgrammingQuiz />} />
        <Route path="/my-learning/view-certificate" element={<ViewCertificate />} />
      </Routes>
    </Router>
  );
}

export default App;
