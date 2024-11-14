export interface Resource {
  id: number;
  name: string;
  initials: string;
  department: string;
  skills: string[];
}

export interface Department {
  id: number;
  name: string;
  utilization: number;
  capacity: number;
  allocated: number;
}

export interface Assignment {
  id: number;
  resourceId: number;
  project: string;
  date: string;
  hours: number;
  type: string;
}

export interface Conflict {
  id: number;
  type: string;
  message: string;
  severity: string;
  resources: string[];
  date: string;
  projects?: string[];
}


export interface WeekDay {
  date: string
  dayName: string
}