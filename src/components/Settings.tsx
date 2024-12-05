import React from 'react';
import { Paper, Typography, Slider, Box } from '@mui/material';
import { PomodoroSettings } from '../types/pomodoro';

interface SettingsProps {
  settings: PomodoroSettings;
  onSettingsChange: (newSettings: PomodoroSettings) => void;
}

export default function Settings({ settings, onSettingsChange }: SettingsProps) {
  const handleChange = (key: keyof PomodoroSettings) => (event: Event, value: number | number[]) => {
    if (typeof value === 'number') {
      onSettingsChange({
        ...settings,
        [key]: key.includes('Duration') ? value * 60 : value,
      });
    }
  };

  return (
    <Paper 
      elevation={3}
      sx={{
        p: 3,
        backgroundColor: '#fce1e1',
        borderRadius: '16px',
      }}
    >
      <Typography variant="h6" sx={{ mb: 3, color: '#FF6666' }}>
        Settings
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Typography gutterBottom>Work Duration (minutes)</Typography>
        <Slider
          value={settings.workDuration / 60}
          onChange={handleChange('workDuration')}
          min={1}
          max={60}
          marks={[
            { value: 25, label: '25' },
            { value: 50, label: '50' },
          ]}
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography gutterBottom>Break Duration (minutes)</Typography>
        <Slider
          value={settings.breakDuration / 60}
          onChange={handleChange('breakDuration')}
          min={1}
          max={15}
          marks={[
            { value: 5, label: '5' },
            { value: 10, label: '10' },
          ]}
        />
      </Box>

      <Box>
        <Typography gutterBottom>Long Break Duration (minutes)</Typography>
        <Slider
          value={settings.longBreakDuration / 60}
          onChange={handleChange('longBreakDuration')}
          min={5}
          max={30}
          marks={[
            { value: 15, label: '15' },
            { value: 25, label: '25' },
          ]}
        />
      </Box>
    </Paper>
  );
}