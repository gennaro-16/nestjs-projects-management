import { Test, TestingModule } from '@nestjs/testing';
import { ApprovalStatusController } from './approval-status.controller';

describe('ApprovalStatusController', () => {
  let controller: ApprovalStatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApprovalStatusController],
    }).compile();

    controller = module.get<ApprovalStatusController>(ApprovalStatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
