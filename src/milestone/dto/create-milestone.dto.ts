import { IsString, IsOptional, IsEnum, IsDate, IsUUID } from 'class-validator';

export enum MilestoneStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}
export class CreateMilestoneDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsEnum(MilestoneStatus)
  status?: MilestoneStatus; // Defaults to NOT_STARTED if not provided

  @IsOptional()
  @IsDate()
  dueDate?: Date;

  @IsUUID()
  projectId: string; // Required to associate with a project
}

