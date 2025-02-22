import React, { useState, useEffect } from "react";
import { format, addMonths, subMonths } from "date-fns";
import { Calendar, Plus, X, Clock, FileText, CheckCircle, AlertCircle, Brain, Timer, Star, BellRing } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SignedInNavbar from "./SignedInNavbar";

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [isEventModalOpen, setEventModalOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [colorMode, setColorMode] = useState('default'); // 'default', 'focused', 'calm'
  const [showReminder, setShowReminder] = useState(false);
  
  // Enhanced mock events with ADHD-friendly properties
  const mockEvents = {
    "2024-09-15": [
      { 
        title: "Team Meeting", 
        description: "Weekly sync with the team",
        priority: "high",
        duration: 60,
        breakdownSteps: ["Review agenda", "Prepare notes", "Join call"],
        reminder: 15
      },
      { 
        title: "Lunch with Client", 
        description: "Discussion about new project",
        priority: "medium",
        duration: 45,
        breakdownSteps: ["Review project docs", "Meet at cafe"],
        reminder: 10
      }
    ],
    "2024-09-20": [
      { 
        title: "Product Launch", 
        description: "New feature release",
        priority: "high",
        duration: 120,
        breakdownSteps: ["Check presentation", "Test demo", "Setup room"],
        reminder: 30
      }
    ]
  };

  const [events, setEvents] = useState(mockEvents);
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    description: "",
    priority: "medium",
    duration: 30,
    breakdownSteps: [],
    reminder: 15
  });

  useEffect(() => {
    // Show time-based reminders
    const checkUpcomingEvents = () => {
      const now = new Date();
      const todayStr = format(now, "yyyy-MM-dd");
      const todayEvents = events[todayStr] || [];
      
      todayEvents.forEach(event => {
        if (event.reminder && !event.reminded) {
          setShowReminder(true);
          setTimeout(() => setShowReminder(false), 5000);
        }
      });
    };

    const interval = setInterval(checkUpcomingEvents, 60000);
    return () => clearInterval(interval);
  }, [events]);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const handleCreateEvent = () => {
    if (newEvent.title && newEvent.date) {
      const updatedEvents = { ...events };
      if (!updatedEvents[newEvent.date]) {
        updatedEvents[newEvent.date] = [];
      }
      updatedEvents[newEvent.date].push({
        ...newEvent,
        breakdownSteps: newEvent.breakdownSteps.filter(step => step.trim() !== '')
      });
      
      setEvents(updatedEvents);
      setNewEvent({
        title: "",
        date: "",
        description: "",
        priority: "medium",
        duration: 30,
        breakdownSteps: [],
        reminder: 15
      });
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

  const getDayClass = (day, events) => {
    const today = new Date().getDate();
    const isToday = day === today;
    const hasHighPriority = events.some(e => e.priority === 'high');
    
    return `
      relative p-4 rounded-xl transition-all duration-200 
      ${hasHighPriority ? "bg-red-50 hover:bg-red-100" : events.length ? "bg-blue-50 hover:bg-blue-100" : "hover:bg-gray-100"}
      ${isToday ? "ring-2 ring-blue-500" : ""}
      cursor-pointer
      transform hover:scale-105 transition-transform
    `;
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      colorMode === 'focused' ? 'bg-gray-100' : 
      colorMode === 'calm' ? 'bg-blue-50' : 
      'bg-gray-50'
    }`}>
      <SignedInNavbar />

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-gray-800">Calendar</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex gap-2 bg-white p-2 rounded-xl shadow-sm">
              <button
                onClick={() => setColorMode('default')}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  colorMode === 'default' ? 'bg-blue-100' : 'hover:bg-gray-100'
                }`}
                title="Default Mode"
              >
                <Calendar className="w-5 h-5" />
              </button>
              <button
                onClick={() => setColorMode('focused')}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  colorMode === 'focused' ? 'bg-blue-100' : 'hover:bg-gray-100'
                }`}
                title="Focus Mode"
              >
                <Brain className="w-5 h-5" />
              </button>
              <button
                onClick={() => setColorMode('calm')}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  colorMode === 'calm' ? 'bg-blue-100' : 'hover:bg-gray-100'
                }`}
                title="Calm Mode"
              >
                <Star className="w-5 h-5" />
              </button>
            </div>
            <button
              onClick={() => setEventModalOpen(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 shadow-sm transition-all duration-200 hover:scale-105"
            >
              <Plus className="w-5 h-5" />
              New Event
            </button>
          </div>
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
              const dayEvents = eventsForDate(formattedDate);
              return (
                <button
                  key={day}
                  onClick={() => setSelectedDate(formattedDate)}
                  className={getDayClass(day, dayEvents)}
                >
                  <span className="block text-lg font-medium text-gray-700">
                    {day}
                  </span>
                  {dayEvents.length > 0 && (
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
                      {dayEvents.map((_, i) => (
                        <div 
                          key={i}
                          className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                            dayEvents[i].priority === 'high' ? 'bg-red-500' :
                            dayEvents[i].priority === 'medium' ? 'bg-yellow-500' :
                            'bg-blue-500'
                          }`}
                        ></div>
                      ))}
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
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:scale-102 ${
                      getPriorityColor(event.priority)
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <h4 className="font-semibold text-lg mb-2">
                        {event.title}
                      </h4>
                      <div className="flex items-center gap-2">
                        <Timer className="w-4 h-4" />
                        <span>{event.duration} min</span>
                      </div>
                    </div>
                    <p className="mb-3">{event.description}</p>
                    {event.breakdownSteps && event.breakdownSteps.length > 0 && (
                      <div className="mt-3">
                        <h5 className="font-medium mb-2">Steps:</h5>
                        <ul className="space-y-1">
                          {event.breakdownSteps.map((step, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-xs">
                                {i + 1}
                              </div>
                              {step}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </motion.li>
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
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Priority
                    </label>
                    <select
                      value={newEvent.priority}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, priority: e.target.value })
                        }
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    >
                      <option value="low">Low Priority</option>
                      <option value="medium">Medium Priority</option>
                      <option value="high">High Priority</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Duration (min)
                    </label>
                    <input
                      type="number"
                      value={newEvent.duration}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, duration: parseInt(e.target.value) })
                      }
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
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
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all h-24"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Break Down Steps (Optional)
                  </label>
                  <div className="space-y-2">
                    {newEvent.breakdownSteps.map((step, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={step}
                          onChange={(e) => {
                            const updatedSteps = [...newEvent.breakdownSteps];
                            updatedSteps[index] = e.target.value;
                            setNewEvent({ ...newEvent, breakdownSteps: updatedSteps });
                          }}
                          placeholder={`Step ${index + 1}`}
                          className="flex-1 border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        />
                        <button
                          onClick={() => {
                            const updatedSteps = newEvent.breakdownSteps.filter((_, i) => i !== index);
                            setNewEvent({ ...newEvent, breakdownSteps: updatedSteps });
                          }}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => setNewEvent({
                        ...newEvent,
                        breakdownSteps: [...newEvent.breakdownSteps, ""]
                      })}
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Add Step
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reminder (minutes before)
                  </label>
                  <select
                    value={newEvent.reminder}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, reminder: parseInt(e.target.value) })
                    }
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  >
                    <option value="5">5 minutes</option>
                    <option value="10">10 minutes</option>
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="60">1 hour</option>
                  </select>
                </div>
                <button
                  onClick={handleCreateEvent}
                  className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  Create Event
                </button>
              </div>
            </div>
          </div>
        )}

        <AnimatePresence>
          {showNotification && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2"
            >
              <CheckCircle className="w-5 h-5" />
              Event created successfully!
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showReminder && (
            <motion.div
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              className="fixed top-4 right-4 bg-blue-500 text-white px-6 py-4 rounded-xl shadow-lg flex items-center gap-3"
            >
              <BellRing className="w-6 h-6" />
              <div>
                <h4 className="font-medium">Upcoming Event Reminder</h4>
                <p className="text-sm opacity-90">Don't forget about your scheduled event!</p>
              </div>
              <button
                onClick={() => setShowReminder(false)}
                className="ml-2 p-1 hover:bg-blue-600 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default CalendarPage;