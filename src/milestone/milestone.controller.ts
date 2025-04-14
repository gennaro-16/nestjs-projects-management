import { Controller, Post, Body, Get } from '@nestjs/common';
import { MilestoneService } from './milestone.service';
import { CreateMilestoneDto } from './dto/create-milestone.dto';
import { Milestone } from '@prisma/client';

@Controller('milestone')
export class MilestoneController {
  constructor(private readonly milestoneService: MilestoneService) {}

  // Endpoint to create a milestone
  @Post()
  async createMilestone(@Body() createMilestoneDto: CreateMilestoneDto): Promise<Milestone> {
    return this.milestoneService.createMilestone(createMilestoneDto);
  }

  // Endpoint to fetch all milestones
  @Get()
  async fetchAllMilestones(): Promise<Milestone[]> {
    return this.milestoneService.fetchAllMilestones();
  }
}
