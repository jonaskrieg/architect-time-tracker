import React from 'react';
import { Project, TimeEntry } from '../types';

interface MonthlyOverviewProps {
  date: Date;
  projects: Project[];
  timeEntries: TimeEntry[];
  onDateClick: (date: Date) => void;
  onProjectClick: (projectId: string) => void;
}

const MonthlyOverview: React.FC<MonthlyOverviewProps> = ({
  date,
  projects,
  timeEntries,
  onDateClick,
  onProjectClick,
}) => {
  const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const getHoursForProjectAndDay = (projectId: string, day: number) => {
    return timeEntries
      .filter(
        (entry) =>
          entry.projectId === projectId &&
          entry.date.getFullYear() === date.getFullYear() &&
          entry.date.getMonth() === date.getMonth() &&
          entry.date.getDate() === day
      )
      .reduce((sum, entry) => sum + entry.hours, 0);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
      <h2 className="text-2xl font-semibold mb-4">
        Monthly Overview - {date.toLocaleString('default', { month: 'long', year: 'numeric' })}
      </h2>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2 bg-gray-100">Project</th>
            {days.map((day) => (
              <th key={day} className="border p-2 bg-gray-100">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td className="border p-2 font-semibold">{project.name}</td>
              {days.map((day) => {
                const hours = getHoursForProjectAndDay(project.id, day);
                return (
                  <td
                    key={`${project.id}-${day}`}
                    className="border p-2 text-center cursor-pointer hover:bg-blue-100"
                    onClick={() => {
                      onDateClick(new Date(date.getFullYear(), date.getMonth(), day));
                      onProjectClick(project.id);
                    }}
                  >
                    {hours > 0 ? hours : ''}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MonthlyOverview;