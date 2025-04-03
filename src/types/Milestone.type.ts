export interface Milestone {
    id: string;
    name: string;
    description: string;
    status: MilestoneStatus;
    dueDate?: Date;
    projectId: string;
    createdAt: Date;
  }
  
  export enum MilestoneStatus {
    NOT_STARTED = "NOT_STARTED",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED",
  }
  