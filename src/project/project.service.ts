import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectStatus, ProjectStage } from '@prisma/client';
import { ApprovalStatusService } from '../approval-status/approval-status.service'; // Import ApprovalStatusService
import { UpdateProjectDto } from './dto/update-project.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';
@Injectable()
export class ProjectService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly approvalStatusService: ApprovalStatusService, // Inject ApprovalStatusService
  ) {}

  async createProject(userId: string, dto: CreateProjectDto): Promise<any> {
    // Step 1: Validate if user exists
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
  
    if (!user) {
      throw new ForbiddenException('User not found');
    }
  
    // Step 2: Create the project
    const project = await this.prisma.project.create({
      data: {
        name: dto.name,
        industry: dto.industry,
        about: dto.about,
        problem: dto.problem,
        solution: dto.solution,
        idea: dto.idea,
        targetAudience: dto.targetAudience,
        competitiveAdvantage: dto.competitiveAdvantage,
        motivation: dto.motivation,
        status: ProjectStatus.PENDING, // Default status
        stage: dto.stage || ProjectStage.IDEA, // Default stage
        owners: { connect: { id: userId } }, // Set the user as the project owner
      },
      include: {
        owners: {
          select: {
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });
  
    // Step 3: Create approval statuses for member emails
    if (dto.memberEmails && dto.memberEmails.length > 0) {
      await this.approvalStatusService.generateApprovalRequests(
        dto.memberEmails, 
        project.id, 
        'members' // Relation name for members
      );
    }
  
    // Step 4: Create approval statuses for encadrant emails
    if (dto.encadrantEmails && dto.encadrantEmails.length > 0) {
      await this.approvalStatusService.generateApprovalRequests(
        dto.encadrantEmails, 
        project.id, 
        'encadrants' // Relation name for encadrants
      );
    }
  
    return project;
  }
  //add user to project member encadrant...
  async attachUserToProject(projectId: string, userIdentifier: string, relationType: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [{ id: userIdentifier }, { email: userIdentifier }],
      },
    });
  
    if (!user) {
      throw new NotFoundException("User not found");
    }
  
    const validRelations = [
      "members",
      "encadrants",
      "juryMembers",
      "owners",
      "scientificReviewers",
    ];
  
    if (!validRelations.includes(relationType)) {
      throw new BadRequestException("Invalid relation type");
    }
  
    return this.prisma.project.update({
      where: { id: projectId },
      data: {
        [relationType]: {
          connect: { id: user.id },
        },
      },
      include: {
        [relationType]: {
          select: { id: true, firstName: true, lastName: true, email: true },
        },
      },
    });
  }
  
  
  async searchProjectByName(name: string) {
    console.log('Searching for:', name);
  
    const results = await this.prisma.project.findMany({
      where: {
        name: {
          contains: name, // 🔍 Partial match search
          mode: 'insensitive',
        },
      },
      include: {
        owners: {
          select: { id: true, email: true, firstName: true, lastName: true },
        },
      },
    });
  
    console.log('Search Results:', results);
    return results;
  }
  
  async searchProjectByOwner(ownerName: string) {
    return this.prisma.project.findMany({
      where: {
        owners: {
          some: {
            OR: [
              { firstName: { contains: ownerName, mode: 'insensitive' } },
              { lastName: { contains: ownerName, mode: 'insensitive' } },
            ],
          },
        },
      },
      include: {
        owners: {
          select: { id: true, email: true, firstName: true, lastName: true },
        },
      },
    });
  }
  
  async getAllProjects() {
    return this.prisma.project.findMany({
      include: {
        owners: { select: { id: true, firstName: true, lastName: true, email: true } },
        members: { select: { id: true, firstName: true, lastName: true, email: true } },
        encadrants: { select: { id: true, firstName: true, lastName: true, email: true } },
        
      },
    });
  }

  async getProjectsWithoutEncadrants() {
    return this.prisma.project.findMany({
      where: {
        encadrants: {
          none: {}, // ⛔ means: no encadrants exist
        },
      },
      include: {
        owners: {
          select: { id: true, firstName: true, lastName: true, email: true },
        },
        members: {
          select: { id: true, firstName: true, lastName: true, email: true },
        },
        encadrants: {
          select: { id: true, firstName: true, lastName: true, email: true },
        },
      },
    });
  }
  
  
  async getProjectById(id: string) {
    return this.prisma.project.findUnique({
      where: { id },
      include: {
        owners: { select: { id: true, firstName: true, lastName: true, email: true } },
        members: { select: { id: true, firstName: true, lastName: true, email: true } },
      },
    });
  }
  

  async updateProject(id: string, dto: UpdateProjectDto) {
    return this.prisma.project.update({
      where: { id },
      data: { ...dto },
    });
  }

  async deleteProject(id: string) {
    return this.prisma.project.delete({
      where: { id },
    });
  }

  async searchProjectByIndustry(industry: string) {
    return this.prisma.project.findMany({
      where: {
        industry: {
          contains: industry,
          mode: 'insensitive',
        },
      },
    });
  }
  
  async addMember(ProjectId: string, userId: string) {
    return this.prisma.project.update({
      where: { id: ProjectId },
      data: {
        members: {
          connect: { id: userId },
        },
      },
    });
  }

  async removeMember(ProjectId: string, userId: string) {
    return this.prisma.project.update({
      where: { id: ProjectId },
      data: {
        members: {
          disconnect: { id: userId },
        },
      },
    });
  }
  
  
  // Filter by stage
