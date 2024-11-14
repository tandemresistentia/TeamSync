// data.ts
import axios from 'axios'
import { ref } from 'vue'
import {
  UsersIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  BellIcon
} from '@heroicons/vue/24/outline'

const api = axios.create({
  baseURL: 'http://localhost:8080/api/dashboard',
  headers: {
    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
  }
})

export function useDashboard() {
  const alerts = ref([])
  const criticalTasks = ref([])
  const stats = ref([])
  const chartOptions = ref({
    productivityChartOptions: {
      chart: {
        type: 'line',
        toolbar: { show: false }
      },
      stroke: { curve: 'smooth', width: 3 },
      colors: ['#3B82F6', '#10B981'],
      grid: { borderColor: '#f3f4f6' },
      xaxis: {
        categories: []
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
    },
    productivityChartSeries: [],
    resourceChartOptions: {
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
        categories: []
      }
    },
    resourceChartSeries: []
  })

  const fetchDashboardData = async () => {
    try {
      const [
        alertsRes,
        productivityData,
        resourceData,
        criticalTasksData,
      ] = await Promise.all([
        api.get('/alerts'),
        api.get('/productivity-chart'),
        api.get('/resource-usage'),
        api.get('/critical-tasks'),
      ])

      alerts.value = alertsRes.data
      criticalTasks.value = criticalTasksData.data
      stats.value = [
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

      chartOptions.value = {
        ...chartOptions.value,
        productivityChartOptions: {
          ...chartOptions.value.productivityChartOptions,
          xaxis: {
            categories: productivityData.data.categories
          }
        },
        productivityChartSeries: [
          {
            name: 'Tasks Completed',
            data: productivityData.data.tasksCompleted
          },
          {
            name: 'Hours Worked',
            data: productivityData.data.hoursWorked
          }
        ],
        resourceChartOptions: {
          ...chartOptions.value.resourceChartOptions,
          xaxis: {
            categories: resourceData.data.categories
          }
        },
        resourceChartSeries: [{
          name: 'Usage',
          data: resourceData.data.usage
        }]
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    }
  }

  return {
    alerts,
    stats,
    criticalTasks,
    chartOptions,
    fetchDashboardData
  }
}