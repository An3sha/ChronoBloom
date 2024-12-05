import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import { PomodoroSession } from '../types/pomodoro';

interface AnalyticsProps {
  sessions: PomodoroSession[];
}

export default function Analytics({ sessions }: AnalyticsProps) {
  const completedSessions = sessions.filter(s => s.completed && s.type === 'work');
  const totalWorkTime = completedSessions.reduce((acc, session) => {
    return acc + (session.endTime.getTime() - session.startTime.getTime()) / 1000 / 60;
  }, 0);

  const dailyStats = sessions.reduce((acc: any[], session) => {
    const date = format(session.startTime, 'MM/dd');
    const existing = acc.find(stat => stat.date === date);
    
    if (existing) {
      existing.sessions += 1;
      existing.minutes += (session.endTime.getTime() - session.startTime.getTime()) / 1000 / 60;
    } else {
      acc.push({
        date,
        sessions: 1,
        minutes: (session.endTime.getTime() - session.startTime.getTime()) / 1000 / 60,
      });
    }
    
    return acc;
  }, []);

  return (
    <Paper 
      elevation={3}
      sx={{
        p: 3,
        backgroundColor: '#F5F5FF',
        borderRadius: '16px',
      }}
    >
      <Typography variant="h6" sx={{ mb: 3, color: '#6666FF' }}>
        Analytics
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-around', mb: 4 }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4" color="primary">
            {completedSessions.length}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Completed Sessions
          </Typography>
        </Box>
        
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4" color="primary">
            {Math.round(totalWorkTime)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Minutes Focused
          </Typography>
        </Box>
      </Box>

      <Box sx={{ height: 200 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={dailyStats}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sessions" fill="#8884d8" name="Sessions" />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
}