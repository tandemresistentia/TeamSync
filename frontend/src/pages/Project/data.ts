import { ref, computed, onMounted, watch } from 'vue'
import axios from 'axios'
import { TrendingUpIcon, TrendingDownIcon } from 'lucide-vue-next'

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
  }
})

export function useProjectData() {
  // State
  const timeRange = ref('month')
  const selectedProject = ref('all')
  const activeProjects = ref(0)
  const showNewProjectDialog = ref(false)

  // Data refs with empty initial values
  const healthMetrics = ref([])
  const projectRisks = ref([])
  const projects = ref([])

  // Filtered projects based on selection and time range
  const filteredProjects = computed(() => {
    let filtered = projects.value

    // Filter by selected project
    if (selectedProject.value !== 'all') {
      filtered = filtered.filter(p => p.id === selectedProject.value)
    }

    // Filter by time range
    const now = new Date()
    const timeRangeFilter = {
      week: new Date(now.setDate(now.getDate() - 7)),
      month: new Date(now.setMonth(now.getMonth() - 1)),
      quarter: new Date(now.setMonth(now.getMonth() - 3))
    }

    filtered = filtered.filter(project => {
      const projectStart = new Date(project.timeline[0])
      return projectStart >= timeRangeFilter[timeRange.value]
    })

    return filtered
  })

  const timelineChartOptions = {
    chart: {
      height: 350,
      type: 'rangeBar',
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '50%',
        rangeBarGroupRows: true
      }
    },
    colors: ['#008FFB'],
    xaxis: {
      type: 'datetime',
      labels: {
        format: 'MMM yyyy'
      }
    },
    tooltip: {
      custom: function(opts) {
        const fromDate = new Date(opts.y1).toLocaleDateString()
        const toDate = new Date(opts.y2).toLocaleDateString()
        return (
          '<div class="p-2">' +
          '<span>' + opts.w.globals.seriesNames[opts.seriesIndex] + ': </span>' +
          '<span>' + fromDate + ' - ' + toDate + '</span>' +
          '</div>'
        )
      }
    }
  }

  // Use computed for the timeline series data to automatically update when projects change
  const timelineChartSeries = computed(() => [{
    name: 'Projects',
    data: projects.value.map(project => ({
      x: project.name,
      y: [
        new Date(project.startDate).getTime(),
        new Date(project.endDate).getTime()
      ],
      fillColor: getBudgetStatusColor(project.budgetStatus)
    }))
  }])

  const getBudgetStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'on budget':
        return '#10B981' // green
      case 'over budget':
        return '#EF4444' // red
      case 'under budget':
        return '#3B82F6' // blue
      default:
        return '#6B7280' // gray
    }
  }

  const resourceChartSeries = computed(() => {
    const projectData = filteredProjects.value

    return [
      {
        name: 'Development',
        data: projectData.map(project => ({
          x: project.name,
          y: project.resources?.filter(r => r.type === 'development')?.length * 20 || 0
        }))
      },
      {
        name: 'Design',
        data: projectData.map(project => ({
          x: project.name,
          y: project.resources?.filter(r => r.type === 'design')?.length * 20 || 0
        }))
      }
    ]
  })

  // Fetch Functions
  const fetchData = async () => {
    try {
      
      const [projectsRes, metricsRes, risksRes] = await Promise.all([
        api.get('/projects'),
        api.get('/health-metrics'),
        api.get('/project-risks')
      ])

      projects.value = projectsRes.data.map((project: any) => ({
        ...project,
        timeline: [new Date(project.startDate), new Date(project.endDate)]
      }))

      healthMetrics.value = metricsRes.data.map((metric: any) => ({
        ...metric,
        trendIcon: metric.trend.startsWith('+') ? TrendingUpIcon : TrendingDownIcon,
        trendColor: metric.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
      }))

      projectRisks.value = risksRes.data
      activeProjects.value = filteredProjects.value.length
    } catch (error) {
      console.error('Failed to fetch data:', error)
    }
  }

  // Watch for changes in timeRange and selectedProject
  watch([timeRange, selectedProject], () => {
    activeProjects.value = filteredProjects.value.length
  })

  // Initialize data
  onMounted(() => {
    fetchData()
  })

  return {
    // State
    timeRange,
    selectedProject,
    activeProjects,
    showNewProjectDialog,

    // Data
    healthMetrics,
    projectRisks,
    projects,
    filteredProjects,

    // Charts
    timelineChartOptions,
    timelineChartSeries,
    resourceChartSeries,

    // Methods
    fetchData
  }
}