
// Types
export interface TeamMember {
    id: number
    name: string
    role: string
    department: string
    availability: string
    skills: string[]
    avatar?: string
  }

export interface Leave {
id: number
member: string
type: string
dates: string
}

export interface ChartOptions {
    skillsChartOptions: any  // Define proper type
    skillsChartSeries: any[] // Define proper type
    capacityChartOptions: any // Define proper type
    capacityChartSeries: any[] // Define proper type
  }