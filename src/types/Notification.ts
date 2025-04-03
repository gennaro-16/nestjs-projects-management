export interface Notification {
    id: string;
    message: string;
    notificationType: NotificationType;
    userId: string;
    projectId?: string;
    isRead: boolean;
    response?: string;
    createdAt: Date;
  }
  
  export enum NotificationType {
    INVITATION = "INVITATION",
    APPROVAL_REQUEST = "APPROVAL_REQUEST",
    GENERAL = "GENERAL",
  }
  