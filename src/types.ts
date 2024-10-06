export interface Project {
  id: string;
  name: string;
}

export interface TimeEntry {
  id: string;
  projectId: string;
  date: Date;
  hours: number;
  activity: string;
}