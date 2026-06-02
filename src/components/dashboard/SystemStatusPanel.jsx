import { Box, Paper, Stack, Typography } from '@mui/material'
import CompressRoundedIcon from '@mui/icons-material/CompressRounded'
import ThermostatRoundedIcon from '@mui/icons-material/ThermostatRounded'
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded'
import BoltRoundedIcon from '@mui/icons-material/BoltRounded'
import BuildRoundedIcon from '@mui/icons-material/BuildRounded'
import ScheduleRoundedIcon from '@mui/icons-material/ScheduleRounded'
import SensorsOffRoundedIcon from '@mui/icons-material/SensorsOffRounded'
import { formatRelativeTime, formatTimestamp } from '../../utils/formatters'

const SURFACE_BORDER = '1px solid rgba(15, 23, 42, 0.08)'

function hasValue(value) {
  return value !== null && value !== undefined && value !== ''
}

function formatNumber(value) {
  if (!hasValue(value)) {
    return '–'
  }
  const numeric = Number(value)
  if (Number.isNaN(numeric)) {
    return String(value)
  }
  return numeric.toLocaleString()
}

function formatDisplayTime(value) {
  if (!hasValue(value)) {
    return '–'
  }
  return String(value).trim().toUpperCase().replace(/\s+/g, '')
}

const METRICS = [
  {
    key: 'pressureBar',
    label: 'Pressure',
    unit: 'bar',
    icon: <CompressRoundedIcon sx={{ fontSize: 18 }} />,
    accent: '#b42318',
    tint: 'rgba(180, 35, 24, 0.10)',
  },
  {
    key: 'temperatureC',
    label: 'Temperature',
    unit: '°C',
    icon: <ThermostatRoundedIcon sx={{ fontSize: 18 }} />,
    accent: '#b54708',
    tint: 'rgba(181, 71, 8, 0.10)',
  },
  {
    key: 'runHours',
    label: 'Running hours',
    unit: 'h',
    icon: <AccessTimeRoundedIcon sx={{ fontSize: 18 }} />,
    accent: '#155eef',
    tint: 'rgba(21, 94, 239, 0.10)',
  },
  {
    key: 'loadHours',
    label: 'Load hours',
    unit: 'h',
    icon: <BoltRoundedIcon sx={{ fontSize: 18 }} />,
    accent: '#155eef',
    tint: 'rgba(21, 94, 239, 0.10)',
  },
  {
    key: 'maintenanceHours',
    label: 'Maintenance',
    unit: 'h',
    icon: <BuildRoundedIcon sx={{ fontSize: 18 }} />,
    accent: '#12b76a',
    tint: 'rgba(18, 183, 106, 0.12)',
  },
]

function MetricCard({ metric, value }) {
  return (
    <Paper
      elevation={0}
      sx={{
        border: SURFACE_BORDER,
        borderRadius: 2,
        p: 1.5,
        backgroundColor: '#ffffff',
        boxShadow: '0 1px 2px rgba(15, 23, 42, 0.04)',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        transition: 'box-shadow 0.15s ease, transform 0.15s ease',
        '&:hover': {
          boxShadow: '0 8px 20px rgba(15, 23, 42, 0.08)',
          transform: 'translateY(-1px)',
        },
      }}
    >
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        <Box
          sx={{
            width: 30,
            height: 30,
            borderRadius: 1.25,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: metric.tint,
            color: metric.accent,
          }}
        >
          {metric.icon}
        </Box>
        <Typography
          variant="overline"
          sx={{ color: 'text.secondary', lineHeight: 1.2, letterSpacing: '0.06em' }}
        >
          {metric.label}
        </Typography>
      </Stack>
      <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5 }}>
        <Typography
          sx={{
            fontSize: '1.45rem',
            fontWeight: 800,
            lineHeight: 1,
            color: '#101828',
            fontVariantNumeric: 'tabular-nums',
            letterSpacing: '-0.02em',
          }}
        >
          {formatNumber(value)}
        </Typography>
        <Typography sx={{ fontSize: '0.72rem', fontWeight: 600, color: 'text.secondary' }}>
          {metric.unit}
        </Typography>
      </Box>
    </Paper>
  )
}

