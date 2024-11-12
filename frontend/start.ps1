# Create base directories
New-Item -ItemType Directory -Path ".\src\components\resource-planning" -Force
New-Item -ItemType Directory -Path ".\src\components\resource-planning\modals" -Force
New-Item -ItemType Directory -Path ".\src\types" -Force
New-Item -ItemType Directory -Path @(
    ".\src\components\resource-planning",
    ".\src\components\resource-planning\modals",
    ".\src\components\resource-planning\calendar",
    ".\src\types"
) -Force
# Create type definitions file
@'
export interface Resource {
  id: number
  name: string
  initials: string
  department: string
  skills: string[]
}

export interface Department {
  id: number
  name: string
  utilization: number
  capacity: number
  allocated: number
}

export interface Assignment {
  id: number
  resourceId: number
  project: string
  date: string
  hours: number
  type: 'development' | 'design' | 'meeting'
}

export interface Conflict {
  id: number
  message: string
  severity: 'high' | 'medium' | 'low'
}

export interface Stat {
  title: string
  value: string
  icon: any
  bgColor: string
  iconColor: string
  trend: number
}
'@ | Out-File -FilePath ".\src\types\resource-planning.ts" -Encoding UTF8

# Create the main component file
@'
<template>
  <div class="p-6">
    <ResourcePlanningHeader 
      :resources="resources"
      :departments="departments"
      :selectedView="selectedView"
      @view-change="selectedView = $event"
      @add-resource="showAddResourceModal = true"
    />
    
    <StatsOverview :stats="stats" />
    
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-4">
      <ResourceCalendar
        v-if="selectedView === `calendar`"
        class="lg:col-span-3"
        :resources="resources"
        :assignments="assignments"
        :currentWeekStart="currentWeekStart"
        :currentWeekEnd="currentWeekEnd"
        @previous-week="previousWeek"
        @next-week="nextWeek"
        @assignment-drop="handleAssignmentDrop"
        @add-assignment="openAddAssignment"
        @assignment-click="openAssignmentDetails"
      />
      
      <ResourceSidebar
        :departments="departments"
        :conflicts="conflicts"
      />
    </div>

    <AddResourceModal
      v-if="showAddResourceModal"
      :departments="departments"
      @close="showAddResourceModal = false"
      @add="handleAddResource"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue"
import { startOfWeek, endOfWeek, addDays } from "date-fns"
import { Resource, Department, Assignment, Stat } from "@/types/resource-planning"
import ResourcePlanningHeader from "./ResourcePlanningHeader.vue"
import StatsOverview from "./StatsOverview.vue"
import ResourceCalendar from "./ResourceCalendar.vue"
import ResourceSidebar from "./ResourceSidebar.vue"
import AddResourceModal from "./modals/AddResourceModal.vue"
import { mockResources, mockDepartments, mockAssignments, mockStats } from "./mock-data"

// State
const selectedView = ref("calendar")
const currentWeekStart = ref(startOfWeek(new Date()))
const currentWeekEnd = ref(endOfWeek(new Date()))
const showAddResourceModal = ref(false)
const resources = ref<Resource[]>(mockResources)
const departments = ref<Department[]>(mockDepartments)
const assignments = ref<Assignment[]>(mockAssignments)
const stats = ref<Stat[]>(mockStats)

// Methods
const previousWeek = () => {
  currentWeekStart.value = addDays(currentWeekStart.value, -7)
  currentWeekEnd.value = addDays(currentWeekEnd.value, -7)
}

const nextWeek = () => {
  currentWeekStart.value = addDays(currentWeekStart.value, 7)
  currentWeekEnd.value = addDays(currentWeekEnd.value, 7)
}

const handleAssignmentDrop = (assignment: Assignment, resourceId: number, date: string) => {
  const index = assignments.value.findIndex(a => a.id === assignment.id)
  if (index !== -1) {
    assignments.value[index] = {
      ...assignment,
      resourceId,
      date
    }
  }
}

const openAssignmentDetails = (assignment: Assignment) => {
  console.log("Opening assignment details:", assignment)
}

const openAddAssignment = (resourceId: number, date: string) => {
  console.log("Opening add assignment modal:", { resourceId, date })
}

const handleAddResource = (resource: Resource) => {
  resources.value.push({
    ...resource,
    id: resources.value.length + 1,
    initials: resource.name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
  })
}

// Watch for changes that affect conflicts
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
</script>
'@ | Out-File -FilePath ".\src\components\resource-planning\ResourcePlanning.vue" -Encoding UTF8

