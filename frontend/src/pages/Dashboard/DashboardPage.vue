<script setup lang="ts">
import VueApexCharts from 'vue3-apexcharts'
import {
  XMarkIcon,
  PlusIcon,
  FolderPlusIcon,
  DocumentIcon,
} from '@heroicons/vue/24/outline'

// Import all data
import { 
  alerts, 
  teamMembers, 
  projects, 
  stats, 
  chartOptions 
} from './data'

// Import all methods
import {
  getStatusColor,
  getProgressColor,
  getAlertClass,
  getAlertIcon,
  dismissAlert,
  teamFilter,
  openNewTaskModal,
  openNewProjectModal,
  generateReport
} from './script'

// Destructure chart options for easier use in template
const { 
  productivityChartOptions, 
  productivityChartSeries, 
  resourceChartOptions, 
  resourceChartSeries 
} = chartOptions
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

    <!-- Stats Overview -->
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

    <!-- Charts Grid -->
    <div class="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-2">
      <!-- Team Productivity Chart -->
      <div class="p-6 bg-white rounded-lg shadow-sm">
        <h2 class="mb-4 text-lg font-semibold">Team Productivity</h2>
        <VueApexCharts
          type="line"
          height="300"
          :options="productivityChartOptions"
          :series="productivityChartSeries"
        />
      </div>

      <!-- Resource Utilization Chart -->
      <div class="p-6 bg-white rounded-lg shadow-sm">
        <h2 class="mb-4 text-lg font-semibold">Resource Utilization</h2>
        <VueApexCharts
          type="bar"
          height="300"
          :options="resourceChartOptions"
          :series="resourceChartSeries"
        />
      </div>
    </div>

    <!-- Team and Projects Grid -->
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <!-- Team Availability -->
      <div class="p-6 bg-white rounded-lg shadow-sm">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold">Team Availability</h2>
          <select v-model="teamFilter" class="px-3 py-1 border rounded">
            <option value="all">All Teams</option>
            <option value="development">Development</option>
            <option value="design">Design</option>
          </select>
        </div>
        <div class="space-y-4">
          <div v-for="member in teamMembers" :key="member.id" 
               class="flex items-center justify-between p-3 rounded-lg bg-gray-50">
            <div class="flex items-center">
              <div class="w-2 h-2 rounded-full" 
                   :class="member.status === 'available' ? 'bg-green-500' : 'bg-red-500'">
              </div>
              <span class="ml-3">{{ member.name }}</span>
            </div>
            <div class="flex items-center">
              <div class="w-24 h-2 mr-3 bg-gray-200 rounded-full">
                <div class="h-2 bg-blue-600 rounded-full" 
                     :style="{ width: member.availability + '%' }" />
              </div>
              <span class="text-sm text-gray-600">{{ member.availability }}%</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Active Projects -->
      <div class="p-6 bg-white rounded-lg shadow-sm">
        <h2 class="mb-4 text-lg font-semibold">Active Projects</h2>
        <div class="space-y-4">
          <div v-for="project in projects" :key="project.id" 
               class="p-4 border rounded-lg">
            <div class="flex items-center justify-between mb-2">
              <span class="font-medium">{{ project.name }}</span>
              <span :class="getStatusColor(project.status)">{{ project.status }}</span>
            </div>
            <div class="w-full h-2 mb-2 bg-gray-200 rounded-full">
              <div class="h-2 rounded-full" 
                   :class="getProgressColor(project.progress)"
                   :style="{ width: project.progress + '%' }" />
            </div>
            <div class="flex justify-between text-sm text-gray-500">
              <span>Progress: {{ project.progress }}%</span>
              <span>Due: {{ project.dueDate }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>