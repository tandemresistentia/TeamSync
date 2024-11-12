<script setup lang="ts">
import { Dialog } from '@headlessui/vue'
import {
  UserPlusIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  AlertTriangleIcon,
  PlusIcon
} from 'lucide-vue-next'

// Import data
import {
  selectedView,
  showAddResourceModal,
  newResource,
  resources,
  departments,
  stats,
} from './data'

// Import methods and computed properties
import {
  currentWeekStart,
  currentWeekEnd,
  conflicts,
  weekDays,
  formatDateRange,
  formatDayDate,
  isWeekend,
  previousWeek,
  nextWeek,
  getAssignments,
  getAssignmentClass,
  getUtilizationClass,
  getUtilizationBarClass,
  handleDragStart,
  handleDrop,
  openAssignmentDetails,
  openAddAssignment,
  handleAddResource
} from './script'
</script>

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

<style scoped>
.risk-card {
  transition: all 0.3s ease;
}

.risk-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}
</style>
