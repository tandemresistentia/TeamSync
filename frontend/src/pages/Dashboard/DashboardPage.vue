<script setup lang="ts">
import VueApexCharts from 'vue3-apexcharts'
import {
  XMarkIcon,
  PlusIcon,
  FolderPlusIcon,
  DocumentIcon,
} from '@heroicons/vue/24/outline'
import { useDashboard } from './data'
import { onMounted, computed } from 'vue'

// Import all data
const {
  alerts,
  stats,
  chartOptions,
  criticalTasks,
  fetchDashboardData
} = useDashboard()

// Create computed properties for the chart options and series
const productivityChartOptions = computed(() => chartOptions.value.productivityChartOptions || {})
const productivityChartSeries = computed(() => chartOptions.value.productivityChartSeries || [])

onMounted(() => {
  fetchDashboardData()
})

// Import methods
import {
  getAlertClass,
  getAlertIcon,
  dismissAlert,
  openNewTaskModal,
  openNewProjectModal,
  generateReport
} from './script'
</script>

<template>
  <div class="p-6">
    <!-- Notifications Bar -->
    <div class="mb-6 space-y-2">
      <div v-for="alert in alerts" :key="alert.id" 
           class="flex items-center justify-between p-4 rounded-lg"
           :class="getAlertClass(alert.type)">
        <div class="flex items-center">
          <component :is="getAlertIcon(alert.type)" class="w-5 h-5 mr-3" />
          <span>{{ alert.message }}</span>
        </div>
        <button @click="dismissAlert(alert.id)" class="text-gray-500 hover:text-gray-700">
          <XMarkIcon class="w-5 h-5" />
        </button>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold">Dashboard</h1>
      <div class="flex gap-3">
        <button @click="openNewTaskModal" class="flex items-center px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
          <PlusIcon class="w-5 h-5 mr-2" />
          New Task
        </button>
        <button @click="openNewProjectModal" class="flex items-center px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700">
          <FolderPlusIcon class="w-5 h-5 mr-2" />
          New Project
        </button>
        <button @click="generateReport" class="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
          <DocumentIcon class="w-5 h-5 mr-2" />
          Generate Report
        </button>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-4">
      <div v-for="stat in stats" :key="stat.title" 
           class="p-4 bg-white rounded-lg shadow-sm">
        <div class="flex items-center">
          <div class="p-3 rounded-full" :class="stat.bgColor">
            <component :is="stat.icon" class="w-6 h-6" :class="stat.iconColor" />
          </div>
          <div class="ml-4">
            <h3 class="text-sm text-gray-500">{{ stat.title }}</h3>
            <p class="text-2xl font-semibold">{{ stat.value }}</p>
            <p class="text-sm" :class="stat.trendColor">
              <span class="flex items-center">
                <component :is="stat.trendIcon" class="w-4 h-4 mr-1" />
                {{ stat.trend }}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Weekly Overview -->
    <div class="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-2">
      <!-- Team Performance Trend -->
      <div class="p-6 bg-white rounded-lg shadow-sm">
        <h2 class="mb-4 text-lg font-semibold">Weekly Performance Trend</h2>
        <VueApexCharts
          v-if="productivityChartSeries.length > 0"
          type="line"
          height="300"
          :options="productivityChartOptions"
          :series="productivityChartSeries"
        />
      </div>

      <!-- Critical Tasks & Deadlines -->
      <div class="p-6 bg-white rounded-lg shadow-sm">
        <h2 class="mb-4 text-lg font-semibold">Critical Tasks & Deadlines</h2>
        <div class="space-y-4">
          <div v-for="task in criticalTasks" :key="task.id" 
               class="flex items-center justify-between p-3 rounded-lg bg-gray-50">
            <div class="flex items-center">
              <span class="px-2 py-1 text-xs rounded" 
                    :class="task.priority === 'high' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'">
                {{ task.priority }}
              </span>
              <span class="ml-3">{{ task.name }}</span>
            </div>
            <span class="text-sm text-gray-600">Due: {{ task.dueDate }}</span>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>