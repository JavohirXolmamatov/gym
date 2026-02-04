export interface ITask {
  endTime: number | null;
  id: string;
  startTime: number | null;
  totalTime: number | null;
  status: TaskStatus;
  title: string;
  userId: string;
}

export type TaskStatus = "unstarted" | "paused" | "in_progress";
