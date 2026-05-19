import { Box, Button, CircularProgress, Stack, Typography } from '@mui/material'
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded'
import MonitorHeartRoundedIcon from '@mui/icons-material/MonitorHeartRounded'

export function DashboardHeader({ refreshing, onRefresh }) {
  return (
    <Box
      sx={{
        flexShrink: 0,
        px: { xs: 1.25, md: 2 },
        py: { xs: 0.85, md: 1 },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 1,
        flexWrap: 'wrap',
        background:
          'linear-gradient(135deg, rgba(180,35,24,0.06) 0%, rgba(21,94,239,0.05) 100%)',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1}>
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #b42318 0%, #d92d20 100%)',
            color: '#fff',
            boxShadow: '0 8px 18px rgba(185, 35, 24, 0.28)',
          }}
        >
          <MonitorHeartRoundedIcon sx={{ fontSize: 18 }} />
        </Box>
        <Box>
          <Typography
            variant="h2"
            sx={{ color: '#0f172a', lineHeight: 1.1, fontSize: '1.05rem' }}
          >
            SBG Monitor
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: 'text.secondary', fontWeight: 500, lineHeight: 1.1 }}
          >
            Compressor & system telemetry dashboard
          </Typography>
        </Box>
      </Stack>

      <Stack direction="row" spacing={0.75} alignItems="center">
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
            boxShadow: '0 8px 18px rgba(185, 35, 24, 0.22)',
            '&:hover': {
              background: 'linear-gradient(135deg, #9f2117 0%, #c7231a 100%)',
              boxShadow: '0 10px 22px rgba(185, 35, 24, 0.32)',
            },
          }}
        >
          {refreshing ? 'Refreshing' : 'Refresh'}
        </Button>
      </Stack>
    </Box>
  )
}
