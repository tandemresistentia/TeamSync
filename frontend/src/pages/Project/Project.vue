<script setup lang="ts">
import VueApexCharts from 'vue3-apexcharts'
import { PlusIcon } from 'lucide-vue-next'

// Import data
import {
  timeRange,
  selectedProject,
  activeProjects,
  showNewProjectDialog,
  healthMetrics,
  projectRisks,
  projects,
  timelineChartOptions,
  timelineChartSeries,
  resourceChartOptions,
  resourceChartSeries
} from './data'

// Import methods
import {
  formatNumber,
  getBudgetStatusColor,
  getBudgetProgressColor,
  getRiskClass,
  getRiskBadgeClass,
  filteredProjects
} from './script'
</script>

<template>
  <div class="p-6 space-y-6">
    <!-- Project Overview Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold">Project Tracking</h1>
        <p class="text-gray-600">Tracking ${{ activeProjects }} active projects</p>
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
            <p class="text-sm text-gray-600">${{ metric.title }}</p>
            <h3 class="text-2xl font-semibold">${{ metric.value }}</h3>
          </div>
          <div :class="metric.trendColor" class="flex items-center">
            <component :is="metric.trendIcon" class="w-4 h-4 mr-1" />
            <span>${{ metric.trend }}</span>
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
              ${{ project.name }}
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
              <span class="font-medium">${{ project.name }}</span>
              <span :class="getBudgetStatusColor(project.budgetStatus)">
                ${{ project.budgetStatus }}
              </span>
            </div>
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p class="text-gray-600">Budget</p>
                <p class="font-medium">$${{ formatNumber(project.budget) }}</p>
              </div>
              <div>
                <p class="text-gray-600">Spent</p>
                <p class="font-medium">$${{ formatNumber(project.spent) }}</p>
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
               class="p-3 border rounded-lg risk-card"
               :class="getRiskClass(risk.level)">
            <div class="flex items-center justify-between mb-2">
              <span class="font-medium">${{ risk.name }}</span>
              <span :class="getRiskBadgeClass(risk.level)">
                ${{ risk.level }}
              </span>
            </div>
            <p class="text-sm text-gray-600">${{ risk.description }}</p>
            <div class="mt-2 text-sm">
              <span class="font-medium">Impact:</span> ${{ risk.impact }}
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

<style scoped>
.risk-card {
  transition: all 0.3s ease;
}

.risk-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}
</style>
