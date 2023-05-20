export interface Activity {
  id: string | number;
  description: string;
  progress: ActivityProgress;
  deadLine: string; // fecha de vencimiento
  assignedUser?: string; // email
}

export enum ActivityProgress {
  Pending = 'pending',
  InProgress = 'in-progress',
  Done = 'done',
} 