# Create mock data file
@'
import { Resource, Department, Assignment, Stat } from "@/types/resource-planning"
import { UsersIcon, ClockIcon, BriefcaseIcon, AlertTriangleIcon } from "lucide-vue-next"

export const mockResources: Resource[] = [
  {
    id: 1,
    name: "John Doe",
    initials: "JD",
    department: "Development",
    skills: ["React", "Node.js"]
  },
  {
    id: 2,
    name: "Jane Smith",
    initials: "JS",
    department: "Design",
    skills: ["UI/UX", "Figma"]
  }
]

export const mockDepartments: Department[] = [
  {
    id: 1,
    name: "Development",
    utilization: 85,
    capacity: 160,
    allocated: 136
  },
  {
    id: 2,
    name: "Design",
    utilization: 70,
    capacity: 120,
    allocated: 84
  }
]

export const mockAssignments: Assignment[] = [
  {
    id: 1,
    resourceId: 1,
    project: "Website Redesign",
    date: "2024-11-11",
    hours: 6,
    type: "development"
  },
  {
    id: 2,
    resourceId: 1,
    project: "Team Meeting",
    date: "2024-11-11",
    hours: 2,
    type: "meeting"
  },
  {
    id: 3,
    resourceId: 2,
    project: "Mobile App UI",
    date: "2024-11-11",
    hours: 4,
    type: "design"
  }
]

export const mockStats: Stat[] = [
  {
    title: "Team Capacity",
    value: "280h",
    icon: UsersIcon,
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600",
    trend: 5
  },
  {
    title: "Utilization Rate",
    value: "78%",
    icon: ClockIcon,
    bgColor: "bg-green-100",
    iconColor: "text-green-600",
    trend: -2
  },
  {
    title: "Active Projects",
    value: "12",
    icon: BriefcaseIcon,
    bgColor: "bg-purple-100",
    iconColor: "text-purple-600",
    trend: 8
  },
  {
    title: "Resource Conflicts",
    value: "3",
    icon: AlertTriangleIcon,
    bgColor: "bg-yellow-100",
    iconColor: "text-yellow-600",
    trend: -15
  }
]
'@ | Out-File -FilePath ".\src\components\resource-planning\mock-data.ts" -Encoding UTF8

# Create Header component
@'
<template>
  <div class="flex items-center justify-between mb-6">
    <div>
      <h1 class="text-2xl font-bold">Resource Planning</h1>
      <p class="text-gray-600">{{ resources.length }} team members across {{ departments.length }} departments</p>
    </div>
    <div class="flex items-center gap-3">
      <select 
        :value="selectedView"
        @change="$emit(`view-change`, $event.target.value)"
        class="px-4 py-2 bg-white border rounded-lg"
      >
        <option value="calendar">Calendar View</option>
        <option value="timeline">Timeline View</option>
        <option value="grid">Grid View</option>
      </select>
      <button 
        @click="$emit(`add-resource`)"
        class="inline-flex items-center px-4 py-2 text-white rounded-lg bg-primary hover:bg-primary/90"
      >
        <UserPlusIcon class="w-4 h-4 mr-2" />
        Add Resource
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UserPlusIcon } from "lucide-vue-next"
import { Resource, Department } from "@/types/resource-planning"

defineProps<{
  resources: Resource[]
  departments: Department[]
  selectedView: string
}>()

defineEmits<{
  (e: "view-change", view: string): void
  (e: "add-resource"): void
}>()
</script>
'@ | Out-File -FilePath ".\src\components\resource-planning\ResourcePlanningHeader.vue" -Encoding UTF8

# Create Stats Overview component
@'
<template>
  <div class="grid grid-cols-1 gap-4 mb-6 md:grid-cols-2 lg:grid-cols-4">
    <div
      v-for="stat in stats"
      :key="stat.title"
      class="p-4 bg-white rounded-lg shadow-sm"
    >
      <div class="flex justify-between">
        <div>
          <p class="text-sm text-gray-600">{{ stat.title }}</p>
          <p class="mt-1 text-2xl font-semibold">{{ stat.value }}</p>
        </div>
        <div :class="`p-3 rounded-full ${stat.bgColor}`">
          <component
            :is="stat.icon"
            class="w-5 h-5"
            :class="stat.iconColor"
          />
        </div>
      </div>
      <div
        class="flex items-center mt-2 text-sm"
        :class="stat.trend >= 0 ? `text-green-600` : `text-red-600`"
      >
        <component
          :is="stat.trend >= 0 ? TrendingUpIcon : TrendingDownIcon"
          class="w-4 h-4 mr-1"
        />
        {{ Math.abs(stat.trend) }}% from last month
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TrendingUpIcon, TrendingDownIcon } from "lucide-vue-next"
import { Stat } from "@/types/resource-planning"

