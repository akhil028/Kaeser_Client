import { CssBaseline, ThemeProvider } from '@mui/material'
import { appTheme } from '../theme'

export function AppProviders({ children }) {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
