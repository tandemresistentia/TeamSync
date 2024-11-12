import { ref } from 'vue'
import { TrendingUpIcon, TrendingDownIcon } from 'lucide-vue-next'

// Types
export interface Project {
  id: number
  name: string
  budget: number
  spent: number
  budgetStatus: string
  timeline: [Date, Date]
  risks: Risk[]
  resources: Resource[]
}

[Rest of data.ts content as before...]
