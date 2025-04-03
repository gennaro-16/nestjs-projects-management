import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { ApprovalStatus, ProjectStatus } from '@prisma/client';
import { MailService } from '../mail/mail.service';

@Injectable()
export class ApprovalStatusService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailService: MailService, // Inject MailService
  ) {}

  // Method to create approval statuses for project members
  async createApprovalStatuses(emails: string[], projectId: string): Promise<ApprovalStatus[]> {
    const approvalEntries = [];
    const validEmails = [];
  
    // Validate all emails before creating approval statuses
    for (const email of emails) {
      const user = await this.prisma.user.findUnique({ where: { email } });
  
      if (!user) {
        throw new BadRequestException(`User with email ${email} does not exist.`);
      }
  
      // Store valid emails for email notifications and their user IDs
      validEmails.push({ email, token: uuidv4(), userId: user.id }); // Add userId here
    }
  
    // Prepare approval entries and send email notifications
    for (const { email, token, userId } of validEmails) { // Include userId here
      approvalEntries.push({
        projectId,
        status: ProjectStatus.PENDING,
        comments: null,
        approvedById: userId, // Assign userId to approvedById
        createdAt: new Date(),
        token,
      });
  
      const approvalLink = this.generateApprovalLink(token);
      const subject = 'Project Approval Request';
      const message = `
        Hello,
        
        You have been invited to join the project with ID: ${projectId}.
        Please click the link below to approve your membership:
        
        ${approvalLink}
        
        Thank you!
      `;
  
      // Send email using MailService
      await this.mailService.sendEmail(
        email,
        subject,
        message,
        this.generateHtmlEmail(projectId, approvalLink),
      );
    }
  
    // Save approval statuses in the database
    const createdApprovals = await this.prisma.$transaction(
      approvalEntries.map((entry) =>
        this.prisma.approvalStatus.create({
          data: entry,
        }),
      ),
    );
  
    return createdApprovals;
  }
  
  // Method to approve a member using a token
  async approveMember(token: string): Promise<string> {
    // Find the approval record by token
    const approval = await this.prisma.approvalStatus.findFirst({
      where: { token },
    });

    if (!approval) {
      throw new NotFoundException('Invalid or expired token.');
    }

    // Update the approval status to APPROVED
    await this.prisma.approvalStatus.update({
      where: { id: approval.id },
      data: {
        status: ProjectStatus.APPROVED,
        approvedById: approval.approvedById || null, // Keep track of the approving user
      },
    });
    // Add the user to the project members
// Add the user to the project's members relation
await this.prisma.project.update({
    where: { id: approval.projectId }, // Ensure you have the projectId from approval
    data: {
      members: {
        connect: { id: approval.approvedById }, // Connect the approved user to the members relation
      },
    },
  });
  
  

    return 'Approval successful.';
  }

  // Utility method to generate an approval link
  private generateApprovalLink(token: string): string {
    return `https://your-domain.com/approve?token=${token}`;
  }

  // Utility method to generate HTML email content
  private generateHtmlEmail(projectId: string, approvalLink: string): string {
    return `
      <p>Hello,</p>
      <p>You have been invited to join the project with ID: <strong>${projectId}</strong>.</p>
      <p>Please click the link below to approve your membership:</p>
      <a href="${approvalLink}">${approvalLink}</a>
      <p>Thank you!</p>
    `;
  }
}
