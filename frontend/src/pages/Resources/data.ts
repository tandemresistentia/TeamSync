import { ref } from 'vue'
import {
  UsersIcon,
  ClockIcon,
  BriefcaseIcon,
  AlertTriangleIcon,
} from 'lucide-vue-next'
import { Resource,Department,Assignment } from './types'
// State
export const selectedView = ref('calendar')
export const showAddResourceModal = ref(false)
export const newResource = ref({
  name: '',
  department: '',
  skills: ''
})

// Mock Data
export const resources = ref<Resource[]>([
  {
    id: 1,
    name: 'John Doe',
    initials: 'JD',
    department: 'Development',
    skills: ['React', 'Node.js']
  },
  {
    id: 2,
    name: 'Jane Smith',
    initials: 'JS',
    department: 'Design',
    skills: ['UI/UX', 'Figma']
  }
])

export const departments = ref<Department[]>([
  {
    id: 1,
    name: 'Development',
    utilization: 85,
    capacity: 160,
    allocated: 136
  },
  {
    id: 2,
    name: 'Design',
    utilization: 70,
    capacity: 120,
    allocated: 84
  }
])

export const assignments = ref<Assignment[]>([
  {
    id: 1,
    resourceId: 1,
    project: 'Website Redesign',
    date: '2024-11-11',
    hours: 6,
    type: 'development'
  },
  {
    id: 2,
    resourceId: 1,
    project: 'Team Meeting',
    date: '2024-11-11',
    hours: 2,
    type: 'meeting'
  },
  {
    id: 3,
    resourceId: 2,
    project: 'Mobile App UI',
    date: '2024-11-11',
    hours: 4,
    type: 'design'
  }
])

// Stats data
export const stats = [
  {
    title: 'Team Capacity',
    value: '280h',
    icon: UsersIcon,
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-600',
    trend: 5
  },
  {
    title: 'Utilization Rate',
    value: '78%',
    icon: ClockIcon,
    bgColor: 'bg-green-100',
    iconColor: 'text-green-600',
    trend: -2
  },
  {
    title: 'Active Projects',
    value: '12',
    icon: BriefcaseIcon,
    bgColor: 'bg-purple-100',
    iconColor: 'text-purple-600',
    trend: 8
  },
  {
    title: 'Resource Conflicts',
    value: '3',
    icon: AlertTriangleIcon,
    bgColor: 'bg-yellow-100',
    iconColor: 'text-yellow-600',
    trend: -15
  }
]
