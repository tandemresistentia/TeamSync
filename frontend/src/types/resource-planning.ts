export interface Resource {
  id: number
  name: string
  initials: string
  department: string
  skills: string[]
}

export interface Department {
  id: number
  name: string
  utilization: number
  capacity: number
  allocated: number
}

export interface Assignment {
  id: number
  resourceId: number
  project: string
  date: string
  hours: number
  type: 'development' | 'design' | 'meeting'
}

export interface Conflict {
  id: number
  message: string
  severity: 'high' | 'medium' | 'low'
}

export interface Stat {
  title: string
  value: string
  icon: any
  bgColor: string
  iconColor: string
  trend: number
}
