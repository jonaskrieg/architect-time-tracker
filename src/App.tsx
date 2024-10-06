import React, { useState } from 'react';
import { Calendar, Clock } from 'lucide-react';
import YearlyOverview from './components/YearlyOverview';
import MonthlyOverview from './components/MonthlyOverview';
import DailyOverview from './components/DailyOverview';
import { Project, TimeEntry } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<'yearly' | 'monthly' | 'daily'>('monthly');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([
    { id: '1', name: 'Project A' },
    { id: '2', name: 'Project B' },
    { id: '3', name: 'Project C' },
  ]);
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setView('daily');
  };

  const handleProjectClick = (projectId: string) => {
    setSelectedProject(projectId);
    setView('daily');
  };

  const handleAddTimeEntry = (entry: TimeEntry) => {
    setTimeEntries([...timeEntries, entry]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Architect Time Tracker</h1>
        <div className="flex space-x-4">
          <button
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => setView('yearly')}
          >
            <Calendar className="mr-2" size={20} />
            Yearly Overview
          </button>
          <button
            className="flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={() => setView('monthly')}
          >
            <Calendar className="mr-2" size={20} />
            Monthly Overview
          </button>
          <button
            className="flex items-center px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
            onClick={() => setView('daily')}
          >
            <Clock className="mr-2" size={20} />
            Daily Overview
          </button>
        </div>
      </header>
      <main>
        {view === 'yearly' && <YearlyOverview />}
        {view === 'monthly' && (
          <MonthlyOverview
            date={selectedDate}
            projects={projects}
            timeEntries={timeEntries}
            onDateClick={handleDateClick}
            onProjectClick={handleProjectClick}
          />
        )}
        {view === 'daily' && (
          <DailyOverview
            date={selectedDate}
            project={selectedProject}
            projects={projects}
            timeEntries={timeEntries}
            onAddTimeEntry={handleAddTimeEntry}
          />
        )}
      </main>
    </div>
  );
};

export default App;