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
    return `http://localhost:3000/approval-status/approve-page?token=${token}`;
  }

  // Method to get approval details for the approval page
  async getApprovalDetails(token: string) {
    const approval = await this.prisma.approvalStatus.findFirst({
      where: { token },
      include: {
        project: true,
      },
    });

    if (!approval) {
      throw new NotFoundException('Invalid or expired token.');
    }

    const user = await this.prisma.user.findUnique({
      where: { id: approval.approvedById },
      select: {
        email: true,
        firstName: true,
        lastName: true,
      },
    });

    return {
      projectName: approval.project.name,
      userEmail: user.email,
      userName: `${user.firstName} ${user.lastName}`,
      token: approval.token,
    };
  }

  // Method to generate the approval page HTML
  generateApprovalPage(details: any): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Project Invitation Approval</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            background-color: #f5f5f5;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
          }
          .container {
            background-color: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            max-width: 600px;
            width: 100%;
          }
          h1 {
            color: #333;
            margin-bottom: 20px;
            text-align: center;
          }
          .info {
            margin-bottom: 25px;
            padding: 15px;
            background-color: #f8f9fa;
            border-radius: 5px;
          }
          .buttons {
            display: flex;
            justify-content: center;
            gap: 15px;
            margin-top: 30px;
          }
          .button {
            padding: 12px 25px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            font-weight: bold;
            transition: background-color 0.3s;
          }
          .approve {
            background-color: #28a745;
            color: white;
          }
          .approve:hover {
            background-color: #218838;
          }
          .reject {
            background-color: #dc3545;
            color: white;
          }
          .reject:hover {
            background-color: #c82333;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Project Invitation Approval</h1>
          <div class="info">
            <p><strong>Project:</strong> ${details.projectName}</p>
            <p><strong>Invited User:</strong> ${details.userName} (${details.userEmail})</p>
          </div>
          <div class="buttons">
            <button class="button approve" onclick="approveInvitation('${details.token}')">Approve</button>
            <button class="button reject" onclick="rejectInvitation('${details.token}')">Reject</button>
          </div>
        </div>
        <script>
          async function approveInvitation(token) {
            try {
              const response = await fetch('/approval-status/approve-member?token=' + token, {
                method: 'POST',
              });
              if (response.ok) {
                alert('Invitation approved successfully!');
                window.close();
              } else {
                alert('Failed to approve invitation. Please try again.');
              }
            } catch (error) {
              alert('An error occurred. Please try again.');
            }
          }

          async function rejectInvitation(token) {
            // You can implement rejection logic here if needed
            alert('Invitation rejected');
            window.close();
          }
        </script>
      </body>
      </html>
    `;
  }

  // Method to generate error page HTML
  generateErrorPage(errorMessage: string): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Error</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            background-color: #f5f5f5;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
          }
          .container {
            background-color: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            max-width: 600px;
            width: 100%;
            text-align: center;
          }
          h1 {
            color: #dc3545;
            margin-bottom: 20px;
          }
          .error-message {
            color: #666;
            margin-bottom: 25px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Error</h1>
          <div class="error-message">
            ${errorMessage}
          </div>
        </div>
      </body>
      </html>
    `;
  }
}
