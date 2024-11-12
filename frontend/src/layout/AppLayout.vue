<template>
  <div class="min-h-screen bg-background">
    <!-- Navigation Bar -->
    <nav class="fixed top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Logo and Main Nav -->
          <div class="flex items-center gap-8">
            <div class="flex-shrink-0">
              <router-link to="/" class="flex items-center gap-2">
                <div class="flex items-center justify-center w-8 h-8 rounded bg-primary/10">
                  <LayersIcon class="w-5 h-5 text-primary" />
                </div>
                <span class="text-xl font-bold text-primary">TeamSync</span>
              </router-link>
            </div>
            <div class="hidden md:block">
              <div class="flex items-center gap-1">
                <router-link 
                  v-for="item in navigationItems" 
                  :key="item.path"
                  :to="item.path"
                  class="flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors rounded-md"
                  :class="[
                    route.path === item.path
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  ]"
                >
                  <component :is="item.icon" class="w-4 h-4" />
                  {{ item.name }}
                </router-link>
              </div>
            </div>
          </div>

          <!-- Right Side Actions -->
          <div class="flex items-center gap-4">
            <button class="p-2 rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground">
              <BellIcon class="w-5 h-5" />
            </button>
            <button class="p-2 rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground">
              <SearchIcon class="w-5 h-5" />
            </button>
            <div class="w-px h-8 bg-border"></div>
            <div class="flex items-center gap-2">
              <div class="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                <UserIcon class="w-4 h-4 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Page Content -->
    <main class="py-6 pt-20 mx-auto rounded-lg sm:px-6 lg:px-8">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { 
  LayoutDashboardIcon, 
  UsersIcon, 
  FolderIcon, 
  CalendarIcon,
  LayersIcon,
  BellIcon,
  SearchIcon,
  UserIcon
} from 'lucide-vue-next'

const route = useRoute()

const navigationItems = [
  { 
    name: 'Dashboard', 
    path: '/dashboard',
    icon: LayoutDashboardIcon
  },
  { 
    name: 'Teams', 
    path: '/teams',
    icon: UsersIcon
  },
  { 
    name: 'Projects', 
    path: '/projects',
    icon: FolderIcon
  },
  { 
    name: 'Resources', 
    path: '/resources',
    icon: CalendarIcon
  }
]
</script>

<style scoped>
.router-link-active {
  font-weight: 500;
}
</style>