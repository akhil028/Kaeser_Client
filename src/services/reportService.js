import { apiClient } from './apiClient'

const REPORT_REQUEST_TIMEOUT_MS = 15_000
const SCRAPE_REQUEST_TIMEOUT_MS = 8_000
const SCRAPE_POLL_INTERVAL_MS = 3_000
const SCRAPE_POLL_TIMEOUT_MS = 90_000

export async function fetchLatestReport() {
  const response = await apiClient.get('/reports/latest', {
    timeout: REPORT_REQUEST_TIMEOUT_MS,
  })
  return response.data
}

export async function fetchCompressorInfo() {
  const response = await apiClient.get('/status/compressor-info', {
    timeout: REPORT_REQUEST_TIMEOUT_MS,
  })
  return response.data
}

export async function fetchScrapeStatus() {
  const response = await apiClient.get('/scrape/status', {
    timeout: REPORT_REQUEST_TIMEOUT_MS,
  })
  return response.data
}

function wait(delayMs) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, delayMs)
  })
}

export async function triggerScrapeRun() {
  await apiClient.post('/scrape', undefined, {
    timeout: SCRAPE_REQUEST_TIMEOUT_MS,
  })

  const startedAt = Date.now()
  let lastLatestError = null

  while (Date.now() - startedAt < SCRAPE_POLL_TIMEOUT_MS) {
    try {
      return await fetchLatestReport()
    } catch (error) {
      lastLatestError = error

      if (error?.response?.status && error.response.status !== 404) {
        throw error
      }
    }

    const status = await fetchScrapeStatus().catch(() => null)

    if (status?.state === 'failed') {
      const error = new Error(status.error || 'Scrape failed in the backend')
      error.response = {
        data: {
          message: 'Scrape failed in the backend',
          error: status.error || 'Scrape failed',
        },
      }
      throw error
    }

    if (status?.state === 'succeeded') {
      return fetchLatestReport()
    }

    await wait(SCRAPE_POLL_INTERVAL_MS)
  }

  const timeoutError =
    lastLatestError ||
    new Error('Timed out while waiting for newly scraped data to become available.')
  timeoutError.code = 'SCRAPE_POLL_TIMEOUT'
  throw timeoutError
}
