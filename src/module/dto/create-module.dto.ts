import { IsString, IsNumber } from 'class-validator';

export class CreateModuleDto {
  @IsString()
  name: string;

  @IsNumber()
  progressPercentage: number;

  @IsString()
  projectId: string;
}
