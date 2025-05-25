import { IsOptional, IsString, IsEnum, IsNumber, Min } from 'class-validator';
import { ProjectStatus, ProjectStage } from '@prisma/client';

export class UpdateProjectDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  industry?: string;

  @IsOptional()
  @IsString()
  about?: string;

  @IsOptional()
  @IsString()
  problem?: string;

  @IsOptional()
  @IsString()
  solution?: string;

 
  @IsOptional()
  @IsString()
  targetAudience?: string;

  @IsOptional()
  @IsString()
  competitiveAdvantage?: string;

  @IsOptional()
  @IsString()
  motivation?: string;

  @IsOptional()
  @IsEnum(ProjectStatus)
  status?: ProjectStatus; // Pending, Approved, Rejected

  @IsOptional()
  @IsEnum(ProjectStage)
  stage?: ProjectStage; // Idea, MVP, Scaling, etc.

  @IsOptional()
  @IsNumber()
  @Min(0)
  fundingGoal?: number; // Optional funding goal update

  @IsOptional()
  @IsNumber()
  @Min(0)
  fundingRaised?: number; // Optional funding raised update
}
