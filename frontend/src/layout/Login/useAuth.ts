// useAuth.ts
import { ref } from 'vue'
import axios from 'axios'

// Types
interface User {
  id: string
  name: string
  email: string
  avatarUrl?: string
}

interface LoginForm {
  email: string
  password: string
}

interface SignUpForm {
  firstname: string
  lastname: string
  email: string
  password: string
}

// Create axios instance
const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  headers: {
    'Content-Type': 'application/json'
  }
})

export function useAuth() {
  const isAuthenticated = ref(false)
  const user = ref<User | null>(null)
  const showDialog = ref(false)
  const isSignUp = ref(false)
  const isLoading = ref(false)

  const loginForm = ref<LoginForm>({
    email: '',
    password: ''
  })

  const signupForm = ref<SignUpForm>({
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  })

  const handleLogin = async () => {
    try {
      isLoading.value = true
      const response = await api.post('/auth/authenticate', loginForm.value)
      
      localStorage.setItem('token', response.data.token)
      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
      
      isAuthenticated.value = true
      showDialog.value = false
      
      window.location.reload()
    } catch (error) {
      console.error('Login failed:', error)
    } finally {
      isLoading.value = false
    }
  }

  const handleSignUp = async () => {
    try {
      isLoading.value = true
      const response = await api.post('/auth/register', signupForm.value)
      
      localStorage.setItem('token', response.data.token)
      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
      
      isAuthenticated.value = true
      showDialog.value = false
      
      window.location.reload()
    } catch (error) {
      console.error('Sign up failed:', error)
    } finally {
      isLoading.value = false
    }
  }

  const handleLogout = async () => {
    try {
      localStorage.removeItem('token')
      delete api.defaults.headers.common['Authorization']
      
      user.value = null
      isAuthenticated.value = false

      window.location.reload()
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  // Check for existing token on component mount
  const checkAuth = async () => {
    const token = localStorage.getItem('token')
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      isAuthenticated.value = true
      // Optional: Fetch user details
    }
  }

  // Run initial auth check
  checkAuth()

  return {
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
  }
}