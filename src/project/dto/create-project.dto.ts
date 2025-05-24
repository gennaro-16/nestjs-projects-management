import { IsEnum, IsNotEmpty, IsOptional, IsString, IsArray } from 'class-validator';
import { ProjectStage } from '@prisma/client';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  industry: string;

  @IsString()
  @IsNotEmpty()
  about: string;

  @IsString()
  @IsNotEmpty()
  problem: string;

  @IsString()
  @IsNotEmpty()
  solution: string;

  @IsString()
  @IsOptional()  // Add this decorator to make the field optional
  idea: string;

  @IsString()
  @IsNotEmpty()
  targetAudience: string;

  @IsString()
  @IsNotEmpty()
  competitiveAdvantage: string;

  @IsString()
  @IsNotEmpty()
  motivation: string;

  @IsEnum(ProjectStage)
  @IsOptional()
  stage?: ProjectStage;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  memberEmails?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  encadrantEmails?: string[];
}