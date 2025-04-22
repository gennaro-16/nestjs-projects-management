import { IsOptional, IsString, IsEnum, IsDateString } from 'class-validator';
import { WorkshopType } from '@prisma/client';

export class UpdateWorkshopDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;


  @IsString()
  mentor: string;

  @IsOptional()
  @IsDateString()
  date?: string;

  @IsOptional()
  @IsString()
  time?: string;

  @IsOptional()
  @IsEnum(WorkshopType)
  type?: WorkshopType;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  onlineLink?: string;
}
