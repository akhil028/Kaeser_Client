import { Box, Button, Chip, CircularProgress, Stack, Typography } from '@mui/material'
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded'
import MonitorHeartRoundedIcon from '@mui/icons-material/MonitorHeartRounded'
import SensorsRoundedIcon from '@mui/icons-material/SensorsRounded'

export function DashboardHeader({ refreshing, onRefresh }) {
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
      <Stack direction="row" alignItems="center" spacing={1}>
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

      <Stack direction="row" spacing={0.75} alignItems="center">
        <Chip
          icon={<SensorsRoundedIcon sx={{ fontSize: 12 }} />}
          label="Live"
          size="small"
          sx={{
            height: 22,
            backgroundColor: 'rgba(18, 183, 106, 0.12)',
            color: '#067647',
            border: '1px solid rgba(18, 183, 106, 0.35)',
            '& .MuiChip-icon': { color: '#12b76a' },
            '& .MuiChip-label': { px: 0.75 },
          }}
        />
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
