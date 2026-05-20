import { useEffect, useMemo, useState } from 'react'
import { Box, Container, Paper, Stack } from '@mui/material'
import { DashboardHeader } from '../components/dashboard/DashboardHeader'
import { DashboardSidebar } from '../components/dashboard/DashboardSidebar'
import { DashboardTabs } from '../components/dashboard/DashboardTabs'
import { ReportSummary } from '../components/dashboard/ReportSummary'
import { ReportTable } from '../components/dashboard/ReportTable'
import { SystemStatusPanel } from '../components/dashboard/SystemStatusPanel'
import { DashboardErrorState, DashboardLoadingState } from '../components/dashboard/DashboardState'
import { fetchLatestReport, triggerScrapeRun } from '../services/reportService'
import { getApiErrorMessage, mapReportGroupsByKey } from '../utils/formatters'

const LIVE_REFRESH_INTERVAL_MS = 60_000

export function DashboardPage() {
  const [activeSection, setActiveSection] = useState('system_status')
  const [activeTab, setActiveTab] = useState('current')
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
  const resolvedActiveTab = groups[activeTab] ? activeTab : 'current'
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
          'radial-gradient(1200px 600px at 0% 0%, rgba(180, 35, 24, 0.05) 0%, transparent 60%),' +
          'radial-gradient(900px 500px at 100% 100%, rgba(21, 94, 239, 0.05) 0%, transparent 55%),' +
          'linear-gradient(180deg, #f6f7fb 0%, #eef2f7 50%, #f8fafc 100%)',
        py: { xs: 0.5, md: 0.75 },
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
            borderRadius: 2,
            overflow: 'hidden',
            border: '1px solid rgba(15, 23, 42, 0.06)',
            backgroundColor: '#ffffff',
            boxShadow: '0 12px 28px rgba(15, 23, 42, 0.06)',
          }}
        >
          <DashboardHeader refreshing={refreshing} onRefresh={handleRefresh} />

          <Box sx={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
            <DashboardSidebar activeSection={activeSection} onChange={setActiveSection} />

            <Box
              sx={{
                flex: 1,
                minWidth: 0,
                minHeight: 0,
                display: 'flex',
                flexDirection: 'column',
                px: { xs: 0.75, md: 1 },
                py: { xs: 0.75, md: 1 },
                gap: 0.75,
              }}
            >
              {loading ? <DashboardLoadingState /> : null}

              {!loading ? <DashboardErrorState error={error} onRetry={handleRefresh} /> : null}

              {!loading && activeSection === 'system_status' ? (
                <SystemStatusPanel snapshot={data?.statusSnapshot} />
              ) : null}

              {!loading && activeSection === 'messages' && currentGroup ? (
                <Stack
                  spacing={1}
                  sx={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}
                >
                  <DashboardTabs
                    activeTab={resolvedActiveTab}
                    groups={groups}
                    onChange={setActiveTab}
                  />
                  <ReportSummary title={currentGroup.title} rowCount={rows.length} />
                  <ReportTable rows={rows} tabKey={resolvedActiveTab} />
                </Stack>
              ) : null}
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}
