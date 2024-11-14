<script setup lang="ts">
import { onMounted } from 'vue';
import VueApexCharts from 'vue3-apexcharts'
import {
  UserPlusIcon,
  CalendarDaysIcon,
  UserCircleIcon,
  EyeIcon,
} from '@heroicons/vue/24/outline'

import { data } from './data';
const {
  teamMetrics,
  search,
  departmentFilter,
  upcomingLeave,
  chartOptions, // Add these
  fetchTeamsData
} = data()
// Import methods and computed properties
import {
  filteredMembers,
  getAvailabilityClass,
  openAddMemberModal,
  openScheduleModal,
  openMemberDetails,
  isLoading
} from './script'

onMounted(() => {
  fetchTeamsData()
})
</script>

<template>
  <div class="p-6">
    <!-- Header with Actions -->
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold">Team Management</h1>
      <div class="flex gap-3">
        <button @click="openAddMemberModal" 
                class="flex items-center px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
          <UserPlusIcon class="w-5 h-5 mr-2" />
          Add Team Member
        </button>
        <button @click="openScheduleModal" 
                class="flex items-center px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700">
          <CalendarDaysIcon class="w-5 h-5 mr-2" />
          Schedule Planning
        </button>
      </div>
    </div>

    <!-- Team Overview Cards -->
    <div class="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-3">
      <div v-for="metric in teamMetrics" :key="metric.title" 
           class="p-4 bg-white rounded-lg shadow-sm">
        <div class="flex items-center">
          <div class="p-3 rounded-full" :class="metric.bgColor">
            <component :is="metric.icon" class="w-6 h-6" :class="metric.iconColor" />
          </div>
          <div class="ml-4">
            <h3 class="text-sm text-gray-500">{{ metric.title }}</h3>
            <p class="text-2xl font-semibold">{{ metric.value }}</p>
            <p class="text-sm text-gray-600">{{ metric.subtext }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-4">
      <!-- Team Members List -->
      <div class="lg:col-span-3">
        <div class="bg-white rounded-lg shadow-sm">
          <div class="p-4 border-b">
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-semibold">Team Members</h2>
              <div class="flex gap-2">
                <input type="text" 
                       v-model="search" 
                       placeholder="Search members..." 
                       class="px-3 py-1 border rounded-lg" />
                <select v-model="departmentFilter" 
                        class="px-3 py-1 border rounded-lg">
                  <option value="all">All Departments</option>
                  <option value="development">Development</option>
                  <option value="design">Design</option>
                  <option value="marketing">Marketing</option>
                </select>
              </div>
            </div>
          </div>
    <div class="p-4 h-[55vh] overflow-auto">
    <div v-if="isLoading" class="flex items-center justify-center h-64">
      <div class="w-12 h-12 border-b-2 border-blue-500 rounded-full animate-spin"></div>
    </div>
    <div v-else-if="filteredMembers.length === 0" class="py-8 text-center">
      <p class="text-gray-500">No team members found</p>
    </div>
    <div v-else class="space-y-4">
      <!-- Your existing member cards -->
      <div v-for="member in filteredMembers" 
           :key="member.id" 
           class="p-4 border rounded-lg hover:bg-gray-50">
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <div class="w-12 h-12 bg-gray-200 rounded-full">
                      <img v-if="member.avatar" 
                           :src="member.avatar" 
                           :alt="member.name"
                           class="w-12 h-12 rounded-full" />
                      <UserCircleIcon v-else class="w-12 h-12 text-gray-400" />
                    </div>
                    <div class="ml-4">
                      <h3 class="font-medium">{{ member.name }}</h3>
                      <p class="text-sm text-gray-600">{{ member.role }}</p>
                    </div>
                  </div>
                  <div class="flex items-center gap-4">
                    <div :class="getAvailabilityClass(member.availability)">
                      {{ member.availability }}
                    </div>
                    <button @click="openMemberDetails(member)" 
                            class="text-blue-600 hover:text-blue-800">
                      <EyeIcon class="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div class="mt-4">
                  <div class="flex flex-wrap gap-2">
                    <span v-for="skill in member.skills" 
                          :key="skill"
                          class="px-2 py-1 text-xs text-blue-800 bg-blue-100 rounded-full">
                      {{ skill }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Sidebar -->
      <div class="space-y-6">
        <!-- Skills Distribution -->
        <div class="p-4 bg-white rounded-lg shadow-sm">
            <h2 class="mb-4 text-lg font-semibold">Skills Distribution</h2>
            <VueApexCharts
              type="radar"
              height="300"
              :options="chartOptions.skillsChartOptions"
              :series="chartOptions.skillsChartSeries"
            />
          </div>

        <!-- Leave Calendar -->
        <div class="p-4 bg-white rounded-lg shadow-sm">
          <h2 class="mb-4 text-lg font-semibold">Upcoming Leave</h2>
          <div class="space-y-2">
            <div v-for="leave in upcomingLeave" 
                 :key="leave.id" 
                 class="flex items-center justify-between p-2 text-sm border rounded">
              <div>
                <span class="font-medium">{{ leave.member }}</span>
                <span class="text-gray-600"> - {{ leave.type }}</span>
              </div>
              <span class="text-gray-600">{{ leave.dates }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.skill-badge {
  @apply px-2 py-1 text-xs rounded-full;
}
</style>