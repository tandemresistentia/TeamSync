// src/api/axios.ts
import axios from 'axios'

const getAuthToken = () => sessionStorage.getItem('token')

const api = axios.create({
  baseURL: 'http://localhost:8080/api'
})

// Add a request interceptor to add the token dynamically
api.interceptors.request.use(
  (config) => {
    const token = getAuthToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Add specific API instances for different modules
export const teamsApi = {
  get: (endpoint: string) => api.get(`/teams${endpoint}`),
  post: (endpoint: string, data: any) => api.post(`/teams${endpoint}`, data),
  put: (endpoint: string, data: any) => api.put(`/teams${endpoint}`, data),
  delete: (endpoint: string) => api.delete(`/teams${endpoint}`)
}

export const dashboardApi = {
  get: (endpoint: string) => api.get(`/dashboard${endpoint}`),
  post: (endpoint: string, data: any) => api.post(`/dashboard${endpoint}`, data),
  put: (endpoint: string, data: any) => api.put(`/dashboard${endpoint}`, data),
  delete: (endpoint: string) => api.delete(`/dashboard${endpoint}`)
}

export default api