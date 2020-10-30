export interface WorkoutLog {
  id?: string;
  timeSpend: number;
  type: string;
  day: Date | string;
  dayFormatted: string;
}
