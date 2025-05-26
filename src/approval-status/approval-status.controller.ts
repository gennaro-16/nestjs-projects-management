import { Controller, Post, Query, Get, Res, NotFoundException } from '@nestjs/common';
import { ApprovalStatusService } from './approval-status.service';
import { Response } from 'express';

@Controller('approval-status')
export class ApprovalStatusController {
  constructor(private readonly approvalsService: ApprovalStatusService) {}

  @Get('approve-page')
  async getApprovePage(
    @Query('token') token: string,
    @Res() res: Response,
  ) {
    try {
      const approvalDetails = await this.approvalsService.getApprovalDetails(token);
      const html = this.approvalsService.generateApprovalPage(approvalDetails);
      res.header('Content-Type', 'text/html').send(html);
    } catch (error) {
      if (error instanceof NotFoundException) {
        const errorHtml = this.approvalsService.generateErrorPage('Invalid or expired token');
        res.header('Content-Type', 'text/html').send(errorHtml);
      } else {
        const errorHtml = this.approvalsService.generateErrorPage('An error occurred');
        res.header('Content-Type', 'text/html').send(errorHtml);
      }
    }
  }

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
