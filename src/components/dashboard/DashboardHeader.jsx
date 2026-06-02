import { Box, Button, CircularProgress, Stack, Typography } from '@mui/material'
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded'
import MonitorHeartRoundedIcon from '@mui/icons-material/MonitorHeartRounded'
import { formatRelativeTime } from '../../utils/formatters'

function LiveIndicator({ refreshing, lastUpdated }) {
  const relative = lastUpdated ? formatRelativeTime(lastUpdated) : ''
  const dotColor = refreshing ? '#155eef' : '#12b76a'

  return (
    <Stack direction="row" spacing={0.6} sx={{ alignItems: 'center', mr: 0.5 }}>
      <Box
        sx={{
          position: 'relative',
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: dotColor,
          '&::after': {
            content: '""',
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            backgroundColor: dotColor,
            animation: 'sbgPulse 1.8s ease-out infinite',
          },
          '@keyframes sbgPulse': {
            '0%': { transform: 'scale(1)', opacity: 0.6 },
            '100%': { transform: 'scale(2.6)', opacity: 0 },
          },
        }}
      />
      <Box sx={{ lineHeight: 1 }}>
        <Typography
          sx={{ fontSize: '0.66rem', fontWeight: 700, color: '#067647', lineHeight: 1.1 }}
        >
          {refreshing ? 'Syncing' : 'Live'}
        </Typography>
        <Typography sx={{ fontSize: '0.6rem', color: 'text.secondary', lineHeight: 1.1 }}>
          {relative ? `Updated ${relative}` : 'Awaiting data'}
        </Typography>
      </Box>
    </Stack>
  )
}

export function DashboardHeader({ refreshing, onRefresh, lastUpdated }) {
  return (
    <Box
      sx={{
        flexShrink: 0,
        px: { xs: 1, md: 1.5 },
        py: { xs: 0.6, md: 0.75 },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 1,
        flexWrap: 'wrap',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid',
        borderColor: 'divider',
        position: 'relative',
        '&::after': {
          content: '""',
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: -1,
          height: 2,
          background:
            'linear-gradient(90deg, transparent 0%, rgba(180,35,24,0.45) 30%, rgba(21,94,239,0.35) 70%, transparent 100%)',
        },
      }}
    >
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        <Box
          sx={{
            width: 30,
            height: 30,
            borderRadius: 1.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #b42318 0%, #d92d20 100%)',
            color: '#fff',
            boxShadow: '0 6px 14px rgba(185, 35, 24, 0.28)',
          }}
        >
          <MonitorHeartRoundedIcon sx={{ fontSize: 17 }} />
        </Box>
        <Box>
          <Typography
            sx={{
              color: '#0f172a',
              lineHeight: 1.1,
              fontSize: '0.95rem',
              fontWeight: 800,
              letterSpacing: '-0.01em',
            }}
          >
            SBG Monitor
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: 'text.secondary', fontWeight: 500, lineHeight: 1.1 }}
          >
            Compressor telemetry
          </Typography>
        </Box>
      </Stack>

      <Stack direction="row" spacing={0.75} sx={{ alignItems: 'center' }}>
        <LiveIndicator refreshing={refreshing} lastUpdated={lastUpdated} />
        <Button
          variant="contained"
          size="small"
          startIcon={
            refreshing ? (
              <CircularProgress size={12} color="inherit" />
            ) : (
              <AutorenewRoundedIcon sx={{ fontSize: 16 }} />
            )
          }
          disabled={refreshing}
          onClick={onRefresh}
          sx={{
            background: 'linear-gradient(135deg, #b42318 0%, #d92d20 100%)',
            boxShadow: '0 8px 18px rgba(185, 35, 24, 0.28)',
            '&:hover': {
              background: 'linear-gradient(135deg, #9f2117 0%, #c7231a 100%)',
              boxShadow: '0 12px 24px rgba(185, 35, 24, 0.36)',
            },
          }}
        >
          {refreshing ? 'Refreshing' : 'Refresh'}
        </Button>
      </Stack>
    </Box>
  )
}
