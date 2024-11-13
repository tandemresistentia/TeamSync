import { ref } from 'vue'
import {
  UsersIcon,
  ClockIcon,
  BriefcaseIcon,
  AlertTriangleIcon,
} from 'lucide-vue-next'
import { Resource,Department,Assignment,Conflict } from './types'
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
    skills: ['React', 'Node.js', 'TypeScript', 'AWS']
  },
  {
    id: 2,
    name: 'Jane Smith',
    initials: 'JS',
    department: 'Design',
    skills: ['UI/UX', 'Figma', 'Adobe XD', 'Prototyping']
  },
  {
    id: 3,
    name: 'Mike Johnson',
    initials: 'MJ',
    department: 'Marketing',
    skills: ['Content Strategy', 'SEO', 'Analytics', 'Social Media']
  },
  {
    id: 4,
    name: 'Sarah Williams',
    initials: 'SW',
    department: 'Development',
    skills: ['Python', 'Django', 'PostgreSQL', 'Docker']
  },
  {
    id: 5,
    name: 'David Lee',
    initials: 'DL',
    department: 'Design',
    skills: ['Graphic Design', 'Illustration', 'Branding', 'Motion Design']
  },
  {
    id: 6,
    name: 'Emma Wilson',
    initials: 'EW',
    department: 'Development',
    skills: ['Vue.js', 'PHP', 'MySQL', 'Laravel']
  },
  {
    id: 7,
    name: 'Alex Chen',
    initials: 'AC',
    department: 'Development',
    skills: ['Angular', 'Java', 'Spring Boot', 'MongoDB']
  },
  {
    id: 8,
    name: 'Lisa Anderson',
    initials: 'LA',
    department: 'Design',
    skills: ['Product Design', 'Wireframing', 'User Testing', 'Sketch']
  },
  {
    id: 9,
    name: 'Tom Brown',
    initials: 'TB',
    department: 'Development',
    skills: ['DevOps', 'Kubernetes', 'Jenkins', 'Terraform']
  },
  {
    id: 10,
    name: 'Maria Garcia',
    initials: 'MG',
    department: 'Marketing',
    skills: ['Digital Marketing', 'Campaign Management', 'Google Analytics', 'CRM']
  },
  {
    id: 11,
    name: 'Chris Taylor',
    initials: 'CT',
    department: 'Development',
    skills: ['iOS', 'Swift', 'SwiftUI', 'Objective-C']
  },
  {
    id: 12,
    name: 'Sophie Martin',
    initials: 'SM',
    department: 'Design',
    skills: ['Design Systems', 'Typography', 'Color Theory', 'Accessibility']
  },
  {
    id: 13,
    name: 'Ryan Cooper',
    initials: 'RC',
    department: 'Development',
    skills: ['Android', 'Kotlin', 'Firebase', 'Room']
  },
  {
    id: 14,
    name: 'Hannah Kim',
    initials: 'HK',
    department: 'Marketing',
    skills: ['Email Marketing', 'A/B Testing', 'Marketing Automation', 'Copywriting']
  },
  {
    id: 15,
    name: 'Kevin Patel',
    initials: 'KP',
    department: 'Development',
    skills: ['C#', '.NET', 'Azure', 'SQL Server']
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
export const conflicts = ref<Conflict[]>([
  {
    id: 1,
    type: 'overallocation',
    message: 'John Doe is allocated for 12 hours on Nov 15 (exceeds 8 hour capacity)',
    severity: 'high',
    resources: ['John Doe'],
    date: '2024-11-15',
    projects: ['Website Redesign', 'Mobile App']
  },
  {
    id: 2,
    type: 'scheduling',
    message: 'Schedule overlap: Jane Smith has 2 concurrent meetings (10:00 AM - 11:00 AM)',
    severity: 'medium',
    resources: ['Jane Smith'],
    date: '2024-11-14',
    projects: ['Team Sync', 'Client Meeting']
  },
  {
    id: 3,
    type: 'timeoff',
    message: 'Resource assigned during approved time off: Mike Johnson on Nov 16',
    severity: 'high',
    resources: ['Mike Johnson'],
    date: '2024-11-16',
    projects: ['Database Migration']
  },
  {
    id: 4,
    type: 'dependency',
    message: 'Task dependency conflict: Design phase not completed before development start',
    severity: 'medium',
    resources: ['Sarah Williams', 'John Doe'],
    date: '2024-11-17',
    projects: ['Mobile App']
  },
  {
    id: 5,
    type: 'overallocation',
    message: 'Design team at 120% capacity for the week of Nov 15',
    severity: 'high',
    resources: ['Jane Smith', 'Sarah Williams'],
    date: '2024-11-15'
  }
])