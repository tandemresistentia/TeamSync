import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '../layout/AppLayout.vue'
import DashboardPage from '../pages/DashboardPage.vue'
import TeamsPage from '../pages/TeamsPage.vue'
import ProjectsPage from '../pages/ProjectsPage.vue'
import HomePage from '../pages/HomePage.vue'
import ResourcesPage from '@/pages/ResourcesPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: AppLayout,
      children: [
        {
          path: '/',
          name: 'Home',
          component: HomePage
        },
        {
          path: 'dashboard',
          name: 'dashboard',
          component: DashboardPage
        },
        {
          path: 'teams',
          name: 'teams',
          component: TeamsPage
        },
        {
          path: 'projects',
          name: 'projects',
          component: ProjectsPage
        },
        {
          path: 'Resources',
          name: 'Resources',
          component: ResourcesPage
        }
      ]
    }
  ]
})

export default router