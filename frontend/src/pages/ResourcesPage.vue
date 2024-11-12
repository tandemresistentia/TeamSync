<template>
  <div class="p-6">
    <!-- Header with Stats -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold">Resource Planning</h1>
        <p class="text-gray-600">{{ resources.length }} team members across {{ departments.length }} departments</p>
      </div>
      <div class="flex items-center gap-3">
        <select v-model="selectedView" 
                class="px-4 py-2 bg-white border rounded-lg">
          <option value="calendar">Calendar View</option>
          <option value="timeline">Timeline View</option>
          <option value="grid">Grid View</option>
        </select>
        <button @click="showAddResourceModal = true"
                class="inline-flex items-center px-4 py-2 text-white rounded-lg bg-primary hover:bg-primary/90">
          <UserPlusIcon class="w-4 h-4 mr-2" />
          Add Resource
        </button>
      </div>
    </div>

    <!-- Stats Overview -->
    <div class="grid grid-cols-1 gap-4 mb-6 md:grid-cols-2 lg:grid-cols-4">
      <div v-for="stat in stats" :key="stat.title"
           class="p-4 bg-white rounded-lg shadow-sm">
        <div class="flex justify-between">
          <div>
            <p class="text-sm text-gray-600">{{ stat.title }}</p>
            <p class="mt-1 text-2xl font-semibold">{{ stat.value }}</p>
          </div>
          <div :class="`p-3 rounded-full ${stat.bgColor}`">
            <component :is="stat.icon" 
                      class="w-5 h-5" 
                      :class="stat.iconColor" />
          </div>
        </div>
        <div class="flex items-center mt-2 text-sm" 
             :class="stat.trend >= 0 ? 'text-green-600' : 'text-red-600'">
          <component :is="stat.trend >= 0 ? TrendingUpIcon : TrendingDownIcon" 
                    class="w-4 h-4 mr-1" />
          {{ Math.abs(stat.trend) }}% from last month
        </div>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-4">
      <!-- Calendar/Main View Area -->
      <div class="lg:col-span-3">
        <div class="bg-white rounded-lg shadow-sm">
          <!-- Calendar Header -->
          <div class="flex items-center justify-between p-4 border-b">
            <div class="flex items-center gap-4">
              <div class="flex items-center gap-2 text-sm">
                <span class="w-3 h-3 bg-blue-200 rounded-full"></span>
                <span>Development</span>
                <span class="w-3 h-3 bg-green-200 rounded-full"></span>
                <span>Design</span>
                <span class="w-3 h-3 bg-purple-200 rounded-full"></span>
                <span>Meeting</span>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <button @click="previousWeek" 
                      class="p-1 rounded hover:bg-gray-100">
                <ChevronLeftIcon class="w-5 h-5" />
              </button>
              <span class="text-sm font-medium">
                {{ formatDateRange(currentWeekStart, currentWeekEnd) }}
              </span>
              <button @click="nextWeek" 
                      class="p-1 rounded hover:bg-gray-100">
                <ChevronRightIcon class="w-5 h-5" />
              </button>
            </div>
          </div>

          <!-- Calendar Grid -->
          <div class="overflow-x-auto">
            <div class="min-w-[800px]">
              <!-- Days Header -->
              <div class="grid grid-cols-8 border-b">
                <div class="p-4 font-medium">Resources</div>
                <div v-for="day in weekDays" :key="day.date" 
                     class="p-4 text-center">
                  <div class="font-medium">{{ day.dayName }}</div>
                  <div class="text-sm text-gray-500">
                    {{ formatDayDate(day.date) }}
                  </div>
                </div>
              </div>

              <!-- Calendar Body -->
              <div class="divide-y">
                <div v-for="resource in resources" 
                     :key="resource.id" 
                     class="grid grid-cols-8">
                  <!-- Resource Info -->
                  <div class="flex items-center p-4">
                    <div class="flex items-center justify-center w-8 h-8 text-sm font-medium bg-gray-100 rounded-full">
                      {{ resource.initials }}
                    </div>
                    <div class="ml-3">
                      <div class="font-medium">{{ resource.name }}</div>
                      <div class="text-sm text-gray-500">
                        {{ resource.department }}
                      </div>
                    </div>
                  </div>

                  <!-- Time Slots -->
                  <div v-for="day in weekDays" 
                       :key="`${resource.id}-${day.date}`"
                       class="relative p-2 border-l min-h-[100px]"
                       :class="isWeekend(day.date) ? 'bg-gray-50' : ''"
                       @dragover.prevent
                       @drop="handleDrop($event, resource.id, day.date)">
                    
                    <!-- Assignments -->
                    <div v-for="assignment in getAssignments(resource.id, day.date)"
                         :key="assignment.id"
                         class="p-2 mb-1 text-sm rounded cursor-move"
                         :class="getAssignmentClass(assignment)"
                         draggable="true"
                         @dragstart="handleDragStart($event, assignment)"
                         @click="openAssignmentDetails(assignment)">
                      <div class="font-medium">{{ assignment.project }}</div>
                      <div class="text-xs">{{ assignment.hours }}h</div>
                    </div>

                    <!-- Add Assignment Button -->
                    <button @click="openAddAssignment(resource.id, day.date)"
                            class="absolute p-1 text-gray-400 bottom-1 right-1 hover:text-gray-600">
                      <PlusIcon class="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="space-y-6">
        <!-- Resource Utilization -->
        <div class="p-4 bg-white rounded-lg shadow-sm">
          <h2 class="mb-4 font-semibold">Resource Utilization</h2>
          <div class="space-y-4">
            <div v-for="dept in departments" :key="dept.id"
                 class="p-3 border rounded-lg">
              <div class="flex items-center justify-between mb-2">
                <span class="font-medium">{{ dept.name }}</span>
                <span :class="getUtilizationClass(dept.utilization)">
                  {{ dept.utilization }}%
                </span>
              </div>
              <div class="w-full h-2 bg-gray-200 rounded-full">
                <div class="h-2 transition-all rounded-full"
                     :class="getUtilizationBarClass(dept.utilization)"
                     :style="{ width: `${dept.utilization}%` }">
                </div>
              </div>
              <div class="grid grid-cols-2 gap-2 mt-2 text-sm">
                <div>
                  <span class="text-gray-500">Capacity:</span>
                  <span class="ml-1 font-medium">
                    {{ dept.capacity }}h
                  </span>
                </div>
                <div>
                  <span class="text-gray-500">Allocated:</span>
                  <span class="ml-1 font-medium">
                    {{ dept.allocated }}h
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Resource Conflicts -->
        <div class="p-4 bg-white rounded-lg shadow-sm">
          <h2 class="mb-4 font-semibold">Resource Conflicts</h2>
          <div class="space-y-2">
            <div v-for="conflict in conflicts" :key="conflict.id"
                 class="p-3 border border-red-200 rounded-lg bg-red-50">
              <div class="flex items-center text-sm text-red-700">
                <AlertTriangleIcon class="w-4 h-4 mr-2 text-red-500" />
                {{ conflict.message }}
              </div>
            </div>
            <div v-if="conflicts.length === 0"
                 class="py-2 text-sm text-center text-gray-500">
              No conflicts detected
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Resource Modal -->
    <Dialog :open="showAddResourceModal" 
            @close="showAddResourceModal = false"
            class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="fixed inset-0 bg-black/50"></div>
      <div class="relative w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 class="mb-4 text-lg font-bold">Add New Resource</h2>
        <form @submit.prevent="handleAddResource" class="space-y-4">
          <div>
            <label class="block mb-1 text-sm font-medium">Name</label>
            <input v-model="newResource.name" 
                   type="text" 
                   required
                   class="w-full px-3 py-2 border rounded-md" />
          </div>
          <div>
            <label class="block mb-1 text-sm font-medium">Department</label>
            <select v-model="newResource.department"
                    required
                    class="w-full px-3 py-2 border rounded-md">
              <option value="">Select Department</option>
              <option v-for="dept in departments" 
                      :key="dept.id" 
                      :value="dept.name">
                {{ dept.name }}
              </option>
            </select>
          </div>
          <div>
            <label class="block mb-1 text-sm font-medium">Skills</label>
            <input v-model="newResource.skills" 
                   type="text"
                   placeholder="Comma separated skills" 
                   class="w-full px-3 py-2 border rounded-md" />
          </div>
          <div class="flex justify-end gap-2">
            <button type="button"
                    @click="showAddResourceModal = false"
                    class="px-4 py-2 border rounded-md">
              Cancel
            </button>
            <button type="submit"
                    class="px-4 py-2 text-white rounded-md bg-primary">
              Add Resource
            </button>
          </div>
        </form>
      </div>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { format, addDays, startOfWeek, endOfWeek } from 'date-fns'
