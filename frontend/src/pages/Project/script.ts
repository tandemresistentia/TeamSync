import { computed } from 'vue'
import { useProjectData } from './data'

const { projects, selectedProject } = useProjectData()

export const formatNumber = (num: number) => {
  return num.toLocaleString('en-US')
}

export const getBudgetStatusColor = (status: string) => ({
  'Under Budget': 'text-green-600',
  'On Budget': 'text-blue-600',
  'Over Budget': 'text-red-600'
}[status])

export const getBudgetProgressColor = (percentage: number) => {
  if (percentage <= 85) return 'bg-green-600'
  if (percentage <= 100) return 'bg-yellow-600'
  return 'bg-red-600'
}

export const getRiskClass = (level: string) => ({
  'Low': 'border-green-200 bg-green-50',
  'Medium': 'border-yellow-200 bg-yellow-50',
  'High': 'border-red-200 bg-red-50'
}[level])

export const getRiskBadgeClass = (level: string) => ({
  'Low': 'px-2 py-1 text-xs rounded-full bg-green-100 text-green-800',
  'Medium': 'px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800',
  'High': 'px-2 py-1 text-xs rounded-full bg-red-100 text-red-800'
}[level])

export const filteredProjects = computed(() => {
  if (selectedProject.value === 'all') {
    return projects.value
  }
  return projects.value.filter(p => p.id === parseInt(selectedProject.value))
})