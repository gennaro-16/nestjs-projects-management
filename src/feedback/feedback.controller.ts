import { Controller, Post, Get, Param, Body, Delete, Patch } from '@nestjs/common';
import { FeedbackService } from './feedback.service';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  /**
   * Post Feedback for a Milestone
   */
  @Post('/milestone/:milestoneId')
  postFeedback(
    @Param('milestoneId') milestoneId: string,
    @Body() createFeedbackDto: { content: string; rating?: number; projectId: string; givenById: string },
  ) {
    return this.feedbackService.createFeedbackForMilestone(milestoneId, createFeedbackDto);
  }

  /**
   * Get Feedback by Milestone
   */
  @Get('/milestone/:milestoneId')
  getFeedbackByMilestone(@Param('milestoneId') milestoneId: string) {
    return this.feedbackService.getFeedbackByMilestone(milestoneId);
  }

  /**
   * Get Feedback by Project
   */
  @Get('/project/:projectId')
  getFeedbackByProject(@Param('projectId') projectId: string) {
    return this.feedbackService.getFeedbackByProject(projectId);
  }

  /**
   * Get Feedback by User (Mentor)
   */
  @Get('/user/:userId')
  getFeedbackByUser(@Param('userId') userId: string) {
    return this.feedbackService.getFeedbackByUser(userId);
  }

  /**
   * Update Feedback
   */
  @Patch('/:feedbackId')
  updateFeedback(
    @Param('feedbackId') feedbackId: string,
    @Body() updateFeedbackDto: { content?: string; rating?: number },
  ) {
    return this.feedbackService.updateFeedback(feedbackId, updateFeedbackDto);
  }

  /**
   * Delete Feedback
   */
  @Delete('/:feedbackId')
  deleteFeedback(@Param('feedbackId') feedbackId: string) {
    return this.feedbackService.deleteFeedback(feedbackId);
  }
}
