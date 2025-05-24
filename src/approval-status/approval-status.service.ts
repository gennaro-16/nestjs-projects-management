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
 
////////////////////////////////////
async generateApprovalRequests(
  emails: string[],
  projectId: string,
  relationName: string
): Promise<ApprovalStatus[]> {
  const approvalEntries = [];
  const validEmails = [];

  // Fetch project details to include project name in emails
  const project = await this.prisma.project.findUnique({
    where: { id: projectId },
    select: { name: true }, // Retrieve only the project name
  });

  if (!project) {
    throw new NotFoundException(`Project with ID ${projectId} not found.`);
  }

  // Validate emails and prepare approval entries
  for (const email of emails) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new BadRequestException(`User with email ${email} does not exist.`);
    }
    validEmails.push({ email, token: uuidv4(), userId: user.id });
  }

  for (const { email, token, userId } of validEmails) {
    approvalEntries.push({
      projectId,
      status: ProjectStatus.PENDING,
      approvedById: userId,
      createdAt: new Date(),
      token,
    });

    const approvalLink = this.generateApprovalLink(token);

    // Relation-specific messaging
    const relationMessage = {
      members: 'You are invited to join as a member.',
      encadrants: 'You are invited to participate as an encadrant.',
      juryMembers: 'You are invited to join as a jury member.',
    };

    const subject = `Invitation to Join Project: ${project.name}`;
    const message = `
      Hello,
      
      You have been invited to join the project: ${project.name}.
      ${relationMessage[relationName] || 'You are invited to collaborate on the project.'}
      
      Please click the link below to approve your participation:
      
      ${approvalLink}
      
      Thank you!
    `;

    // Send email using MailService
    await this.mailService.sendEmail(
      email,
      subject,
      message,
      this.generateHtmlEmail(project.name, relationMessage[relationName], approvalLink),
    );
  }

  // Save approval statuses in the database
  const createdApprovals = await this.prisma.$transaction(
    approvalEntries.map((entry) =>
      this.prisma.approvalStatus.create({
        data: entry,
      }),
    )
  );

  return createdApprovals;
}

// Utility method to generate HTML email content
private generateHtmlEmail(projectName: string, relationMessage: string, approvalLink: string): string {
  return `
    <p>Hello,</p>
    <p>You have been invited to join the project: <strong>${projectName}</strong>.</p>
    <p>${relationMessage}</p>
    <p>Please click the link below to approve your participation:</p>
    <a href="${approvalLink}">${approvalLink}</a>
    <p>Thank you!</p>
  `;
}

  async approveRequest(token: string, relationName: string): Promise<string> {
    // Find approval record by token
    const approval = await this.prisma.approvalStatus.findFirst({
      where: { token },
    });
  
    if (!approval) {
      throw new NotFoundException('Invalid or expired token.');
    }
  
    // Update approval status to APPROVED
    await this.prisma.approvalStatus.update({
      where: { id: approval.id },
      data: {
        status: ProjectStatus.APPROVED,
        approvedById: approval.approvedById || null,
      },
    });
  
    // Dynamically update the specified relation
    const updateData: any = {};
    updateData[relationName] = {
      connect: { id: approval.approvedById },
    };
  
    await this.prisma.project.update({
      where: { id: approval.projectId },
      data: updateData,
    });
  
    return `${relationName} approval successful.`;
  }
  private generateApprovalLink(token: string): string {
    return `https://startup-incubator-management-a1o5.vercel.app/approve?token=${token}`;
  }

    
}
