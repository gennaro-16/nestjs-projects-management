export interface Task {
    id: string;
    title: string;
    description?: string;
    status: TaskStatus;
    dueDate?: Date;
    projectId: string;
    assignedToId?: string;
    createdAt: Date;
  }
  
  export enum TaskStatus {
    PENDING = "PENDING",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED",
  }
  