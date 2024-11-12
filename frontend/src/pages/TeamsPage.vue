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
    <div class="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-4">
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
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <!-- Team Members List -->
      <div class="lg:col-span-2">
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
          <div class="p-4">
            <div class="space-y-4">
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

      <!-- Skills Matrix & Leave Calendar -->
      <div class="space-y-6">
        <!-- Skills Distribution -->
        <div class="p-4 bg-white rounded-lg shadow-sm">
          <h2 class="mb-4 text-lg font-semibold">Skills Distribution</h2>
          <VueApexCharts
            type="radar"
            height="300"
            :options="skillsChartOptions"
            :series="skillsChartSeries"
          />
        </div>

        <!-- Team Calendar -->
        <div class="p-4 bg-white rounded-lg shadow-sm">
          <h2 class="mb-4 text-lg font-semibold">Leave Calendar</h2>
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

        <!-- Capacity Planning -->
        <div class="p-4 bg-white rounded-lg shadow-sm">
          <h2 class="mb-4 text-lg font-semibold">Team Capacity</h2>
          <VueApexCharts
            type="bar"
            height="200"
            :options="capacityChartOptions"
            :series="capacityChartSeries"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import {
  UserPlusIcon,
  CalendarDaysIcon,
  UserCircleIcon,
  EyeIcon,
  UsersIcon,
  BriefcaseIcon,
  ChartBarIcon,
  CalendarIcon
} from '@heroicons/vue/24/outline'

// Types
interface TeamMember {
  id: number
  name: string
  role: string
  department: string
  availability: string
  skills: string[]
  avatar?: string
}

interface Leave {
  id: number
  member: string
  type: string
  dates: string
}

// State
const search = ref('')
const departmentFilter = ref('all')

// Mock Data
const teamMetrics = [
  {
    title: 'Total Members',
    value: '24',
    subtext: '3 joining this month',
    icon: UsersIcon,
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-600'
  },
  {
    title: 'Active Projects',
    value: '12',
    subtext: '4 starting soon',
    icon: BriefcaseIcon,
    bgColor: 'bg-green-100',
    iconColor: 'text-green-600'
  },
  {
    title: 'Skill Coverage',
    value: '85%',
    subtext: 'Across all projects',
    icon: ChartBarIcon,
    bgColor: 'bg-purple-100',
    iconColor: 'text-purple-600'
  },
  {
    title: 'Planned Leave',
    value: '5',
    subtext: 'Next 30 days',
    icon: CalendarIcon,
    bgColor: 'bg-yellow-100',
    iconColor: 'text-yellow-600'
  }
]

const teamMembers = ref<TeamMember[]>([
  {
    id: 1,
    name: 'John Doe',
    role: 'Senior Developer',
    department: 'development',
    availability: 'Available',
    skills: ['React', 'Node.js', 'TypeScript', 'AWS']
  },
  {
    id: 2,
    name: 'Jane Smith',
    role: 'UI/UX Designer',
    department: 'design',
    availability: 'On Leave',
    skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping']
  },
  {
    id: 3,
    name: 'Mike Johnson',
    role: 'Marketing Manager',
    department: 'marketing',
    availability: 'In Meeting',
    skills: ['Content Strategy', 'SEO', 'Analytics', 'Social Media']
  }
])

const upcomingLeave = ref<Leave[]>([
  { id: 1, member: 'Jane Smith', type: 'Vacation', dates: 'Dec 20-27' },
  { id: 2, member: 'Mike Johnson', type: 'Personal', dates: 'Dec 15' },
  { id: 3, member: 'John Doe', type: 'Sick Leave', dates: 'Dec 10' }
])

// Chart Options
const skillsChartOptions = {
  chart: {
    type: 'radar',
    toolbar: { show: false }
  },
  labels: ['Frontend', 'Backend', 'DevOps', 'Design', 'Mobile', 'Data'],
  plotOptions: {
    radar: {
      polygons: {
        strokeColors: '#e2e8f0',
        fill: {
          colors: ['#f8fafc', '#f1f5f9']
        }
      }
    }
  }
}

const skillsChartSeries = [{
  name: 'Team Skills',
  data: [80, 65, 45, 70, 60, 40]
}]

const capacityChartOptions = {
  chart: {
    type: 'bar',
    toolbar: { show: false }
  },
  plotOptions: {
    bar: { horizontal: true, borderRadius: 4 }
  },
  xaxis: {
    categories: ['Development', 'Design', 'Marketing']
  }
}

const capacityChartSeries = [{
  name: 'Current Load',
  data: [85, 65, 45]
}]

// Computed
const filteredMembers = computed(() => {
  return teamMembers.value.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(search.value.toLowerCase()) ||
                         member.role.toLowerCase().includes(search.value.toLowerCase())
    const matchesDepartment = departmentFilter.value === 'all' || 
                             member.department === departmentFilter.value
    return matchesSearch && matchesDepartment
  })
})

// Methods
const getAvailabilityClass = (status: string) => {
  const classes = {
    'Available': 'px-2 py-1 text-sm text-green-800 bg-green-100 rounded-full',
    'On Leave': 'px-2 py-1 text-sm text-red-800 bg-red-100 rounded-full',
    'In Meeting': 'px-2 py-1 text-sm text-yellow-800 bg-yellow-100 rounded-full'
  }
  return classes[status] || ''
}

const openAddMemberModal = () => {
  console.log('Opening add member modal...')
}

const openScheduleModal = () => {
  console.log('Opening schedule modal...')
}

const openMemberDetails = (member: TeamMember) => {
  console.log('Opening member details:', member)
}
</script>

<style scoped>
.skill-badge {
  @apply px-2 py-1 text-xs rounded-full;
}
</style>