import { apiClient } from './apiClient'

export async function fetchLatestReport() {
  const response = await apiClient.get('/reports/latest')
  return response.data
}

export async function triggerScrapeRun() {
  await apiClient.post('/scrape')
  return fetchLatestReport()
}
