import {
    Controller,
    Get,
    Patch,
    Param,
    Body,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { TrackingService } from './tracking.service';
  import { MilestoneStatus } from '@prisma/client';
  
  @Controller('tracking')
  export class TrackingController {
    constructor(private readonly trackingService: TrackingService) {}
  
    /**
     * Get Project Progress
     * Fetches the completion percentage of milestones for a project
     */
    @Get('/projects/:projectId/progress')
    async getProjectProgress(@Param('projectId') projectId: string) {
      try {
        const progress = await this.trackingService.calculateProjectProgress(projectId);
        return { progress };
      } catch (error) {
        throw new HttpException(
          `Unable to fetch progress for project ${projectId}: ${error.message}`,
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  
    /**
     * Update Milestone Status
     * Updates the status and due date of a milestone
     */
    @Patch('/milestones/:milestoneId/status')
    async updateMilestoneStatus(
      @Param('milestoneId') milestoneId: string,
      @Body()
      updateMilestoneDto: { status: MilestoneStatus; dueDate?: Date },
    ) {
      try {
        const updatedMilestone = await this.trackingService.updateMilestoneStatus(
          milestoneId,
          updateMilestoneDto,
        );
        return updatedMilestone;
      } catch (error) {
        throw new HttpException(
          `Unable to update milestone ${milestoneId}: ${error.message}`,
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  
    /**
     * Get Milestone Feedback
     * Retrieves all feedback associated with a given milestone
     */
    @Get('/milestones/:milestoneId/feedback')
    async getMilestoneFeedback(@Param('milestoneId') milestoneId: string) {
      try {
        const feedback = await this.trackingService.getMilestoneFeedback(milestoneId);
        return { feedback };
      } catch (error) {
        throw new HttpException(
          `Unable to fetch feedback for milestone ${milestoneId}: ${error.message}`,
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  
    /**
     * Generate Progress Report
     * Returns a comprehensive progress report for a project
     */
    @Get('/projects/:projectId/report')
    async generateProgressReport(@Param('projectId') projectId: string) {
      try {
        const report = await this.trackingService.generateProgressReport(projectId);
        return report;
      } catch (error) {
        throw new HttpException(
          `Unable to generate progress report for project ${projectId}: ${error.message}`,
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }
  