import {
  UserPlusIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  AlertTriangleIcon,
  UsersIcon,
  ClockIcon,
  BriefcaseIcon,
  PlusIcon
} from 'lucide-vue-next'
import { Dialog } from '@headlessui/vue'

// Types
interface Resource {
  id: number
  name: string
  initials: string
  department: string
  skills: string[]
}

interface Department {
  id: number
  name: string
  utilization: number
  capacity: number
  allocated: number
}

interface Assignment {
  id: number
  resourceId: number
  project: string
  date: string
  hours: number
  type: 'development' | 'design' | 'meeting'
}

interface Conflict {
  id: number
  message: string
  severity: 'high' | 'medium' | 'low'
}

// State
const selectedView = ref('calendar')
const currentWeekStart = ref(startOfWeek(new Date()))
const currentWeekEnd = ref(endOfWeek(new Date()))
const showAddResourceModal = ref(false)
const newResource = ref({
  name: '',
  department: '',
  skills: ''
})

// Mock Data
const resources = ref<Resource[]>([
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

const departments = ref<Department[]>([
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

const assignments = ref<Assignment[]>([
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
const stats = [
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
  // Computed Properties
const weekDays = computed(() => {
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

const conflicts = computed(() => {
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
const formatDateRange = (start: Date, end: Date) => {
  return `${format(start, 'MMM d')} - ${format(end, 'MMM d, yyyy')}`
}

const formatDayDate = (date: string) => {
  return format(new Date(date), 'MMM d')
}

const isWeekend = (date: string) => {
  const day = new Date(date).getDay()
  return day === 0 || day === 6
}

const previousWeek = () => {
  currentWeekStart.value = addDays(currentWeekStart.value, -7)
  currentWeekEnd.value = addDays(currentWeekEnd.value, -7)
}

const nextWeek = () => {
  currentWeekStart.value = addDays(currentWeekStart.value, 7)
  currentWeekEnd.value = addDays(currentWeekEnd.value, 7)
}

const getAssignments = (resourceId: number, date: string) => {
  return assignments.value.filter(a => 
    a.resourceId === resourceId && a.date === date
  )
}

const getAssignmentClass = (assignment: Assignment) => {
  const baseClasses = 'shadow-sm border transition-all hover:shadow-md'
  const typeClasses = {
    development: 'bg-blue-50 border-blue-200 text-blue-700',
    design: 'bg-green-50 border-green-200 text-green-700',
    meeting: 'bg-purple-50 border-purple-200 text-purple-700'
  }
  return `${baseClasses} ${typeClasses[assignment.type]}`
}

const getUtilizationClass = (utilization: number) => {
  if (utilization > 90) return 'text-red-600'
  if (utilization > 75) return 'text-yellow-600'
  return 'text-green-600'
}

const getUtilizationBarClass = (utilization: number) => {
  if (utilization > 90) return 'bg-red-600'
  if (utilization > 75) return 'bg-yellow-600'
  return 'bg-green-600'
}

// Drag and Drop Handlers
const handleDragStart = (event: DragEvent, assignment: Assignment) => {
  if (event.dataTransfer) {
    event.dataTransfer.setData('application/json', JSON.stringify(assignment))
    event.dataTransfer.effectAllowed = 'move'
  }
}

const handleDrop = (event: DragEvent, resourceId: number, date: string) => {
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

// Modal Handlers
const openAssignmentDetails = (assignment: Assignment) => {
  // Implement assignment details modal
  console.log('Opening assignment details:', assignment)
}

const openAddAssignment = (resourceId: number, date: string) => {
  // Implement add assignment modal
  console.log('Opening add assignment modal:', { resourceId, date })
}

const handleAddResource = () => {
  const resource: Resource = {
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

// Watch for changes that affect conflicts
watch([assignments, resources], () => {
  // Update department allocations
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
</script>
