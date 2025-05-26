// src/projects/dto/get-project-team.dto.ts
import { IsString, IsIn } from 'class-validator';

export class GetProjectTeamDto {
  @IsString()
  projectId: string;

  @IsIn(['members', 'encadrants', 'juryMembers', 'owners', 'scientificReviewers'])
  relationType: 'members' | 'encadrants' | 'juryMembers' | 'owners' | 'scientificReviewers';
}