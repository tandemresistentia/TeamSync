import { ref } from 'vue'
import { TrendingUpIcon, TrendingDownIcon } from 'lucide-vue-next'
import { Project } from './types'


// State
export const timeRange = ref('month')
export const selectedProject = ref('all')
export const activeProjects = ref(8)
export const showNewProjectDialog = ref(false)

// Mock Data
export const healthMetrics = [
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

export const projectRisks = [
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

export const projects = ref<Project[]>([
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

// Chart configurations
export const timelineChartOptions = {
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

export const timelineChartSeries = [
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

export const resourceChartOptions = {
  chart: {
    type: 'heatmap',
    toolbar: { show: false }
  },
  dataLabels: { enabled: false },
  colors: ['#008FFB']
}

export const resourceChartSeries = [
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