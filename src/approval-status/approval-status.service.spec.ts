import { Test, TestingModule } from '@nestjs/testing';
import { ApprovalStatusService } from './approval-status.service';

describe('ApprovalStatusService', () => {
  let service: ApprovalStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApprovalStatusService],
    }).compile();

    service = module.get<ApprovalStatusService>(ApprovalStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
