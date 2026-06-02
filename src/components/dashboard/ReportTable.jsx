import {
  Box,
  Chip,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded'
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded'
import InfoRoundedIcon from '@mui/icons-material/InfoRounded'
import InboxRoundedIcon from '@mui/icons-material/InboxRounded'

function getStateVisual(state) {
  const normalized = String(state || '').toLowerCase()

  // Warnings must be checked before alarms: the word "warning" contains an "a",
  // so an alarm-first substring check would misclassify every warning as an alarm.
  if (/warn/.test(normalized)) {
    return {
      color: '#b54708',
      backgroundColor: '#fffaeb',
      borderColor: 'rgba(181, 71, 8, 0.2)',
      icon: <WarningAmberRoundedIcon sx={{ fontSize: '0.75rem !important' }} />,
    }
  }

  if (/alarm|fault|error|trip|stör/.test(normalized)) {
    return {
      color: '#b42318',
      backgroundColor: '#fef3f2',
      borderColor: 'rgba(180, 35, 24, 0.2)',
      icon: <ErrorRoundedIcon sx={{ fontSize: '0.75rem !important' }} />,
    }
  }

  return {
    color: '#155eef',
    backgroundColor: '#eff4ff',
    borderColor: 'rgba(21, 94, 239, 0.2)',
    icon: <InfoRoundedIcon sx={{ fontSize: '0.75rem !important' }} />,
  }
}

function EmptyTableState({ message, colSpan = 5 }) {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} sx={{ py: 4, border: 0 }}>
        <Stack spacing={0.5} sx={{ alignItems: 'center' }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#eef2ff',
              color: '#155eef',
            }}
          >
            <InboxRoundedIcon sx={{ fontSize: 16 }} />
          </Box>
          <Typography variant="subtitle2" sx={{ color: '#101828' }}>
            {message}
          </Typography>
        </Stack>
      </TableCell>
    </TableRow>
  )
}

export function ReportTable({ rows }) {
  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        flex: 1,
        minHeight: 0,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        overflow: 'auto',
        boxShadow: '0 6px 18px rgba(15, 23, 42, 0.04)',
      }}
    >
      <Table stickyHeader size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ backgroundColor: '#f9fafb', top: 0 }}>Date / Time</TableCell>
            <TableCell sx={{ backgroundColor: '#f9fafb', top: 0 }}>State</TableCell>
            <TableCell sx={{ backgroundColor: '#f9fafb', top: 0 }}>Message</TableCell>
            <TableCell sx={{ backgroundColor: '#f9fafb', top: 0 }}>Type</TableCell>
            <TableCell sx={{ backgroundColor: '#f9fafb', top: 0 }} align="right">
              ID
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => {
            const visual = getStateVisual(row.state)
            return (
              <TableRow
                key={`${row.id}-${row.idx}-${index}`}
                hover
                sx={{
                  backgroundColor: index % 2 === 0 ? '#ffffff' : '#fafbff',
                  transition: 'background-color 0.15s ease',
                  '&:last-child td': { borderBottom: 0 },
                  '&:hover': { backgroundColor: '#f4f7ff' },
                }}
              >
                <TableCell sx={{ whiteSpace: 'nowrap', color: 'text.secondary' }}>
                  {row.dateTime || '-'}
                </TableCell>
                <TableCell>
                  <Chip
                    icon={visual.icon}
                    label={row.state || '-'}
                    size="small"
                    sx={{
                      color: visual.color,
                      backgroundColor: visual.backgroundColor,
                      border: `1px solid ${visual.borderColor}`,
                      '& .MuiChip-icon': { color: `${visual.color} !important`, ml: 0.5 },
                    }}
                  />
                </TableCell>
                <TableCell sx={{ color: '#101828', fontWeight: 500 }}>
                  {row.message || '-'}
                </TableCell>
                <TableCell sx={{ color: 'text.secondary' }}>
                  {row.messageType || '-'}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    color: 'text.secondary',
                    fontWeight: 600,
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {row.id ?? '-'}
                </TableCell>
              </TableRow>
            )
          })}
          {rows.length === 0 ? <EmptyTableState message="No records yet" /> : null}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
