import { ref, computed, watch } from 'vue'
import { format, addDays, startOfWeek, endOfWeek } from 'date-fns'
import { assignments, resources, departments, newResource,showAddResourceModal } from './data'
import type { Assignment, Conflict,WeekDay } from './types'

// Calendar state
export const currentWeekStart = ref(startOfWeek(new Date()))
export const currentWeekEnd = ref(endOfWeek(new Date()))

// Computed Properties
export const weekDays = computed<WeekDay[]>(() => {
  const days = []
  let currentDay = currentWeekStart.value
  while (currentDay <= currentWeekEnd.value) {
    days.push({
      date: format(currentDay, 'yyyy-MM-dd'),
      dayName: format(currentDay, 'EEE')
    })
    currentDay = addDays(currentDay, 1)
  }
  return days
})

export const conflicts = computed(() => {
  const result: Conflict[] = []
  resources.value.forEach(resource => {
    weekDays.value.forEach(day => {
      const dailyAssignments = getAssignments(resource.id, day.date)
      const totalHours = dailyAssignments.reduce((sum, a) => sum + a.hours, 0)
      
      if (totalHours > 8) {
        result.push({
          id: Date.now(),
          message: `${resource.name} is overallocated on ${formatDayDate(day.date)} (${totalHours}h)`,
          severity: 'high'
        })
      }
    })
  })
  return result
})

// Methods
export const formatDateRange = (start: Date, end: Date) => {
  return `${format(start, 'MMM d')} - ${format(end, 'MMM d, yyyy')}`
}

export const formatDayDate = (date: string) => {
  return format(new Date(date), 'MMM d')
}

export const isWeekend = (date: string) => {
  const day = new Date(date).getDay()
  return day === 0 || day === 6
}

export const previousWeek = () => {
  currentWeekStart.value = addDays(currentWeekStart.value, -7)
  currentWeekEnd.value = addDays(currentWeekEnd.value, -7)
}

export const nextWeek = () => {
  currentWeekStart.value = addDays(currentWeekStart.value, 7)
  currentWeekEnd.value = addDays(currentWeekEnd.value, 7)
}

export const getAssignments = (resourceId: number, date: string) => {
  return assignments.value.filter(a => 
    a.resourceId === resourceId && a.date === date
  )
}

export const getAssignmentClass = (assignment: Assignment) => {
  const baseClasses = 'shadow-sm border transition-all hover:shadow-md'
  const typeClasses = {
    development: 'bg-blue-50 border-blue-200 text-blue-700',
    design: 'bg-green-50 border-green-200 text-green-700',
    meeting: 'bg-purple-50 border-purple-200 text-purple-700'
  }
  return `${baseClasses} `
}

export const getUtilizationClass = (utilization: number) => {
  if (utilization > 90) return 'text-red-600'
  if (utilization > 75) return 'text-yellow-600'
  return 'text-green-600'
}

export const getUtilizationBarClass = (utilization: number) => {
  if (utilization > 90) return 'bg-red-600'
  if (utilization > 75) return 'bg-yellow-600'
  return 'bg-green-600'
}

// Event Handlers
export const handleDragStart = (event: DragEvent, assignment: Assignment) => {
  if (event.dataTransfer) {
    event.dataTransfer.setData('application/json', JSON.stringify(assignment))
    event.dataTransfer.effectAllowed = 'move'
  }
}

export const handleDrop = (event: DragEvent, resourceId: number, date: string) => {
  const data = event.dataTransfer?.getData('application/json')
  if (data) {
    const assignment = JSON.parse(data) as Assignment
    const index = assignments.value.findIndex(a => a.id === assignment.id)
    if (index !== -1) {
      assignments.value[index] = {
        ...assignment,
        resourceId,
        date
      }
    }
  }
}

export const openAssignmentDetails = (assignment: Assignment) => {
  console.log('Opening assignment details:', assignment)
}

export const openAddAssignment = (resourceId: number, date: string) => {
  console.log('Opening add assignment modal:', { resourceId, date })
}

export const handleAddResource = () => {
  const resource = {
    id: resources.value.length + 1,
    name: newResource.value.name,
    initials: newResource.value.name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase(),
    department: newResource.value.department,
    skills: newResource.value.skills.split(',').map(s => s.trim())
  }
  
  resources.value.push(resource)
  showAddResourceModal.value = false
  newResource.value = {
    name: '',
    department: '',
    skills: ''
  }
}

// Watchers
watch([assignments, resources], () => {
  departments.value = departments.value.map(dept => {
    const deptResources = resources.value.filter(r => r.department === dept.name)
    const totalAllocated = deptResources.reduce((total, resource) => {
      return total + assignments.value
        .filter(a => a.resourceId === resource.id)
        .reduce((sum, a) => sum + a.hours, 0)
    }, 0)
    
    return {
      ...dept,
      allocated: totalAllocated,
      utilization: Math.round((totalAllocated / dept.capacity) * 100)
    }
  })
})
