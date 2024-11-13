import { ref } from 'vue'
import {
  UsersIcon,
  BriefcaseIcon,
  ChartBarIcon,
  CalendarIcon
} from '@heroicons/vue/24/outline'

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

// State
export const search = ref('')
export const departmentFilter = ref('all')

// Mock Data
export const teamMetrics = [
  {
    title: 'Total Members',
    value: '24',
    subtext: '3 joining this month',
    icon: UsersIcon,
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-600'
  },
  {
    title: 'Skill Coverage',
    value: '85%',
    subtext: 'Across all projects',
    icon: ChartBarIcon,
    bgColor: 'bg-purple-100',
    iconColor: 'text-purple-600'
  },
  {
    title: 'Planned Leave',
    value: '5',
    subtext: 'Next 30 days',
    icon: CalendarIcon,
    bgColor: 'bg-yellow-100',
    iconColor: 'text-yellow-600'
  }
]

export const teamMembers = ref<TeamMember[]>([
  {
    id: 1,
    name: 'John Doe',
    role: 'Senior Developer',
    department: 'development',
    availability: 'Available',
    skills: ['React', 'Node.js', 'TypeScript', 'AWS']
  },
  {
    id: 2,
    name: 'Jane Smith',
    role: 'UI/UX Designer',
    department: 'design',
    availability: 'On Leave',
    skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping']
  },
  {
    id: 3,
    name: 'Mike Johnson',
    role: 'Marketing Manager',
    department: 'marketing',
    availability: 'In Meeting',
    skills: ['Content Strategy', 'SEO', 'Analytics', 'Social Media']
  }
])

export const upcomingLeave = ref<Leave[]>([
  { id: 1, member: 'Jane Smith', type: 'Vacation', dates: 'Dec 20-27' },
  { id: 2, member: 'Mike Johnson', type: 'Personal', dates: 'Dec 15' },
  { id: 3, member: 'John Doe', type: 'Sick Leave', dates: 'Dec 10' }
])

// Chart Configurations
export const skillsChartOptions = {
  chart: {
    type: 'radar',
    toolbar: { show: false }
  },
  labels: ['Frontend', 'Backend', 'DevOps', 'Design', 'Mobile', 'Data'],
  plotOptions: {
    radar: {
      polygons: {
        strokeColors: '#e2e8f0',
        fill: {
          colors: ['#f8fafc', '#f1f5f9']
        }
      }
    }
  }
}

export const skillsChartSeries = [{
  name: 'Team Skills',
  data: [80, 65, 45, 70, 60, 40]
}]

export const capacityChartOptions = {
  chart: {
    type: 'bar',
    toolbar: { show: false }
  },
  plotOptions: {
    bar: { horizontal: true, borderRadius: 4 }
  },
  xaxis: {
    categories: ['Development', 'Design', 'Marketing']
  }
}

export const capacityChartSeries = [{
  name: 'Current Load',
  data: [85, 65, 45]
}]
