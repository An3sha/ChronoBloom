import React from 'react';
import { Container, Grid, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Timer from './components/Timer';
import Analytics from './components/Analytics';
import Settings from './components/Settings';
import { usePomodoro } from './hooks/usePomodoro';
import './styles/global.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6666FF',
    },
    secondary: {
      main: '#FF6666',
    },
    background: {
      default: '#FAFAFA',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
  },
});

function App() {
  const {
    timeLeft,
    isActive,
    isBreak,
    settings,
    sessions,
    startTimer,
    pauseTimer,
    resetTimer,
    setSettings,
  } = usePomodoro();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Timer
              timeLeft={timeLeft}
              isActive={isActive}
              isBreak={isBreak}
              onStart={startTimer}
              onPause={pauseTimer}
              onReset={resetTimer}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Settings settings={settings} onSettingsChange={setSettings} />
          </Grid>
          <Grid item xs={12}>
            <Analytics sessions={sessions} />
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default App;