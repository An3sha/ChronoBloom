import { useState, useEffect, useCallback } from 'react';
import { PomodoroSettings, PomodoroSession } from '../types/pomodoro';

const defaultSettings: PomodoroSettings = {
  workDuration: 25 * 60,
  breakDuration: 5 * 60,
  longBreakDuration: 15 * 60,
  sessionsUntilLongBreak: 4,
};

export function usePomodoro() {
  const [settings, setSettings] = useState<PomodoroSettings>(defaultSettings);
  const [timeLeft, setTimeLeft] = useState(settings.workDuration);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [sessions, setSessions] = useState<PomodoroSession[]>([]);
  const [currentSession, setCurrentSession] = useState<PomodoroSession | null>(null);
  const [sessionCount, setSessionCount] = useState(0);

  const startTimer = useCallback(() => {
    if (!isActive) {
      setIsActive(true);
      const newSession: PomodoroSession = {
        id: Date.now().toString(),
        startTime: new Date(),
        endTime: new Date(),
        type: isBreak ? 'break' : 'work',
        completed: false,
      };
      setCurrentSession(newSession);
    }
  }, [isActive, isBreak]);

  const pauseTimer = useCallback(() => {
    setIsActive(false);
  }, []);

  const resetTimer = useCallback(() => {
    setIsActive(false);
    setTimeLeft(isBreak ? settings.breakDuration : settings.workDuration);
    setCurrentSession(null);
  }, [isBreak, settings]);

  const completeSession = useCallback(() => {
    if (currentSession) {
      const completedSession = {
        ...currentSession,
        endTime: new Date(),
        completed: true,
      };
      setSessions(prev => [...prev, completedSession]);
      
      if (!isBreak) {
        setSessionCount(prev => prev + 1);
        const shouldTakeLongBreak = sessionCount + 1 >= settings.sessionsUntilLongBreak;
        setTimeLeft(shouldTakeLongBreak ? settings.longBreakDuration : settings.breakDuration);
      } else {
        setTimeLeft(settings.workDuration);
      }
      
      setIsBreak(!isBreak);
      setCurrentSession(null);
      setIsActive(false);
    }
  }, [currentSession, isBreak, sessionCount, settings]);

  useEffect(() => {
    let interval: number | undefined;
    
    if (isActive && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      completeSession();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, completeSession]);

  return {
    timeLeft,
    isActive,
    isBreak,
    settings,
    sessions,
    startTimer,
    pauseTimer,
    resetTimer,
    setSettings,
  };
}