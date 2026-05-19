import { createTheme } from '@mui/material'

const fontStack = [
  'Inter',
  'Segoe UI',
  'Helvetica Neue',
  'Arial',
  'sans-serif',
].join(',')

export const appTheme = createTheme({
  palette: {
    primary: {
      main: '#b42318',
      dark: '#8a1a12',
      light: '#fef3f2',
    },
    secondary: {
      main: '#155eef',
    },
    success: {
      main: '#12b76a',
      light: '#ecfdf3',
    },
    warning: {
      main: '#b54708',
      light: '#fffaeb',
    },
    error: {
      main: '#b42318',
      light: '#fef3f2',
    },
    info: {
      main: '#155eef',
      light: '#eff4ff',
    },
    background: {
      default: '#f5f7fb',
      paper: '#ffffff',
    },
    text: {
      primary: '#101828',
      secondary: '#475467',
    },
    divider: 'rgba(15, 23, 42, 0.08)',
  },
  typography: {
    fontFamily: fontStack,
    htmlFontSize: 13,
    fontSize: 12,
    h1: { fontSize: '1.6rem', fontWeight: 800, letterSpacing: '-0.02em' },
    h2: { fontSize: '1.35rem', fontWeight: 800, letterSpacing: '-0.02em' },
    h3: { fontSize: '1.1rem', fontWeight: 700, letterSpacing: '-0.01em' },
    h4: { fontSize: '1rem', fontWeight: 700 },
    h5: { fontSize: '0.9rem', fontWeight: 700 },
    h6: { fontSize: '0.8rem', fontWeight: 700 },
    subtitle1: { fontSize: '0.8rem', fontWeight: 600 },
    subtitle2: { fontSize: '0.72rem', fontWeight: 600 },
    body1: { fontSize: '0.78rem', lineHeight: 1.5 },
    body2: { fontSize: '0.72rem', lineHeight: 1.5 },
    button: { fontSize: '0.72rem', fontWeight: 700, textTransform: 'none' },
    caption: { fontSize: '0.65rem', letterSpacing: 0 },
    overline: { fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.08em' },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: 999, paddingInline: 14, paddingBlock: 6 },
        sizeMedium: { fontSize: '0.72rem' },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 700, fontSize: '0.65rem', height: 22 },
        label: { paddingInline: 8 },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          minHeight: 0,
          textTransform: 'none',
          fontSize: '0.78rem',
          fontWeight: 600,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontSize: '0.72rem',
          padding: '8px 12px',
          borderColor: 'rgba(15, 23, 42, 0.06)',
        },
        head: {
          fontSize: '0.62rem',
          fontWeight: 800,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          color: '#667085',
          backgroundColor: '#f9fafb',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: { borderRadius: 12, fontSize: '0.75rem' },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: { borderRadius: 16 },
      },
    },
  },
})
