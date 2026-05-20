import { Box, Button, Stack } from '@mui/material'
import MonitorHeartRoundedIcon from '@mui/icons-material/MonitorHeartRounded'
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded'

const NAV_ITEMS = [
  {
    key: 'system_status',
    label: 'Status',
    icon: <MonitorHeartRoundedIcon sx={{ fontSize: 16 }} />,
  },
  {
    key: 'messages',
    label: 'Messages',
    icon: <ArticleRoundedIcon sx={{ fontSize: 16 }} />,
  },
]

export function DashboardSidebar({ activeSection, onChange }) {
  return (
    <Box
      component="nav"
      sx={{
        width: { xs: '100%', md: 180 },
        flexShrink: 0,
        borderRight: { xs: 0, md: '1px solid' },
        borderBottom: { xs: '1px solid', md: 0 },
        borderColor: 'divider',
        backgroundColor: '#ffffff',
        px: { xs: 0.75, md: 0.75 },
        py: { xs: 0.5, md: 0.75 },
      }}
    >
      <Stack direction={{ xs: 'row', md: 'column' }} spacing={0.25}>
        {NAV_ITEMS.map((item) => {
          const selected = activeSection === item.key
          return (
            <Button
              key={item.key}
              fullWidth
              startIcon={item.icon}
              onClick={() => onChange(item.key)}
              sx={{
                justifyContent: 'flex-start',
                minHeight: 32,
                borderRadius: 1.25,
                px: 1,
                position: 'relative',
                fontSize: '0.78rem',
                fontWeight: 600,
                color: selected ? '#b42318' : '#475467',
                backgroundColor: selected ? 'rgba(180, 35, 24, 0.10)' : 'transparent',
                '&::before': selected
                  ? {
                      content: '""',
                      position: 'absolute',
                      left: 0,
                      top: 6,
                      bottom: 6,
                      width: 3,
                      borderRadius: 2,
                      backgroundColor: '#b42318',
                    }
                  : undefined,
                pl: selected ? 1.25 : 1,
                '& .MuiButton-startIcon': {
                  marginRight: 0.75,
                  color: selected ? '#b42318' : '#667085',
                },
                '&:hover': {
                  backgroundColor: selected
                    ? 'rgba(180, 35, 24, 0.14)'
                    : 'rgba(15, 23, 42, 0.04)',
                  color: selected ? '#b42318' : '#0f172a',
                },
              }}
            >
              {item.label}
            </Button>
          )
        })}
      </Stack>
    </Box>
  )
}
