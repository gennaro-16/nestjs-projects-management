import { Controller, Post, Query } from '@nestjs/common';
import { ApprovalStatusService } from './approval-status.service';

@Controller('approval-status')
export class ApprovalStatusController {
  constructor(private readonly approvalsService: ApprovalStatusService) {}

  // Endpoint to approve a member
  @Post('approve-member')
  async approveMember(@Query('token') token: string): Promise<string> {
    return this.approvalsService.approveRequest(token, 'members');
  }

  // Endpoint to approve an encadrant
  @Post('approve-encadrant')
  async approveEncadrant(@Query('token') token: string): Promise<string> {
    return this.approvalsService.approveRequest(token, 'encadrants');
  }

  // Add more endpoints for other relations as needed
  @Post('approve-jurymember')
  async approveJuryMember(@Query('token') token: string): Promise<string> {
    return this.approvalsService.approveRequest(token, 'juryMembers');
  }
}
