import { Test, TestingModule } from '@nestjs/testing';
import { SoutenanceController } from './soutenance.controller';

describe('SoutenanceController', () => {
  let controller: SoutenanceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SoutenanceController],
    }).compile();

    controller = module.get<SoutenanceController>(SoutenanceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
