export interface AuditLog {
    id: string;
    userId: string;
    action: string;
    projectId?: string;
    createdAt: Date;
  }
  