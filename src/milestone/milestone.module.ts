import { Module } from '@nestjs/common';
import { MilestoneService } from './milestone.service';
import { MilestoneController } from './milestone.controller';

@Module({
  providers: [MilestoneService],
  controllers: [MilestoneController]
})
export class MilestoneModule {}
