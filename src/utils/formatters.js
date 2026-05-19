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

  return backendError || backendMessage || error.message || 'Request failed.'
}
