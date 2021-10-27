import { Test, TestingModule } from '@nestjs/testing';
import { ShowTimeService } from './show-time.service';

describe('ShowTimeService', () => {
  let service: ShowTimeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShowTimeService],
    }).compile();

    service = module.get<ShowTimeService>(ShowTimeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