defineProps<{
  stats: Stat[]
}>()
</script>
'@ | Out-File -FilePath ".\src\components\resource-planning\StatsOverview.vue" -Encoding UTF8

# Create Calendar component
@'
<template>
  <div class="bg-white rounded-lg shadow-sm">
    <CalendarHeader
      :weekDays="weekDays"
      :currentWeekStart="currentWeekStart"
      :currentWeekEnd="currentWeekEnd"
      @previous-week="$emit(`previous-week`)"
      @next-week="$emit(`next-week`)"
    />
    
    <div class="overflow-x-auto">
      <div class="min-w-[800px]">
        <CalendarGrid
          :weekDays="weekDays"
          :resources="resources"
          :assignments="assignments"
          @assignment-drop="$emit(`assignment-drop`, $event)"
          @add-assignment="$emit(`add-assignment`, $event)"
          @assignment-click="$emit(`assignment-click`, $event)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { format, addDays } from "date-fns"
import { Resource, Assignment } from "@/types/resource-planning"
import CalendarHeader from "./calendar/CalendarHeader.vue"
import CalendarGrid from "./calendar/CalendarGrid.vue"

const props = defineProps<{
  resources: Resource[]
  assignments: Assignment[]
  currentWeekStart: Date
  currentWeekEnd: Date
}>()

defineEmits<{
  (e: "previous-week"): void
  (e: "next-week"): void
  (e: "assignment-drop", assignment: Assignment, resourceId: number, date: string): void
  (e: "add-assignment", resourceId: number, date: string): void
  (e: "assignment-click", assignment: Assignment): void
}>()

const weekDays = computed(() => {
  const days = []
  let currentDay = props.currentWeekStart
  while (currentDay <= props.currentWeekEnd) {
    days.push({
      date: format(currentDay, "yyyy-MM-dd"),
      dayName: format(currentDay, "EEE")
    })
    currentDay = addDays(currentDay, 1)
  }
  return days
})
</script>
'@ | Out-File -FilePath ".\src\components\resource-planning\ResourceCalendar.vue" -Encoding UTF8

# Create Calendar Header component
@'
<template>
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
      <button
        @click="$emit(`previous-week`)"
        class="p-1 rounded hover:bg-gray

        # Create Calendar Header component (continuation)
@'
-100">
        <ChevronLeftIcon class="w-5 h-5" />
      </button>
      <span class="text-sm font-medium">
        {{ formatDateRange(currentWeekStart, currentWeekEnd) }}
      </span>
      <button
        @click="$emit(`next-week`)"
        class="p-1 rounded hover:bg-gray-100"
      >
        <ChevronRightIcon class="w-5 h-5" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-vue-next"
import { format } from "date-fns"

defineProps<{
  weekDays: { date: string; dayName: string }[]
  currentWeekStart: Date
  currentWeekEnd: Date
}>()

defineEmits<{
  (e: "previous-week"): void
  (e: "next-week"): void
}>()

const formatDateRange = (start: Date, end: Date) => {
  return `${format(start, "MMM d")} - ${format(end, "MMM d, yyyy")}`
}
</script>
'@ | Out-File -FilePath ".\src\components\resource-planning\calendar\CalendarHeader.vue" -Encoding UTF8

# Create Calendar Grid component
@'
<template>
  <div>
    <!-- Days Header -->
    <div class="grid grid-cols-8 border-b">
      <div class="p-4 font-medium">Resources</div>
      <div
        v-for="day in weekDays"
        :key="day.date"
        class="p-4 text-center"
      >
        <div class="font-medium">{{ day.dayName }}</div>
        <div class="text-sm text-gray-500">
          {{ formatDayDate(day.date) }}
        </div>
      </div>
    </div>

    <!-- Calendar Body -->
    <div class="divide-y">
      <div
        v-for="resource in resources"
        :key="resource.id"
        class="grid grid-cols-8"
      >
        <ResourceInfo :resource="resource" />
        <TimeSlot
          v-for="day in weekDays"
          :key="`${resource.id}-${day.date}`"
          :assignments="getResourceAssignments(resource.id, day.date)"
          :date="day.date"
          :resourceId="resource.id"
          @assignment-drop="handleDrop"
          @add-assignment="$emit(`add-assignment`, resource.id, day.date)"
          @assignment-click="$emit(`assignment-click`, $event)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { format } from "date-fns"
import { Resource, Assignment } from "@/types/resource-planning"
import ResourceInfo from "./ResourceInfo.vue"
import TimeSlot from "./TimeSlot.vue"

