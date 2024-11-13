<script setup lang="ts">
import { Dialog } from '@headlessui/vue'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
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
  conflicts,
} from './data'

// Import methods and computed properties
import {
  currentWeekStart,
  currentWeekEnd,
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
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold">Resource Planning</h1>
        <p class="text-gray-600">{{ resources.length }} team members across {{ departments.length }} departments</p>
      </div>
      <div class="flex items-center gap-2">
        <select v-model="selectedView" 
                class="px-4 py-2 bg-white border rounded-lg">
          <option value="calendar">Calendar View</option>
          <option value="timeline">Timeline View</option>
        </select>
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
                <span>Project Work</span>
                <span class="w-3 h-3 bg-purple-200 rounded-full"></span>
                <span>Meetings</span>
                <span class="w-3 h-3 bg-red-200 rounded-full"></span>
                <span>Time Off</span>
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
              <div class="divide-y overflow-y-auto h-[55vh]">
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
          <h2 class="mb-4 font-semibold">Department Allocation</h2>
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
            </div>
          </div>
        </div>

        <!-- Resource Conflicts -->
        <div class="p-4 bg-white rounded-lg shadow-sm">
          <h2 class="mb-4 font-semibold">Scheduling Conflicts</h2>
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
  </div>
</template>