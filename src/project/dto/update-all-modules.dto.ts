import { IsInt, Min, Max } from 'class-validator';

export class UpdateAllModulesDto {
  @IsInt()
  @Min(0)
  @Max(100)
  research: number;

  @IsInt()
  @Min(0)
  @Max(100)
  development: number;

  @IsInt()
  @Min(0)
  @Max(100)
  testing: number;

  @IsInt()
  @Min(0)
  @Max(100)
  documentation: number;
} 