const props = defineProps<{
  weekDays: { date: string; dayName: string }[]
  resources: Resource[]
  assignments: Assignment[]
}>()

defineEmits<{
  (e: "assignment-drop", assignment: Assignment, resourceId: number, date: string): void
  (e: "add-assignment", resourceId: number, date: string): void
  (e: "assignment-click", assignment: Assignment): void
}>()

const formatDayDate = (date: string) => {
  return format(new Date(date), "MMM d")
}

const getResourceAssignments = (resourceId: number, date: string) => {
  return props.assignments.filter(a => 
    a.resourceId === resourceId && a.date === date
  )
}

const handleDrop = (assignment: Assignment, resourceId: number, date: string) => {
  emit("assignment-drop", assignment, resourceId, date)
}
</script>
'@ | Out-File -FilePath ".\src\components\resource-planning\calendar\CalendarGrid.vue" -Encoding UTF8

# Create Resource Info component
@'
<template>
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
</template>

<script setup lang="ts">
import { Resource } from "@/types/resource-planning"

defineProps<{
  resource: Resource
}>()
</script>
'@ | Out-File -FilePath ".\src\components\resource-planning\calendar\ResourceInfo.vue" -Encoding UTF8

# Create Time Slot component
@'
<template>
  <div
    class="relative p-2 border-l min-h-[100px]"
    :class="isWeekend ? `bg-gray-50` : ``"
    @dragover.prevent
    @drop="handleDrop"
  >
    <AssignmentCard
      v-for="assignment in assignments"
      :key="assignment.id"
      :assignment="assignment"
      @click="$emit(`assignment-click`, assignment)"
    />
    
    <button
      @click="$emit(`add-assignment`)"
      class="absolute p-1 text-gray-400 bottom-1 right-1 hover:text-gray-600"
    >
      <PlusIcon class="w-4 h-4" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { PlusIcon } from "lucide-vue-next"
import { Assignment } from "@/types/resource-planning"
import AssignmentCard from "./AssignmentCard.vue"

const props = defineProps<{
  assignments: Assignment[]
  date: string
  resourceId: number
}>()

defineEmits<{
  (e: "assignment-drop", assignment: Assignment, resourceId: number, date: string): void
  (e: "add-assignment"): void
  (e: "assignment-click", assignment: Assignment): void
}>()

const isWeekend = computed(() => {
  const day = new Date(props.date).getDay()
  return day === 0 || day === 6
})

const handleDrop = (event: DragEvent) => {
  const data = event.dataTransfer?.getData("application/json")
  if (data) {
    const assignment = JSON.parse(data) as Assignment
    emit("assignment-drop", assignment, props.resourceId, props.date)
  }
}
</script>
'@ | Out-File -FilePath ".\src\components\resource-planning\calendar\TimeSlot.vue" -Encoding UTF8

# Create Assignment Card component
@'
<template>
  <div
    class="p-2 mb-1 text-sm transition-all border rounded shadow-sm cursor-move hover:shadow-md"
    :class="typeClasses[assignment.type]"
    draggable="true"
    @dragstart="handleDragStart"
    @click="$emit(`click`, assignment)"
  >
    <div class="font-medium">{{ assignment.project }}</div>
    <div class="text-xs">{{ assignment.hours }}h</div>
  </div>
</template>

<script setup lang="ts">
import { Assignment } from "@/types/resource-planning"

const props = defineProps<{
  assignment: Assignment
}>()

defineEmits<{
  (e: "click", assignment: Assignment): void
}>()

const typeClasses = {
  development: "bg-blue-50 border-blue-200 text-blue-700",
  design: "bg-green-50 border-green-200 text-green-700",
  meeting: "bg-purple-50 border-purple-200 text-purple-700"
}

const handleDragStart = (event: DragEvent) => {
  if (event.dataTransfer) {
    event.dataTransfer.setData("application/json", JSON.stringify(props.assignment))
    event.dataTransfer.effectAllowed = "move"
  }
}
</script>
'@ | Out-File -FilePath ".\src\components\resource-planning\calendar\AssignmentCard.vue" -Encoding UTF8

