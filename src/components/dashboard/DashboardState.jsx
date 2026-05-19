import { Alert, Box, Button, CircularProgress, Stack, Typography } from '@mui/material'
import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded'

export function DashboardLoadingState() {
  return (
    <Stack alignItems="center" spacing={1.25} sx={{ py: 8 }}>
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress size={32} thickness={4} sx={{ color: '#b42318' }} />
        <CircularProgress
          size={32}
          thickness={4}
          variant="determinate"
          value={100}
          sx={{ position: 'absolute', left: 0, color: 'rgba(180, 35, 24, 0.1)' }}
        />
      </Box>
      <Typography variant="subtitle2" sx={{ color: '#101828' }}>
        Loading latest data
      </Typography>
      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
        Fetching report from the server...
      </Typography>
    </Stack>
  )
}

export function DashboardErrorState({ error, onRetry }) {
  if (!error) {
    return null
  }

  return (
    <Alert
      severity="warning"
      variant="outlined"
      action={
        <Button
          size="small"
          color="warning"
          variant="contained"
          startIcon={<ReplayRoundedIcon sx={{ fontSize: 14 }} />}
          onClick={onRetry}
        >
          Run scrape
        </Button>
      }
      sx={{
        mb: 2,
        alignItems: 'center',
        backgroundColor: '#fffaeb',
        borderColor: 'rgba(181, 71, 8, 0.3)',
        '& .MuiAlert-message': { fontSize: '0.75rem' },
      }}
    >
      {error}
    </Alert>
  )
}
