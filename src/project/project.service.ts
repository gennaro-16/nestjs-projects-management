import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectStatus, ProjectStage } from '@prisma/client';
import { ApprovalStatusService } from '../approval-status/approval-status.service'; // Import ApprovalStatusService
import { UpdateProjectDto } from './dto/update-project.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ConflictException } from '@nestjs/common';
import {InternalServerErrorException} from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';

@Injectable()
export class ProjectService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly approvalStatusService: ApprovalStatusService, // Inject ApprovalStatusService
  ) {}


  async updateStaticModule(
    projectId: string,
    moduleName: string,
    percentage: number
  ) {
    // Validate percentage range
    if (percentage < 0 || percentage > 100) {
      throw new BadRequestException('Percentage must be between 0 and 100');
    }
  
    // Check if project exists
    const projectExists = await this.prisma.project.findUnique({
      where: { id: projectId }
    });
    if (!projectExists) {
      throw new NotFoundException('Project not found');
    }
  
    // Update the module
    return this.prisma.staticModule.update({
      where: {
        name_projectId: {
          name: moduleName,
          projectId: projectId
        }
      },
      data: {
        percentage: percentage,
        updatedAt: new Date() // Explicit update timestamp
      },
      select: {
        id: true,
        name: true,
        percentage: true,
        updatedAt: true
      }
    });
  }
  
  async createProject(userId: string, dto: CreateProjectDto): Promise<any> {
    // Step 1: Validate if user exists
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
  
    if (!user) {
      throw new ForbiddenException('User not found');
    }
  
    // Step 2: Check if a project with the same name already exists
    const existingProject = await this.prisma.project.findFirst({
      where: {
        name: dto.name,
        OR: [
          { industry: { equals: dto.industry, mode: 'insensitive' } },
        ],
      },
    });
  
    if (existingProject) {
      throw new ConflictException('Project with this name or industry already exists');
    }
  
    // Step 3: Validate memberEmails (at least one member required)
    if (!dto.memberEmails || dto.memberEmails.length < 1) {
      throw new BadRequestException('At least one member is required for the project');
    }
  
    // Step 4: Validate encadrantEmails (at least one encadrant required)
    if (dto.encadrantEmails && dto.encadrantEmails.length < 1) {
      throw new BadRequestException('At least one encadrant is required for the project');
    }
  
    // Step 5: Check if member emails are valid users
    if (dto.memberEmails) {
      const existingMembers = await this.prisma.user.findMany({
        where: {
          email: { in: dto.memberEmails },
        },
      });
      if (existingMembers.length !== dto.memberEmails.length) {
        throw new BadRequestException('Some member emails are invalid or do not exist');
      }
    }
  
    // Step 6: Check if encadrant emails are valid users
    if (dto.encadrantEmails) {
      const existingEncadrants = await this.prisma.user.findMany({
        where: {
          email: { in: dto.encadrantEmails },
        },
      });
      if (existingEncadrants.length !== dto.encadrantEmails.length) {
        throw new BadRequestException('Some encadrant emails are invalid or do not exist');
      }
    }
  
    // Step 7: Validate project description length
    if (dto.about.length < 20) {
      throw new BadRequestException('The project description must be at least 20 characters long');
    }

    // Define static modules
    const staticModules = [
        { name: 'Research', percentage: 0 },
        { name: 'Development', percentage: 0 },
        { name: 'Testing', percentage: 0 },
        { name: 'Documentation', percentage: 0 }
    ];

    try {
      // First create the project
      const project = await this.prisma.project.create({
        data: {
          name: dto.name,
          industry: dto.industry,
          about: dto.about,
          problem: dto.problem,
          solution: dto.solution,
          targetAudience: dto.targetAudience,
          competitiveAdvantage: dto.competitiveAdvantage,
          motivation: dto.motivation,
          status: ProjectStatus.PENDING,
          stage: dto.stage || ProjectStage.IDEA,
          owners: { connect: { id: userId } },
          staticModules: {
            create: staticModules
          }
        },
        include: {
          staticModules: true,
          owners: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true
            }
          }
        }
      });

      // Now that we have a saved project, generate approval statuses
      if (dto.memberEmails && dto.memberEmails.length > 0) {
        await this.approvalStatusService.generateApprovalRequests(
          dto.memberEmails,
          project.id,
          'members'
        );
      }

      if (dto.encadrantEmails && dto.encadrantEmails.length > 0) {
        await this.approvalStatusService.generateApprovalRequests(
          dto.encadrantEmails,
          project.id,
          'encadrants'
        );
      }

      return project;
    } catch (error) {
      throw new InternalServerErrorException('Failed to create project: ' + error.message);
    }
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
  
  async getProjectTeamMembers(
    projectId: string,
    relationType: 'members' | 'encadrants' | 'juryMembers' | 'owners' | 'scientificReviewers'
  ) {
    try {
      const projectWithTeam = await this.prisma.project.findUnique({
        where: {
          id: projectId,
        },
        include: {
          [relationType]: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
              year: true,
              role: true,
            },
          },
        },
      });
  
      if (!projectWithTeam) {
        throw new NotFoundException(`Project with ID ${projectId} not found`);
      }
  
      return projectWithTeam[relationType];
    } catch (error) {
      // Handle or rethrow the error appropriately
      throw new InternalServerErrorException('Failed to fetch project team members');
    }
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
    try {
      // First check if the project exists
      const project = await this.prisma.project.findUnique({
        where: { id },
      });

      if (!project) {
        throw new NotFoundException(`Project with ID ${id} not found`);
      }

      // Proceed with deletion
      return await this.prisma.project.delete({
        where: { id },
        include: {
          owners: true,
          members: true,
          encadrants: true,
          staticModules: true
        }
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to delete project');
    }
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

  async updateAllStaticModules(projectId: string, moduleData: {
    research: number;
    development: number;
    testing: number;
    documentation: number;
  }) {
    // Check if project exists
    const projectExists = await this.prisma.project.findUnique({
      where: { id: projectId }
    });
    if (!projectExists) {
      throw new NotFoundException('Project not found');
    }

    // Update all modules in a transaction
    return this.prisma.$transaction([
      this.prisma.staticModule.update({
        where: { name_projectId: { name: 'Research', projectId } },
        data: { percentage: moduleData.research, updatedAt: new Date() }
      }),
      this.prisma.staticModule.update({
        where: { name_projectId: { name: 'Development', projectId } },
        data: { percentage: moduleData.development, updatedAt: new Date() }
      }),
      this.prisma.staticModule.update({
        where: { name_projectId: { name: 'Testing', projectId } },
        data: { percentage: moduleData.testing, updatedAt: new Date() }
      }),
      this.prisma.staticModule.update({
        where: { name_projectId: { name: 'Documentation', projectId } },
        data: { percentage: moduleData.documentation, updatedAt: new Date() }
      })
    ]);
  }

  async createSession(projectId: string, data: CreateSessionDto) {
    return this.prisma.session.create({
      data: {
        ...data,
        projectId,
      },
    });
  }

  async getProjectSessions(projectId: string) {
    return this.prisma.session.findMany({
      where: {
        projectId,
      },
      orderBy: {
        date: 'desc',
      },
    });
  }

  async getSessionById(sessionId: string) {
    return this.prisma.session.findUnique({
      where: {
        id: sessionId,
      },
    });
  }

  async deleteSession(sessionId: string) {
    return this.prisma.session.delete({
      where: {
        id: sessionId,
      },
    });
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