# Create Resource Sidebar component
@'
<template>
  <div class="space-y-6">
    <!-- Resource Utilization -->
    <div class="p-4 bg-white rounded-lg shadow-sm">
      <h2 class="mb-4 font-semibold">Resource Utilization</h2>
      <div class="space-y-4">
        <div
          v-for="dept in departments"
          :key="dept.id"
          class="p-3 border rounded-lg"
        >
          <div class="flex items-center justify-between mb-2">
            <span class="font-medium">{{ dept.name }}</span>
            <span :class="getUtilizationClass(dept.utilization)">
              {{ dept.utilization }}%
            </span>
          </div>
          <div class="w-full h-2 bg-gray-200 rounded-full">
            <div
              class="h-2 transition-all rounded-full"
              :class="getUtilizationBarClass(dept.utilization)"
              :style="{ width: `${dept.utilization}%` }"
            ></div>
          </div>
          <div class="grid grid-cols-2 gap-2 mt-2 text-sm">
            <div>
              <span class="text-gray-500">Capacity:</span>
              <span class="ml-1 font-medium">{{ dept.capacity }}h</span>
            </div>
            <div>
              <span class="text-gray-500">Allocated:</span>
              <span class="ml-1 font-medium">{{ dept.allocated }}h</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Resource Conflicts -->
    <ResourceConflicts :conflicts="conflicts" />
  </div>
</template>

<script setup lang="ts">
import { Department, Conflict } from "@/types/resource-planning"
import ResourceConflicts from "./ResourceConflicts.vue"

defineProps<{
  departments: Department[]
  conflicts: Conflict[]
}>()

const getUtilizationClass = (utilization: number) => {
  if (utilization > 90) return "text-red-600"
  if (utilization > 75) return "text-yellow-600"
  return "text-green-600"
}

const getUtilizationBarClass = (utilization: number) => {
  if (utilization > 90) return "bg-red-600"
  if (utilization > 75) return "bg-yellow-600"
  return "bg-green-600"
}
</script>
'@ | Out-File -FilePath ".\src\components\resource-planning\ResourceSidebar.vue" -Encoding UTF8

# Create Resource Conflicts component
@'
<template>
  <div class="p-4 bg-white rounded-lg shadow-sm">
    <h2 class="mb-4 font-semibold">Resource Conflicts</h2>
    <div class="space-y-2">
      <div
        v-for="conflict in conflicts"
        :key="conflict.id"
        class="p-3 border border-red-200 rounded-lg bg-red-50"
      >
        <div class="flex items-center text-sm text-red-700">
          <AlertTriangleIcon class="w-4 h-4 mr-2 text-red-500" />
          {{ conflict.message }}
        </div>
      </div>
      <div
        v-if="conflicts.length === 0"
        class="py-2 text-sm text-center text-gray-500"
      >
        No conflicts detected
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AlertTriangleIcon } from "lucide-vue-next"
import { Conflict } from "@/types/resource-planning"

defineProps<{
  conflicts: Conflict[]
}>()
</script>
'@ | Out-File -FilePath ".\src\components\resource-planning\ResourceConflicts.vue" -Encoding UTF8

# Create Add Resource Modal component
@'
<template>
  <Dialog :open="true" @close="$emit(`close`)" class="fixed inset-0 z-50 flex items-center justify-center">
    <div class="fixed inset-0 bg-black/50"></div>
    <div class="relative w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
      <h2 class="mb-4 text-lg font-bold">Add New Resource</h2>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block mb-1 text-sm font-medium">Name</label>
          <input
            v-model="form.name"
            type="text"
            required
            class="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div>
          <label class="block mb-1 text-sm font-medium">Department</label>
          <select
            v-model="form.department"
            required
            class="w-full px-3 py-2 border rounded-md"
          >
            <option value="">Select Department</option>
            <option
              v-for="dept in departments"
              :key="dept.id"
              :value="dept.name"
            >
              {{ dept.name }}
            </option>
          </select>
        </div>
        <div>
          <label class="block mb-1 text-sm font-medium">Skills</label>
          <input
            v-model="form.skills"
            type="text"
            placeholder="Comma separated skills"
            class="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div class="flex justify-end gap-2">
          <button
            type="button"
            @click="$emit(`close`)"
            class="px-4 py-2 border rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-4 py-2 text-white rounded-md bg-primary"
          >
            Add Resource
          </button>
        </div>
      </form>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { Dialog } from "@headlessui/vue"
import { Department, Resource } from "@/types/resource-planning"

defineProps<{
  departments: Department[]
}>()

const emit = defineEmits<{
  (e: "close"): void
  (e: "add", resource: Resource): void
}>()

const form = ref({
  name: "",
  department: "",
  skills: ""
})

const handleSubmit = () => {
  emit("add", {
    name: form.value.name,
    department: form.value.department,
    skills: form.value.skills.split(",").map(s => s.trim()),
  } as Resource)
}
</script>
'@ | Out-File -FilePath ".\src\components\resource-planning\modals\AddResourceModal.vue" -Encoding UTF8

# Create