import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FeedbackService {
  constructor(private prisma: PrismaService) {}

  /**
   * Create Feedback for a Milestone
   */
  async createFeedbackForMilestone(
    milestoneId: string,
    createFeedbackDto: { content: string; rating?: number; projectId: string; givenById: string },
  ) {
    const milestone = await this.prisma.milestone.findUnique({ where: { id: milestoneId } });
    if (!milestone) throw new NotFoundException('Milestone not found');

    return this.prisma.feedback.create({
      data: {
        content: createFeedbackDto.content,
        rating: createFeedbackDto.rating,
        milestoneId,
        projectId: createFeedbackDto.projectId,
        givenById: createFeedbackDto.givenById,
      },
    });
  }

  /**
   * Get Feedback by Milestone
   */
  async getFeedbackByMilestone(milestoneId: string) {
    return this.prisma.feedback.findMany({ where: { milestoneId } });
  }

  /**
   * Get Feedback by Project
   */
  async getFeedbackByProject(projectId: string) {
    return this.prisma.feedback.findMany({ where: { projectId } });
  }

  /**
   * Get Feedback by User (Mentor)
   */
  async getFeedbackByUser(userId: string) {
    return this.prisma.feedback.findMany({ where: { givenById: userId } });
  }

  /**
   * Update Feedback
   */
  async updateFeedback(feedbackId: string, updateFeedbackDto: { content?: string; rating?: number }) {
    const feedback = await this.prisma.feedback.findUnique({ where: { id: feedbackId } });
    if (!feedback) throw new NotFoundException('Feedback not found');

    return this.prisma.feedback.update({
      where: { id: feedbackId },
      data: {
        content: updateFeedbackDto.content || feedback.content,
        rating: updateFeedbackDto.rating || feedback.rating,
      },
    });
  }

  /**
   * Delete Feedback
   */
  async deleteFeedback(feedbackId: string) {
    const feedback = await this.prisma.feedback.findUnique({ where: { id: feedbackId } });
    if (!feedback) throw new NotFoundException('Feedback not found');

    return this.prisma.feedback.delete({ where: { id: feedbackId } });
  }
}
