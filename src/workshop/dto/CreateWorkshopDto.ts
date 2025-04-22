import { IsString, IsOptional, IsEnum, IsDateString } from 'class-validator';
import { WorkshopType } from '@prisma/client';

export class CreateWorkshopDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  mentor: string;


  @IsDateString()
  date: string;

  @IsString()
  time: string;

  @IsEnum(WorkshopType)
  type: WorkshopType;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  onlineLink?: string;
}
