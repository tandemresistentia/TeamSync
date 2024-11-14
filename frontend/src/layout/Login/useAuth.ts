// useAuth.ts
import { ref } from 'vue'
import axios, {AxiosError} from 'axios'

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

interface AuthResponse {
  token: string
  user?: User
}

// Create axios instance
const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add interceptor to handle 403 and 401 errors
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      sessionStorage.removeItem('token')
      delete api.defaults.headers.common['Authorization']
    }
    return Promise.reject(error)
  }
)

export function useAuth() {
  const isAuthenticated = ref(false)
  const user = ref<User | null>(null)
  const showDialog = ref(false)
  const isSignUp = ref(false)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

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

  const setAuthToken = (token: string) => {
    sessionStorage.setItem('token', token)
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    isAuthenticated.value = true
  }

  const handleLogin = async () => {
    try {
      error.value = null
      isLoading.value = true

      const response = await api.post<AuthResponse>('/auth/authenticate', {
        email: loginForm.value.email,
        password: loginForm.value.password
      })

      setAuthToken(response.data.token)
      if (response.data.user) {
        user.value = response.data.user
      }
      showDialog.value = false
      
      window.location.reload()
      return true
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response?.status === 403) {
          error.value = 'Invalid email or password'
        } else {
          error.value = 'An error occurred during login. Please try again.'
        }
      }
      return false
    } finally {
      isLoading.value = false
    }
  }

  const handleSignUp = async () => {
    try {
      error.value = null
      isLoading.value = true

      const response = await api.post<AuthResponse>('/auth/register', {
        firstName: signupForm.value.firstname,
        lastName: signupForm.value.lastname,
        email: signupForm.value.email,
        password: signupForm.value.password
      })
      
      setAuthToken(response.data.token)
      if (response.data.user) {
        user.value = response.data.user
      }
      
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
      sessionStorage.removeItem('token')
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
    const token = sessionStorage.getItem('token')
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