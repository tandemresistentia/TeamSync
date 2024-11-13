<template>
  <div class="relative">
    <template v-if="isAuthenticated">
      <DropdownMenu>
        <DropdownMenuTrigger class="flex items-center gap-2 p-2 transition-colors rounded-md outline-none hover:bg-accent">
          <div class="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
            <img 
              v-if="user?.avatarUrl" 
              :src="user.avatarUrl" 
              :alt="user.name"
              class="w-8 h-8 rounded-full"
            />
            <UserIcon v-else class="w-4 h-4 text-primary" />
          </div>
          <span class="hidden text-sm font-medium md:block">{{ user?.name || 'User' }}</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <UserIcon class="w-4 h-4 mr-2" />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SettingsIcon class="w-4 h-4 mr-2" />
            Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem @click="handleLogout">
            <LogOutIcon class="w-4 h-4 mr-2" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </template>
    
    <template v-else>
      <Button variant="ghost" size="sm" @click="showDialog = true" class="flex items-center gap-2">
        <UserIcon class="w-4 h-4" />
        <span class="hidden md:inline">Account</span>
      </Button>
    </template>

    <!-- Auth Dialog -->
    <Dialog :open="showDialog" @update:open="showDialog = false">
      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{{ isSignUp ? 'Create an account' : 'Welcome back' }}</DialogTitle>
          <DialogDescription>
            {{ isSignUp ? 'Enter your details to create your account' : 'Enter your credentials to login' }}
          </DialogDescription>
        </DialogHeader>

        <div class="grid gap-4 py-4">
          <Transition name="fade" mode="out-in">
            <!-- Login Form -->
            <div v-if="!isSignUp" key="login" class="grid gap-4">
              <div class="grid gap-2">
                <Label for="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  v-model="loginForm.email" 
                  placeholder="example@email.com" 
                />
              </div>
              <div class="grid gap-2">
                <Label for="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  v-model="loginForm.password" 
                />
              </div>
              <div class="flex items-center justify-between">
                <Button 
                  type="submit" 
                  @click="handleLogin" 
                  :disabled="isLoading"
                >
                  {{ isLoading ? 'Loading...' : 'Login' }}
                </Button>
                <Button variant="ghost" @click="isSignUp = true">Create account</Button>
              </div>
            </div>

            <!-- Sign Up Form -->
            <div v-else key="signup" class="grid gap-4">
              <div class="grid gap-2">
                <Label for="firstname">First Name</Label>
                <Input 
                  id="firstname" 
                  type="text" 
                  v-model="signupForm.firstname" 
                  placeholder="John" 
                />
              </div>
              <div class="grid gap-2">
                <Label for="lastname">Last Name</Label>
                <Input 
                  id="lastname" 
                  type="text" 
                  v-model="signupForm.lastname" 
                  placeholder="Doe" 
                />
              </div>
              <div class="grid gap-2">
                <Label for="signup-email">Email</Label>
                <Input 
                  id="signup-email" 
                  type="email" 
                  v-model="signupForm.email" 
                  placeholder="example@email.com" 
                />
              </div>
              <div class="grid gap-2">
                <Label for="signup-password">Password</Label>
                <Input 
                  id="signup-password" 
                  type="password" 
                  v-model="signupForm.password" 
                />
              </div>
              <div class="flex items-center justify-between">
                <Button 
                  type="submit" 
                  @click="handleSignUp"
                  :disabled="isLoading"
                >
                  {{ isLoading ? 'Loading...' : 'Sign Up' }}
                </Button>
                <Button variant="ghost" @click="isSignUp = false">Back to login</Button>
              </div>
            </div>
          </Transition>
        </div>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from './useAuth'
import { 
  UserIcon, 
  SettingsIcon, 
  LogOutIcon 
} from 'lucide-vue-next'
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const { 
  isAuthenticated,
  user,
  showDialog,
  isSignUp,
  loginForm,
  signupForm,
  isLoading,
  handleLogin,
  handleSignUp,
  handleLogout
} = useAuth()
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>