function CompressorDetailBlock({ compressorInfo }) {
  const rows = [
    ['PN', compressorInfo?.pn],
    ['SN', compressorInfo?.sn],
    ['EN', compressorInfo?.en],
    ['MCS PN', compressorInfo?.mcsPn],
    ['MCS SN', compressorInfo?.mcsSn],
    ['MCS SW', compressorInfo?.mcsSw],
  ].filter(([, value]) => hasValue(value))

  if (rows.length === 0) {
    return null
  }

  return (
    <Paper
      elevation={0}
      sx={{
        border: SURFACE_BORDER,
        borderRadius: 2,
        px: 1.75,
        py: 1.5,
        backgroundColor: '#ffffff',
        boxShadow: '0 1px 2px rgba(15, 23, 42, 0.04)',
      }}
    >
      <Typography
        variant="overline"
        sx={{ color: 'text.secondary', display: 'block', mb: 1, letterSpacing: '0.06em' }}
      >
        Compressor
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(2, minmax(0, 1fr))', md: 'repeat(3, minmax(0, 1fr))' },
          gap: 1,
        }}
      >
        {rows.map(([label, value]) => (
          <Box key={label}>
            <Typography
              sx={{ color: '#667085', fontWeight: 700, fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}
            >
              {label}
            </Typography>
            <Typography
              sx={{ color: '#1d2939', fontSize: '0.82rem', fontWeight: 600, wordBreak: 'break-word' }}
            >
              {value}
            </Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  )
}

function EmptyStatus() {
  return (
    <Paper
      elevation={0}
      sx={{
        border: SURFACE_BORDER,
        borderRadius: 2,
        flex: 1,
        minHeight: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        boxShadow: 'none',
        py: 6,
      }}
    >
      <Stack spacing={1} sx={{ alignItems: 'center' }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f2f4f7',
            color: '#98a2b3',
          }}
        >
          <SensorsOffRoundedIcon sx={{ fontSize: 20 }} />
        </Box>
        <Typography variant="subtitle2" sx={{ color: '#101828' }}>
          No live status yet
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          Run a scrape to pull the latest reading from the compressor.
        </Typography>
      </Stack>
    </Paper>
  )
}

export function SystemStatusPanel({ snapshot, compressorInfo }) {
  if (!snapshot) {
    return (
      <Stack spacing={1.25} sx={{ flex: 1, minHeight: 0 }}>
        <CompressorDetailBlock compressorInfo={compressorInfo} />
        <EmptyStatus />
      </Stack>
    )
  }

  const relative = formatRelativeTime(snapshot.scrapedAt)
  const displayTime = formatDisplayTime(snapshot.displayTime)

  return (
    <Stack spacing={1.25} sx={{ flex: 1, minHeight: 0, overflow: 'auto' }}>
      <CompressorDetailBlock compressorInfo={compressorInfo} />

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          gap: 0.5,
        }}
      >
        <Typography variant="h3" sx={{ color: '#101828', lineHeight: 1.1 }}>
          Live Status
        </Typography>
        <Stack
          direction="row"
          spacing={0.5}
          sx={{ alignItems: 'center', color: 'text.secondary' }}
        >
          <ScheduleRoundedIcon sx={{ fontSize: 13 }} />
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {relative ? `Updated ${relative}` : 'Updated'} · {formatTimestamp(snapshot.scrapedAt)}
          </Typography>
        </Stack>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(2, minmax(0, 1fr))',
            sm: 'repeat(3, minmax(0, 1fr))',
            lg: 'repeat(5, minmax(0, 1fr))',
          },
          gap: 1,
        }}
      >
        {METRICS.map((metric) => (
          <MetricCard key={metric.key} metric={metric} value={snapshot[metric.key]} />
        ))}
      </Box>

      {displayTime !== '–' ? (
        <Paper
          elevation={0}
          sx={{
            border: SURFACE_BORDER,
            borderRadius: 2,
            px: 1.75,
            py: 1.25,
            backgroundColor: '#ffffff',
            boxShadow: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            variant="overline"
            sx={{ color: 'text.secondary', letterSpacing: '0.06em' }}
          >
            Controller display time
          </Typography>
          <Typography
            sx={{ color: '#1d2939', fontWeight: 700, fontSize: '0.85rem', fontVariantNumeric: 'tabular-nums' }}
          >
            {displayTime}
          </Typography>
        </Paper>
      ) : null}
    </Stack>
  )
}
