import { Box, Stack, Typography } from '@mui/material'
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded'
import BoltRoundedIcon from '@mui/icons-material/BoltRounded'
import BuildRoundedIcon from '@mui/icons-material/BuildRounded'
import EastRoundedIcon from '@mui/icons-material/EastRounded'
import InfoRoundedIcon from '@mui/icons-material/InfoRounded'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded'
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded'
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded'
import KeyboardReturnRoundedIcon from '@mui/icons-material/KeyboardReturnRounded'
import OpenInFullRoundedIcon from '@mui/icons-material/OpenInFullRounded'
import PowerSettingsNewRoundedIcon from '@mui/icons-material/PowerSettingsNewRounded'
import PowerOffRoundedIcon from '@mui/icons-material/PowerOffRounded'
import ShowChartRoundedIcon from '@mui/icons-material/ShowChartRounded'
import StackedLineChartRoundedIcon from '@mui/icons-material/StackedLineChartRounded'
import StopRoundedIcon from '@mui/icons-material/StopRounded'

const CHASSIS_BG = 'linear-gradient(180deg, #3a3c41 0%, #2a2c30 60%, #232529 100%)'
const KEY_BG = 'linear-gradient(180deg, #9aa3a6 0%, #7f8a8d 55%, #6c7679 100%)'
const LED_OFF = 'radial-gradient(circle at 35% 30%, #f5f7f9 0%, #c7ccd2 55%, #8a9097 100%)'
const LED_GREEN =
  'radial-gradient(circle at 35% 30%, #c9ffa0 0%, #5dff15 35%, #2bbf00 75%, #0e6b00 100%)'

function formatMetric(value, suffix = '') {
  if (value === null || value === undefined || value === '') {
    return '—'
  }
  return `${value}${suffix}`
}

function Led({ active = false, size = 9 }) {
  return (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: active ? LED_GREEN : LED_OFF,
        boxShadow: active
          ? '0 0 0 1px rgba(15, 90, 5, 0.45), 0 0 8px rgba(108, 255, 0, 0.85), inset 0 0 2px rgba(255,255,255,0.7)'
          : 'inset 0 1px 2px rgba(15, 23, 42, 0.45), 0 0 0 1px rgba(0,0,0,0.35)',
      }}
    />
  )
}

function Key({ children, size = 38, tone = 'default', sx, ...rest }) {
  const palette = {
    default: { bg: KEY_BG, color: '#1c1f24' },
    dark: {
      bg: 'linear-gradient(180deg, #4a5054 0%, #2f3438 100%)',
      color: '#e5e7eb',
    },
  }
  const t = palette[tone] || palette.default

  return (
    <Box
      sx={{
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: t.bg,
        color: t.color,
        borderRadius: 0.75,
        border: '1px solid rgba(0,0,0,0.45)',
        boxShadow:
          'inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -2px 4px rgba(0,0,0,0.25), 0 2px 3px rgba(0,0,0,0.35)',
        transition: 'transform 80ms ease',
        '&:hover': { transform: 'translateY(-1px)' },
        '&:active': { transform: 'translateY(1px)', boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.45)' },
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Box>
  )
}

function PowerKey({ tone = 'green', children, label }) {
  const bg =
    tone === 'red'
      ? 'linear-gradient(180deg, #ff5747 0%, #d4271a 55%, #9c1810 100%)'
      : 'linear-gradient(180deg, #6cff36 0%, #2cc500 55%, #157a00 100%)'
  const dotColor = tone === 'red' ? '#ff6c5c' : '#86ff3e'

  return (
    <Stack direction="row" spacing={0.5} alignItems="flex-start">
      <Box
        sx={{
          width: 8,
          height: 8,
          mt: 0.5,
          borderRadius: '50%',
          background: `radial-gradient(circle at 35% 30%, #ffffff 0%, ${dotColor} 50%, #1a3a00 100%)`,
          boxShadow: `0 0 7px ${dotColor}`,
        }}
      />
      <Box
        role="button"
        aria-label={label}
        sx={{
          width: 46,
          height: 46,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          background: bg,
          borderRadius: 0.75,
          border: '1px solid rgba(0,0,0,0.55)',
          boxShadow:
            'inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -3px 6px rgba(0,0,0,0.35), 0 2px 5px rgba(0,0,0,0.45)',
          cursor: 'pointer',
          transition: 'transform 80ms ease',
          '&:hover': { transform: 'translateY(-1px)' },
          '&:active': { transform: 'translateY(1px)' },
        }}
      >
        {children}
      </Box>
    </Stack>
  )
}

function LeftRail() {
  return (
    <Stack spacing={0.75} sx={{ pt: 0.25 }}>
      <Stack direction="row" spacing={0.75} alignItems="center">
        <Led active />
        <Key>
          <PowerOffRoundedIcon sx={{ fontSize: 18 }} />
        </Key>
        <Key>
          <ShowChartRoundedIcon sx={{ fontSize: 18 }} />
        </Key>
      </Stack>
      <Stack direction="row" spacing={0.75} alignItems="center">
        <Led />
        <Key>
          <StackedLineChartRoundedIcon sx={{ fontSize: 18 }} />
        </Key>
        <Key>
          <InfoRoundedIcon sx={{ fontSize: 18 }} />
        </Key>
      </Stack>
      <Stack direction="row" spacing={0.75} alignItems="center">
        <Led />
        <Key>
          <BuildRoundedIcon sx={{ fontSize: 18 }} />
        </Key>
        <Box sx={{ width: 38 }} />
      </Stack>
      <Stack direction="row" spacing={0.75} alignItems="center">
        <Led active />
        <Key>
          <BoltRoundedIcon sx={{ fontSize: 18, color: '#ffd700' }} />
        </Key>
        <Box sx={{ width: 38 }} />
      </Stack>
    </Stack>
  )
}

function DirectionPad() {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 38px)',
        gridTemplateRows: 'repeat(3, 38px)',
        columnGap: 0.5,
        rowGap: 0.5,
        alignItems: 'center',
        justifyItems: 'center',
      }}
    >
      <Box />
      <Key>
        <KeyboardArrowUpRoundedIcon sx={{ fontSize: 24 }} />
      </Key>
      <Box />
      <Key>
        <KeyboardArrowLeftRoundedIcon sx={{ fontSize: 24 }} />
      </Key>
      <Box />
      <Key>
        <KeyboardArrowRightRoundedIcon sx={{ fontSize: 24 }} />
      </Key>
      <Box />
      <Key>
        <KeyboardArrowDownRoundedIcon sx={{ fontSize: 24 }} />
      </Key>
      <Box />
    </Box>
  )
}

