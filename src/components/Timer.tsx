import React from 'react';
import { Box, Typography, IconButton, Paper } from '@mui/material';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface TimerProps {
  timeLeft: number;
  isActive: boolean;
  isBreak: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}

export default function Timer({ timeLeft, isActive, isBreak, onStart, onPause, onReset }: TimerProps) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <Paper 
      elevation={3}
      sx={{
        p: 14,
        textAlign: 'center',
        backgroundColor: isBreak ? '#FFE5E5' : '#E5F1FF',
        borderRadius: '16px',
      }}
    >
      <Typography variant="h2" sx={{ mb: 3, color: isBreak ? '#FF9999' : '#66B2FF' }}>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </Typography>
      
      <Typography variant="h6" sx={{ mb: 2, color: isBreak ? '#FF6666' : '#3399FF' }}>
        {isBreak ? 'Break Time' : 'Focus Time'}
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <IconButton
          onClick={isActive ? onPause : onStart}
          sx={{ 
            backgroundColor: isBreak ? '#FFB3B3' : '#B3D9FF',
            '&:hover': {
              backgroundColor: isBreak ? '#FF9999' : '#99CCFF',
            },
          }}
        >
          {isActive ? <Pause /> : <Play />}
        </IconButton>
        
        <IconButton
          onClick={onReset}
          sx={{ 
            backgroundColor: isBreak ? '#FFB3B3' : '#B3D9FF',
            '&:hover': {
              backgroundColor: isBreak ? '#FF9999' : '#99CCFF',
            },
          }}
        >
          <RotateCcw />
        </IconButton>
      </Box>
    </Paper>
  );
}