import { ref } from 'vue'
import {
  UsersIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  BellIcon
} from '@heroicons/vue/24/outline'
export const alerts = ref([
  { id: 1, type: 'warning', message: '3 team members are approaching capacity' },
  { id: 2, type: 'info', message: 'New project resources available' },
  { id: 3, type: 'error', message: 'Server capacity reaching critical levels' }
])

export const teamMembers = ref([
  { id: 1, name: 'John Doe', status: 'available', availability: 85 },
  { id: 2, name: 'Jane Smith', status: 'busy', availability: 25 },
  { id: 3, name: 'Mike Johnson', status: 'available', availability: 60 },
  { id: 4, name: 'Sarah Williams', status: 'busy', availability: 30 }
])

export const projects = ref([
  { 
    id: 1, 
    name: 'Website Redesign', 
    status: 'On Track', 
    progress: 75,
    dueDate: '2024-12-01'
  },
  { 
    id: 2, 
    name: 'Mobile App', 
    status: 'At Risk', 
    progress: 45,
    dueDate: '2024-11-15'
  },
  { 
    id: 3, 
    name: 'Database Migration', 
    status: 'Delayed', 
    progress: 30,
    dueDate: '2024-10-30'
  }
])

export const stats = [
  {
    title: 'Team Availability',
    value: '85%',
    icon: UsersIcon,
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-600',
    trend: '+5% vs last week',
    trendIcon: ArrowTrendingUpIcon,
    trendColor: 'text-green-600'
  },
  {
    title: 'Projects On Track',
    value: '8/10',
    icon: CheckCircleIcon,
    bgColor: 'bg-green-100',
    iconColor: 'text-green-600',
    trend: '+2 vs last month',
    trendIcon: ArrowTrendingUpIcon,
    trendColor: 'text-green-600'
  },
  {
    title: 'Resource Usage',
    value: '72%',
    icon: ClockIcon,
    bgColor: 'bg-purple-100',
    iconColor: 'text-purple-600',
    trend: '-3% vs last week',
    trendIcon: ArrowTrendingDownIcon,
    trendColor: 'text-red-600'
  },
  {
    title: 'Pending Tasks',
    value: '24',
    icon: BellIcon,
    bgColor: 'bg-yellow-100',
    iconColor: 'text-yellow-600',
    trend: '4 urgent',
    trendIcon: ExclamationTriangleIcon,
    trendColor: 'text-yellow-600'
  }
]

export const chartOptions = {
  productivityChartOptions: {
    chart: {
      type: 'line',
      toolbar: { show: false }
    },
    stroke: { curve: 'smooth', width: 3 },
    colors: ['#3B82F6', '#10B981'],
    grid: { borderColor: '#f3f4f6' },
    xaxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
    },
    yaxis: [
      {
        title: { text: 'Tasks' }
      },
      {
        opposite: true,
        title: { text: 'Hours' }
      }
    ]
  },
  productivityChartSeries: [
    {
      name: 'Tasks Completed',
      data: [30, 40, 35, 50, 45]
    },
    {
      name: 'Hours Worked',
      data: [45, 52, 49, 56, 50]
    }
  ],
  resourceChartOptions: {
    chart: {
      type: 'bar',
      toolbar: { show: false }
    },
    plotOptions: {
      bar: { horizontal: true, borderRadius: 4 }
    },
    colors: ['#3B82F6'],
    grid: { borderColor: '#f3f4f6' },
    xaxis: {
      categories: ['Server', 'Storage', 'Bandwidth', 'CPU', 'Memory']
    }
  },
  resourceChartSeries: [{
    name: 'Usage',
    data: [85, 72, 65, 89, 76]
  }]
}