function BottomControls() {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Stack spacing={0.4}>
        <Stack direction="row" spacing={0.5} alignItems="center">
          <Led active size={8} />
          <EastRoundedIcon sx={{ fontSize: 14, color: '#cdd2d6' }} />
        </Stack>
        <Stack direction="row" spacing={0.5} alignItems="center">
          <Led active size={8} />
          <EastRoundedIcon sx={{ fontSize: 14, color: '#cdd2d6' }} />
        </Stack>
      </Stack>
      <Key size={32}>
        <EastRoundedIcon sx={{ fontSize: 18 }} />
      </Key>
      <Key size={32}>
        <OpenInFullRoundedIcon sx={{ fontSize: 14, transform: 'rotate(45deg)' }} />
      </Key>
      <Key size={32}>
        <AccessTimeRoundedIcon sx={{ fontSize: 16 }} />
      </Key>
    </Stack>
  )
}

function ControllerDisplay({ snapshot }) {
  return (
    <Box
      sx={{
        flex: 1,
        minWidth: 340,
        maxWidth: 480,
        alignSelf: 'stretch',
        display: 'flex',
        border: '8px solid #2a2d31',
        borderRadius: 0.5,
        boxShadow:
          'inset 0 0 0 2px #1a1d20, inset 0 2px 6px rgba(0,0,0,0.4), 0 3px 8px rgba(0,0,0,0.5)',
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#e9eee4',
          boxShadow: 'inset 0 0 22px rgba(74, 95, 49, 0.15)',
          fontFamily: '"Courier New", "DM Mono", monospace',
          color: '#1b2126',
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: 0.75,
            px: 1.25,
            py: 0.4,
            backgroundColor: '#0b0e12',
            color: '#f5f7f3',
            fontSize: { xs: '0.8rem', md: '0.9rem' },
            fontWeight: 700,
            letterSpacing: '0.04em',
          }}
        >
          <Box>{formatMetric(snapshot?.pressureBar, 'bar')}</Box>
          <Box sx={{ textAlign: 'center' }}>{snapshot?.displayTime || '--:-- --'}</Box>
          <Box sx={{ textAlign: 'right' }}>{formatMetric(snapshot?.temperatureC, '°C')}</Box>
        </Box>

        <Box sx={{ px: 1.5, pt: 0.75, pb: 0.5, fontSize: { xs: '0.85rem', md: '0.95rem' }, lineHeight: 1.4 }}>
          <Box sx={{ letterSpacing: '-0.05em' }}>──────────────────────────────</Box>
          <Box sx={{ fontWeight: 700 }}>Load run</Box>
          <Box sx={{ letterSpacing: '-0.05em' }}>──────────────────────────────</Box>
          <Box>Key&nbsp;&nbsp;&nbsp;&nbsp; - on&nbsp;&nbsp; ¦pA - Load</Box>
          <Box sx={{ letterSpacing: '-0.05em' }}>──────────────────────────────</Box>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              columnGap: 1.25,
              mt: 0.5,
            }}
          >
            <Box>Run&nbsp;&nbsp;&nbsp; {formatMetric(snapshot?.runHours, 'h')}</Box>
            <Box>Load&nbsp;&nbsp; {formatMetric(snapshot?.loadHours, 'h')}</Box>
            <Box sx={{ gridColumn: '1 / span 2' }}>
              Maintenance in&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {formatMetric(snapshot?.maintenanceHours, 'h')}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export function SystemStatusPanel({ snapshot }) {
  return (
    <Box
      sx={{
        flex: 1,
        minHeight: 0,
        overflow: 'auto',
        borderRadius: 1.5,
        border: '1px solid rgba(15, 23, 42, 0.08)',
        background:
          'radial-gradient(800px 400px at 0% 0%, rgba(180,35,24,0.08) 0%, transparent 55%),' +
          'radial-gradient(600px 300px at 100% 100%, rgba(21,94,239,0.08) 0%, transparent 50%),' +
          'linear-gradient(180deg, #1f2227 0%, #14161a 100%)',
        p: { xs: 1, md: 1.25 },
      }}
    >
      <Stack spacing={1}>
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
              sx={{ color: '#9aa4b2', display: 'block', letterSpacing: '0.16em', lineHeight: 1.2 }}
            >
              System Status
            </Typography>
            <Typography
              variant="h3"
              sx={{ color: '#f8fafc', fontWeight: 800, fontSize: '1rem', lineHeight: 1.2 }}
            >
              Live Controller View
            </Typography>
          </Box>
          <Stack
            direction="row"
            spacing={0.75}
            alignItems="center"
            sx={{
              px: 1,
              py: 0.4,
              borderRadius: 999,
              border: '1px solid rgba(148, 163, 184, 0.25)',
              backgroundColor: 'rgba(15, 23, 42, 0.45)',
            }}
          >
            <Led active={Boolean(snapshot)} />
            <Typography variant="caption" sx={{ color: '#e2e8f0', fontWeight: 700 }}>
              {snapshot ? 'Online' : 'Waiting'}
            </Typography>
          </Stack>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            overflowX: 'auto',
            pb: 0.5,
          }}
        >
          <Box
            sx={{
              minWidth: 760,
              borderRadius: 2,
              p: { xs: 1, md: 1.25 },
              pr: { xs: 2, md: 2.25 },
              background: CHASSIS_BG,
              boxShadow:
                '0 18px 44px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -2px 0 rgba(0,0,0,0.4)',
              border: '1px solid #0b0c0f',
              position: 'relative',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: 56,
                right: 4,
                color: '#9aa4b2',
                fontSize: '0.58rem',
                fontWeight: 700,
                letterSpacing: '0.16em',
                writingMode: 'vertical-rl',
                transform: 'rotate(180deg)',
              }}
            >
            </Box>

            <Stack direction="row" spacing={1.25} alignItems="stretch">
              <LeftRail />

              <ControllerDisplay snapshot={snapshot} />

              <Stack spacing={0.75} alignItems="center" sx={{ pt: 0.25 }}>
                <DirectionPad />
                <Stack direction="row" spacing={0.5}>
                  <Key tone="dark">
                    <Typography sx={{ fontWeight: 800, fontSize: '0.7rem' }}>esc</Typography>
                  </Key>
                  <Key tone="dark">
                    <KeyboardReturnRoundedIcon sx={{ fontSize: 18 }} />
                  </Key>
                </Stack>
                <Stack spacing={0.75} alignItems="center" sx={{ mt: 0.5 }}>
                  <PowerKey tone="green" label="Start compressor">
                    <PowerSettingsNewRoundedIcon sx={{ fontSize: 24 }} />
                  </PowerKey>
                  <PowerKey tone="red" label="Stop compressor">
                    <StopRoundedIcon sx={{ fontSize: 28 }} />
                  </PowerKey>
                </Stack>
              </Stack>
            </Stack>

            <Box sx={{ mt: 1.25, pl: 0.25 }}>
              <BottomControls />
            </Box>
          </Box>
        </Box>
      </Stack>
    </Box>
  )
}