async getProjectsByStage(stage: ProjectStage) {
  return this.prisma.project.findMany({
    where: { stage },
  });
}

// ✅ Filter by status
async getProjectsByStatus(status: ProjectStatus) {
  return this.prisma.project.findMany({
    where: { status },
  });
}

// ✅ Sort by creation date
async getProjectsSortedByDate(order: 'asc' | 'desc') {
  return this.prisma.project.findMany({
    orderBy: { createdAt: order },
  });
}

// ✅ Sort by number of members
async getProjectsSortedByMembers(order: 'asc' | 'desc') {
  return this.prisma.project.findMany({
    orderBy: {
      members: { _count: order },
    },
    include: { members: true },
  });
}





// ✅ Get top industries
async getTopIndustries() {
  return this.prisma.project.groupBy({
    by: ['industry'],
    _count: { industry: true },
    orderBy: { _count: { industry: 'desc' } },
    take: 5, // Top 5 industries
  });
}

// ✅ Get top Projects with most members
async getTopProjectsByMembers() {
  return this.prisma.project.findMany({
    orderBy: { members: { _count: 'desc' } },
    take: 5, // Top 5 Projects with most members
    include: { members: true },
  });
}

////members relatiosn stufs 


  // General function to fetch project relations
  async getProjectRelation(projectId: string, relationType: string) {
    const validRelations = [
      "members",
      "encadrants",
      "juryMembers",
      "owners",
      "scientificReviewers",
      "modules", // Add other relations if needed
    ];

    // Check if the relation type is valid
    if (!validRelations.includes(relationType)) {
      throw new BadRequestException(`Invalid relation type: ${relationType}`);
    }

    // Dynamically query the relation
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
      include: {
        [relationType]: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    // Handle case where project is not found
    if (!project) {
      throw new NotFoundException("Project not found");
    }

    // Return the requested relation data
    return project[relationType];
  

  
  
  
  
  
  }
}

/*// ✅ Filter by stage
async getProjectsByStage(stage: ProjectStage) {
  return this.prisma.Project.findMany({
    where: { stage },
  });
}

// ✅ Filter by status
async getProjectsByStatus(status: ProjectStatus) {
  return this.prisma.Project.findMany({
    where: { status },
  });
}

// ✅ Sort by creation date
async getProjectsSortedByDate(order: 'asc' | 'desc') {
  return this.prisma.Project.findMany({
    orderBy: { createdAt: order },
  });
}

// ✅ Sort by number of members
async getProjectsSortedByMembers(order: 'asc' | 'desc') {
  return this.prisma.Project.findMany({
    orderBy: {
      members: { _count: order },
    },
    include: { members: true },
  });
}

// ✅ Set funding goal for a Project
async setFundingGoal(ProjectId: string, fundingGoal: number) {
  return this.prisma.Project.update({
    where: { id: ProjectId },
    data: { fundingGoal },
  });
}

// ✅ Track total funding raised
async updateFundingRaised(ProjectId: string, amount: number) {
  const Project = await this.prisma.Project.findUnique({ where: { id: ProjectId } });
  if (!Project) throw new NotFoundException('Project not found');

  return this.prisma.Project.update({
    where: { id: ProjectId },
    data: { fundingRaised: (Project.fundingRaised || 0) + amount },
  });
}

// ✅ Get top industries
async getTopIndustries() {
  return this.prisma.Project.groupBy({
    by: ['industry'],
    _count: { industry: true },
    orderBy: { _count: { industry: 'desc' } },
    take: 5, // Top 5 industries
  });
}

// ✅ Get top Projects with most members
async getTopProjectsByMembers() {
  return this.prisma.Project.findMany({
    orderBy: { members: { _count: 'desc' } },
    take: 5, // Top 5 Projects with most members
    include: { members: true },
  });
}

// ✅ Follow a Project
async followProject(userId: string, ProjectId: string) {
  return this.prisma.user.update({
    where: { id: userId },
    data: {
      followedProjects: {
        connect: { id: ProjectId },
      },
    },
  });
}

// ✅ Send partnership request
async sendPartnershipRequest(userId: string, ProjectId: string) {
  return this.prisma.partnershipRequest.create({
    data: {
      userId,
      ProjectId,
      status: 'PENDING',
    },
  });
}
*/