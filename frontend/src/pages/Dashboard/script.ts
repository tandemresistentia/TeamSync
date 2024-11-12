import { ref } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import {
  UsersIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XMarkIcon,
  PlusIcon,
  FolderPlusIcon,
  DocumentIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  BellIcon
} from '@heroicons/vue/24/outline'

import { alerts, teamMembers, projects, stats, chartOptions } from './data'

// Methods
const getStatusColor = (status: string) => ({
  'On Track': 'text-green-600',
  'At Risk': 'text-yellow-600',
  'Delayed': 'text-red-600'
}[status] || 'text-gray-600')

const getProgressColor = (progress: number) => {
  if (progress >= 75) return 'bg-green-600'
  if (progress >= 50) return 'bg-blue-600'
  if (progress >= 25) return 'bg-yellow-600'
  return 'bg-red-600'
}

const getAlertClass = (type: string) => ({
  'warning': 'bg-yellow-50 border-l-4 border-yellow-400',
  'error': 'bg-red-50 border-l-4 border-red-400',
  'info': 'bg-blue-50 border-l-4 border-blue-400'
}[type])

const getAlertIcon = (type: string) => ({
  'warning': ExclamationTriangleIcon,
  'error': XMarkIcon,
  'info': BellIcon
}[type])

const dismissAlert = (id: number) => {
  alerts.value = alerts.value.filter(alert => alert.id !== id)
}

const teamFilter = ref('all')

const openNewTaskModal = () => {
  console.log('Opening new task modal...')
}

const openNewProjectModal = () => {
  console.log('Opening new project modal...')
}

const generateReport = () => {
  console.log('Generating report...')
}

export {
  getStatusColor,
  getProgressColor,
  getAlertClass,
  getAlertIcon,
  dismissAlert,
  teamFilter,
  openNewTaskModal,
  openNewProjectModal,
  generateReport
}
