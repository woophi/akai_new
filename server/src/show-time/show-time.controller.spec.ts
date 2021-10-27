import { Test, TestingModule } from '@nestjs/testing';
import { ShowTimeController } from './show-time.controller';

describe('ShowTimeController', () => {
  let controller: ShowTimeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShowTimeController],
    }).compile();

    controller = module.get<ShowTimeController>(ShowTimeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
