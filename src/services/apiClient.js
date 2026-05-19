import axios from 'axios'

const backendOrigin =
  import.meta.env.VITE_API_BASE_URL || `${window.location.origin}/api`

export const apiClient = axios.create({
  baseURL: backendOrigin,
  headers: { Accept: 'application/json' },
})

apiClient.interceptors.response.use((response) => {
  const contentType = String(response.headers?.['content-type'] || '')
  if (!contentType.includes('application/json')) {
    const error = new Error(
      'Expected JSON from the backend but received a non-JSON response. ' +
        'Check that the API server is running on port 3001 and that the Vite proxy is configured.',
    )
    error.response = response
    throw error
  }
  return response
})
