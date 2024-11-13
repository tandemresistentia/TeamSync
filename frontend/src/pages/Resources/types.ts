import type { ComponentPublicInstance } from 'vue'

declare global {
  export namespace JSX {
    interface Element extends Node {}
    interface ElementClass extends ComponentPublicInstance {}
    interface IntrinsicElements {
      [elem: string]: any
    }
  }
}

export interface Resource {
    id: number
    name: string
    initials: string
    department: string
    skills: string[]
  }
  
  export interface WeekDay {
    date: string
    dayName: string
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
  export interface Conflict {
    id: number
    type: 'overallocation' | 'scheduling' | 'timeoff' | 'dependency'
    message: string
    severity: 'high' | 'medium' | 'low'
    resources: string[]
    date: string
    projects?: string[]
  }