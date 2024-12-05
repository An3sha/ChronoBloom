export interface PomodoroSession {
  id: string;
  startTime: Date;
  endTime: Date;
  type: 'work' | 'break';
  completed: boolean;
}

export interface PomodoroSettings {
  workDuration: number;
  breakDuration: number;
  longBreakDuration: number;
  sessionsUntilLongBreak: number;
}

export interface PomodoroStats {
  totalSessions: number;
  completedSessions: number;
  totalWorkTime: number;
  dailyStats: {
    date: string;
    completedSessions: number;
    totalWorkTime: number;
  }[];
}