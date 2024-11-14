import { ref } from 'vue'
import { teamsApi } from '../axios'
import { TeamMember, Leave, ChartOptions } from './types'
import { UsersIcon, ChartBarIcon, CalendarIcon } from '@heroicons/vue/24/outline'

export function data() {
  const search = ref('')
  const departmentFilter = ref('all')
  const teamMembers = ref<TeamMember[]>([])
  const upcomingLeave = ref<Leave[]>([])
  const teamMetrics = ref([])
  const chartOptions = ref<ChartOptions>({
    skillsChartOptions: {
      chart: { type: 'radar', toolbar: { show: false } },
      labels: ['Frontend', 'Backend', 'DevOps', 'Design', 'Mobile', 'Data'],
      plotOptions: {
        radar: {
          polygons: {
            strokeColors: '#e2e8f0',
            fill: { colors: ['#f8fafc', '#f1f5f9'] }
          }
        }
      }
    },
    skillsChartSeries: [{
      name: 'Team Skills',
      data: [0, 0, 0, 0, 0, 0]
    }],
    capacityChartOptions: {
      chart: { type: 'bar', toolbar: { show: false } },
      plotOptions: { bar: { horizontal: true, borderRadius: 4 } },
      xaxis: { categories: ['Development', 'Design', 'Marketing'] }
    },
    capacityChartSeries: [{
      name: 'Current Load',
      data: [0, 0, 0]
    }]
  })

  const fetchTeamsData = async () => {
    try {
      const [metricsRes, membersRes, leaveRes, skillsRes, capacityRes] = 
        await Promise.all([
          teamsApi.get('/metrics'),
          teamsApi.get('/members'),
          teamsApi.get('/leave'),
          teamsApi.get('/skills-distribution'),
          teamsApi.get('/capacity')
        ])

      teamMetrics.value = [
        {
          title: 'Total Members',
          value: metricsRes.data.totalMembers,
          subtext: `${metricsRes.data.joiningThisMonth} joining this month`,
          icon: UsersIcon,
          bgColor: 'bg-blue-100',
          iconColor: 'text-blue-600'
        },
        {
          title: 'Skill Coverage',
          value: `${metricsRes.data.skillCoverage}%`,
          subtext: 'Across all projects',
          icon: ChartBarIcon,
          bgColor: 'bg-purple-100',
          iconColor: 'text-purple-600'
        },
        {
          title: 'Planned Leave',
          value: metricsRes.data.plannedLeave,
          subtext: 'Next 30 days',
          icon: CalendarIcon,
          bgColor: 'bg-yellow-100',
          iconColor: 'text-yellow-600'
        }
      ]
      teamMembers.value = membersRes.data
      upcomingLeave.value = leaveRes.data
      
      chartOptions.value = {
        ...chartOptions.value,
        skillsChartSeries: [{ name: 'Team Skills', data: skillsRes.data.skillLevels }],
        capacityChartSeries: [{ name: 'Current Load', data: capacityRes.data.departmentLoads }]
      }
    } catch (error) {
      console.error('Failed to fetch teams data:', error)
    }
  }

  return {
    search,
    departmentFilter,
    teamMembers,
    teamMetrics,
    upcomingLeave,
    chartOptions,
    fetchTeamsData
  }
}