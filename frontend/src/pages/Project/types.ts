// Types
export interface Project {
    id: number
    name: string
    budget: number
    spent: number
    budgetStatus: string
    timeline: [Date, Date]
    risks: Risk[]
    resources: Resource[]
  }
  
  export interface Risk {
    id: number
    name: string
    level: 'Low' | 'Medium' | 'High'
    description: string
    impact: string
  }
  
  export interface Resource {
    id: number
    name: string
    allocation: number
    department: string
  }