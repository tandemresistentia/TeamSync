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

<script setup lang="ts">
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

// Mock Data
const alerts = ref([
  { id: 1, type: 'warning', message: '3 team members are approaching capacity' },
  { id: 2, type: 'info', message: 'New project resources available' },
  { id: 3, type: 'error', message: 'Server capacity reaching critical levels' }
])

const teamMembers = ref([
  { id: 1, name: 'John Doe', status: 'available', availability: 85 },
  { id: 2, name: 'Jane Smith', status: 'busy', availability: 25 },
  { id: 3, name: 'Mike Johnson', status: 'available', availability: 60 },
  { id: 4, name: 'Sarah Williams', status: 'busy', availability: 30 }
])

const projects = ref([
  { 
    id: 1, 
    name: 'Website Redesign', 
    status: 'On Track', 
    progress: 75,
    dueDate: '2024-12-01'
  },
  { 
    id: 2, 
    name: 'Mobile App', 
    status: 'At Risk', 
    progress: 45,
    dueDate: '2024-11-15'
  },
  { 
    id: 3, 
    name: 'Database Migration', 
    status: 'Delayed', 
    progress: 30,
    dueDate: '2024-10-30'
  }
])

const stats = [
  {
    title: 'Team Availability',
    value: '85%',
    icon: UsersIcon,
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-600',
    trend: '+5% vs last week',
    trendIcon: ArrowTrendingUpIcon,
    trendColor: 'text-green-600'
  },
  {
    title: 'Projects On Track',
    value: '8/10',
    icon: CheckCircleIcon,
    bgColor: 'bg-green-100',
    iconColor: 'text-green-600',
    trend: '+2 vs last month',
    trendIcon: ArrowTrendingUpIcon,
    trendColor: 'text-green-600'
  },
  {
    title: 'Resource Usage',
    value: '72%',
    icon: ClockIcon,
    bgColor: 'bg-purple-100',
    iconColor: 'text-purple-600',
    trend: '-3% vs last week',
    trendIcon: ArrowTrendingDownIcon,
    trendColor: 'text-red-600'
  },
  {
    title: 'Pending Tasks',
    value: '24',
    icon: BellIcon,
    bgColor: 'bg-yellow-100',
    iconColor: 'text-yellow-600',
    trend: '4 urgent',
    trendIcon: ExclamationTriangleIcon,
    trendColor: 'text-yellow-600'
  }
]

// Chart Options
const productivityChartOptions = {
  chart: {
    type: 'line',
    toolbar: { show: false }
  },
  stroke: { curve: 'smooth', width: 3 },
  colors: ['#3B82F6', '#10B981'],
  grid: { borderColor: '#f3f4f6' },
  xaxis: {
    categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
  },
  yaxis: [
    {
      title: { text: 'Tasks' }
    },
    {
      opposite: true,
      title: { text: 'Hours' }
    }
  ]
}

const productivityChartSeries = [
  {
    name: 'Tasks Completed',
    data: [30, 40, 35, 50, 45]
  },
  {
    name: 'Hours Worked',
    data: [45, 52, 49, 56, 50]
  }
]

const resourceChartOptions = {
  chart: {
    type: 'bar',
    toolbar: { show: false }
  },
  plotOptions: {
    bar: { horizontal: true, borderRadius: 4 }
  },
  colors: ['#3B82F6'],
  grid: { borderColor: '#f3f4f6' },
  xaxis: {
    categories: ['Server', 'Storage', 'Bandwidth', 'CPU', 'Memory']
  }
}

const resourceChartSeries = [{
  name: 'Usage',
  data: [85, 72, 65, 89, 76]
}]

// State
const teamFilter = ref('all')

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

const openNewTaskModal = () => {
  console.log('Opening new task modal...')
}

const openNewProjectModal = () => {
  console.log('Opening new project modal...')
}

const generateReport = () => {
  console.log('Generating report...')
}
</script>