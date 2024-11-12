<template>
  <div class="p-6 space-y-6">
    <!-- Project Overview Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold">Project Tracking</h1>
        <p class="text-gray-600">Tracking {{ activeProjects }} active projects</p>
      </div>
      <div class="flex gap-2">
        <select v-model="timeRange" class="px-4 py-2 border rounded-lg">
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="quarter">This Quarter</option>
        </select>
        <button @click="showNewProjectDialog = true"
                class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-md bg-primary hover:bg-primary/90">
          <PlusIcon class="w-4 h-4 mr-2" />
          New Project
        </button>
      </div>
    </div>

    <!-- Project Health Dashboard -->
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <div v-for="metric in healthMetrics" :key="metric.title" 
           class="p-4 bg-white rounded-lg shadow-sm">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">{{ metric.title }}</p>
            <h3 class="text-2xl font-semibold">{{ metric.value }}</h3>
          </div>
          <div :class="metric.trendColor" class="flex items-center">
            <component :is="metric.trendIcon" class="w-4 h-4 mr-1" />
            <span>{{ metric.trend }}</span>
          </div>
        </div>
        <div class="mt-4">
          <div class="w-full h-2 bg-gray-200 rounded-full">
            <div class="h-2 rounded-full" 
                 :class="metric.progressColor"
                 :style="{ width: `${metric.progress}%` }">
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Timeline and Budget Section -->
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <!-- Project Timeline -->
      <div class="p-4 bg-white rounded-lg shadow-sm lg:col-span-2">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold">Project Timeline</h2>
          <select v-model="selectedProject" class="px-3 py-1 border rounded">
            <option value="all">All Projects</option>
            <option v-for="project in projects" :key="project.id" :value="project.id">
              {{ project.name }}
            </option>
          </select>
        </div>
        <VueApexCharts
          type="rangeBar"
          height="300"
          :options="timelineChartOptions"
          :series="timelineChartSeries"
        />
      </div>

      <!-- Budget Overview -->
      <div class="p-4 bg-white rounded-lg shadow-sm">
        <h2 class="mb-4 text-lg font-semibold">Budget Overview</h2>
        <div class="space-y-4">
          <div v-for="project in filteredProjects" :key="project.id" 
               class="p-3 border rounded-lg">
            <div class="flex items-center justify-between mb-2">
              <span class="font-medium">{{ project.name }}</span>
              <span :class="getBudgetStatusColor(project.budgetStatus)">
                {{ project.budgetStatus }}
              </span>
            </div>
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p class="text-gray-600">Budget</p>
                <p class="font-medium">${{ formatNumber(project.budget) }}</p>
              </div>
              <div>
                <p class="text-gray-600">Spent</p>
                <p class="font-medium">${{ formatNumber(project.spent) }}</p>
              </div>
            </div>
            <div class="mt-2">
              <div class="w-full h-2 bg-gray-200 rounded-full">
                <div class="h-2 rounded-full"
                     :class="getBudgetProgressColor(project.spent / project.budget * 100)"
                     :style="{ width: `${(project.spent / project.budget * 100)}%` }">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Risk Assessment and Resource Allocation -->
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <!-- Risk Assessment Matrix -->
      <div class="p-4 bg-white rounded-lg shadow-sm">
        <h2 class="mb-4 text-lg font-semibold">Risk Assessment</h2>
        <div class="grid grid-cols-3 gap-4">
          <div v-for="risk in projectRisks" :key="risk.id"
               class="p-3 border rounded-lg"
               :class="getRiskClass(risk.level)">
            <div class="flex items-center justify-between mb-2">
              <span class="font-medium">{{ risk.name }}</span>
              <span :class="getRiskBadgeClass(risk.level)">
                {{ risk.level }}
              </span>
            </div>
            <p class="text-sm text-gray-600">{{ risk.description }}</p>
            <div class="mt-2 text-sm">
              <span class="font-medium">Impact:</span> {{ risk.impact }}
            </div>
          </div>
        </div>
      </div>

      <!-- Resource Allocation -->
      <div class="p-4 bg-white rounded-lg shadow-sm">
        <h2 class="mb-4 text-lg font-semibold">Resource Allocation</h2>
        <VueApexCharts
          type="heatmap"
          height="300"
          :options="resourceChartOptions"
          :series="resourceChartSeries"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import { 
  PlusIcon, 
  TrendingUpIcon, 
  TrendingDownIcon,
  AlertTriangleIcon
} from 'lucide-vue-next'

// Types
interface Project {
  id: number
  name: string
  budget: number
  spent: number
  budgetStatus: string
  timeline: [Date, Date]
  risks: Risk[]
  resources: Resource[]
}

interface Risk {
  id: number
  name: string
  level: 'Low' | 'Medium' | 'High'
  description: string
  impact: string
}

interface Resource {
  id: number
  name: string
  allocation: number
  department: string
}

// State
const timeRange = ref('month')
const selectedProject = ref('all')
const activeProjects = ref(8)
const showNewProjectDialog = ref(false)

