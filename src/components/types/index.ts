export interface ITaskData {
  monthTotal: number;
  weekTotal: number;
  totalyear?: number;
  tasks: ITask[];
  total: number;
}

export interface ITask {
  endTime: number;
  id: string;
  startTime: number;
  totalTime: number;
  status: TaskStatus;
  title: string;
  userId: string;
}

export type TaskStatus = "unstarted" | "paused" | "in_progress";
