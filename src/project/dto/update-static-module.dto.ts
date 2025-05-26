// src/projects/dto/update-module.dto.ts
import { IsString, IsInt, Min, Max } from 'class-validator';

export class UpdateModuleDto {
  @IsString()
  moduleName: string;

  @IsInt()
  @Min(0)
  @Max(100)
  percentage: number;
}