// Mock Data
const healthMetrics = [
  {
    title: 'On Track Projects',
    value: '6/8',
    trend: '+12.5%',
    progress: 75,
    trendIcon: TrendingUpIcon,
    trendColor: 'text-green-600',
    progressColor: 'bg-green-600'
  },
  {
    title: 'Budget Compliance',
    value: '85%',
    trend: '-2.3%',
    progress: 85,
    trendIcon: TrendingDownIcon,
    trendColor: 'text-red-600',
    progressColor: 'bg-blue-600'
  },
  {
    title: 'Resource Utilization',
    value: '92%',
    trend: '+5.2%',
    progress: 92,
    trendIcon: TrendingUpIcon,
    trendColor: 'text-green-600',
    progressColor: 'bg-purple-600'
  },
  {
    title: 'Risk Level',
    value: 'Low',
    trend: 'Stable',
    progress: 25,
    trendIcon: TrendingUpIcon,
    trendColor: 'text-green-600',
    progressColor: 'bg-yellow-600'
  }
]

const projectRisks = [
  {
    id: 1,
    name: 'Technical Debt',
    level: 'Medium',
    description: 'Increasing complexity in legacy systems',
    impact: 'Moderate'
  },
  {
    id: 2,
    name: 'Resource Shortage',
    level: 'High',
    description: 'Critical skill gaps in development team',
    impact: 'Severe'
  },
  {
    id: 3,
    name: 'Scope Creep',
    level: 'Low',
    description: 'Minor feature additions requested',
    impact: 'Minor'
  }
]

// Chart Options
const timelineChartOptions = {
  chart: {
    type: 'rangeBar',
    toolbar: { show: false }
  },
  plotOptions: {
    bar: {
      horizontal: true,
      barHeight: '80%'
    }
  },
  xaxis: {
    type: 'datetime'
  }
}

const timelineChartSeries = [
  {
    data: [
      {
        x: 'Project A',
        y: [new Date('2024-01-01').getTime(), new Date('2024-04-30').getTime()]
      },
      {
        x: 'Project B',
        y: [new Date('2024-02-01').getTime(), new Date('2024-05-31').getTime()]
      }
    ]
  }
]

const resourceChartOptions = {
  chart: {
    type: 'heatmap',
    toolbar: { show: false }
  },
  dataLabels: { enabled: false },
  colors: ['#008FFB']
}
// Add projects data
const projects = ref<Project[]>([
  {
    id: 1,
    name: 'Website Redesign',
    budget: 50000,
    spent: 35000,
    budgetStatus: 'On Budget',
    timeline: [new Date('2024-01-01'), new Date('2024-04-30')],
    risks: [],
    resources: []
  },
  {
    id: 2,
    name: 'Mobile App Development',
    budget: 120000,
    spent: 95000,
    budgetStatus: 'Under Budget',
    timeline: [new Date('2024-02-01'), new Date('2024-06-30')],
    risks: [],
    resources: []
  },
  {
    id: 3,
    name: 'CRM Integration',
    budget: 80000,
    spent: 85000,
    budgetStatus: 'Over Budget',
    timeline: [new Date('2024-03-01'), new Date('2024-07-31')],
    risks: [],
    resources: []
  }
])

const resourceChartSeries = [
  {
    name: 'Development',
    data: [
      { x: 'Project A', y: 80 },
      { x: 'Project B', y: 40 },
      { x: 'Project C', y: 60 }
    ]
  },
  {
    name: 'Design',
    data: [
      { x: 'Project A', y: 20 },
      { x: 'Project B', y: 70 },
      { x: 'Project C', y: 30 }
    ]
  }
]

// Methods
const formatNumber = (num: number) => {
  return num.toLocaleString('en-US')
}

const getBudgetStatusColor = (status: string) => ({
  'Under Budget': 'text-green-600',
  'On Budget': 'text-blue-600',
  'Over Budget': 'text-red-600'
}[status])

const getBudgetProgressColor = (percentage: number) => {
  if (percentage <= 85) return 'bg-green-600'
  if (percentage <= 100) return 'bg-yellow-600'
  return 'bg-red-600'
}

const getRiskClass = (level: string) => ({
  'Low': 'border-green-200 bg-green-50',
  'Medium': 'border-yellow-200 bg-yellow-50',
  'High': 'border-red-200 bg-red-50'
}[level])

const getRiskBadgeClass = (level: string) => ({
  'Low': 'px-2 py-1 text-xs rounded-full bg-green-100 text-green-800',
  'Medium': 'px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800',
  'High': 'px-2 py-1 text-xs rounded-full bg-red-100 text-red-800'
}[level])

// Add computed property for filtered projects
const filteredProjects = computed(() => {
  if (selectedProject.value === 'all') {
    return projects.value
  }
  return projects.value.filter(p => p.id === parseInt(selectedProject.value))
})
</script>

<style scoped>
.risk-card {
  transition: all 0.3s ease;
}

.risk-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}
</style>