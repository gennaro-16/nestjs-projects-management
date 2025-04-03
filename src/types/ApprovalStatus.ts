export interface ApprovalStatus {
    id: string;
    projectId: string;
    approvedById?: string;
    status: ProjectStatus;
    comments?: string;
    createdAt: Date;
  }
  
  export enum ProjectStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED",
  }
  