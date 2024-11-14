<script setup lang="ts">
import VueApexCharts from 'vue3-apexcharts'
import { PlusIcon } from 'lucide-vue-next'
import { useProjectData } from './data'
import { computed } from 'vue'

// Get data and methods from our composable
const {
  timeRange,
  selectedProject,
  activeProjects,
  showNewProjectDialog,
  healthMetrics,
  projectRisks,
  projects,
  timelineChartOptions,
  timelineChartSeries,
} = useProjectData()

// Utility functions
const formatNumber = (num: number) => {
  return new Intl.NumberFormat('en-US').format(num)
}

const getBudgetStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'on budget':
      return 'text-green-600'
    case 'over budget':
      return 'text-red-600'
    case 'under budget':
      return 'text-blue-600'
    default:
      return 'text-gray-600'
  }
}

const getBudgetProgressColor = (percentage: number) => {
  if (percentage > 100) return 'bg-red-600'
  if (percentage > 90) return 'bg-yellow-600'
  return 'bg-green-600'
}

const getRiskClass = (level: string) => {
  switch (level.toLowerCase()) {
    case 'high':
      return 'border-red-200 bg-red-50'
    case 'medium':
      return 'border-yellow-200 bg-yellow-50'
    case 'low':
      return 'border-green-200 bg-green-50'
    default:
      return 'border-gray-200'
  }
}

const getRiskBadgeClass = (level: string) => {
  switch (level.toLowerCase()) {
    case 'high':
      return 'px-2 py-1 text-xs font-medium text-red-700 bg-red-100 rounded-full'
    case 'medium':
      return 'px-2 py-1 text-xs font-medium text-yellow-700 bg-yellow-100 rounded-full'
    case 'low':
      return 'px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full'
    default:
      return 'px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded-full'
  }
}

// Computed values
const filteredProjects = computed(() => {
  if (selectedProject.value === 'all') {
    return projects.value
  }
  return projects.value.filter(project => project.id === selectedProject.value)
})
</script>

<template>
  <div class="p-4 space-y-4">
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
    <div class="h-[35vh] space-y-4 overflow-auto">
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
                <div class="h-2 overflow-auto rounded-full max-w-[100%]"
                     :class="getBudgetProgressColor(project.spent / project.budget * 100)"
                     :style="{ width: `${(project.spent / project.budget * 100)}%` }">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Risk Assessment -->
    <div class="p-1 bg-white rounded-lg shadow-sm h-[18vh] overflow-auto">
      <h2 class="mb-4 text-lg font-semibold">Risk Assessment</h2>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div v-for="risk in projectRisks" :key="risk.id"
             class="p-3 border rounded-lg risk-card"
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