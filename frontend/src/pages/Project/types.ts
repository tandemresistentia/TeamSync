// Types
export interface Project {
  id: number
  name: string
  budget: number
  spent: number
  budgetStatus: string
  timeline: [Date, Date]
  risks: ProjectRisk[]
  resources: string[]
}

export interface HealthMetric {
  id: number
  title: string
  value: string
  trend: string
  progress: number
  trendIcon: any
  trendColor: string
  progressColor: string
}

export interface ProjectRisk {
  id: number
  name: string
  level: string
  description: string
  impact: string
}