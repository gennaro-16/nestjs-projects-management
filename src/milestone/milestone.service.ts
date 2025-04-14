import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Import the Prisma service
import { Milestone } from '@prisma/client'; // Import the Milestone type
import { CreateMilestoneDto } from './dto/create-milestone.dto'; // Import the Create DTO

@Injectable()
export class MilestoneService {
  constructor(private readonly prisma: PrismaService) {}

  // Function to create a milestone
  async createMilestone(createMilestoneDto: CreateMilestoneDto): Promise<Milestone> {
    try {
      const milestone = await this.prisma.milestone.create({
        data: {
          name: createMilestoneDto.name,
          description: createMilestoneDto.description,
          status: createMilestoneDto.status || 'NOT_STARTED', // Default to NOT_STARTED if not provided
          dueDate: createMilestoneDto.dueDate,
          projectId: createMilestoneDto.projectId, // Required to associate with a project
        },
      });
      return milestone;
    } catch (error) {
      throw new Error(`Failed to create milestone: ${error.message}`);
    }
  }

  // Function to fetch all milestones
  async fetchAllMilestones(): Promise<Milestone[]> {
    try {
      const milestones = await this.prisma.milestone.findMany();
      return milestones;
    } catch (error) {
      throw new Error(`Failed to fetch milestones: ${error.message}`);
    }
  }
}
