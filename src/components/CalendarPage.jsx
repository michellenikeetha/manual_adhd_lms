import React, { useState, useEffect } from "react";
import { format, addMonths, subMonths } from "date-fns";
import { Calendar, Plus, X, Clock, FileText, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "recharts";
import SignedInNavbar from "./SignedInNavbar";

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [isEventModalOpen, setEventModalOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  
  // Mock events data
  const mockEvents = {
    "2024-09-15": [
      { title: "Team Meeting", description: "Weekly sync with the team" },
      { title: "Lunch with Client", description: "Discussion about new project" }
    ],
    "2024-09-20": [
      { title: "Product Launch", description: "New feature release" }
    ],
    "2024-09-25": [
      { title: "Training Session", description: "React advanced concepts" },
      { title: "Code Review", description: "Review PR #123" }
    ]
  };

  const [events, setEvents] = useState(mockEvents);
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    description: ""
  });

  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const handleCreateEvent = () => {
    if (newEvent.title && newEvent.date) {
      const updatedEvents = { ...events };
      if (!updatedEvents[newEvent.date]) {
        updatedEvents[newEvent.date] = [];
      }
      updatedEvents[newEvent.date].push({
        title: newEvent.title,
        description: newEvent.description
      });
      
      setEvents(updatedEvents);
      setNewEvent({ title: "", date: "", description: "" });
      setEventModalOpen(false);
      
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }
  };

  const handleMonthChange = (direction) => {
    setCurrentDate(direction === 'next' ? 
      addMonths(currentDate, 1) : 
      subMonths(currentDate, 1)
    );
  };

  const eventsForDate = (date) => {
    return events[date] || [];
  };

  const getDayClass = (day, hasEvent) => {
    const today = new Date().getDate();
    const isToday = day === today;
    
    return `
      relative p-4 rounded-xl transition-all duration-200 
      ${hasEvent ? "bg-blue-50 hover:bg-blue-100" : "hover:bg-gray-100"}
      ${isToday ? "ring-2 ring-blue-500" : ""}
      cursor-pointer
      transform hover:scale-105 transition-transform
    `;
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <SignedInNavbar />

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            {/* <Calendar className="w-8 h-8 text-blue-600" /> */}
            <h1 className="text-3xl font-bold text-gray-800">Calendar</h1>
          </div>
          <button
            onClick={() => setEventModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 shadow-sm transition-all duration-200 hover:scale-105"
          >
            <Plus className="w-5 h-5" />
            New Event
          </button>
        </div>

        <div className="bg-white shadow-xl rounded-2xl p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-800">
              {format(currentDate, "MMMM yyyy")}
            </h2>
            <div className="flex gap-2">
              <button 
                onClick={() => handleMonthChange('prev')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 hover:scale-110"
              >
                ←
              </button>
              <button 
                onClick={() => handleMonthChange('next')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 hover:scale-110"
              >
                →
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-4 mb-4">
            {weekDays.map((day) => (
              <div key={day} className="text-center font-medium text-gray-600">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-4">
            {daysInMonth.map((day) => {
              const formattedDate = `2024-09-${String(day).padStart(2, "0")}`;
              const hasEvent = eventsForDate(formattedDate).length > 0;
              return (
                <button
                  key={day}
                  onClick={() => setSelectedDate(formattedDate)}
                  className={getDayClass(day, hasEvent)}
                >
                  <span className="block text-lg font-medium text-gray-700">
                    {day}
                  </span>
                  {hasEvent && (
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {selectedDate && (
          <div className="mt-8 bg-white shadow-xl rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              Events on {format(new Date(selectedDate), "EEEE, MMMM d, yyyy")}
            </h3>
            <ul className="mt-4 space-y-3">
              {eventsForDate(selectedDate).length > 0 ? (
                eventsForDate(selectedDate).map((event, index) => (
                  <li
                    key={index}
                    className="bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:scale-102"
                  >
                    <h4 className="text-blue-600 font-semibold text-lg mb-2">
                      {event.title}
                    </h4>
                    <p className="text-gray-600">{event.description}</p>
                  </li>
                ))
              ) : (
                <p className="text-gray-600 text-center py-8">
                  No events scheduled for this day.
                </p>
              )}
            </ul>
          </div>
        )}

        {isEventModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center backdrop-blur-sm">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  New Event
                </h2>
                <button
                  onClick={() => setEventModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Event Title
                  </label>
                  <input
                    type="text"
                    placeholder="Enter event title"
                    value={newEvent.title}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, title: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={newEvent.date}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, date: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    placeholder="Enter event description"
                    value={newEvent.description}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, description: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all min-h-[100px]"
                  ></textarea>
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setEventModalOpen(false)}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateEvent}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200"
                >
                  Create Event
                </button>
              </div>
            </div>
          </div>
        )}

        {showNotification && (
          <div className="fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Event created successfully!
          </div>
        )}
      </main>
    </div>
  );
};

export default CalendarPage;