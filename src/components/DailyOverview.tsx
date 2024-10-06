import React, { useState } from 'react';
import { Project, TimeEntry } from '../types';

interface DailyOverviewProps {
  date: Date;
  project: string | null;
  projects: Project[];
  timeEntries: TimeEntry[];
  onAddTimeEntry: (entry: TimeEntry) => void;
}

const DailyOverview: React.FC<DailyOverviewProps> = ({
  date,
  project,
  projects,
  timeEntries,
  onAddTimeEntry,
}) => {
  const [hours, setHours] = useState('');
  const [activity, setActivity] = useState('');
  const [selectedProject, setSelectedProject] = useState(project || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedProject && hours && activity) {
      onAddTimeEntry({
        id: Date.now().toString(),
        projectId: selectedProject,
        date: date,
        hours: parseFloat(hours),
        activity,
      });
      setHours('');
      setActivity('');
    }
  };

  const filteredEntries = timeEntries.filter(
    (entry) =>
      entry.date.toDateString() === date.toDateString() &&
      (project ? entry.projectId === project : true)
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">
        Daily Overview - {date.toLocaleDateString()}
      </h2>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            className="border rounded p-2"
            required
          >
            <option value="">Select Project</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
          <input
            type="number"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            placeholder="Hours"
            className="border rounded p-2"
            step="0.25"
            min="0"
            required
          />
          <input
            type="text"
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            placeholder="Activity"
            className="border rounded p-2"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
          >
            Add Entry
          </button>
        </div>
      </form>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2 bg-gray-100">Project</th>
            <th className="border p-2 bg-gray-100">Hours</th>
            <th className="border p-2 bg-gray-100">Activity</th>
          </tr>
        </thead>
        <tbody>
          {filteredEntries.map((entry) => (
            <tr key={entry.id}>
              <td className="border p-2">
                {projects.find((p) => p.id === entry.projectId)?.name}
              </td>
              <td className="border p-2 text-center">{entry.hours}</td>
              <td className="border p-2">{entry.activity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DailyOverview;