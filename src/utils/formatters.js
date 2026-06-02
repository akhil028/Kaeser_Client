export function formatRelativeTime(value, now = Date.now()) {
  if (!value) {
    return ''
  }

  const date = new Date(value)
  const time = date.getTime()
  if (Number.isNaN(time)) {
    return ''
  }

  const diffMs = now - time
  const diffSeconds = Math.round(diffMs / 1000)

  if (diffSeconds < 0) {
    return 'just now'
  }
  if (diffSeconds < 45) {
    return 'just now'
  }

  const diffMinutes = Math.round(diffSeconds / 60)
  if (diffMinutes < 60) {
    return `${diffMinutes} min ago`
  }

  const diffHours = Math.round(diffMinutes / 60)
  if (diffHours < 24) {
    return `${diffHours} hr${diffHours === 1 ? '' : 's'} ago`
  }

  const diffDays = Math.round(diffHours / 24)
  return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`
}

export function formatTimestamp(value) {
  if (!value) {
    return '-'
  }

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return String(value)
  }

  return date.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}

export function hasUsefulStatusSnapshot(statusSnapshot) {
  if (!statusSnapshot) {
    return false
  }

  return (
    statusSnapshot.pressureBar !== null ||
    statusSnapshot.temperatureC !== null ||
    Boolean(statusSnapshot.displayTime) ||
    statusSnapshot.runHours !== null ||
    statusSnapshot.loadHours !== null ||
    statusSnapshot.maintenanceHours !== null
  )
}

export function mapReportGroupsByKey(data) {
  const groups = data?.reportGroups || []
  const mappedGroups = groups.reduce((accumulator, group) => {
    accumulator[group.key] = group
    return accumulator
  }, {})

  if (hasUsefulStatusSnapshot(data?.statusSnapshot)) {
    mappedGroups.live_status = {
      key: 'live_status',
      title: 'Live Status',
      reports: [data.statusSnapshot],
    }
  }

  return mappedGroups
}

export function getApiErrorMessage(error) {
  const status = error?.response?.status
  const backendError = error?.response?.data?.error
  const backendMessage = error?.response?.data?.message
  const rawMessage = error?.message || ''

  if (status === 404) {
    return 'No scraped data is stored yet. Run a scrape to populate MongoDB.'
  }

  if (/Network Error/i.test(rawMessage)) {
    return 'The frontend could not reach the backend API. Start the backend server and verify the API URL.'
  }

  if (/timeout/i.test(rawMessage)) {
    return 'The request timed out while waiting for the backend scrape to finish.'
  }

  if (error?.code === 'SCRAPE_POLL_TIMEOUT') {
    return 'Scrape started, but fresh data has not appeared yet. Please wait a little and refresh again.'
  }

  return backendError || backendMessage || error.message || 'Request failed.'
}
