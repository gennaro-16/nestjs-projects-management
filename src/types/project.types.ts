export enum ProjectStatus {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
  }
  
  export enum ProjectStage {
    IDEA = 'IDEA',
    PROTOTYPE = 'PROTOTYPE',
    LAUNCHED = 'LAUNCHED',
    SCALING = 'SCALING',
  }
  
  export type ProjectType = {
    id: string;
    name: string;
    industry: string;
    about: string;
    problem: string;
    solution: string;
    idea: string;
    targetAudience: string;
    competitiveAdvantage: string;
    motivation: string;
    status: ProjectStatus;
    stage: ProjectStage;
    createdAt: Date;
    owners: string[]; // Array of user IDs
    members: string[]; // Array of user IDs
  };
  