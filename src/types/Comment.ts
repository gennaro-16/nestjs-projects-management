export interface Comment {
    id: string;
    content: string;
    authorId: string;
    projectId?: string;
    taskId?: string;
    createdAt: Date;
  }
  