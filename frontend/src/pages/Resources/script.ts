import { ref, computed, watch } from 'vue'
import { format, addDays, startOfWeek, endOfWeek, parseISO } from 'date-fns'
import { useResourceData } from './data'
import type { Assignment, Conflict, WeekDay } from './types'

// Get data from resource store
const {
  assignments,
  resources,
  departments,
  newResource,
  showAddResourceModal,
  fetchData,
  api
} = useResourceData()

// Calendar state
export const currentWeekStart = ref(startOfWeek(new Date(), { weekStartsOn: 1 }))
export const currentWeekEnd = ref(endOfWeek(new Date(), { weekStartsOn: 1 }))

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
          type: 'overallocation',
          message: `${resource.name} is overallocated on ${formatDayDate(day.date)} (${totalHours}h)`,
          severity: 'high',
          resources: [resource.name],
          date: day.date
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
  const parsedDate = parseISO(date)
  return format(parsedDate, 'MMM d')
}

export const isWeekend = (date: string) => {
  const parsedDate = parseISO(date)
  const day = parsedDate.getDay()
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
  return assignments.value;  // Simply return all assignments
}

export const getAssignmentClass = (assignment: Assignment) => {
  const baseClasses = 'shadow-sm border transition-all hover:shadow-md'
  const typeClasses: Record<string, string> = {
    development: 'bg-blue-50 border-blue-200 text-blue-700',
    design: 'bg-green-50 border-green-200 text-green-700',
    meeting: 'bg-purple-50 border-purple-200 text-purple-700',
    timeoff: 'bg-red-50 border-red-200 text-red-700',
    marketing: 'bg-yellow-50 border-yellow-200 text-yellow-700'
  }

  const typeClass = typeClasses[assignment.type.toLowerCase()] || 'bg-gray-50 border-gray-200 text-gray-700';
  return `${baseClasses} ${typeClass}`;
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

// Debug watcher for assignments
watch(assignments, (newVal) => {
  console.log('Assignments updated:', {
    count: newVal.length,
    samples: newVal.slice(0, 3),
    dates: new Set(newVal.map(a => a.date))
  });
}, { immediate: true, deep: true });

// Event Handlers
export const handleDragStart = (event: DragEvent, assignment: Assignment) => {
  if (event.dataTransfer) {
    event.dataTransfer.setData('application/json', JSON.stringify(assignment))
    event.dataTransfer.effectAllowed = 'move'
  }
}

export const handleDrop = async (event: DragEvent, resourceId: number, date: string) => {
  const data = event.dataTransfer?.getData('application/json')
  if (data) {
    try {
      const assignment = JSON.parse(data) as Assignment
      await api.put(`/assignments/${assignment.id}`, {
        ...assignment,
        resourceId,
        date
      })
      await fetchData()
    } catch (error) {
      console.error('Failed to update assignment:', error)
    }
  }
}

export const openAssignmentDetails = (assignment: Assignment) => {
  console.log('Opening assignment details:', assignment)
}

export const openAddAssignment = async (resourceId: number, date: string) => {
  try {
    const newAssignment = {
      resourceId,
      date,
      project: 'New Project',
      hours: 4,
      type: 'development'
    }
    await api.post('/assignments', newAssignment)
    await fetchData()
  } catch (error) {
    console.error('Failed to create assignment:', error)
  }
}

export const handleAddResource = async () => {
  try {
    const resource = {
      name: newResource.value.name,
      initials: newResource.value.name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase(),
      department: newResource.value.department,
      skills: newResource.value.skills.split(',').map(s => s.trim())
    }
    
    await api.post('/resources', resource)
    await fetchData()
    
    showAddResourceModal.value = false
    newResource.value = {
      name: '',
      department: '',
      skills: ''
    }
  } catch (error) {
    console.error('Failed to create resource:', error)
  }
}

// Export everything needed by the component
export {
  assignments,
  resources,
  departments,
  newResource,
  showAddResourceModal,
  fetchData
}