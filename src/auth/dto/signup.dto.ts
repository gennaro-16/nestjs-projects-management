import { 
  IsEmail, 
  IsNotEmpty, 
  MinLength, 
  IsEnum, 
  IsOptional, 
  Matches, 
  IsUrl 
} from 'class-validator';

export enum Role {
  ADMIN = 'ADMIN',
  STAGE_SERVICE = 'STAGE_SERVICE',
  PROJECT_OWNER = 'PROJECT_OWNER',
  COMMITTEE_MEMBER = 'COMMITTEE_MEMBER',
  JURY_MEMBER = 'JURY_MEMBER',
  SUPERVISOR = 'SUPERVISOR',
  MEMBER = 'MEMBER',
  LEADER = 'LEADER',
}


export class SignupDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsOptional()
  @Matches(/^\+[1-9]\d{1,14}$/, { message: 'Invalid phone number format (use international format, e.g., +123456789)' })
  phoneNumber?: string;

  @IsOptional()
  @IsUrl({}, { message: 'Invalid profile picture URL' })
  profilePicture?: string;

  @IsOptional()
  bio?: string;

  @IsOptional()
  @IsUrl({}, { message: 'Invalid website URL' })
  website?: string;

  @IsEnum(Role, { message: 'Invalid role. Must be one of ADMIN, STARTUP_OWNER, or MEMBER' })
  role: Role;
}
