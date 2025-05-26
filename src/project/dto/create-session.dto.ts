import { IsDateString, IsString, IsNotEmpty } from 'class-validator';

export class CreateSessionDto {
  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @IsString()
  @IsNotEmpty()
  summary: string;
} 