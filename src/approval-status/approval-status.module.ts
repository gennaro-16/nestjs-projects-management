import { Module } from '@nestjs/common';
import { ApprovalStatusService } from './approval-status.service'; // Import the ApprovalStatusService
import { PrismaService } from '../prisma/prisma.service'; // Import PrismaService
import { MailModule } from '../mail/mail.module'; // Import MailModule for email functionality

@Module({
  imports: [
    MailModule, // Import MailModule to use MailService
  ],
  providers: [
    ApprovalStatusService, // Register the ApprovalStatusService
    PrismaService, // Register the PrismaService
  ],
  exports: [ApprovalStatusService], // Export ApprovalStatusService for use in other modules
})
export class ApprovalStatusModule {}
