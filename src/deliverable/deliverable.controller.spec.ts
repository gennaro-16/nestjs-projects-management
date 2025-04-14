import { Test, TestingModule } from '@nestjs/testing';
import { DeliverableController } from './deliverable.controller';

describe('DeliverableController', () => {
  let controller: DeliverableController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeliverableController],
    }).compile();

    controller = module.get<DeliverableController>(DeliverableController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
