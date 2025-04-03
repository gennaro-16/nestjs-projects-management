import { Controller, Post, Body ,Get,Query} from '@nestjs/common';
import { ApprovalStatusService } from './approval-status.service';
import { ApproveMemberDto } from './dto/approve-member.dto'; // Import the DTO

@Controller('approval-status')
export class ApprovalStatusController {
  constructor(private readonly approvalsService: ApprovalStatusService) {}

  @Post('approve-member')
  async approveMember(@Query('token') token: string): Promise<string> {
    return this.approvalsService.approveMember(token);
  }
  
}
