import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MilestoneStatus } from '@prisma/client';

@Injectable()
export class TrackingService {
  constructor(private prisma: PrismaService) {}

  /**
   * Calculate Project Progress
   * Returns the percentage of milestones completed for a given project
   */
  async calculateProjectProgress(projectId: string): Promise<number> {
    const milestones = await this.prisma.milestone.findMany({
      where: { projectId },
    });

    const completed = milestones.filter(m => m.status === MilestoneStatus.COMPLETED).length;

    return milestones.length ? (completed / milestones.length) * 100 : 0;
  }

  /**
   * Update Milestone Status
   * Updates the status and optional dueDate of a milestone
   */
  async updateMilestoneStatus(
    milestoneId: string,
    updateMilestoneDto: { status: MilestoneStatus; dueDate?: Date },
  ) {
    const milestone = await this.prisma.milestone.findUnique({
      where: { id: milestoneId },
    });

    if (!milestone) throw new NotFoundException('Milestone not found');

    return this.prisma.milestone.update({
      where: { id: milestoneId },
      data: {
        status: updateMilestoneDto.status,
        dueDate: updateMilestoneDto.dueDate || milestone.dueDate,
      },
    });
  }

  /**
   * Get Feedback for a Milestone
   * Returns all feedback associated with a given milestone
   */
  async getMilestoneFeedback(milestoneId: string) {
    const feedback = await this.prisma.feedback.findMany({
      where: { milestoneId },
    });

    if (!feedback.length) throw new NotFoundException('No feedback found for this milestone');

    return feedback;
  }

  /**
   * Get Milestones for a Project
   * Fetches all milestones for a specific project, optionally filtering by status
   */
  async getProjectMilestones(projectId: string, status?: MilestoneStatus) {
    return this.prisma.milestone.findMany({
      where: {
        projectId,
        ...(status && { status }),
      },
    });
  }

  /**
   * Generate a Progress Report
   * Provides detailed progress and statistics for a project
   */
  async generateProgressReport(projectId: string) {
    const progress = await this.calculateProjectProgress(projectId);
    const milestones = await this.getProjectMilestones(projectId);

    return {
      progress,
      milestones,
    };
  }
}
