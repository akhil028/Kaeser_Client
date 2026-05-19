import { Box, Chip, Stack, Typography } from '@mui/material'
import StorageRoundedIcon from '@mui/icons-material/StorageRounded'

export function ReportSummary({ title, rowCount }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 1,
        flexWrap: 'wrap',
      }}
    >
      <Box>
        <Typography
          variant="overline"
          sx={{ color: 'text.secondary', lineHeight: 1.2, display: 'block' }}
        >
          Report
        </Typography>
        <Typography variant="h3" sx={{ color: '#101828', lineHeight: 1.1 }}>
          {title}
        </Typography>
      </Box>
      <Stack direction="row" spacing={0.5}>
        <Chip
          icon={<StorageRoundedIcon sx={{ fontSize: '0.75rem !important' }} />}
          label={`${rowCount} record${rowCount === 1 ? '' : 's'}`}
          sx={{
            color: '#1d2939',
            backgroundColor: '#eef2ff',
            border: '1px solid rgba(21, 94, 239, 0.15)',
          }}
        />
      </Stack>
    </Box>
  )
}
