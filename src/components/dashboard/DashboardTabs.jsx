import { Box, Tab, Tabs } from '@mui/material'
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded'
import PrecisionManufacturingRoundedIcon from '@mui/icons-material/PrecisionManufacturingRounded'
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded'
import HealthAndSafetyRoundedIcon from '@mui/icons-material/HealthAndSafetyRounded'

const TAB_ORDER = ['current', 'compressor', 'system', 'diagnosis']

const TAB_ICONS = {
  current: <DashboardRoundedIcon sx={{ fontSize: 14 }} />,
  compressor: <PrecisionManufacturingRoundedIcon sx={{ fontSize: 14 }} />,
  system: <SettingsSuggestRoundedIcon sx={{ fontSize: 14 }} />,
  diagnosis: <HealthAndSafetyRoundedIcon sx={{ fontSize: 14 }} />,
}

export function DashboardTabs({ activeTab, groups, onChange }) {
  return (
    <Box
      sx={{
        flexShrink: 0,
        px: { xs: 1, md: 1.5 },
        pt: 0.75,
        pb: 0.5,
        borderBottom: '1px solid',
        borderColor: 'divider',
        backgroundColor: '#ffffff',
      }}
    >
      <Tabs
        value={activeTab}
        onChange={(_event, nextValue) => onChange(nextValue)}
        variant="scrollable"
        scrollButtons="auto"
        TabIndicatorProps={{ style: { display: 'none' } }}
        sx={{
          minHeight: 0,
          '& .MuiTabs-flexContainer': { gap: 0.5 },
        }}
      >
        {TAB_ORDER.map((tabKey) => (
          <Tab
            key={tabKey}
            value={tabKey}
            iconPosition="start"
            icon={TAB_ICONS[tabKey]}
            label={groups[tabKey]?.title || tabKey}
            disableRipple
            sx={{
              px: 1.25,
              py: 0.5,
              minHeight: 30,
              minWidth: 'fit-content',
              borderRadius: 999,
              color: '#475467',
              transition: 'all 0.15s ease',
              '& .MuiTab-iconWrapper': { marginRight: 0.5 },
              '&:hover': {
                backgroundColor: 'rgba(180, 35, 24, 0.06)',
                color: '#b42318',
              },
              '&.Mui-selected': {
                color: '#ffffff',
                backgroundColor: '#b42318',
                boxShadow: '0 4px 10px rgba(185, 35, 24, 0.25)',
              },
            }}
          />
        ))}
      </Tabs>
    </Box>
  )
}
