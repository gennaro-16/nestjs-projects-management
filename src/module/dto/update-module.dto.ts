import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateModuleDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  progressPercentage?: number;

  @IsOptional()
  @IsString()
  projectId?: string;
}
