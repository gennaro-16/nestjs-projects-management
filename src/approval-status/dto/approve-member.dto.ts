import { IsString } from 'class-validator';

export class ApproveMemberDto {
  @IsString()
  token: string; // Ensure the token is a string
}
