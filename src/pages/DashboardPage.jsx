import { useEffect, useMemo, useState } from 'react'
import { Box, Container, Paper, Stack } from '@mui/material'
import { DashboardHeader } from '../components/dashboard/DashboardHeader'
import { DashboardTabs } from '../components/dashboard/DashboardTabs'
import { ReportSummary } from '../components/dashboard/ReportSummary'
import { ReportTable } from '../components/dashboard/ReportTable'
import { DashboardErrorState, DashboardLoadingState } from '../components/dashboard/DashboardState'
import { fetchLatestReport, triggerScrapeRun } from '../services/reportService'
import {
  getApiErrorMessage,
  hasUsefulStatusSnapshot,
  mapReportGroupsByKey,
} from '../utils/formatters'

const LIVE_REFRESH_INTERVAL_MS = 60_000

export function DashboardPage() {
  const [activeTab, setActiveTab] = useState('live_status')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    const loadLatestReport = async ({ isInitial }) => {
      try {
        const latestData = await fetchLatestReport()
        if (cancelled) {
          return
        }
        setData(latestData)
        setError('')
      } catch (requestError) {
        if (cancelled) {
          return
        }
        setError(getApiErrorMessage(requestError))
        if (isInitial) {
          setData(null)
        }
      } finally {
        if (!cancelled && isInitial) {
          setLoading(false)
        }
      }
    }

    loadLatestReport({ isInitial: true })
    const intervalId = setInterval(
      () => loadLatestReport({ isInitial: false }),
      LIVE_REFRESH_INTERVAL_MS,
    )

    return () => {
      cancelled = true
      clearInterval(intervalId)
    }
  }, [])

  const handleRefresh = async () => {
    setRefreshing(true)
    setError('')

    try {
      const latestData = await triggerScrapeRun()
      setData(latestData)
      setError('')
    } catch (requestError) {
      setError(getApiErrorMessage(requestError))
    } finally {
      setRefreshing(false)
      setLoading(false)
    }
  }

  const groups = useMemo(() => mapReportGroupsByKey(data), [data])
  const preferredDefaultTab = hasUsefulStatusSnapshot(data?.statusSnapshot)
    ? 'live_status'
    : 'current'
  const resolvedActiveTab = groups[activeTab] ? activeTab : preferredDefaultTab
  const currentGroup = groups[resolvedActiveTab]
  const rows = currentGroup?.reports || []

  return (
    <Box
      sx={{
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        background:
          'radial-gradient(1200px 600px at 0% 0%, rgba(180, 35, 24, 0.06) 0%, transparent 60%),' +
          'radial-gradient(900px 500px at 100% 100%, rgba(21, 94, 239, 0.06) 0%, transparent 55%),' +
          'linear-gradient(180deg, #f6f7fb 0%, #eef2f7 50%, #f8fafc 100%)',
        py: { xs: 0.75, md: 1.25 },
      }}
    >
      <Container
        maxWidth="xl"
        sx={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}
      >
        <Paper
          elevation={0}
          sx={{
            flex: 1,
            minHeight: 0,
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 3,
            overflow: 'hidden',
            border: '1px solid rgba(15, 23, 42, 0.06)',
            backgroundColor: 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 16px 40px rgba(15, 23, 42, 0.08)',
          }}
        >
          <DashboardHeader refreshing={refreshing} onRefresh={handleRefresh} />

          <DashboardTabs activeTab={resolvedActiveTab} groups={groups} onChange={setActiveTab} />

          <Box
            sx={{
              flex: 1,
              minHeight: 0,
              display: 'flex',
              flexDirection: 'column',
              px: { xs: 1, md: 1.5 },
              py: { xs: 1, md: 1.25 },
              gap: 1,
            }}
          >
            {loading ? <DashboardLoadingState /> : null}

            {!loading ? <DashboardErrorState error={error} onRetry={handleRefresh} /> : null}

            {!loading && currentGroup ? (
              <Stack
                spacing={1}
                sx={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}
              >
                <ReportSummary title={currentGroup.title} rowCount={rows.length} />
                <ReportTable rows={rows} tabKey={resolvedActiveTab} />
              </Stack>
            ) : null}
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}
